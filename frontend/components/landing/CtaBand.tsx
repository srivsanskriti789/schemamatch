"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { Sparkles, ArrowRight } from "lucide-react";

export function CtaBand() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#F26B2A] py-20 text-[#0B1B33] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-4 text-[#0B1B33]">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B1B33]">
              <span className="w-2 h-2 rounded-full bg-[#0B1B33]"></span>
              <span>{t("cta.eyebrow")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B33] tracking-tight leading-tight">
              {t("cta.title")}
            </h2>

            <p className="text-base sm:text-lg text-[#0B1B33]/85 max-w-xl font-normal leading-relaxed">
              {t("cta.sub")}
            </p>
          </div>

          {/* Right Floating White Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 sm:p-9 shadow-2xl max-w-md mx-auto lg:ml-auto space-y-6 border border-white/60">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F7F0] flex items-center justify-center text-[#0D9488]">
                <Sparkles className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#0B1B33] mb-1">
                  {t("cta.cardTitle")}
                </h3>
              </div>

              <div>
                <Link
                  href="/check"
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold text-white bg-[#0B1B33] hover:bg-[#12233E] shadow-md transition-all text-base transform active:scale-95 text-center"
                >
                  <ArrowRight className="w-5 h-5 text-[#F26B2A]" />
                  <span>{t("cta.btn")}</span>
                </Link>
                <p className="text-xs text-slate-500 mt-3 text-center">
                  {t("cta.cardNote")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
