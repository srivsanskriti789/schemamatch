"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SCHEMES } from "@/lib/data";
import { SchemeDocument } from "@/lib/types";
import {
  FileCheck,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Printer,
  Copy,
  ArrowLeft,
  Shield,
  ExternalLink,
  Check,
} from "lucide-react";

export default function DocumentChecklistPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const scheme = SCHEMES.find((s) => s.slug === slug) || SCHEMES[0];

  const [docStatuses, setDocStatuses] = useState<Record<string, "Ready" | "Review" | "Missing">>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (scheme) {
      const initial: Record<string, "Ready" | "Review" | "Missing"> = {};
      const savedKey = `schemematch_checklist_${scheme.slug}`;
      const saved = localStorage.getItem(savedKey);

      if (saved) {
        try {
          setDocStatuses(JSON.parse(saved));
          return;
        } catch (e) {
          // ignore
        }
      }

      scheme.documents.forEach((d) => {
        initial[d.id] = d.defaultStatus || "Missing";
      });
      setDocStatuses(initial);
    }
  }, [scheme]);

  const setStatus = (id: string, st: "Ready" | "Review" | "Missing") => {
    setDocStatuses((prev) => {
      const updated = { ...prev, [id]: st };
      if (scheme) {
        localStorage.setItem(`schemematch_checklist_${scheme.slug}`, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const totalDocs = scheme?.documents?.length || 1;
  const readyDocs = Object.values(docStatuses).filter((s) => s === "Ready").length;
  const reviewDocs = Object.values(docStatuses).filter((s) => s === "Review").length;
  const missingDocs = totalDocs - readyDocs - reviewDocs;
  const readinessPercent = Math.round((readyDocs / totalDocs) * 100);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopy = () => {
    if (!scheme) return;
    const text = `Document Readiness Checklist for ${scheme.nameEn}\n` +
      `Readiness: ${readinessPercent}%\n\n` +
      scheme.documents
        .map((d) => {
          const st = docStatuses[d.id] || "Missing";
          return `[${st}] ${d.nameKey}\n  Tips: ${d.tipKey || "None"}\n  Alternatives: ${d.alternatives?.join(", ") || "None"}`;
        })
        .join("\n\n") +
      `\n\nOfficial Portal: ${scheme.officialUrl}\nPrepared on SchemeMatch (Zero upload privacy-first checklist)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!scheme) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7EE]">
      <Navbar />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Top Return link */}
          <Link
            href={`/schemes/${scheme.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0B1B33]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {scheme.nameEn} details</span>
          </Link>

          {/* Readiness Dashboard Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#0D9488] tracking-wider uppercase block mb-1">
                  DOCUMENT READINESS CHECKLIST
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1B33]">
                  {scheme.nameEn} Document Checklist
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  Prepare your papers before applying. No documents are ever uploaded to SchemeMatch.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#1E9E6A]" />
                      <span className="text-[#1E9E6A]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy checklist</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Readiness Score & Bar */}
            <div className="bg-[#FAF7EE] border border-[#EFE8D8] p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-[#0B1B33]">
                  Overall Readiness: {readyDocs} of {totalDocs} documents ready
                </span>
                <span className="font-extrabold text-[#1E9E6A]">
                  {readinessPercent}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1E9E6A] rounded-full transition-all duration-300"
                  style={{ width: `${readinessPercent}%` }}
                ></div>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold pt-1">
                <span className="text-[#1E9E6A]">● {readyDocs} Ready</span>
                <span className="text-[#D97706]">● {reviewDocs} Need Review</span>
                <span className="text-slate-500">● {missingDocs} Missing</span>
              </div>
            </div>
          </div>

          {/* Document Checklist Items */}
          <div className="space-y-4">
            {scheme.documents.map((doc) => {
              const currentStatus = docStatuses[doc.id] || "Missing";

              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4 hover:border-slate-300 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-[#0B1B33]">
                        {doc.nameKey}
                      </h3>
                      {doc.mandatory && (
                        <span className="text-[11px] font-semibold text-[#DC2626] uppercase tracking-wider block mt-0.5">
                          Mandatory Requirement
                        </span>
                      )}
                    </div>

                    {/* Status Toggle Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setStatus(doc.id, "Ready")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          currentStatus === "Ready"
                            ? "bg-[#E6F7F0] text-[#1E9E6A] border-2 border-[#1E9E6A]"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Ready</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStatus(doc.id, "Review")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          currentStatus === "Review"
                            ? "bg-[#FEF3C7] text-[#D97706] border-2 border-[#D97706]"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Review</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStatus(doc.id, "Missing")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          currentStatus === "Missing"
                            ? "bg-slate-200 text-slate-800 border-2 border-slate-400"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Missing</span>
                      </button>
                    </div>
                  </div>

                  {/* Plain Language Tip */}
                  {doc.tipKey && (
                    <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/60 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <span className="font-bold text-slate-900">Guidance: </span>
                      {doc.tipKey}
                    </div>
                  )}

                  {/* Acceptable Alternatives */}
                  {doc.alternatives && doc.alternatives.length > 0 && (
                    <div className="text-xs text-slate-600">
                      <span className="font-semibold text-[#0D9488]">
                        Accepted alternatives:{" "}
                      </span>
                      <span>{doc.alternatives.join(", ")}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Privacy Note */}
          <div className="p-5 rounded-2xl bg-[#E4F3ED] border border-[#CDE9DD] flex items-start gap-3.5 text-xs text-[#0B1B33]">
            <Shield className="w-5 h-5 text-[#1E9E6A] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">Privacy First Guarantee</span>
              Your checklist status is saved locally in your own browser. SchemeMatch never asks you to upload any sensitive identity cards, tax forms, or bank passbooks.
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
