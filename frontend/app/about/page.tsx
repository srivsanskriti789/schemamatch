import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShieldCheck, HeartHandshake, FileText, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7EE]">
      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-[#0D9488] uppercase tracking-wider block">
              ABOUT SCHEMEMATCH
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B1B33]">
              Democratizing access to public benefits
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              SchemeMatch is an independent civic-tech platform built to help every Indian citizen discover welfare schemes, understand eligibility in plain language, and prepare application documents without middlemen.
            </p>
          </div>

          {/* 3 Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-7 shadow-sm border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F7F0] flex items-center justify-center text-[#1E9E6A]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#0B1B33]">
                100% Deterministic
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Eligibility is determined exclusively by clear mathematical rules and official criteria, never by AI guesswork or probabilistic hallucinations.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 shadow-sm border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF2EB] flex items-center justify-center text-[#F26B2A]">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#0B1B33]">
                Privacy First
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                No sign-up is required to explore. We never collect Aadhaar numbers, biometric data, OTPs, or uploaded identification documents.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 shadow-sm border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF2F6] flex items-center justify-center text-[#3B82F6]">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#0B1B33]">
                Official Source Grounded
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Every scheme is verified against official government gazettes (.gov.in / .nic.in) with explicit last-checked audit timestamps.
              </p>
            </div>
          </div>

          {/* Legal Status Notice */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/80 space-y-4">
            <h2 className="text-2xl font-bold text-[#0B1B33]">
              Independence and Legal Disclaimer
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              SchemeMatch is an independent assistance platform and is not affiliated with, authorized, or endorsed by the Government of India or any state administration. We do not charge citizens fees for discovering schemes or building checklists. All official application submissions must be completed on official portals or authorized Common Service Centres (CSCs).
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
