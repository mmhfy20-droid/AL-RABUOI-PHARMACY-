import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/authorization";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await getAuthenticatedUser();
  if (!user) redirect("/login");
  const orders = await prisma.order.findMany({
    where: { customerId: user.id },
    select: { id: true, orderNumber: true, status: true, totalMinor: true, currency: true, createdAt: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return <main className="container section">
    <Link className="button" href="/">العودة للرئيسية</Link>
    <h1 style={{fontSize:"2rem"}}>مرحباً، {user.fullName}</h1>
    <p className="muted">{user.phone || user.email}</p>
    <h2>طلباتي</h2>
    {orders.length ? <div className="order-list">{orders.map((order) => (
      <article className="category" key={order.id}>
        <strong>{order.orderNumber}</strong>
        <p>الحالة: {order.status}</p>
        <p>الإجمالي: {order.totalMinor.toLocaleString("ar")} {order.currency}</p>
        <time>{order.createdAt.toLocaleDateString("ar")}</time>
      </article>
    ))}</div> : <div className="empty-state">لا توجد طلبات في حسابك حتى الآن.</div>}
  </main>;
}
