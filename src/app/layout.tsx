import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Coipo Racing — Suplementos Deportivos",
  description:
    "Suplementación deportiva, hidratación y energía para mejorar tu rendimiento. Proteínas, creatinas, barras y más. Coipo Racing — Suplementos Deportivos Chile.",
  keywords: "suplementos deportivos, proteínas, creatina, Chile, Coipo Racing",
  openGraph: {
    title: "Coipo Racing — Suplementos Deportivos",
    description: "Tu tienda de suplementos deportivos de confianza en Chile.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen bg-zinc-950 text-white antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
