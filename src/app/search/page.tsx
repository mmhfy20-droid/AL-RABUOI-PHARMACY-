import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const query = q.trim().slice(0, 100);
  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = [];
  let unavailable = !process.env.DATABASE_URL;

  if (query && !unavailable) {
    try {
      products = await prisma.product.findMany({
        where: {
          isPublished: true,
          OR: [
            { nameAr: { contains: query } },
            { nameEn: { contains: query, mode: "insensitive" } },
            { sku: { equals: query, mode: "insensitive" } },
            { barcode: { equals: query } },
          ],
        },
        orderBy: { createdAt: "desc" },
        take: 50,
      });
    } catch {
      unavailable = true;
    }
  }

  return (
    <main className="container section">
      <Link className="button" href="/">العودة للرئيسية</Link>
      <h1 style={{fontSize:"2rem"}}>البحث عن المنتجات</h1>
      <form action="/search" method="get" className="search-form">
        <input name="q" defaultValue={query} placeholder="ابحث باسم المنتج أو العلامة أو الرمز..." aria-label="ابحث عن منتج" maxLength={100} />
        <button className="button button-primary" type="submit">بحث</button>
      </form>
      {!query ? <div className="empty-state">اكتب اسم المنتج أو الرمز للبحث في المنتجات المنشورة.</div>
        : unavailable ? <div className="empty-state">البحث غير متاح حالياً؛ لم يتم إعداد اتصال قاعدة البيانات أو تعذر الوصول إليها.</div>
        : products.length ? <div className="categories">{products.map((product) => (
          <Link className="category" href={`/products/${product.id}`} key={product.id}>
            <strong>{product.nameAr}</strong><p>{product.nameEn}</p>
          </Link>
        ))}</div>
        : <div className="empty-state">لا توجد نتائج مطابقة في المنتجات المنشورة.</div>}
    </main>
  );
}
