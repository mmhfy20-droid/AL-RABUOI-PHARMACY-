import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import type { Prisma } from "@/generated/prisma/client";
import AddToCartButton from "./add-to-cart-button";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!process.env.DATABASE_URL) {
    return <main className="container section"><Link className="button" href="/">العودة للرئيسية</Link><div className="empty-state">تفاصيل المنتجات غير متاحة حتى إعداد قاعدة البيانات.</div></main>;
  }

  type ProductDetail = Prisma.ProductGetPayload<{ include: { images: true; category: true; brand: true; inventory: true } }>;
  let product: ProductDetail | null = null;
  try {
    product = await prisma.product.findFirst({
      where: { id, isPublished: true },
      include: { images: { orderBy: { sortOrder: "asc" } }, category: true, brand: true, inventory: true },
    });
  } catch {
    return <main className="container section"><Link className="button" href="/">العودة للرئيسية</Link><div className="empty-state">تعذر الاتصال بكتالوج الصيدلية حالياً.</div></main>;
  }
  if (!product) notFound();

  return (
    <main className="container section">
      <Link className="button" href="/">العودة للرئيسية</Link>
      <article className="product-detail">
        <div>
          {product.images.map((image) => <img key={image.id} src={image.url} alt={image.altAr || product.nameAr} className="product-image" />)}
          {!product.images.length && <div className="product-placeholder">✚</div>}
        </div>
        <div>
          <p className="eyebrow">{product.category.nameAr}</p>
          <h1 style={{fontSize:"2.1rem"}}>{product.nameAr}</h1>
          <p className="lead">{product.nameEn}</p>
          {product.brand && <p>العلامة التجارية: {product.brand.name}</p>}
          {product.manufacturer && <p>الشركة المصنعة: {product.manufacturer}</p>}
          <p>{product.descriptionAr || "لا يوجد وصف معتمد منشور لهذا المنتج."}</p>
          <p>{product.inventory && product.inventory.quantity > 0 ? "متوفر بالمخزون" : "غير متوفر حالياً"}</p>
          <p>السعر: {product.priceMinor.toLocaleString("ar")} {product.currency}</p>
          <AddToCartButton productId={product.id} disabled={!product.inventory || product.inventory.quantity < 1} />
          {product.prescriptionRequired && <div className="notice">هذا المنتج يتطلب مراجعة وصفة طبية والتحقق منها قبل إتمام البيع.</div>}
          {product.usageInformation && <section><h2>معلومات الاستخدام</h2><p>{product.usageInformation}</p></section>}
          {product.storageInstructions && <section><h2>تعليمات التخزين</h2><p>{product.storageInstructions}</p></section>}
          <p className="muted">المعلومات الطبية لا تُعرض إلا بعد مراجعتها واعتمادها من الجهة المختصة.</p>
        </div>
      </article>
    </main>
  );
}
