import React from "react";
import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/providers/Providers";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const serif = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif' 
});
const sans = Montserrat({
  subsets: ["latin"],
  variable: '--font-display'
});

export const metadata: Metadata = {
  title: "Indo-Aura | Premium Dry Fruits & Astrology Stones",
  description: "Experience the essence of wellness with our premium selection of organic dry fruits and certified astrology gemstones.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable} ${sans.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#fcfaf7] text-gray-900 font-sans selection:bg-amber-100 selection:text-amber-900">
        <Providers>
          <Header />
            <main className="flex-1">
              {children}
            </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
