import Link from "next/link";
import RegisterForm from "./register-form";

export default function RegisterPage() {
  return <main className="container section auth-shell">
    <Link className="button" href="/">العودة للرئيسية</Link>
    <h1 style={{fontSize:"2rem"}}>إنشاء حساب جديد</h1>
    <p className="lead">أنشئ حسابك لمتابعة الطلبات وحفظ عناوين التوصيل.</p>
    <RegisterForm />
    <p className="muted">لديك حساب بالفعل؟ <Link href="/login">تسجيل الدخول</Link></p>
  </main>;
}
