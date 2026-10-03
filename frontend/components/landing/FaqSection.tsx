"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { FAQS } from "@/lib/data";
import { HelpCircle, Plus, Minus, ArrowRight } from "lucide-react";

export function FaqSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default per design

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D9488]">
              <span className="w-2 h-2 rounded-full bg-[#F26B2A]"></span>
              <span>{t("faq.eyebrow")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B33] tracking-tight">
              {t("faq.title")}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {t("faq.sub")}
            </p>

            {/* Still unsure card */}
            <div className="bg-[#DEF0E8] border border-[#CCE6DC] rounded-3xl p-7 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#0D9488] shadow-xs">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1B33]">
                {t("faq.cardTitle")}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                {t("faq.cardDesc")}
              </p>
              <div className="pt-2">
                <Link
                  href="/help"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0D9488] hover:text-[#0B7A6E]"
                >
                  <span>{t("faq.cardLink")}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 divide-y divide-slate-200">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={faq.id} className="py-5">
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between text-left group focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-[#0B1B33] group-hover:text-[#F26B2A] transition-colors pr-4">
                      {faq.question}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#FFF2EB] group-hover:text-[#F26B2A] transition-colors shrink-0">
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="pt-3 pb-2 text-sm sm:text-base text-slate-600 leading-relaxed font-normal animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
