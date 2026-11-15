import Link from "next/link";
import { redirect } from "next/navigation";
import { requirePermission } from "@/lib/authorization";
import { hasPermission } from "@/lib/permissions";
import MedicineImportForm from "./import-form";

export const dynamic = "force-dynamic";

export default async function MedicineImportPage() {
  const user = await requirePermission("catalog:manage");
  if (!hasPermission(user.role, "inventory:manage")) redirect("/admin");

  return (
    <main className="container section">
      <Link className="button" href="/admin">العودة إلى لوحة الإدارة</Link>
      <h1 style={{fontSize:"2rem"}}>إضافة الأدوية والمخزون من Excel</h1>
      <p className="muted">هذه الصفحة مخصصة للمالك والمدير ومسؤول المخزون المخوّل.</p>
      <section className="empty-state" style={{marginTop:20}}>
        <strong>طريقة الاستيراد</strong>
        <p>نزّل القالب، أدخل بيانات الصيدلية الحقيقية، ثم ارفع الملف هنا. سيجري فحص جميع الصفوف أولاً. إذا وُجد خطأ فلن يُحفظ أي صف من الملف.</p>
        <a className="button button-primary" href="/templates/medicine-inventory-template.csv" download>تنزيل قالب CSV المتوافق مع Excel</a>
      </section>
      <section className="section">
        <h2>رفع ملف البيانات</h2>
        <MedicineImportForm />
      </section>
      <section className="notice">
        <strong>ضوابط مهمة</strong>
        <ul>
          <li>كل المنتجات المستوردة تُحفظ كمسودات غير منشورة، ولا تظهر للعملاء تلقائياً.</li>
          <li>الأسعار تُحفظ بعملتها المحددة دون تحويل بين YER وSAR وUSD.</li>
          <li>الأدوية التي تتطلب وصفة تبقى غير منشورة حتى مراجعة الصيدلي.</li>
          <li>لا تكرر رمز الصنف أو الباركود الموجود مسبقاً.</li>
          <li>إذا كان للصنف أكثر من تشغيلة أو تاريخ انتهاء، أدخل كل تشغيلة في صف مستقل ورمز SKU مختلفاً مؤقتاً أو اطلب دمج التشغيلات قبل النشر؛ لا تكرر SKU في الملف.</li>
        </ul>
      </section>
    </main>
  );
}
