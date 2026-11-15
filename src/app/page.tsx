const categories = [
  { icon: "✚", name: "الأدوية" },
  { icon: "✧", name: "الفيتامينات والمكملات" },
  { icon: "◈", name: "العناية الشخصية" },
  { icon: "♡", name: "صحة ورفاهية" },
];

export default function HomePage() {
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
            <a className="button" href="#account">حسابي</a>
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
          <div className="section-head">
            <div><h2>تسوق حسب القسم</h2><p>اختر القسم الذي تبحث عنه</p></div>
          </div>
          <div className="categories">
            {categories.map((category) => (
              <a className="category" href="#products" key={category.name}>
                <span aria-hidden="true">{category.icon}</span>{category.name}
              </a>
            ))}
          </div>
        </section>

        <section className="container section" id="products">
          <div className="section-head">
            <div><h2>منتجات الصيدلية</h2><p>سيتم عرض المنتجات بعد ربط كتالوج قاعدة البيانات والتحقق من بياناتها</p></div>
          </div>
          <div className="empty-state">
            <strong style={{color:"var(--text)"}}>لم تتم إضافة منتجات منشورة بعد</strong>
            <br />لا نعرض أدوية أو أسعاراً تجريبية على أنها منتجات حقيقية.
            <br />سيتمكن فريق الصيدلية من إضافة المنتجات ومراجعتها من لوحة الإدارة.
          </div>
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
