"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SCHEMES, CATEGORIES } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import {
  Search,
  Filter,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Tag,
} from "lucide-react";

function SchemesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialQuery = searchParams.get("q") || "";

  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState("all");

  const filteredSchemes = useMemo(() => {
    return SCHEMES.filter((scheme) => {
      // Category filter
      if (selectedCategory !== "all" && scheme.categorySlug !== selectedCategory) {
        return false;
      }
      // Level filter
      if (selectedLevel !== "all" && scheme.level !== selectedLevel) {
        return false;
      }
      // Search term
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName =
          scheme.nameEn.toLowerCase().includes(q) ||
          scheme.nameHi.toLowerCase().includes(q);
        const matchesSummary =
          scheme.summaryEn.toLowerCase().includes(q) ||
          scheme.summaryHi.toLowerCase().includes(q);
        const matchesBenefits =
          scheme.benefitsEn.toLowerCase().includes(q) ||
          scheme.benefitsHi.toLowerCase().includes(q);
        return matchesName || matchesSummary || matchesBenefits;
      }
      return true;
    });
  }, [search, selectedCategory, selectedLevel]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title & Search bar */}
      <div className="mb-10 space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B33]">
          Explore Government Schemes
        </h1>
        <p className="text-base text-slate-600 max-w-2xl font-normal">
          Browse verified central and state welfare programmes. Every scheme includes verified rules, acceptable document checklists, and direct official links.
        </p>

        {/* Filter & Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by scheme name, benefits, keywords..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F26B2A] shadow-xs"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#F26B2A] shadow-xs"
            >
              <option value="all">All Categories ({CATEGORIES.reduce((a, c) => a + c.count, 0)})</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Level Dropdown */}
          <div className="md:col-span-2">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#F26B2A] shadow-xs"
            >
              <option value="all">All Levels</option>
              <option value="central">Central Only</option>
              <option value="state">State Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="space-y-6">
        <div className="text-sm font-semibold text-slate-600">
          Showing {filteredSchemes.length} verified schemes
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white rounded-3xl p-7 shadow-sm border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-[#0D9488] uppercase tracking-wider">
                    {scheme.categorySlug.replace("-", " ")}
                  </span>
                  {scheme.badge && scheme.badge !== "none" && (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FFF5EB] text-[#C2410C]">
                      {scheme.badge === "popular" ? "Popular" : scheme.badge === "high_impact" ? "High impact" : "New"}
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold text-[#0B1B33] mb-2">
                  {scheme.nameEn}
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  {scheme.summaryEn}
                </p>

                {/* Benefits pill */}
                <div className="bg-[#FAF7EE] border border-[#EFE8D8] rounded-2xl p-3 text-xs text-slate-700 mb-6 font-medium">
                  {scheme.benefitsEn}
                </div>
              </div>

              {/* Footer */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#1E9E6A]" />
                    <span>Official portal verified</span>
                  </span>
                  <span>{scheme.lastVerifiedAt}</span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <Link
                    href={`/checklist/${scheme.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#0B1B33] px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100"
                  >
                    <FileCheck className="w-3.5 h-3.5 text-[#1E9E6A]" />
                    <span>Checklist</span>
                  </Link>

                  <Link
                    href={`/schemes/${scheme.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#F26B2A] hover:bg-[#E05A19] px-4 py-2 rounded-xl shadow-xs"
                  >
                    <span>View details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SchemesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7EE]">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading schemes...</div>}>
          <SchemesContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
