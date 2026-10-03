"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { CATEGORIES } from "@/lib/data";
import {
  GraduationCap,
  Sprout,
  HeartPulse,
  Briefcase,
  Users,
  Home,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

export function CategoriesSection() {
  const { t, locale } = useLanguage();

  const iconMap: Record<string, React.ElementType> = {
    GraduationCap,
    Sprout,
    HeartPulse,
    Briefcase,
    Users,
    Home,
  };

  const iconBgMap: Record<string, string> = {
    GraduationCap: "bg-[#EEF2F6] text-[#4F46E5]",
    Sprout: "bg-[#E6F7F0] text-[#1E9E6A]",
    HeartPulse: "bg-[#FFF2EB] text-[#F26B2A]",
    Briefcase: "bg-[#EFF6FF] text-[#2563EB]",
    Users: "bg-[#FEF7EC] text-[#D97706]",
    Home: "bg-[#E6F7F0] text-[#0D9488]",
  };

  return (
    <section className="py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D9488]">
              <span className="w-2 h-2 rounded-full bg-[#F26B2A]"></span>
              <span>{t("cat.eyebrow")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B33] tracking-tight">
              {t("cat.title")}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {t("cat.sub")}
            </p>
          </div>

          <Link
            href="/schemes"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-slate-200 hover:border-slate-300 text-sm font-semibold text-[#0B1B33] hover:bg-slate-50 transition-all self-start md:self-auto shrink-0 shadow-sm"
          >
            <ArrowRight className="w-4 h-4" />
            <span>{t("cat.viewAll")}</span>
          </Link>
        </div>

        {/* 6 Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || GraduationCap;
            const bgClass = iconBgMap[cat.icon] || "bg-[#EFF6FF] text-[#2563EB]";
            const name = locale === "hi" ? cat.nameHi : cat.nameEn;
            const desc = locale === "hi" ? cat.descriptionHi : cat.descriptionEn;

            return (
              <Link
                key={cat.id}
                href={`/schemes?category=${cat.slug}`}
                className="group bg-[#FDFBF7] rounded-3xl p-7 border border-[#EFE8D8] hover:border-[#D8CFBC] hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${bgClass}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-500 group-hover:text-[#F26B2A] group-hover:border-[#F26B2A] transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B1B33] mb-2 group-hover:text-[#F26B2A] transition-colors">
                    {name}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {desc}
                  </p>
                </div>

                <div className="text-xs font-semibold text-[#0D9488]">
                  {cat.count} {t("cat.schemesIndexed")}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
