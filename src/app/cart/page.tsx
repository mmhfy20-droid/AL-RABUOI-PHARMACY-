import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/authorization";
import { prisma } from "@/lib/db";
import CartItemControls from "./cart-item-controls";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const user = await getAuthenticatedUser();
  if (!user) redirect("/login");
  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: { items: { include: { product: { include: { inventory: true } } } } },
  });
  const items = cart?.items ?? [];
  const subtotal = items.reduce((sum, item) => sum + item.product.priceMinor * item.quantity, 0);

  return <main className="container section">
    <Link className="button" href="/">العودة للمتجر</Link>
    <h1 style={{fontSize:"2rem"}}>سلة التسوق</h1>
    {items.length ? <>
      <div className="order-list">{items.map((item) => (
        <article className="category" key={item.id}>
          <strong>{item.product.nameAr}</strong>
          <p>الكمية: {item.quantity}</p>
          <p>سعر الوحدة: {item.product.priceMinor.toLocaleString("ar")} {item.product.currency}</p>
          <p>المجموع: {(item.product.priceMinor * item.quantity).toLocaleString("ar")} {item.product.currency}</p>
          <p>{(item.product.inventory?.quantity ?? 0) > 0 ? "متوفر" : "غير متوفر"}</p>
          <CartItemControls itemId={item.id} quantity={item.quantity} />
        </article>
      ))}</div>
      <h2>الإجمالي قبل التوصيل: {subtotal.toLocaleString("ar")}</h2>
      <div className="empty-state">يمكنك تعديل الكميات أو حذف المنتجات. إتمام الطلب سيُتاح بعد بناء خطوة العنوان والتحقق من الوصفة والدفع.</div>
    </> : <div className="empty-state">سلتك فارغة حالياً. <Link href="/">تصفح المنتجات</Link></div>}
  </main>;
}
