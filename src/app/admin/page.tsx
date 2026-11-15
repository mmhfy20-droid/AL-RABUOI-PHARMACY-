import Link from "next/link";
import { requirePermission } from "@/lib/authorization";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requirePermission("dashboard:read");
  const [orders, customers, products, pendingOrders, lowStock] = await Promise.all([
    prisma.order.count(),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.product.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.$queryRaw<{ count: bigint }[]>`SELECT COUNT(*)::bigint AS count FROM "InventoryBalance" WHERE quantity <= "lowStockThreshold"`,
  ]);

  const lowStockCount = Number(lowStock[0]?.count ?? 0);

  const metrics = [
    { title: "إجمالي الطلبات", value: orders },
    { title: "العملاء", value: customers },
    { title: "المنتجات", value: products },
    { title: "طلبات قيد الانتظار", value: pendingOrders },
    { title: "مخزون منخفض", value: lowStockCount },
  ];

  return <main className="container section">
    <Link className="button" href="/">عرض المتجر</Link>
    <Link className="button" href="/admin/setup" style={{marginInlineStart:8}}>مركز تجهيز بيانات الصيدلية</Link>
    <Link className="button" href="/admin/catalog/import" style={{marginInlineStart:8}}>إضافة الأدوية والمخزون</Link>
    <h1 style={{fontSize:"2rem"}}>لوحة إدارة الربوعي فارماسي</h1>
    <p className="muted">مرحباً {user.fullName} — صلاحيتك: {user.role}</p>
    <div className="categories">{metrics.map((metric) => (
      <article className="category" key={metric.title}><p>{metric.title}</p><strong style={{fontSize:"2rem"}}>{metric.value.toLocaleString("ar")}</strong></article>
    ))}</div>
    <div className="empty-state" style={{marginTop:20}}>هذه نظرة عامة أولية. أدوات إدارة المنتجات والمخزون والطلبات والموظفين ستُضاف مع تطبيق صلاحيات كل وظيفة.</div>
  </main>;
}
