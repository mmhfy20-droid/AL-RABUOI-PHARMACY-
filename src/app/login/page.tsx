import Link from "next/link";
import LoginForm from "./login-form";

export default function LoginPage() {
  return <main className="container section auth-shell">
    <Link className="button" href="/">العودة للرئيسية</Link>
    <h1 style={{fontSize:"2rem"}}>تسجيل الدخول</h1>
    <p className="lead">ادخل إلى حسابك لمتابعة طلباتك وإدارة بياناتك.</p>
    <LoginForm />
    <p className="muted">ليس لديك حساب؟ <Link href="/register">إنشاء حساب جديد</Link></p>
  </main>;
}
