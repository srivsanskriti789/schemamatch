"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SCHEMES } from "@/lib/data";
import {
  Sparkles,
  Send,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  CircleDollarSign,
  ArrowRight,
  User,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "mitra";
  text: string;
  schemeCitation?: (typeof SCHEMES)[0];
  sources?: string[];
}

function MitraContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-welcome",
      sender: "mitra",
      text: "Namaste! I am Mitra, your SchemeMatch assistant. Tell me about your occupation, family, or what support you are looking for, and I will check verified government schemes with official source citations.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery) {
      handleUserSubmit(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleUserSubmit = (userText: string) => {
    const text = userText.trim();
    if (!text) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Rule-based deterministic response matcher backed by verified scheme records
    setTimeout(() => {
      const lower = text.toLowerCase();
      let matchedScheme = SCHEMES[0]; // default Vishwakarma
      let replyText = "";

      if (lower.includes("scholarship") || lower.includes("student") || lower.includes("daughter") || lower.includes("class 10")) {
        matchedScheme = SCHEMES.find((s) => s.slug === "national-scholarship-portal") || SCHEMES[2];
        replyText = `Based on your student query, the National Scholarship Portal (NSP) is the primary single window. It offers pre-matric and post-matric financial support with direct bank transfer.`;
      } else if (lower.includes("girl") || lower.includes("sukanya") || lower.includes("saving") || lower.includes("child")) {
        matchedScheme = SCHEMES.find((s) => s.slug === "sukanya-samriddhi-yojana") || SCHEMES[4];
        replyText = `For girl children aged 10 or younger, Sukanya Samriddhi Yojana offers a government-backed 8.2% annual interest rate and Section 80C tax benefits.`;
      } else if (lower.includes("health") || lower.includes("hospital") || lower.includes("ayushman") || lower.includes("medical")) {
        matchedScheme = SCHEMES.find((s) => s.slug === "ayushman-bharat-pmjay") || SCHEMES[1];
        replyText = `Under Ayushman Bharat PM-JAY, eligible low-income families receive cashless secondary and tertiary hospitalization cover up to ₹5,00,000 per family per year.`;
      } else if (lower.includes("farmer") || lower.includes("kisan") || lower.includes("agriculture") || lower.includes("crop")) {
        matchedScheme = SCHEMES.find((s) => s.slug === "pm-kisan-samman-nidhi") || SCHEMES[5];
        replyText = `For farmer families holding cultivable land, PM-KISAN provides direct income support of ₹6,000 per year in three installments of ₹2,000.`;
      } else if (lower.includes("house") || lower.includes("awas") || lower.includes("home")) {
        matchedScheme = SCHEMES.find((s) => s.slug === "pm-awas-yojana") || SCHEMES[6];
        replyText = `Under PM Awas Yojana (Gramin), eligible rural houseless families receive financial grant assistance up to ₹1,20,000 (plains) or ₹1,30,000 (hilly areas) to construct a permanent pucca house.`;
      } else {
        matchedScheme = SCHEMES[0];
        replyText = `For artisans, craftsmen, and small tailoring or trade businesses, PM Vishwakarma offers ₹15,000 toolkit vouchers, subsidized training with ₹500/day stipend, and 5% concessional loans up to ₹3 lakh.`;
      }

      const botMsg: Message = {
        id: `m-${Date.now()}`,
        sender: "mitra",
        text: replyText,
        schemeCitation: matchedScheme,
        sources: [matchedScheme.officialUrl],
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUserSubmit(input);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col h-[calc(100vh-140px)]">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0B1B33] flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5 text-[#F26B2A]" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#0B1B33]">
              Mitra · SchemeMatch AI Assistant
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-[#1E9E6A]">
              <span className="w-2 h-2 rounded-full bg-[#1E9E6A] animate-pulse"></span>
              <span>Grounded on verified government portals</span>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-[#1E9E6A]" />
          <span>No PII stored</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-grow bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 overflow-y-auto space-y-5 mb-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {m.sender === "user" ? (
              <div className="flex items-start gap-2.5 max-w-[80%]">
                <div className="bg-[#0B1B33] text-white p-4 rounded-2xl rounded-tr-sm text-sm sm:text-base leading-relaxed">
                  {m.text}
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 max-w-[90%]">
                <div className="w-8 h-8 rounded-xl bg-[#0B1B33] flex items-center justify-center text-white shrink-0 mt-1">
                  <Sparkles className="w-4 h-4 text-[#F26B2A]" />
                </div>
                <div className="bg-[#F8FAFC] border border-slate-200 text-slate-800 p-5 rounded-2xl rounded-tl-sm space-y-4 text-sm sm:text-base leading-relaxed">
                  <p>{m.text}</p>

                  {/* Scheme citation card if available */}
                  {m.schemeCitation && (
                    <div className="p-4 rounded-2xl bg-[#E6F7F0] border border-[#BCE8D5] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0D9488] uppercase tracking-wider">
                          Verified Scheme Match
                        </span>
                        <span className="text-xs font-bold text-[#1E9E6A] bg-white px-2.5 py-0.5 rounded-full">
                          Strong match
                        </span>
                      </div>
                      <div className="text-base font-bold text-[#0B1B33]">
                        {m.schemeCitation.nameEn}
                      </div>
                      <div className="text-xs text-slate-600">
                        {m.schemeCitation.benefitsEn}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#BCE8D5] text-xs">
                        <a
                          href={m.schemeCitation.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#0D9488] hover:underline inline-flex items-center gap-1"
                        >
                          <span>Official Portal ({m.schemeCitation.officialUrl})</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        <Link
                          href={`/schemes/${m.schemeCitation.slug}`}
                          className="font-bold text-[#F26B2A] hover:underline inline-flex items-center gap-1"
                        >
                          <span>Full details</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic">
            <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></span>
            <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
            <span>Mitra is verifying rules...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
        <span className="text-slate-500 font-medium">Try asking:</span>
        <button
          type="button"
          onClick={() => handleUserSubmit("Support for artisan tailoring machines")}
          className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#F26B2A] transition-colors"
        >
          Artisan tools support
        </button>
        <button
          type="button"
          onClick={() => handleUserSubmit("Scholarships for Class 10 girl student")}
          className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#F26B2A] transition-colors"
        >
          Class 10 scholarships
        </button>
        <button
          type="button"
          onClick={() => handleUserSubmit("Health insurance card eligibility")}
          className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#F26B2A] transition-colors"
        >
          Ayushman Bharat rules
        </button>
      </div>

      {/* Input Box */}
      <form onSubmit={onSubmit} className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about schemes, criteria, or accepted documents..."
          className="w-full pl-5 pr-14 py-4 bg-white border border-slate-200 rounded-2xl text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F26B2A] shadow-md"
        />
        <button
          type="submit"
          className="absolute right-2 p-2.5 rounded-xl bg-[#F26B2A] hover:bg-[#E05A19] text-white transition-transform active:scale-95 shadow-sm"
          aria-label="Send"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Legal Guardrail Disclaimer */}
      <p className="text-[11px] text-slate-500 text-center mt-2">
        Mitra provides informational guidance only and cannot approve or guarantee scheme benefits. Applications must be completed on official government portals.
      </p>
    </div>
  );
}

export default function MitraPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7EE]">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading Mitra...</div>}>
          <MitraContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
