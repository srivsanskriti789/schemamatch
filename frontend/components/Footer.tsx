"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { Globe, Info } from "lucide-react";

export function Footer() {
  const { t, toggleLocale } = useLanguage();

  return (
    <footer className="bg-[#0B1B33] text-white pt-20 pb-12 border-t border-[#1E2E48]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F26B2A] flex items-center justify-center shadow-lg shadow-[#F26B2A]/20">
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

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm font-normal">
              {t("footer.desc")}
            </p>

            <div>
              <button
                type="button"
                onClick={toggleLocale}
                className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white px-3.5 py-2 rounded-xl border border-slate-700 hover:border-slate-500 transition-colors bg-[#12233E]/60"
              >
                <Globe className="w-3.5 h-3.5 text-[#F26B2A]" />
                <span>English · हिंदी · More</span>
              </button>
            </div>
          </div>

          {/* Col 1: Explore */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xs font-bold text-[#E9A23B] tracking-wider uppercase">
              {t("footer.col1")}
            </div>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="/schemes" className="hover:text-white transition-colors">
                  Browse schemes
                </Link>
              </li>
              <li>
                <Link href="/check" className="hover:text-white transition-colors">
                  Check eligibility
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="hover:text-white transition-colors">
                  Popular categories
                </Link>
              </li>
              <li>
                <Link href="#documents" className="hover:text-white transition-colors">
                  Document checklists
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Learn */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-bold text-[#E9A23B] tracking-wider uppercase">
              {t("footer.col2")}
            </div>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="#how-it-works" className="hover:text-white transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-white transition-colors">
                  Our methodology
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Data & privacy
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  Help centre
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-bold text-[#E9A23B] tracking-wider uppercase">
              {t("footer.col3")}
            </div>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About SchemeMatch
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-white transition-colors">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/partner" className="hover:text-white transition-colors">
                  Partner with us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-8 pt-6 border-b border-slate-800 pb-8 flex items-start gap-3 text-xs text-slate-400 leading-relaxed font-normal">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <p>{t("footer.disclaimer")}</p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>{t("footer.copy")}</div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              {t("footer.terms")}
            </Link>
            <Link href="/cookies" className="hover:text-slate-300 transition-colors">
              {t("footer.cookies")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
