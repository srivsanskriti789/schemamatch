"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { SCHEMES } from "@/lib/data";
import {
  Wrench,
  HeartPulse,
  GraduationCap,
  CircleDollarSign,
  ArrowRight,
  RotateCw,
  ExternalLink,
} from "lucide-react";

export function FeaturedSection() {
  const { t, locale } = useLanguage();
  const featuredSchemes = SCHEMES.filter((s) => s.isFeatured).slice(0, 3);

  const iconMap: Record<string, React.ElementType> = {
    "pm-vishwakarma": Wrench,
    "ayushman-bharat-pmjay": HeartPulse,
    "national-scholarship-portal": GraduationCap,
  };

  const iconBgMap: Record<string, string> = {
    "pm-vishwakarma": "bg-[#FFF2EB] text-[#F26B2A]",
    "ayushman-bharat-pmjay": "bg-[#E6F7F0] text-[#1E9E6A]",
    "national-scholarship-portal": "bg-[#EEF2F6] text-[#4F46E5]",
  };

  const badgeMap: Record<string, { label: string; class: string }> = {
    popular: { label: "Popular", class: "bg-[#FFF5EB] text-[#C2410C]" },
    high_impact: { label: "High impact", class: "bg-[#EFF6FF] text-[#1D4ED8]" },
    new: { label: "New", class: "bg-[#ECFDF5] text-[#047857]" },
  };

  const categoryLabelMap: Record<string, string> = {
    "jobs-livelihoods": "ARTISANS & LIVELIHOODS",
    "health-wellbeing": "HEALTH & FAMILY",
    "education-scholarships": "EDUCATION",
  };

  return (
    <section className="py-24 bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D9488]">
              <span className="w-2 h-2 rounded-full bg-[#F26B2A]"></span>
              <span>{t("feat.eyebrow")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B33] tracking-tight">
              {t("feat.title")}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {t("feat.sub")}
            </p>
          </div>

          <Link
            href="/schemes"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-slate-200 hover:border-slate-300 text-sm font-semibold text-[#0B1B33] hover:bg-slate-50 transition-all self-start md:self-auto shrink-0 shadow-sm"
          >
            <ArrowRight className="w-4 h-4" />
            <span>{t("feat.viewAll")}</span>
          </Link>
        </div>

        {/* 3 Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featuredSchemes.map((scheme) => {
            const Icon = iconMap[scheme.slug] || Wrench;
            const iconBg = iconBgMap[scheme.slug] || "bg-slate-100 text-slate-700";
            const badge = scheme.badge && badgeMap[scheme.badge];
            const catLabel = categoryLabelMap[scheme.categorySlug] || scheme.categorySlug.toUpperCase();
            const name = locale === "hi" ? scheme.nameHi : scheme.nameEn;
            const summary = locale === "hi" ? scheme.summaryHi : scheme.summaryEn;
            const benefits = locale === "hi" ? scheme.benefitsHi : scheme.benefitsEn;

            return (
              <div
                key={scheme.id}
                className="bg-white rounded-3xl p-7 shadow-sm border border-slate-200/80 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {badge && (
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${badge.class}`}>
                        {badge.label}
                      </span>
                    )}
                  </div>

                  {/* Category label */}
                  <div className="text-[11px] font-bold text-[#0D9488] tracking-wider mb-1.5 uppercase">
                    {catLabel}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#0B1B33] mb-3">
                    {name}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {summary}
                  </p>

                  {/* Benefit Highlight Box */}
                  <div className="bg-[#FAF7EE] border border-[#EFE8D8] rounded-2xl p-3.5 flex items-center gap-3 mb-6">
                    <div className="w-7 h-7 rounded-xl bg-white flex items-center justify-center text-[#D97706] shrink-0 shadow-xs">
                      <CircleDollarSign className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-medium text-slate-700 leading-tight">
                      {benefits}
                    </span>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-semibold">
                  <span className="text-slate-500 flex items-center gap-1.5 font-normal">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E9E6A]"></span>
                    {t("feat.sourceLinked")}
                  </span>
                  <Link
                    href={`/schemes/${scheme.slug}`}
                    className="text-[#0B1B33] hover:text-[#F26B2A] transition-colors inline-flex items-center gap-1"
                  >
                    <span>{t("feat.viewDetails")}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Regular Update Note */}
        <div className="bg-[#EEF3F8] border border-[#DCE4EE] rounded-2xl p-4 flex items-center gap-3 text-xs sm:text-sm text-slate-700">
          <RotateCw className="w-4 h-4 text-slate-500 shrink-0" />
          <p className="leading-relaxed">
            {t("feat.note")}
          </p>
        </div>
      </div>
    </section>
  );
}
