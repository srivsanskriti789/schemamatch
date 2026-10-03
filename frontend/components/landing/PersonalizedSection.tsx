"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export function PersonalizedSection() {
  const { t } = useLanguage();
  const router = useRouter();
  const [selectedIncome, setSelectedIncome] = useState("2_5_to_5");

  const incomeOptions = [
    { id: "below_2_5", label: "Below ₹2.5 lakh" },
    { id: "2_5_to_5", label: "₹2.5–5 lakh" },
    { id: "5_to_8", label: "₹5–8 lakh" },
    { id: "above_8", label: "Above ₹8 lakh" },
  ];

  const handleContinue = () => {
    router.push(`/check?step=4&income=${selectedIncome}`);
  };

  return (
    <section className="py-24 bg-[#0B1B33] text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D9488]">
              <span className="w-2 h-2 rounded-full bg-[#F26B2A]"></span>
              <span>{t("person.eyebrow")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t("person.title")}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              {t("person.sub")}
            </p>

            {/* Bullets */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#1E9E6A] shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-200">
                  {t("person.b1")}
                </span>
              </div>
              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#1E9E6A] shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-200">
                  {t("person.b2")}
                </span>
              </div>
              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#1E9E6A] shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-200">
                  {t("person.b3")}
                </span>
              </div>
              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#1E9E6A] shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-200">
                  {t("person.b4")}
                </span>
              </div>
            </div>

            {/* Action & timing */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/check"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold text-white bg-[#F26B2A] hover:bg-[#E05A19] shadow-lg shadow-[#F26B2A]/25 transition-all text-base transform active:scale-95"
              >
                <Sparkles className="w-5 h-5" />
                <span>{t("person.btn")}</span>
              </Link>
              <span className="text-sm text-slate-400 font-medium">
                {t("person.time")}
              </span>
            </div>
          </div>

          {/* Right Column: Wizard Card Preview */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-2xl text-slate-900 border border-slate-100 max-w-lg mx-auto lg:ml-auto">
              {/* Wizard Top */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#0D9488] tracking-wider uppercase">
                  QUESTION 4 OF 7
                </span>
                <span className="w-10 h-10 rounded-full bg-[#E6F7F0] text-[#1E9E6A] font-bold text-xs flex items-center justify-center">
                  57%
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#0B1B33] mb-4">
                Tell us about your household
              </h3>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-6">
                <div className="h-full bg-[#F26B2A] rounded-full w-[57%]"></div>
              </div>

              {/* Question label */}
              <p className="text-sm font-medium text-slate-700 mb-4">
                What is your household&apos;s approximate annual income?
              </p>

              {/* Options */}
              <div className="space-y-2.5 mb-6">
                {incomeOptions.map((opt) => {
                  const isSelected = selectedIncome === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedIncome(opt.id)}
                      className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl text-left text-sm font-medium transition-all ${
                        isSelected
                          ? "bg-[#FFF5F0] border-2 border-[#F26B2A] text-[#0B1B33]"
                          : "bg-[#F8FAFC] border border-slate-200/80 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                          isSelected
                            ? "border-[#F26B2A] bg-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#F26B2A]"></div>
                        )}
                      </div>
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Row */}
              <div className="flex items-center justify-between pt-2">
                <Link
                  href="/check?step=4&income=unspecified"
                  className="text-xs sm:text-sm text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Prefer not to say
                </Link>

                <button
                  type="button"
                  onClick={handleContinue}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white bg-[#F26B2A] hover:bg-[#E05A19] transition-all text-sm shadow-md shadow-[#F26B2A]/25"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
