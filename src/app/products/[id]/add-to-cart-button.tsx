"use client";

import { useState } from "react";
import Link from "next/link";

export default function AddToCartButton({ productId, disabled }: { productId: string; disabled: boolean }) {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function add() {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      const data = await response.json();
      if (response.status === 401) {
        setMessage("سجّل الدخول أولاً لإضافة المنتج إلى السلة.");
      } else if (!response.ok) {
        setMessage(data.error || "تعذرت إضافة المنتج.");
      } else {
        setMessage("أُضيف المنتج إلى سلتك.");
      }
    } catch {
      setMessage("تعذر الاتصال بالخادم. حاول مرة أخرى.");
    } finally {
      setBusy(false);
    }
  }

  return <div className="cart-action">
    <button className="button button-primary" type="button" onClick={add} disabled={disabled || busy}>
      {busy ? "جارٍ الإضافة..." : "أضف إلى السلة"}
    </button>
    {message && <p role="status" className="muted">{message} {message.startsWith("سجّل") && <Link href="/login">تسجيل الدخول</Link>}</p>}
    <Link className="button" href="/cart">عرض السلة</Link>
  </div>;
}
