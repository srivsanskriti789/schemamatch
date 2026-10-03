"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { Database, Languages, ShieldCheck, ExternalLink, Info } from "lucide-react";

export function TrustStrip() {
  const { t } = useLanguage();

  return (
    <section className="bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Pillar 1 */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F7F2] flex items-center justify-center text-[#0D9488] shrink-0">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-bold text-[#0B1B33]">
                {t("trust.count")}
              </div>
              <div className="text-sm text-slate-500 leading-snug">
                {t("trust.countSub")}
              </div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F7F2] flex items-center justify-center text-[#0D9488] shrink-0">
              <Languages className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-bold text-[#0B1B33]">
                {t("trust.plain")}
              </div>
              <div className="text-sm text-slate-500 leading-snug">
                {t("trust.plainSub")}
              </div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F7F2] flex items-center justify-center text-[#0D9488] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-bold text-[#0B1B33]">
                {t("trust.privacy")}
              </div>
              <div className="text-sm text-slate-500 leading-snug">
                {t("trust.privacySub")}
              </div>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F7F2] flex items-center justify-center text-[#0D9488] shrink-0">
              <ExternalLink className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-bold text-[#0B1B33]">
                {t("trust.source")}
              </div>
              <div className="text-sm text-slate-500 leading-snug">
                {t("trust.sourceSub")}
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-start sm:items-center gap-3 text-xs sm:text-sm text-slate-600 bg-[#FBF7EE] p-3.5 rounded-2xl border border-[#EFE8D8]">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-relaxed font-normal">
            {t("trust.disclaimer")}
          </p>
        </div>
      </div>
    </section>
  );
}
