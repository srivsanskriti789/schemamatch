"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import {
  CheckCircle2,
  FileCheck,
  CreditCard,
  Building2,
  MapPin,
  Camera,
  Bell,
} from "lucide-react";

export function DocumentsSection() {
  const { t } = useLanguage();

  // Interactive items state
  const [docStates, setDocStates] = useState<Record<string, "Ready" | "Review" | "Missing">>({
    aadhaar: "Ready",
    passbook: "Ready",
    address: "Review",
    photo: "Missing",
  });

  const toggleDoc = (key: string) => {
    setDocStates((prev) => {
      const current = prev[key];
      const next = current === "Ready" ? "Review" : current === "Review" ? "Missing" : "Ready";
      return { ...prev, [key]: next };
    });
  };

  const readyCount = Object.values(docStates).filter((s) => s === "Ready").length;
  const progressPercent = Math.round((readyCount / 4) * 100);

  return (
    <section id="documents" className="py-24 bg-[#E3F4EC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading & Info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D9488]">
              <span className="w-2 h-2 rounded-full bg-[#F26B2A]"></span>
              <span>{t("docs.eyebrow")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B33] tracking-tight">
              {t("docs.title")}
            </h2>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {t("docs.sub")}
            </p>

            {/* Bullets */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#1E9E6A] shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-800 font-medium">
                  {t("docs.b1")}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#1E9E6A] shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-800 font-medium">
                  {t("docs.b2")}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#1E9E6A] shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-800 font-medium">
                  {t("docs.b3")}
                </span>
              </div>
            </div>

            {/* CTA & Note */}
            <div className="space-y-3 pt-3">
              <Link
                href="/checklist/pm-vishwakarma"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold text-white bg-[#0B1B33] hover:bg-[#12233E] shadow-md transition-all text-base transform active:scale-95"
              >
                <FileCheck className="w-5 h-5" />
                <span>{t("docs.btn")}</span>
              </Link>
              <p className="text-xs text-slate-600 block">
                {t("docs.note")}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Checklist Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-xl border border-slate-100 max-w-lg mx-auto lg:ml-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#0D9488] tracking-wider uppercase">
                  {t("docs.readiness")}
                </span>
                <span className="w-10 h-10 rounded-full bg-[#E6F7F0] text-[#1E9E6A] font-extrabold text-xs flex items-center justify-center">
                  {progressPercent}%
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#0B1B33] mb-4">
                PM Vishwakarma checklist
              </h3>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-[#1E9E6A] rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              {/* 4 Interactive Document Rows */}
              <div className="space-y-4 mb-6">
                {/* 1. Aadhaar */}
                <div
                  onClick={() => toggleDoc("aadhaar")}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#0B1B33]">
                        Aadhaar card
                      </div>
                      <div className="text-xs text-slate-500">
                        Name and date of birth match
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                      docStates.aadhaar === "Ready"
                        ? "bg-[#E6F7F0] text-[#1E9E6A]"
                        : docStates.aadhaar === "Review"
                        ? "bg-[#FEF3C7] text-[#D97706]"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {docStates.aadhaar}
                  </span>
                </div>

                {/* 2. Bank Passbook */}
                <div
                  onClick={() => toggleDoc("passbook")}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border-t border-slate-100 pt-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#0B1B33]">
                        Bank passbook
                      </div>
                      <div className="text-xs text-slate-500">
                        Account details visible
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                      docStates.passbook === "Ready"
                        ? "bg-[#E6F7F0] text-[#1E9E6A]"
                        : docStates.passbook === "Review"
                        ? "bg-[#FEF3C7] text-[#D97706]"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {docStates.passbook}
                  </span>
                </div>

                {/* 3. Address Proof */}
                <div
                  onClick={() => toggleDoc("address")}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border-t border-slate-100 pt-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#0B1B33]">
                        Address proof
                      </div>
                      <div className="text-xs text-slate-500">
                        Issued within accepted period
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                      docStates.address === "Ready"
                        ? "bg-[#E6F7F0] text-[#1E9E6A]"
                        : docStates.address === "Review"
                        ? "bg-[#FEF3C7] text-[#D97706]"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {docStates.address}
                  </span>
                </div>

                {/* 4. Recent Photo */}
                <div
                  onClick={() => toggleDoc("photo")}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border-t border-slate-100 pt-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#0B1B33]">
                        Recent photograph
                      </div>
                      <div className="text-xs text-slate-500">
                        Passport-size, clear background
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                      docStates.photo === "Ready"
                        ? "bg-[#E6F7F0] text-[#1E9E6A]"
                        : docStates.photo === "Review"
                        ? "bg-[#FEF3C7] text-[#D97706]"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {docStates.photo}
                  </span>
                </div>
              </div>

              {/* Alert Footer Box */}
              <div className="bg-[#FFF5EB] border border-[#FED7AA] rounded-2xl p-4 flex items-start gap-3 text-xs sm:text-sm text-[#C2410C]">
                <Bell className="w-4 h-4 text-[#F26B2A] shrink-0 mt-0.5" />
                <span>{t("docs.banner")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
