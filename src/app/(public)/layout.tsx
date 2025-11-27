import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";

const interTight = Inter({
  variable: "--font-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pratigrham Sports For All",
  description: "Redefining sports and fitness culture",
  keywords: ["sports", "fitness", "community", "Pratigrham"],
  icons: {
    icon: "/favicon.ico", // for most browsers
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/hotel-booking-1301/image/upload/f_auto,q_auto/v1/psfa-landing-page/nurdnjxqtg1ehcgne5it"
        />
      </Head>
      <body className={`${interTight.variable} antialiased bg-[#f4f4f4]`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
