import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const interTight = Inter({
  variable: "--font-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pratigrham Sports For All",
  description: "Redefining sports and fitness culture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} antialiased bg-[#f4f4f4]`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
