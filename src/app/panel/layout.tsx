// app/layout.tsx

import type { Metadata } from "next";
import "@/app/(public)/globals.css";

export const metadata: Metadata = {
  title: "CMS Dashboard",
  description: "A simple content management dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
