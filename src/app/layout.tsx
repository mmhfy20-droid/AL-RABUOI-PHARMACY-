import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "الربوعي فارماسي | Al-Rubou'i Pharmacy",
  description: "صيدلية الربوعي — تجربة صيدلية رقمية باللغة العربية والإنجليزية.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}