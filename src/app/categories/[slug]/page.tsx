import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!process.env.DATABASE_URL) {
    return <main className="container section"><Link className="button" href="/">العودة للرئيسية</Link><div className="empty-state">الأقسام غير متاحة حتى إعداد قاعدة البيانات.</div></main>;
  }

  try {
    const category = await prisma.category.findFirst({
      where: { slug, isActive: true },
      include: { products: { where: { isPublished: true }, orderBy: { createdAt: "desc" }, take: 60 } },
    });
    if (!category) notFound();
    return (
      <main className="container section">
        <Link className="button" href="/">العودة للرئيسية</Link>
        <h1 style={{fontSize:"2rem"}}>{category.nameAr}</h1>
        <p className="lead">{category.descriptionAr}</p>
        {category.products.length ? <div className="categories">{category.products.map((product) => (
          <Link className="category" href={`/products/${product.id}`} key={product.id}>
            <strong>{product.nameAr}</strong><p>{product.nameEn}</p>
          </Link>
        ))}</div> : <div className="empty-state">لا توجد منتجات منشورة في هذا القسم حالياً.</div>}
      </main>
    );
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) throw error;
    return <main className="container section"><Link className="button" href="/">العودة للرئيسية</Link><div className="empty-state">تعذر تحميل القسم حالياً.</div></main>;
  }
}
