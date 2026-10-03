"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { Globe, Menu, X, Sparkles } from "lucide-react";

export function Navbar() {
  const { t, locale, toggleLocale } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0B1B33] border-b border-[#1E2E48]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-[#F26B2A] flex items-center justify-center shadow-lg shadow-[#F26B2A]/20 transition-transform group-hover:scale-105">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-white"
              >
                <path d="M8 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4c0 .88-.36 1.68-.94 2.26" />
                <path d="M16 12c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4c0-.88.36-1.68.94-2.26" />
                <path d="m9 15 6-6" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white font-sans">
              SchemeMatch
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-[15px] font-medium text-slate-300">
            <Link
              href="#how-it-works"
              className="hover:text-white transition-colors py-1"
            >
              {t("nav.howItWorks")}
            </Link>
            <Link
              href="/schemes"
              className="hover:text-white transition-colors py-1"
            >
              {t("nav.explore")}
            </Link>
            <Link
              href="#documents"
              className="hover:text-white transition-colors py-1"
            >
              {t("nav.prepare")}
            </Link>
            <Link
              href="/about"
              className="hover:text-white transition-colors py-1"
            >
              {t("nav.about")}
            </Link>
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-5">
            {/* Language Switcher */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700/60 hover:border-slate-500 transition-all bg-[#12233E]/50"
              title="Toggle language"
            >
              <Globe className="w-4 h-4 text-[#F26B2A]" />
              <span>{t("lang.toggle")}</span>
            </button>

            {/* Check Eligibility Button */}
            <Link
              href="/check"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white bg-[#F26B2A] hover:bg-[#E05A19] transition-all shadow-md shadow-[#F26B2A]/25 hover:shadow-lg hover:shadow-[#F26B2A]/35 transform active:scale-95 text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t("nav.checkEligibility")}</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleLocale}
              className="text-xs text-slate-300 px-2 py-1 rounded border border-slate-700 bg-[#12233E]"
            >
              {locale === "en" ? "हिन्दी" : "EN"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A1628] border-b border-slate-800 px-4 pt-3 pb-6 space-y-4">
          <Link
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 text-base py-2 hover:text-[#F26B2A]"
          >
            {t("nav.howItWorks")}
          </Link>
          <Link
            href="/schemes"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 text-base py-2 hover:text-[#F26B2A]"
          >
            {t("nav.explore")}
          </Link>
          <Link
            href="#documents"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 text-base py-2 hover:text-[#F26B2A]"
          >
            {t("nav.prepare")}
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 text-base py-2 hover:text-[#F26B2A]"
          >
            {t("nav.about")}
          </Link>
          <div className="pt-2">
            <Link
              href="/check"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-white bg-[#F26B2A] text-center"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t("nav.checkEligibility")}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
