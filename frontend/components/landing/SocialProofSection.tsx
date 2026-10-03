"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { TESTIMONIALS } from "@/lib/data";
import { Quote } from "lucide-react";

export function SocialProofSection() {
  const { t } = useLanguage();

  const stats = [
    {
      num: "92%",
      label: t("proof.s1"),
      sub: t("proof.s1Sub"),
    },
    {
      num: "4.7 / 5",
      label: t("proof.s2"),
      sub: t("proof.s2Sub"),
    },
    {
      num: "8",
      label: t("proof.s3"),
      sub: t("proof.s3Sub"),
    },
    {
      num: "0",
      label: t("proof.s4"),
      sub: t("proof.s4Sub"),
    },
  ];

  return (
    <section className="py-24 bg-[#0B1B33] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D9488]">
              <span className="w-2 h-2 rounded-full bg-[#F26B2A]"></span>
              <span>{t("proof.eyebrow")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {t("proof.title")}
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {t("proof.sub")}
            </p>
          </div>

          <div className="self-start md:self-auto shrink-0">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFF2EB] text-[#C2410C] text-xs font-bold uppercase tracking-wider">
              {t("proof.badge")}
            </span>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((st, idx) => (
            <div
              key={idx}
              className="bg-[#15263F] border border-slate-700/60 rounded-3xl p-6 hover:border-slate-500 transition-colors"
            >
              <div className="text-4xl font-extrabold text-white mb-2 font-sans">
                {st.num}
              </div>
              <div className="text-sm font-semibold text-slate-200 mb-1">
                {st.label}
              </div>
              <div className="text-xs text-slate-400">
                {st.sub}
              </div>
            </div>
          ))}
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-3xl p-7 text-slate-900 shadow-md border border-slate-100 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-[#F26B2A] mb-4" />
                <p className="text-base text-slate-700 leading-relaxed font-normal mb-8">
                  &ldquo;{test.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#FFF2EB] text-[#F26B2A] flex items-center justify-center font-bold text-xs">
                  {test.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0B1B33]">
                    {test.author}
                  </div>
                  <div className="text-xs text-slate-500">
                    {test.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
