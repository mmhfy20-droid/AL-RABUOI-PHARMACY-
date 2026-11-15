import { NextResponse } from "next/server";
import { Readable } from "node:stream";
import ExcelJS from "exceljs";
import { prisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/authorization";
import { hasPermission } from "@/lib/permissions";
import { validateMedicineImportRows } from "@/lib/medicine-import";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const headerMap: Record<string, string> = {
  "sku / رمز الصنف": "sku",
  "sku": "sku",
  "رمز الصنف": "sku",
  "الباركود": "barcode",
  "barcode": "barcode",
  "الاسم التجاري": "nameAr",
  "الاسم الإنجليزي": "nameEn",
  "الاسم العلمي": "scientificName",
  "التركيز": "strength",
  "الشكل الصيدلاني": "dosageForm",
  "حجم العبوة": "packSize",
  "بلد المنشأ": "countryOfOrigin",
  "التصنيف": "category",
  "الشركة المصنعة": "manufacturer",
  "سعر البيع": "salePrice",
  "sale price": "salePrice",
  "العملة": "currency",
  "currency": "currency",
  "الكمية الحالية": "quantity",
  "quantity": "quantity",
  "حد إعادة الطلب": "lowStockThreshold",
  "رقم التشغيلة": "batchNumber",
  "تاريخ الانتهاء": "expiresAt",
  "يتطلب وصفة؟": "prescriptionRequired",
  "الوصف المعتمد من الصيدلي": "descriptionAr",
  "رابط الصورة": "imageUrl",
};

function cellValue(value: ExcelJS.CellValue): unknown {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (value && typeof value === "object") {
    if ("text" in value && typeof value.text === "string") return value.text;
    if ("result" in value) return value.result;
    if ("richText" in value && Array.isArray(value.richText)) return value.richText.map((part) => part.text).join("");
  }
  return value;
}

function excelDate(value: unknown): string | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "number" && Number.isFinite(value)) {
    const date = new Date(Date.UTC(1899, 11, 30) + value * 86400000);
    return date.toISOString().slice(0, 10);
  }
  const parsed = new Date(String(value));
  return Number.isNaN(parsed.getTime()) ? String(value) : parsed.toISOString().slice(0, 10);
}

export async function POST(request: Request) {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ error: "يلزم تسجيل الدخول." }, { status: 401 });
  if (!hasPermission(user.role, "catalog:manage") || !hasPermission(user.role, "inventory:manage")) {
    return NextResponse.json({ error: "ليس لديك صلاحية استيراد المنتجات والمخزون." }, { status: 403 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "اختر ملف Excel أو CSV أولاً." }, { status: 400 });
  if (file.size === 0 || file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "حجم الملف يجب أن يكون أقل من 5 ميجابايت وغير فارغ." }, { status: 400 });
  }

  const extension = file.name.toLowerCase().split(".").pop();
  if (extension !== "xlsx" && extension !== "csv") {
    return NextResponse.json({ error: "الصيغ المدعومة هي XLSX وCSV فقط." }, { status: 415 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = new ExcelJS.Workbook();
    if (extension === "csv") {
      await workbook.csv.read(Readable.from([buffer]));
    } else {
      await workbook.xlsx.load(buffer);
    }

    const sheet = workbook.worksheets[0];
    if (!sheet || sheet.rowCount < 2) {
      return NextResponse.json({ error: "لم يتم العثور على ورقة بيانات تحتوي على صفوف." }, { status: 400 });
    }

    if (sheet.rowCount > 501) return NextResponse.json({ error: "الحد الأقصى 500 صنف في الملف الواحد." }, { status: 413 });

    const headerRow = sheet.getRow(1);
    const columns = new Map<number, string>();
    headerRow.eachCell((cell, column) => {
      const header = String(cellValue(cell.value) ?? "").replace(/^\uFEFF/, "").trim().toLowerCase();
      const mapped = headerMap[header];
      if (mapped) columns.set(column, mapped);
    });

    const requiredHeaders = ["sku", "nameAr", "category", "salePrice", "currency", "quantity", "prescriptionRequired"];
    const present = new Set(columns.values());
    const missingHeaders = requiredHeaders.filter((header) => !present.has(header));
    if (missingHeaders.length) {
      return NextResponse.json({
        error: "أعمدة أساسية مفقودة. استخدم قالب الربوعي فارماسي.",
        missingHeaders,
      }, { status: 400 });
    }

    const inputRows: Record<string, unknown>[] = [];
    sheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return;
      const item: Record<string, unknown> = {};
      for (const [column, key] of columns) {
        const value = cellValue(row.getCell(column).value);
        item[key] = key === "expiresAt" ? excelDate(value) : value;
      }
      if (Object.values(item).some((value) => value !== undefined && value !== null && String(value).trim() !== "")) {
        inputRows.push(item);
      }
    });

    const validated = validateMedicineImportRows(inputRows);
    if (validated.errors.length) {
      return NextResponse.json({
        error: "لم يتم استيراد أي صف. صحح الأخطاء ثم أعد رفع الملف.",
        errors: validated.errors.slice(0, 50),
        totalErrors: validated.errors.length,
      }, { status: 422 });
    }

    const result = await prisma.$transaction(async (tx) => {
      const imported: string[] = [];
      for (const item of validated.rows) {
        const existing = await tx.product.findFirst({
          where: { OR: [{ sku: item.sku }, ...(item.barcode ? [{ barcode: item.barcode }] : [])] },
          select: { id: true },
        });
        if (existing) throw new Error(`الصنف ${item.sku} أو الباركود الخاص به موجود مسبقاً. لم يتم حفظ أي صف.`);

        let category = await tx.category.findFirst({ where: { nameAr: item.category } });
        if (!category) {
          const categorySlug = `cat-${Buffer.from(item.category, "utf8").toString("hex").slice(0, 40)}`;
          category = await tx.category.create({
            data: {
              nameAr: item.category,
              nameEn: item.category,
              slug: categorySlug,
              isActive: true,
            },
          });
        }

        const product = await tx.product.create({
          data: {
            sku: item.sku,
            barcode: item.barcode,
            nameAr: item.nameAr,
            nameEn: item.nameEn,
            descriptionAr: item.descriptionAr,
            manufacturer: item.manufacturer,
            specifications: {
              ...(item.scientificName ? { scientificName: item.scientificName } : {}),
              ...(item.strength ? { strength: item.strength } : {}),
              ...(item.dosageForm ? { dosageForm: item.dosageForm } : {}),
              ...(item.packSize ? { packSize: item.packSize } : {}),
              ...(item.countryOfOrigin ? { countryOfOrigin: item.countryOfOrigin } : {}),
            },
            categoryId: category.id,
            priceMinor: Math.round(item.salePrice * 100),
            currency: item.currency,
            prescriptionRequired: item.prescriptionRequired,
            isPublished: false,
            ...(item.imageUrl ? { images: { create: { url: item.imageUrl, altAr: item.nameAr } } } : {}),
            inventory: {
              create: {
                quantity: item.quantity,
                lowStockThreshold: item.lowStockThreshold,
              },
            },
          },
        });

        if (item.batchNumber) {
          await tx.inventoryBatch.create({
            data: {
              productId: product.id,
              batchNumber: item.batchNumber,
              quantity: item.quantity,
              expiresAt: item.expiresAt ? new Date(`${item.expiresAt}T00:00:00.000Z`) : null,
            },
          });
        }
        if (item.quantity > 0) {
          await tx.inventoryMovement.create({
            data: {
              productId: product.id,
              actorId: user.id,
              quantityDelta: item.quantity,
              reason: "initial_excel_import",
            },
          });
        }
        imported.push(item.sku);
      }
      return imported;
    });

    return NextResponse.json({
      success: true,
      importedCount: result.length,
      skus: result,
      note: "تم حفظ المنتجات كمسودات غير منشورة. راجعها واعتمدها قبل عرضها للعملاء.",
    }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "تعذر استيراد الملف.";
    return NextResponse.json({ error: message }, { status: 409 });
  }
}
