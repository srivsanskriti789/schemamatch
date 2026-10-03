"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { Search, ShieldCheck, CheckSquare, Send, Shield, ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  const { t } = useLanguage();

  const steps = [
    {
      num: "01",
      icon: Search,
      iconBg: "bg-[#FFF2EB] text-[#F26B2A]",
      title: t("how.step1.title"),
      desc: t("how.step1.desc"),
      progress: "w-1/4",
    },
    {
      num: "02",
      icon: ShieldCheck,
      iconBg: "bg-[#E6F7F0] text-[#1E9E6A]",
      title: t("how.step2.title"),
      desc: t("how.step2.desc"),
      progress: "w-1/2",
    },
    {
      num: "03",
      icon: CheckSquare,
      iconBg: "bg-[#EEF2F6] text-[#3B82F6]",
      title: t("how.step3.title"),
      desc: t("how.step3.desc"),
      progress: "w-3/4",
    },
    {
      num: "04",
      icon: Send,
      iconBg: "bg-[#FEF7EC] text-[#E9A23B]",
      title: t("how.step4.title"),
      desc: t("how.step4.desc"),
      progress: "w-full",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D9488]">
            <span className="w-2 h-2 rounded-full bg-[#F26B2A]"></span>
            <span>{t("how.eyebrow")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B33] tracking-tight">
            {t("how.title")}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t("how.sub")}
          </p>
        </div>

        {/* 4 Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-3xl p-7 shadow-sm border border-slate-200/70 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${step.iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B1B33] mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                {/* Progress bar line */}
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full bg-[#F26B2A] rounded-full ${step.progress}`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Privacy Banner */}
        <div className="bg-[#E4F3ED] border border-[#CDE9DD] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm text-[#0B1B33] font-medium">
            <Shield className="w-5 h-5 text-[#1E9E6A] shrink-0" />
            <span>{t("how.privacy")}</span>
          </div>
          <Link
            href="/privacy"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0D9488] hover:text-[#0B7A6E] shrink-0"
          >
            <span>{t("how.privacyLink")}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
