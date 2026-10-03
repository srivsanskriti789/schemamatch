import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SCHEMES } from "@/lib/data";
import {
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  ArrowRight,
  Sparkles,
  Info,
  Calendar,
  Building,
} from "lucide-react";

export function generateStaticParams() {
  return SCHEMES.map((scheme) => ({
    slug: scheme.slug,
  }));
}

export default async function SchemeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scheme = SCHEMES.find((s) => s.slug === slug);

  if (!scheme) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7EE]">
      <Navbar />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-bold text-[#0D9488] tracking-wider uppercase">
                {scheme.categorySlug.replace("-", " ")}
              </span>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F7F0] text-[#1E9E6A] text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Official source verified</span>
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Last checked: {scheme.lastVerifiedAt}</span>
                </span>
              </div>
            </div>

            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B1B33] tracking-tight">
                {scheme.nameEn}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 mt-3 font-normal leading-relaxed">
                {scheme.summaryEn}
              </p>
            </div>

            {/* Quick Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/checklist/${scheme.slug}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#0B1B33] hover:bg-[#12233E] text-white font-semibold text-sm shadow-md transition-all"
              >
                <FileCheck className="w-4 h-4 text-[#1E9E6A]" />
                <span>Build Document Checklist</span>
              </Link>

              <Link
                href={`/check`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#F26B2A] hover:bg-[#E05A19] text-white font-semibold text-sm shadow-md transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Check My Eligibility</span>
              </Link>

              <a
                href={scheme.applyUrl || scheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-slate-200 hover:border-slate-300 bg-[#F8FAFC] text-slate-700 font-semibold text-sm transition-all"
              >
                <span>Official Portal</span>
                <ExternalLink className="w-4 h-4 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
            <h2 className="text-xl font-bold text-[#0B1B33]">
              Benefits & Assistance Provided
            </h2>
            <div className="bg-[#FAF7EE] border border-[#EFE8D8] p-5 rounded-2xl text-slate-800 text-sm sm:text-base leading-relaxed">
              {scheme.benefitsEn}
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
            <h2 className="text-xl font-bold text-[#0B1B33]">
              Eligibility Criteria
            </h2>
            <div className="divide-y divide-slate-100">
              {scheme.rules.map((rule) => (
                <div key={rule.id} className="py-3 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1E9E6A] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-[#0B1B33]">
                      {rule.explanationEn}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Requirement: {rule.isMandatory ? "Mandatory requirement" : "Optional / Preferences applied"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents Required */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0B1B33]">
                Documents Required
              </h2>
              <Link
                href={`/checklist/${scheme.slug}`}
                className="text-xs font-semibold text-[#0D9488] hover:underline"
              >
                Open interactive checklist →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {scheme.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/70"
                >
                  <div className="font-bold text-sm text-[#0B1B33]">
                    {doc.nameKey}
                  </div>
                  {doc.tipKey && (
                    <div className="text-xs text-slate-600 mt-1">
                      {doc.tipKey}
                    </div>
                  )}
                  {doc.alternatives && doc.alternatives.length > 0 && (
                    <div className="text-[11px] text-[#0D9488] font-medium mt-2">
                      Accepted alternatives: {doc.alternatives.join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* How to Apply Steps */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
            <h2 className="text-xl font-bold text-[#0B1B33]">
              How to Apply (Official Steps)
            </h2>
            <ol className="space-y-4">
              {scheme.applySteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#FFF2EB] text-[#F26B2A] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    0{idx + 1}
                  </div>
                  <div className="text-sm text-slate-700 leading-relaxed font-medium">
                    {step}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Official Verification Notice */}
          <div className="p-5 rounded-2xl bg-[#F8F5EE] border border-[#E9E4D9] flex items-start gap-3.5 text-xs text-slate-600">
            <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-semibold text-slate-800">
                Independent Platform Notice
              </div>
              <div>
                Scheme information is reviewed regularly against government gazettes and official portals. However, official program rules, budgets, and guidelines always take precedence. Apply solely through the official portal ({scheme.officialUrl}).
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
