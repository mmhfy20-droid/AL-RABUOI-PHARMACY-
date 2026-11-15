import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

async function loadStorefrontData() {
  if (!process.env.DATABASE_URL) return { categories: [], products: [], databaseConfigured: false };
  try {
    const [categories, products] = await Promise.all([
      prisma.category.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        take: 8,
      }),
      prisma.product.findMany({
        where: { isPublished: true },
        include: { images: { orderBy: { sortOrder: "asc" }, take: 1 }, inventory: true },
        orderBy: { createdAt: "desc" },
        take: 8,
      }),
    ]);
    return { categories, products, databaseConfigured: true };
  } catch {
    return { categories: [], products: [], databaseConfigured: true };
  }
}

export default async function HomePage() {
  const { categories, products, databaseConfigured } = await loadStorefrontData();

  return (
    <>
      <header className="topbar">
        <div className="container nav">
          <a className="brand" href="/" aria-label="الربوعي فارماسي — الرئيسية">
            <span className="brand-mark">✚</span>
            <span>الربوعي <span className="gradient-text">فارماسي</span></span>
          </a>
          <nav className="nav-links" aria-label="التنقل الرئيسي">
            <a href="#categories">الأقسام</a>
            <a href="#products">المنتجات</a>
            <a href="#about">عن الصيدلية</a>
            <a href="#contact">تواصل معنا</a>
          </nav>
          <div className="nav-actions">
            <a className="button" href="#contact">خدمة العملاء</a>
            <a className="button button-primary" href="#products">تصفح المنتجات</a>
          </div>
        </div>
      </header>

      <main>
        <section className="container hero">
          <div>
            <span className="eyebrow">✦ رعايتك الصحية أقرب إليك</span>
            <h1>الصحة تبدأ من<br /><span className="gradient-text">اختيارك الصحيح</span></h1>
            <p className="lead">
              مرحباً بك في الربوعي فارماسي. تجربة صيدلية رقمية تجمع سهولة الوصول
              إلى المنتجات الصحية مع خدمة موثوقة واهتمام حقيقي بك.
            </p>
            <form action="/search" method="get" className="search-form">
              <input name="q" placeholder="ابحث عن دواء أو منتج صحي..." aria-label="ابحث عن منتج" maxLength={100} />
              <button className="button button-primary" type="submit">بحث</button>
            </form>
            <div className="nav-actions">
              <a className="button button-primary" href="#categories">اكتشف الأقسام</a>
              <a className="button" href="#contact">تواصل مع الصيدلية</a>
            </div>
          </div>
          <div className="hero-panel" aria-label="هوية الربوعي فارماسي">
            <div className="cross">✚</div>
            <p className="panel-caption">الربوعي فارماسي<br /><span style={{color:"var(--muted)"}}>عناية موثوقة، وتجربة رقمية حديثة</span></p>
          </div>
        </section>

        <section className="container section" id="categories">
          <div className="section-head"><div><h2>تسوق حسب القسم</h2><p>الأقسام المنشورة من إدارة الصيدلية</p></div></div>
          {categories.length ? (
            <div className="categories">
              {categories.map((category) => (
                <a className="category" href={`/categories/${category.slug}`} key={category.id}>
                  <span aria-hidden="true">✚</span>{category.nameAr}
                </a>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              {databaseConfigured
                ? "لا توجد أقسام منشورة حالياً. يمكن للإدارة إضافتها من لوحة التحكم بعد تجهيزها."
                : "قاعدة البيانات غير مربوطة بعد؛ ستظهر الأقسام هنا عند إعداد الاتصال ونشر بياناتها."}
            </div>
          )}
        </section>

        <section className="container section" id="products">
          <div className="section-head"><div><h2>أحدث المنتجات</h2><p>منتجات منشورة ومراجعة من إدارة الصيدلية</p></div></div>
          {products.length ? (
            <div className="categories">
              {products.map((product) => (
                <a className="category" href={`/products/${product.id}`} key={product.id}>
                  {product.images[0]?.url ? <img src={product.images[0].url} alt={product.images[0].altAr || product.nameAr} style={{width:"100%",height:150,objectFit:"contain",borderRadius:12}} /> : <span aria-hidden="true">✚</span>}
                  <strong>{product.nameAr}</strong>
                  <p>{product.inventory?.quantity && product.inventory.quantity > 0 ? "متوفر" : "غير متوفر حالياً"}</p>
                </a>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              لا توجد منتجات منشورة بعد. لا نعرض أدوية أو أسعاراً تجريبية على أنها منتجات حقيقية.
            </div>
          )}
        </section>

        <section className="container section" id="about">
          <div className="section-head"><div><h2>عن الربوعي فارماسي</h2><p>منصة صيدلية رقمية عربية أولاً</p></div></div>
          <div className="empty-state">تُضاف معلومات الموقع وساعات العمل ومناطق التوصيل بعد اعتمادها من إدارة الصيدلية.</div>
        </section>

        <section className="container section" id="contact">
          <div className="section-head"><div><h2>تواصل معنا</h2><p>للاستفسارات، تواصل مع فريق الصيدلية</p></div></div>
          <div className="empty-state">
            <strong style={{color:"var(--text)"}}>Dr. Saleem Al-Rubou'i</strong>
            <br />رقم التواصل المقدم من إدارة المشروع: 776661463
            <br />سيتم تفعيل رابط واتساب بعد تأكيد رمز الدولة وصيغة الرقم.
          </div>
        </section>
      </main>

      <footer className="footer"><div className="container">© {new Date().getFullYear()} الربوعي فارماسي — Al-Rubou'i Pharmacy</div></footer>
    </>
  );
}
