import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Lock, EyeOff, UserCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7EE]">
      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#0D9488] uppercase tracking-wider block">
              PRIVACY & DATA PROTECTION
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B1B33]">
              How we protect your privacy
            </h1>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Built under the principles of India&apos;s Digital Personal Data Protection (DPDP) Act: Notice, Consent, Purpose Limitation, and Data Minimization.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80 space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#0B1B33]">
                1. Guest Mode by Default
              </h2>
              <p>
                You can explore all schemes, run the 7-question eligibility check, and prepare document checklists anonymously without creating an account or providing your name, email, or phone number.
              </p>
            </div>

            <div className="space-y-3 border-t border-slate-100 pt-6">
              <h2 className="text-xl font-bold text-[#0B1B33]">
                2. Zero Sensitive Identity Collection
              </h2>
              <p>
                SchemeMatch never asks for, records, or stores your 12-digit Aadhaar number, Aadhaar OTPs, biometric fingerprints, bank account numbers, or debit/credit card credentials. Any document status you toggle stays purely inside your personal browser storage.
              </p>
            </div>

            <div className="space-y-3 border-t border-slate-100 pt-6">
              <h2 className="text-xl font-bold text-[#0B1B33]">
                3. Optional Details and UNKNOWN Evaluation
              </h2>
              <p>
                Questions regarding income, social category, or disability always offer &ldquo;Prefer not to say&rdquo; options. In our deterministic rule engine, skipping an optional question results in an UNKNOWN check state, never a disqualified FAIL.
              </p>
            </div>

            <div className="space-y-3 border-t border-slate-100 pt-6">
              <h2 className="text-xl font-bold text-[#0B1B33]">
                4. Cookies and Tracking
              </h2>
              <p>
                We do not use invasive third-party cross-site trackers or ad pixels. Only essential session state is utilized to enable instant language toggling and checklist caching.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
