"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import { Search, ArrowRight, Sparkles, LayoutGrid, FileText } from "lucide-react";

export function HeroSection() {
  const { t } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/schemes?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/schemes");
    }
  };

  const handleChipClick = (chipText: string) => {
    router.push(`/schemes?q=${encodeURIComponent(chipText)}`);
  };

  return (
    <section className="relative bg-[#0B1B33] text-white pt-12 pb-24 overflow-hidden">
      {/* Decorative background concentric circles */}
      <div className="absolute top-10 right-0 w-[650px] h-[650px] pointer-events-none opacity-20 hidden lg:block">
        <svg viewBox="0 0 600 600" className="w-full h-full text-slate-400">
          <circle cx="450" cy="150" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="450" cy="150" r="220" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="450" cy="150" r="300" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="450" cy="150" r="380" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Search & Actions */}
          <div className="lg:col-span-7 space-y-7">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12233E] border border-slate-700/80 text-xs sm:text-sm text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#F26B2A]"></span>
              <span>{t("hero.badge")}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white font-sans">
              <span>{t("hero.title1")}</span>
              <br />
              <span className="text-white">{t("hero.title2")}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300/90 max-w-2xl font-normal leading-relaxed">
              {t("hero.sub")}
            </p>

            {/* Plain Language Search Box */}
            <div className="bg-white rounded-3xl p-5 shadow-2xl text-slate-900 border border-slate-100 max-w-xl">
              <div className="text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-2">
                {t("hero.searchLabel")}
              </div>
              <form onSubmit={handleSearch} className="relative flex items-center mb-3">
                <div className="absolute left-4 text-slate-400">
                  <Search className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("hero.searchPlaceholder")}
                  className="w-full pl-12 pr-14 py-3.5 bg-[#F8F9FA] rounded-2xl text-slate-800 placeholder-slate-400 text-sm sm:text-base border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-[#F26B2A] transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 p-2.5 rounded-xl bg-[#F26B2A] hover:bg-[#E05A19] text-white transition-transform active:scale-95 shadow-md shadow-[#F26B2A]/30"
                  aria-label="Search schemes"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Try quick chips */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">{t("hero.try")}</span>
                <button
                  type="button"
                  onClick={() => handleChipClick("Farmer support")}
                  className="px-3 py-1 rounded-full bg-[#FFF2EB] text-[#C2410C] hover:bg-[#FFE3D4] font-medium transition-colors"
                >
                  {t("hero.try1")}
                </button>
                <button
                  type="button"
                  onClick={() => handleChipClick("Student scholarship")}
                  className="px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] hover:bg-[#DBEAFE] font-medium transition-colors"
                >
                  {t("hero.try2")}
                </button>
                <button
                  type="button"
                  onClick={() => handleChipClick("Women entrepreneurs")}
                  className="px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] hover:bg-[#D1FAE5] font-medium transition-colors"
                >
                  {t("hero.try3")}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                href="/check"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold text-white bg-[#F26B2A] hover:bg-[#E05A19] shadow-lg shadow-[#F26B2A]/25 transition-all text-base transform active:scale-95"
              >
                <Sparkles className="w-5 h-5" />
                <span>{t("hero.btnCheck")}</span>
              </Link>
              <Link
                href="/schemes"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold text-[#0B1B33] bg-white hover:bg-slate-100 shadow-md transition-all text-base transform active:scale-95"
              >
                <LayoutGrid className="w-5 h-5 text-slate-700" />
                <span>{t("hero.btnBrowse")}</span>
              </Link>
            </div>

            {/* Trust Microcopy */}
            <p className="text-xs sm:text-sm text-slate-400 pt-2 font-normal">
              {t("hero.microcopy")}
            </p>
          </div>

          {/* Right Column: Match Preview Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-3xl p-5 shadow-2xl text-slate-900 border border-slate-100/90 transition-all hover:shadow-3xl">
              {/* Family Image Banner */}
              <div className="relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden mb-5">
                <Image
                  src="/images/hero-family.jpg"
                  alt="Indian family exploring government schemes on smartphone"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>

              {/* Preview Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[11px] font-bold tracking-wider text-[#0D9488] uppercase block">
                    {t("hero.previewTitle")}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B1B33]">
                    {t("hero.previewCount")}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#E7F7F0] flex items-center justify-center text-[#1E9E6A] font-extrabold text-sm border border-[#1E9E6A]/20">
                  86%
                </div>
              </div>

              {/* Scheme item 1 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#E7F7F0] flex items-center justify-center text-[#1E9E6A]">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#0B1B33]">
                        PM Scholarship Scheme
                      </div>
                      <div className="text-xs text-slate-500">Education</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#1E9E6A] bg-[#E7F7F0] px-2.5 py-1 rounded-full">
                    {t("hero.previewLikely")}
                  </span>
                </div>

                {/* Scheme item 2 */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#E7F7F0] flex items-center justify-center text-[#1E9E6A]">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#0B1B33]">
                        Sukanya Samriddhi Yojana
                      </div>
                      <div className="text-xs text-slate-500">Savings</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#D97706] bg-[#FEF3C7] px-2.5 py-1 rounded-full">
                    {t("hero.previewCheck")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
