import { getAssistantReadiness } from "@/lib/assistant-config";

export const metadata = {
  title: "مساعد AL-RABUOI | الربوعي فارماسي",
  description: "المساعد الذكي الرسمي لمنصة الربوعي فارماسي.",
};

export default function AssistantPage() {
  const readiness = getAssistantReadiness();

  return (
    <>
      <header className="topbar">
        <div className="container nav">
          <a className="brand" href="/" aria-label="الربوعي فارماسي — الرئيسية">
            <span className="brand-mark">✚</span>
            <span>الربوعي <span className="gradient-text">فارماسي</span></span>
          </a>
          <nav className="nav-links" aria-label="التنقل الرئيسي">
            <a href="/">الرئيسية</a>
            <a href="/#products">المنتجات</a>
            <a href="/account">حسابي</a>
          </nav>
        </div>
      </header>

      <main className="container section">
        <section className="hero">
          <div>
            <span className="eyebrow">المساعد الذكي الرسمي للصيدلية</span>
            <h1><span className="gradient-text">AL-RABUOI</span></h1>
            <p className="lead">
              مساعد الربوعي فارماسي لخدمة العملاء، والبحث في المنتجات المنشورة،
              ومتابعة الطلبات، وتحويل الأسئلة الطبية إلى الصيدلي المختص عند الحاجة.
            </p>
            <div className="empty-state" role="status">
              <strong>{readiness.ready ? "بيانات الاتصال الأساسية متوفرة" : "المساعد قيد التجهيز"}</strong>
              <p>
                {readiness.ready
                  ? "تم إعداد اسم المزود ومفتاح الاتصال، لكن موصل المزود واختباراته لم يكتملَا بعد."
                  : "واجهة المساعد جاهزة. يلزم إضافة بيانات مزود الذكاء الاصطناعي في إعدادات الاستضافة قبل تفعيل المحادثة."}
              </p>
              {!readiness.ready && (
                <p>الإعدادات المطلوبة: {readiness.missing.join("، ")}</p>
              )}
            </div>
          </div>
          <div className="hero-panel" aria-label="هوية مساعد AL-RABUOI">
            <div className="cross">✦</div>
            <p className="panel-caption">AL-RABUOI<br /><span style={{color:"var(--muted)"}}>مساعدك الرقمي من الربوعي فارماسي</span></p>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div><h2>مساحة المحادثة</h2><p>سيتم تفعيل الإرسال بعد ربط مزود الذكاء الاصطناعي واختباره</p></div>
          </div>
          <div className="empty-state">
            <p><strong>مرحباً، أنا AL-RABUOI.</strong></p>
            <p>هذه مساحة المحادثة المخصصة للمساعد. لا أقدم حالياً إجابات مولّدة ولا أدّعي تنفيذ استعلامات قبل تفعيل الاتصال.</p>
            <label htmlFor="assistant-message">اكتب سؤالك</label>
            <textarea
              id="assistant-message"
              rows={4}
              disabled
              placeholder="ستتمكن من كتابة رسالتك هنا بعد إكمال الربط..."
              style={{width:"100%",marginTop:12,opacity:0.7}}
            />
            <button className="button button-primary" type="button" disabled aria-disabled="true" style={{marginTop:12}}>
              المحادثة غير مفعّلة بعد
            </button>
          </div>
        </section>

        <section className="section">
          <div className="section-head"><div><h2>الوظائف المجهزة للمساعد</h2><p>تُفعّل تدريجياً بعد توفير البيانات والموافقات المطلوبة</p></div></div>
          <div className="categories">
            <div className="category"><strong>البحث عن المنتجات</strong><p>قراءة المنتجات المنشورة وأسعارها ومخزونها الفعلي فقط.</p></div>
            <div className="category"><strong>مساعدة الطلبات</strong><p>عرض حالة طلب العميل بعد التحقق من هويته وصلاحياته.</p></div>
            <div className="category"><strong>التصعيد للصيدلي</strong><p>تحويل الأسئلة الطبية والتداخلات والجرعات إلى صيدلي مؤهل، دون تشخيص آلي مستقل.</p></div>
            <div className="category"><strong>العربية والإنجليزية</strong><p>واجهة محادثة ثنائية اللغة مع حفظ خصوصية العميل.</p></div>
          </div>
        </section>

        <section className="section" id="assistant-setup">
          <div className="empty-state">
            <h2>ما الذي نحتاجه منك لاحقاً؟</h2>
            <p>اختيار مزود الذكاء الاصطناعي، ثم توفير مفتاح API ورابط الخدمة إن كان مطلوباً. تُحفظ المفاتيح في أسرار الاستضافة أو GitHub Secrets، ولا توضع داخل ملفات المشروع أو المحادثات.</p>
            <a className="button" href="#assistant-setup">متطلبات إعداد المساعد</a>
          </div>
        </section>
      </main>
    </>
  );
}
