import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, ShieldAlert, Cpu, Database } from "lucide-react";

export default function MethodologyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7EE]">
      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#0D9488] uppercase tracking-wider block">
              RULES & ACCURACY
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B1B33]">
              Our Verification Methodology
            </h1>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              How SchemeMatch ensures zero hallucinations and trustworthy eligibility guidance.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F7F0] flex items-center justify-center text-[#1E9E6A] shrink-0">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-[#0B1B33]">
                  1. The Deterministic Rule Engine
                </h2>
                <p>
                  In SchemeMatch, artificial intelligence never decides whether a citizen qualifies for a scheme. Instead, eligibility is parsed by a deterministic server-side rule engine implementing operators (`eq`, `gte`, `lte`, `in`, `between`). If rules are met, the status is &ldquo;Likely eligible&rdquo;; if details are missing, it flags &ldquo;Check one detail&rdquo;.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 border-t border-slate-100 pt-6">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF2EB] flex items-center justify-center text-[#F26B2A] shrink-0">
                <Database className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-[#0B1B33]">
                  2. Official Domain Allowlist (.gov.in / .nic.in)
                </h2>
                <p>
                  Every source URL and outbound application destination is programmatically validated against official government domain records. Any external non-government service requires manual audit verification.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 border-t border-slate-100 pt-6">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF2F6] flex items-center justify-center text-[#3B82F6] shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-[#0B1B33]">
                  3. 90-Day Freshness Audits
                </h2>
                <p>
                  Government scheme terms, income ceilings, and deadlines change frequently. All scheme data records feature an explicit `last_verified_at` timestamp. Records older than 90 days without re-verification are flagged with a &ldquo;Verification Due&rdquo; alert.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
