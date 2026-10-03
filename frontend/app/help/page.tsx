import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MessageSquare, FileCheck, Search, HelpCircle, Mail, MapPin } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7EE]">
      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-[#0D9488] uppercase tracking-wider block">
              SUPPORT & HELP CENTRE
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B1B33]">
              How can we help you today?
            </h1>
            <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              Find quick answers, speak with our AI assistant Mitra, or learn how to navigate official government portals.
            </p>
          </div>

          {/* Quick Help Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/mitra"
              className="bg-white rounded-3xl p-7 shadow-sm border border-slate-200/80 hover:shadow-md transition-all space-y-3 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FFF2EB] text-[#F26B2A] flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#0B1B33] group-hover:text-[#F26B2A] transition-colors">
                Ask Mitra AI
              </h2>
              <p className="text-sm text-slate-600 font-normal leading-relaxed">
                Describe your situation in Hindi or English to get instant, verified scheme recommendations.
              </p>
            </Link>

            <Link
              href="/check"
              className="bg-white rounded-3xl p-7 shadow-sm border border-slate-200/80 hover:shadow-md transition-all space-y-3 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#E6F7F0] text-[#1E9E6A] flex items-center justify-center">
                <FileCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#0B1B33] group-hover:text-[#1E9E6A] transition-colors">
                Check Eligibility
              </h2>
              <p className="text-sm text-slate-600 font-normal leading-relaxed">
                Complete a 3-minute guided check to see personalized matches for your household.
              </p>
            </Link>

            <Link
              href="/schemes"
              className="bg-white rounded-3xl p-7 shadow-sm border border-slate-200/80 hover:shadow-md transition-all space-y-3 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#0B1B33] group-hover:text-[#2563EB] transition-colors">
                Browse Directory
              </h2>
              <p className="text-sm text-slate-600 font-normal leading-relaxed">
                Search through our catalog of central and state welfare programmes with document checklists.
              </p>
            </Link>
          </div>

          {/* Contact Support */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80 space-y-6">
            <h2 className="text-2xl font-bold text-[#0B1B33]">
              Need direct assistance?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              If you have noticed an outdated scheme link, have questions about our privacy practices, or want to suggest new state welfare schemes:
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-2 text-sm text-slate-700">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#F26B2A]" />
                <span className="font-semibold">support@schemematch.org</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#0D9488]" />
                <span>Civic Technology Initiative, New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
