"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Mic,
  ArrowUp,
  CircleDollarSign,
} from "lucide-react";

export function MitraSection() {
  const { t } = useLanguage();
  const router = useRouter();
  const [chatInput, setChatInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      router.push(`/mitra?q=${encodeURIComponent(chatInput.trim())}`);
    } else {
      router.push("/mitra");
    }
  };

  return (
    <section className="py-24 bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Column: Interactive Chat Panel */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/80 max-w-lg mx-auto">
              {/* Chat Top Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#0B1B33] flex items-center justify-center text-white shadow-sm">
                    <Sparkles className="w-5 h-5 text-[#F26B2A]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0B1B33]">
                      Mitra · SchemeMatch AI
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#1E9E6A] font-medium">
                      <span className="w-2 h-2 rounded-full bg-[#1E9E6A] animate-pulse"></span>
                      <span>Ready to help</span>
                    </div>
                  </div>
                </div>

                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                  हिंदी / English
                </span>
              </div>

              {/* Chat Stream */}
              <div className="space-y-4 mb-5">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-[#0B1B33] text-white p-4 rounded-2xl rounded-tr-sm max-w-[85%] text-sm leading-relaxed shadow-sm">
                    I run a small tailoring business in Jaipur. Is there support to buy a new sewing machine?
                  </div>
                </div>

                {/* Mitra Response */}
                <div className="flex justify-start">
                  <div className="bg-[#F8FAFC] border border-slate-200/80 text-slate-800 p-4 rounded-2xl rounded-tl-sm max-w-[95%] text-sm leading-relaxed space-y-3">
                    <p>
                      Yes—there are a few possibilities. Based on what you shared, these are worth checking first:
                    </p>

                    {/* Embedded Scheme Card */}
                    <Link
                      href="/schemes/pm-vishwakarma"
                      className="block p-3 rounded-xl bg-[#E6F7F0] border border-[#BCE8D5] hover:border-[#96D6BA] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#0D9488]">
                            <CircleDollarSign className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-[#0B1B33]">
                              PM Vishwakarma
                            </div>
                            <div className="text-[11px] text-slate-600">
                              Tools support + concessional credit
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-[#1E9E6A]">
                          Strong match
                        </span>
                      </div>
                    </Link>

                    <p className="text-xs text-slate-500">
                      I&apos;ll ask 3 quick questions to verify the fit and explain what documents are needed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={t("mitra.inputPlaceholder")}
                  className="w-full pl-4 pr-24 py-3 bg-[#F8F9FA] rounded-2xl text-slate-800 placeholder-slate-400 text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F26B2A] transition-all"
                />
                <div className="absolute right-2 flex items-center gap-1">
                  <button
                    type="button"
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
                    title="Voice input"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-[#F26B2A] hover:bg-[#E05A19] text-white transition-transform active:scale-95 shadow-sm"
                    aria-label="Send message"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Explanations & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D9488]">
              <span className="w-2 h-2 rounded-full bg-[#F26B2A]"></span>
              <span>{t("mitra.eyebrow")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B33] tracking-tight">
              {t("mitra.title")}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {t("mitra.sub")}
            </p>

            {/* Bullets */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#1E9E6A] shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-700 font-medium">
                  {t("mitra.b1")}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#1E9E6A] shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-700 font-medium">
                  {t("mitra.b2")}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#1E9E6A] shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-700 font-medium">
                  {t("mitra.b3")}
                </span>
              </div>
            </div>

            {/* Amber Disclaimer Banner */}
            <div className="bg-[#FEF7EC] border border-[#FDE3B7] rounded-2xl p-4 flex items-start gap-3 text-xs sm:text-sm text-[#92400E] leading-relaxed">
              <AlertCircle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
              <span>{t("mitra.disclaimer")}</span>
            </div>

            {/* Button */}
            <div className="pt-2">
              <Link
                href="/mitra"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold text-white bg-[#0B1B33] hover:bg-[#12233E] shadow-md transition-all text-base transform active:scale-95"
              >
                <MessageSquare className="w-5 h-5" />
                <span>{t("mitra.btn")}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
