export type MedicineImportRow = {
  sku: string;
  barcode?: string;
  nameAr: string;
  nameEn: string;
  category: string;
  manufacturer?: string;
  salePrice: number;
  currency: "YER" | "SAR" | "USD";
  quantity: number;
  lowStockThreshold: number;
  batchNumber?: string;
  expiresAt?: string;
  prescriptionRequired: boolean;
  descriptionAr?: string;
};

const currencies = new Set(["YER", "SAR", "USD"]);

export function validateMedicineImportRows(input: Record<string, unknown>[]) {
  const rows: MedicineImportRow[] = [];
  const errors: string[] = [];
  const seenSkus = new Set<string>();
  const seenBarcodes = new Set<string>();

  input.forEach((raw, index) => {
    const rowNumber = index + 2;
    const sku = String(raw.sku ?? "").trim();
    const nameAr = String(raw.nameAr ?? "").trim();
    const nameEn = String(raw.nameEn ?? "").trim() || nameAr;
    const category = String(raw.category ?? "").trim();
    const salePrice = Number(raw.salePrice);
    const quantity = Number(raw.quantity);
    const lowStockThreshold = raw.lowStockThreshold === undefined || raw.lowStockThreshold === ""
      ? 5
      : Number(raw.lowStockThreshold);
    const currency = String(raw.currency ?? "").trim().toUpperCase();
    const barcode = String(raw.barcode ?? "").trim();
    const prescriptionText = String(raw.prescriptionRequired ?? "").trim().toLowerCase();
    const prescriptionRequired = ["نعم", "yes", "true", "1"].includes(prescriptionText)
      ? true
      : ["لا", "no", "false", "0"].includes(prescriptionText)
        ? false
        : null;
    const expiresAt = raw.expiresAt === undefined || raw.expiresAt === null || raw.expiresAt === ""
      ? undefined
      : String(raw.expiresAt).trim();

    const rowErrors: string[] = [];
    if (!sku) rowErrors.push("SKU مطلوب");
    if (!nameAr) rowErrors.push("الاسم التجاري مطلوب");
    if (!category) rowErrors.push("التصنيف مطلوب");
    if (!Number.isFinite(salePrice) || salePrice < 0) rowErrors.push("سعر البيع يجب أن يكون رقماً غير سالب");
    if (!Number.isInteger(quantity) || quantity < 0) rowErrors.push("الكمية يجب أن تكون عدداً صحيحاً غير سالب");
    if (!Number.isInteger(lowStockThreshold) || lowStockThreshold < 0) rowErrors.push("حد إعادة الطلب يجب أن يكون عدداً صحيحاً غير سالب");
    if (!currencies.has(currency)) rowErrors.push("العملة يجب أن تكون YER أو SAR أو USD");
    if (prescriptionRequired === null) rowErrors.push("قيمة الوصفة يجب أن تكون نعم أو لا");
    if (expiresAt && Number.isNaN(Date.parse(expiresAt))) rowErrors.push("تاريخ الانتهاء غير صالح");

    if (sku && seenSkus.has(sku)) rowErrors.push("SKU مكرر في الملف");
    if (barcode && seenBarcodes.has(barcode)) rowErrors.push("الباركود مكرر في الملف");
    if (sku) seenSkus.add(sku);
    if (barcode) seenBarcodes.add(barcode);

    if (rowErrors.length) {
      errors.push(`الصف ${rowNumber}: ${rowErrors.join("؛ ")}`);
      return;
    }

    rows.push({
      sku,
      ...(barcode ? { barcode } : {}),
      nameAr,
      nameEn,
      category,
      ...(String(raw.manufacturer ?? "").trim() ? { manufacturer: String(raw.manufacturer).trim() } : {}),
      salePrice,
      currency: currency as MedicineImportRow["currency"],
      quantity,
      lowStockThreshold,
      ...(String(raw.batchNumber ?? "").trim() ? { batchNumber: String(raw.batchNumber).trim() } : {}),
      ...(expiresAt ? { expiresAt } : {}),
      prescriptionRequired,
      ...(String(raw.descriptionAr ?? "").trim() ? { descriptionAr: String(raw.descriptionAr).trim() } : {}),
    });
  });

  if (input.length === 0) errors.push("الملف لا يحتوي على صفوف بيانات.");
  return { rows, errors };
}
