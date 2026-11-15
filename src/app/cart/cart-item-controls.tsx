"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartItemControls({ itemId, quantity }: { itemId: string; quantity: number }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function update(nextQuantity: number) {
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/cart/items/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: nextQuantity }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "تعذر تحديث الكمية.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ.");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/cart/items/${itemId}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "تعذر حذف المنتج.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ.");
    } finally {
      setBusy(false);
    }
  }

  return <div className="cart-controls">
    <button className="button" type="button" disabled={busy || quantity <= 1} onClick={() => update(quantity - 1)} aria-label="تقليل الكمية">−</button>
    <span aria-live="polite">{quantity}</span>
    <button className="button" type="button" disabled={busy || quantity >= 99} onClick={() => update(quantity + 1)} aria-label="زيادة الكمية">+</button>
    <button className="button" type="button" disabled={busy} onClick={remove}>حذف</button>
    {error && <p className="form-error" role="alert">{error}</p>}
  </div>;
}
