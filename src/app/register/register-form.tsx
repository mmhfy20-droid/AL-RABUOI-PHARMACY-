"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.get("fullName"),
          phone: form.get("phone"),
          email: form.get("email"),
          password: form.get("password"),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "تعذر إنشاء الحساب.");
      router.push("/account");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع.");
    } finally {
      setBusy(false);
    }
  }

  return <form className="auth-form" onSubmit={submit}>
    <label>الاسم الكامل<input name="fullName" required minLength={2} maxLength={100} autoComplete="name" /></label>
    <label>رقم الهاتف<input name="phone" autoComplete="tel" maxLength={20} /></label>
    <label>البريد الإلكتروني<input name="email" type="email" autoComplete="email" maxLength={254} /></label>
    <label>كلمة المرور (12 حرفاً على الأقل)<input name="password" type="password" required minLength={12} maxLength={128} autoComplete="new-password" /></label>
    {error && <p role="alert" className="form-error">{error}</p>}
    <button className="button button-primary" type="submit" disabled={busy}>{busy ? "جارٍ إنشاء الحساب..." : "إنشاء حساب"}</button>
  </form>;
}
