"use client";

import { useState } from "react";

type ImportResult = {
  success?: boolean;
  importedCount?: number;
  note?: string;
  error?: string;
  errors?: string[];
  totalErrors?: number;
};

export default function MedicineImportForm() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) return;
    setBusy(true);
    setResult(null);
    try {
      const body = new FormData();
      body.set("file", file);
      const response = await fetch("/api/admin/catalog/import", { method: "POST", body });
      const payload = (await response.json()) as ImportResult;
      setResult(payload);
      if (response.ok) setFile(null);
    } catch {
      setResult({ error: "تعذر الاتصال بالخادم. حاول مرة أخرى." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-form">
      <form onSubmit={submit} className="import-form">
        <label htmlFor="medicine-file">اختر ملف الأدوية والمخزون (Excel أو CSV)</label>
        <input
          id="medicine-file"
          type="file"
          accept=".xlsx,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
          onChange={(event) => {
            setFile(event.target.files?.[0] ?? null);
            setResult(null);
          }}
        />
        <p className="muted">الحد الأقصى 5 ميجابايت. تُقبل ملفات XLSX وCSV. يجب أن تتضمن الأعمدة الأساسية كما في القالب.</p>
        <button className="button button-primary" type="submit" disabled={!file || busy}>
          {busy ? "جارٍ فحص الملف واستيراده..." : "فحص الملف وإضافة المنتجات"}
        </button>
      </form>
      {result?.success && (
        <div className="empty-state" role="status">
          <strong>تم استيراد {result.importedCount} صنفاً كمسودات غير منشورة.</strong>
          <p>{result.note}</p>
        </div>
      )}
      {result?.error && (
        <div className="notice" role="alert">
          <strong>{result.error}</strong>
          {result.errors?.length ? (
            <ul>{result.errors.map((error) => <li key={error}>{error}</li>)}</ul>
          ) : null}
          {result.totalErrors && result.totalErrors > (result.errors?.length ?? 0)
            ? <p>عدد الأخطاء الإجمالي: {result.totalErrors}</p>
            : null}
        </div>
      )}
    </div>
  );
}
