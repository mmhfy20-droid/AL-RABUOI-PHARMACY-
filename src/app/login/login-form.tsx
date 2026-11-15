"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: form.get("identifier"), password: form.get("password") }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "تعذر تسجيل الدخول.");
      router.push("/account");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع.");
    } finally {
      setBusy(false);
    }
  }

  return <form className="auth-form" onSubmit={submit}>
    <label>البريد الإلكتروني أو رقم الهاتف<input name="identifier" required autoComplete="username" maxLength={254} /></label>
    <label>كلمة المرور<input name="password" type="password" required autoComplete="current-password" maxLength={128} /></label>
    {error && <p role="alert" className="form-error">{error}</p>}
    <button className="button button-primary" type="submit" disabled={busy}>{busy ? "جارٍ الدخول..." : "تسجيل الدخول"}</button>
  </form>;
}
