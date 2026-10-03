"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SCHEMES } from "@/lib/data";
import { matchAllSchemes } from "@/lib/rule-engine";
import { SchemeMatchResult, UserProfile } from "@/lib/types";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ExternalLink,
  FileCheck,
  ArrowRight,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function ResultsPage() {
  const [profile, setProfile] = useState<UserProfile>({});
  const [results, setResults] = useState<{
    likelyEligible: SchemeMatchResult[];
    checkDetails: SchemeMatchResult[];
    notYetEligible: SchemeMatchResult[];
  }>({
    likelyEligible: [],
    checkDetails: [],
    notYetEligible: [],
  });

  const [showNotYet, setShowNotYet] = useState(false);

  useEffect(() => {
    let savedProfile: UserProfile = {};
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("schemematch_profile");
      if (stored) {
        try {
          savedProfile = JSON.parse(stored);
        } catch (e) {
          // ignore
        }
      }
    }
    setProfile(savedProfile);
    const evaluated = matchAllSchemes(SCHEMES, savedProfile);
    setResults(evaluated);
  }, []);

  const totalMatches = results.likelyEligible.length + results.checkDetails.length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7EE]">
      <Navbar />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#0D9488] tracking-wider uppercase block mb-1">
                  YOUR MATCH RESULTS
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B33]">
                  {totalMatches} schemes may fit your situation
                </h1>
                <p className="text-sm text-slate-600 mt-2 font-normal">
                  Results computed deterministically from verified scheme rules based on your inputs.
                </p>
              </div>

              <Link
                href="/check"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-[#0B1B33] bg-[#F8FAFC] self-start sm:self-auto shrink-0"
              >
                <span>Edit answers</span>
              </Link>
            </div>

            {/* Disclaimer notice */}
            <div className="mt-6 p-4 rounded-2xl bg-[#FBF7EE] border border-[#EFE8D8] flex items-start gap-3 text-xs text-slate-600">
              <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <span>
                SchemeMatch is an independent assistance platform and not a government portal. Eligibility results are indicative; final approval rests strictly with official sanctioning departments.
              </span>
            </div>
          </div>

          {/* Group 1: Likely Eligible */}
          {results.likelyEligible.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#E6F7F0] flex items-center justify-center text-[#1E9E6A]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h2 className="text-xl font-bold text-[#0B1B33]">
                  Likely eligible ({results.likelyEligible.length})
                </h2>
              </div>

              <div className="space-y-4">
                {results.likelyEligible.map((item) => (
                  <SchemeResultCard key={item.scheme.id} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* Group 2: Check Details */}
          {results.checkDetails.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#FEF3C7] flex items-center justify-center text-[#D97706]">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <h2 className="text-xl font-bold text-[#0B1B33]">
                  Check one detail ({results.checkDetails.length})
                </h2>
              </div>

              <div className="space-y-4">
                {results.checkDetails.map((item) => (
                  <SchemeResultCard key={item.scheme.id} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* Group 3: Not Yet Eligible (Collapsible) */}
          {results.notYetEligible.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowNotYet(!showNotYet)}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <XCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">
                    Not yet eligible ({results.notYetEligible.length})
                  </span>
                </div>
                {showNotYet ? (
                  <ChevronUp className="w-4 h-4 text-slate-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                )}
              </button>

              {showNotYet && (
                <div className="space-y-4">
                  {results.notYetEligible.map((item) => (
                    <SchemeResultCard key={item.scheme.id} item={item} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function SchemeResultCard({ item }: { item: SchemeMatchResult }) {
  const { scheme, status, strength, matchedRules, unknownRules, missingRules } = item;

  const statusBadgeMap = {
    LIKELY: { label: "Likely eligible", class: "bg-[#E6F7F0] text-[#1E9E6A] border-[#BCE8D5]" },
    CHECK_DETAILS: { label: "Check one detail", class: "bg-[#FEF3C7] text-[#D97706] border-[#FDE3B7]" },
    NOT_YET: { label: "Not yet eligible", class: "bg-[#FEE2E2] text-[#DC2626] border-[#FECACA]" },
  };

  const badge = statusBadgeMap[status];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80 hover:shadow-md transition-all space-y-5">
      {/* Top Row: Title, Category & Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold text-[#0D9488] tracking-wider uppercase block mb-1">
            {scheme.categorySlug.replace("-", " ")}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#0B1B33]">
            {scheme.nameEn}
          </h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            {scheme.summaryEn}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start shrink-0">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            {strength} match
          </span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${badge.class}`}>
            {badge.label}
          </span>
        </div>
      </div>

      {/* Rules Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200/60">
        {/* Matched */}
        <div>
          <span className="font-bold text-[#1E9E6A] block mb-1">
            ✓ Why this matched ({matchedRules.length}):
          </span>
          {matchedRules.length > 0 ? (
            <ul className="space-y-1 text-slate-700">
              {matchedRules.map((r) => (
                <li key={r.ruleId}>• {r.explanationEn}</li>
              ))}
            </ul>
          ) : (
            <span className="text-slate-400 italic">No specific rule matched</span>
          )}
        </div>

        {/* What to verify */}
        <div>
          <span className="font-bold text-[#D97706] block mb-1">
            ? What to verify ({unknownRules.length}):
          </span>
          {unknownRules.length > 0 ? (
            <ul className="space-y-1 text-slate-700">
              {unknownRules.map((r) => (
                <li key={r.ruleId}>• {r.explanationEn}</li>
              ))}
            </ul>
          ) : (
            <span className="text-slate-400 italic">None needed</span>
          )}
        </div>

        {/* Missing / Fail */}
        <div>
          <span className="font-bold text-[#DC2626] block mb-1">
            ✗ What is missing ({missingRules.length}):
          </span>
          {missingRules.length > 0 ? (
            <ul className="space-y-1 text-slate-700">
              {missingRules.map((r) => (
                <li key={r.ruleId}>• {r.explanationEn}</li>
              ))}
            </ul>
          ) : (
            <span className="text-slate-400 italic">None missing</span>
          )}
        </div>
      </div>

      {/* Action Buttons & Source */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs">
        <div className="text-slate-500 flex items-center gap-2">
          <span>Source:</span>
          <a
            href={scheme.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0D9488] font-semibold hover:underline inline-flex items-center gap-1"
          >
            <span>{scheme.officialUrl}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-slate-300">·</span>
          <span>Checked: {scheme.lastVerifiedAt}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href={`/checklist/${scheme.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <FileCheck className="w-3.5 h-3.5 text-[#1E9E6A]" />
            <span>Build checklist</span>
          </Link>

          <Link
            href={`/schemes/${scheme.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F26B2A] hover:bg-[#E05A19] font-semibold text-white transition-colors shadow-xs"
          >
            <span>View details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
