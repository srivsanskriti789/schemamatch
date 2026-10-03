import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SchemeMatch · Discover, Verify, Prepare & Apply for Government Schemes",
  description:
    "Find benefits you qualify for, understand rules in plain language, and get your application documents ready without guesswork. Independent assistance for 1,000+ central & state schemes.",
  keywords: [
    "SchemeMatch",
    "government schemes",
    "scholarships",
    "PM Vishwakarma",
    "Ayushman Bharat",
    "eligibility check",
    "document checklist",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans antialiased text-[#0B1B33] bg-[#FBF7EE]">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
