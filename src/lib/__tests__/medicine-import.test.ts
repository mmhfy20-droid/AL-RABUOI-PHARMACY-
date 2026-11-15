import { describe, expect, it } from "vitest";
import { validateMedicineImportRows } from "../medicine-import";

const validRow = {
  sku: "MED-001",
  nameAr: "دواء تجريبي",
  nameEn: "Sample medicine",
  category: "مسكنات",
  salePrice: 125.5,
  currency: "YER",
  quantity: 20,
  prescriptionRequired: "لا",
};

describe("validateMedicineImportRows", () => {
  it("accepts a valid medicine row and normalizes numeric fields", () => {
    const result = validateMedicineImportRows([validRow]);
    expect(result.errors).toEqual([]);
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0].salePrice).toBe(125.5);
    expect(result.rows[0].quantity).toBe(20);
    expect(result.rows[0].prescriptionRequired).toBe(false);
  });

  it("rejects duplicate SKUs in one upload", () => {
    const result = validateMedicineImportRows([validRow, validRow]);
    expect(result.rows).toHaveLength(1);
    expect(result.errors.some((error) => error.includes("SKU مكرر"))).toBe(true);
  });

  it("rejects negative prices, quantities, and unsupported currencies", () => {
    const result = validateMedicineImportRows([
      { ...validRow, salePrice: -1 },
      { ...validRow, sku: "MED-002", quantity: -2 },
      { ...validRow, sku: "MED-003", currency: "EUR" },
    ]);
    expect(result.rows).toHaveLength(0);
    expect(result.errors).toHaveLength(3);
  });

  it("rejects blank price and stock values rather than silently treating them as zero", () => {
    const result = validateMedicineImportRows([{ ...validRow, salePrice: "", quantity: null }]);
    expect(result.rows).toHaveLength(0);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toContain("مطلوب");
  });

  it("rejects expired-date metadata without a batch number and insecure image links", () => {
    const result = validateMedicineImportRows([
      { ...validRow, expiresAt: "2027-01-01", imageUrl: "http://example.com/image.png" },
    ]);
    expect(result.rows).toHaveLength(0);
    expect(result.errors[0]).toContain("رقم التشغيلة");
    expect(result.errors[0]).toContain("HTTPS");
  });

  it("requires a product name, category, and unambiguous prescription value", () => {
    const result = validateMedicineImportRows([
      { ...validRow, sku: "MED-004", nameAr: "", category: "", prescriptionRequired: "ربما" },
    ]);
    expect(result.rows).toHaveLength(0);
    expect(result.errors[0]).toContain("الاسم التجاري مطلوب");
    expect(result.errors[0]).toContain("التصنيف مطلوب");
    expect(result.errors[0]).toContain("قيمة الوصفة");
  });
});
