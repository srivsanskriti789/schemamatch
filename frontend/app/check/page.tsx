"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { CATEGORIES } from "@/lib/data";
import { UserProfile } from "@/lib/types";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Shield,
  Check,
  HelpCircle,
} from "lucide-react";

export default function CheckWizardPage() {
  const { t } = useLanguage();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    needCategories: [],
    incomeBand: "2_5_to_5",
  });

  const totalSteps = 7;
  const progressPercent = Math.round((step / totalSteps) * 100);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Save profile to sessionStorage
      if (typeof window !== "undefined") {
        sessionStorage.setItem("schemematch_profile", JSON.stringify(profile));
      }
      router.push("/results");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleCategory = (slug: string) => {
    setProfile((prev) => {
      const current = prev.needCategories || [];
      const updated = current.includes(slug)
        ? current.filter((c) => c !== slug)
        : [...current, slug];
      return { ...prev, needCategories: updated };
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7EE]">
      <Navbar />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#0D9488] tracking-wider uppercase">
                QUESTION {step} OF {totalSteps}
              </span>
              <span className="w-9 h-9 rounded-full bg-[#E6F7F0] text-[#1E9E6A] font-extrabold text-xs flex items-center justify-center">
                {progressPercent}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-8">
              <div
                className="h-full bg-[#F26B2A] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Step 1: Need Categories */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1B33] mb-2">
                    What are you looking for?
                  </h1>
                  <p className="text-sm text-slate-600">
                    Select all that apply, or skip to view schemes across all categories.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CATEGORIES.map((cat) => {
                    const isSelected = (profile.needCategories || []).includes(cat.slug);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCategory(cat.slug)}
                        className={`flex items-center justify-between p-4 rounded-2xl text-left border text-sm font-semibold transition-all ${
                          isSelected
                            ? "bg-[#FFF5EB] border-[#F26B2A] text-[#C2410C]"
                            : "bg-[#F8FAFC] border-slate-200 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        <span>{cat.nameEn}</span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                            isSelected
                              ? "bg-[#F26B2A] border-[#F26B2A] text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Age and Gender */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1B33] mb-2">
                    Age and Gender
                  </h1>
                  <p className="text-sm text-slate-600">
                    Several government programmes have age-specific limits or women-focused benefits.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Age of the beneficiary (in years)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={120}
                      value={profile.age || ""}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          age: e.target.value ? parseInt(e.target.value, 10) : undefined,
                        })
                      }
                      placeholder="e.g. 24"
                      className="w-full p-4 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F26B2A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Gender
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "female", label: "Female" },
                        { id: "male", label: "Male" },
                        { id: "transgender", label: "Transgender" },
                        { id: "prefer_not_to_say", label: "Prefer not to say" },
                      ].map((g) => (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() =>
                            setProfile({ ...profile, gender: g.id as any })
                          }
                          className={`p-3.5 rounded-2xl border text-sm font-semibold transition-all ${
                            profile.gender === g.id
                              ? "bg-[#FFF5EB] border-[#F26B2A] text-[#C2410C]"
                              : "bg-[#F8FAFC] border-slate-200 text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1B33] mb-2">
                    Where do you live?
                  </h1>
                  <p className="text-sm text-slate-600">
                    Schemes are offered at central, state, and district levels.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      State / Union Territory
                    </label>
                    <select
                      value={profile.stateCode || ""}
                      onChange={(e) =>
                        setProfile({ ...profile, stateCode: e.target.value })
                      }
                      className="w-full p-4 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F26B2A]"
                    >
                      <option value="">All India (Central Schemes)</option>
                      <option value="RJ">Rajasthan</option>
                      <option value="MH">Maharashtra</option>
                      <option value="UP">Uttar Pradesh</option>
                      <option value="DL">Delhi</option>
                      <option value="KA">Karnataka</option>
                      <option value="TN">Tamil Nadu</option>
                      <option value="WB">West Bengal</option>
                      <option value="GJ">Gujarat</option>
                      <option value="MP">Madhya Pradesh</option>
                      <option value="BR">Bihar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      District (Optional)
                    </label>
                    <input
                      type="text"
                      value={profile.district || ""}
                      onChange={(e) =>
                        setProfile({ ...profile, district: e.target.value })
                      }
                      placeholder="e.g. Jaipur, Lucknow, Pune"
                      className="w-full p-4 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F26B2A]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Household Income */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1B33] mb-2">
                    Tell us about your household
                  </h1>
                  <p className="text-sm text-slate-600">
                    What is your household&apos;s approximate annual income?
                  </p>
                </div>

                <div className="space-y-2.5">
                  {[
                    { id: "below_2_5", label: "Below ₹2.5 lakh" },
                    { id: "2_5_to_5", label: "₹2.5–5 lakh" },
                    { id: "5_to_8", label: "₹5–8 lakh" },
                    { id: "above_8", label: "Above ₹8 lakh" },
                    { id: "unspecified", label: "Prefer not to say" },
                  ].map((inc) => (
                    <button
                      key={inc.id}
                      type="button"
                      onClick={() =>
                        setProfile({ ...profile, incomeBand: inc.id as any })
                      }
                      className={`w-full flex items-center gap-3.5 p-4 rounded-2xl text-left text-sm font-semibold transition-all ${
                        profile.incomeBand === inc.id
                          ? "bg-[#FFF5EB] border-2 border-[#F26B2A] text-[#C2410C]"
                          : "bg-[#F8FAFC] border border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                          profile.incomeBand === inc.id
                            ? "border-[#F26B2A] bg-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {profile.incomeBand === inc.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#F26B2A]"></div>
                        )}
                      </div>
                      <span>{inc.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Occupation */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1B33] mb-2">
                    Primary Occupation or Status
                  </h1>
                  <p className="text-sm text-slate-600">
                    Many assistance schemes target specific livelihoods like artisans, farmers, or students.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: "student", label: "Student" },
                    { id: "artisan", label: "Artisan / Craftsperson" },
                    { id: "farmer", label: "Farmer / Agriculturalist" },
                    { id: "business_owner", label: "Small Business / Micro Enterprise" },
                    { id: "salaried", label: "Salaried Worker" },
                    { id: "unemployed", label: "Job Seeker / Unemployed" },
                    { id: "homemaker", label: "Homemaker" },
                    { id: "senior_citizen", label: "Senior Citizen" },
                    { id: "other", label: "Other / General" },
                  ].map((occ) => (
                    <button
                      key={occ.id}
                      type="button"
                      onClick={() =>
                        setProfile({ ...profile, occupation: occ.id as any })
                      }
                      className={`p-4 rounded-2xl border text-sm font-semibold text-left transition-all ${
                        profile.occupation === occ.id
                          ? "bg-[#FFF5EB] border-[#F26B2A] text-[#C2410C]"
                          : "bg-[#F8FAFC] border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {occ.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Education */}
            {step === 6 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1B33] mb-2">
                    Highest Level of Education
                  </h1>
                  <p className="text-sm text-slate-600">
                    Used to match scholarship and skill certification programmes.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {[
                    { id: "none", label: "No formal schooling / Literate" },
                    { id: "primary", label: "Primary School (Class 1–8)" },
                    { id: "secondary", label: "Secondary (Class 9–10)" },
                    { id: "higher_secondary", label: "Higher Secondary (Class 11–12 / Diploma)" },
                    { id: "graduate", label: "Graduate (Bachelors Degree)" },
                    { id: "postgraduate", label: "Postgraduate & Higher" },
                  ].map((edu) => (
                    <button
                      key={edu.id}
                      type="button"
                      onClick={() =>
                        setProfile({ ...profile, education: edu.id as any })
                      }
                      className={`w-full flex items-center justify-between p-4 rounded-2xl text-left text-sm font-semibold border transition-all ${
                        profile.education === edu.id
                          ? "bg-[#FFF5EB] border-[#F26B2A] text-[#C2410C]"
                          : "bg-[#F8FAFC] border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <span>{edu.label}</span>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                          profile.education === edu.id
                            ? "border-[#F26B2A] bg-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {profile.education === edu.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#F26B2A]"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 7: Optional Details */}
            {step === 7 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1B33] mb-2">
                    Optional Details
                  </h1>
                  <p className="text-sm text-slate-600">
                    These optional questions unlock specialized affirmative benefits. You can choose &ldquo;Prefer not to say&rdquo; at any time.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Social Category */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Social Category
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: "general", label: "General" },
                        { id: "obc", label: "OBC" },
                        { id: "sc", label: "SC" },
                        { id: "st", label: "ST" },
                        { id: "ews", label: "EWS" },
                        { id: "prefer_not_to_say", label: "Prefer not to say" },
                      ].map((sc) => (
                        <button
                          key={sc.id}
                          type="button"
                          onClick={() =>
                            setProfile({ ...profile, socialCategory: sc.id as any })
                          }
                          className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                            profile.socialCategory === sc.id
                              ? "bg-[#FFF5EB] border-[#F26B2A] text-[#C2410C]"
                              : "bg-[#F8FAFC] border-slate-200 text-slate-700"
                          }`}
                        >
                          {sc.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Disability */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Person with Disability (Divyangjan)?
                    </label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setProfile({ ...profile, hasDisability: true })}
                        className={`px-5 py-3 rounded-xl border text-sm font-semibold ${
                          profile.hasDisability === true
                            ? "bg-[#FFF5EB] border-[#F26B2A] text-[#C2410C]"
                            : "bg-[#F8FAFC] border-slate-200 text-slate-700"
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setProfile({ ...profile, hasDisability: false })}
                        className={`px-5 py-3 rounded-xl border text-sm font-semibold ${
                          profile.hasDisability === false
                            ? "bg-[#FFF5EB] border-[#F26B2A] text-[#C2410C]"
                            : "bg-[#F8FAFC] border-slate-200 text-slate-700"
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  {/* BPL Card */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Do you hold an NFSA / BPL / Antyodaya ration card?
                    </label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setProfile({ ...profile, isBpl: true })}
                        className={`px-5 py-3 rounded-xl border text-sm font-semibold ${
                          profile.isBpl === true
                            ? "bg-[#FFF5EB] border-[#F26B2A] text-[#C2410C]"
                            : "bg-[#F8FAFC] border-slate-200 text-slate-700"
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setProfile({ ...profile, isBpl: false })}
                        className={`px-5 py-3 rounded-xl border text-sm font-semibold ${
                          profile.isBpl === false
                            ? "bg-[#FFF5EB] border-[#F26B2A] text-[#C2410C]"
                            : "bg-[#F8FAFC] border-slate-200 text-slate-700"
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-slate-100 mt-8">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <Link
                  href="/"
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </Link>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-[#F26B2A] hover:bg-[#E05A19] shadow-md shadow-[#F26B2A]/25 transition-all text-sm"
              >
                <span>{step === totalSteps ? "View My Matches" : "Continue"}</span>
                {step === totalSteps ? (
                  <Sparkles className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Privacy Guarantee Note */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 text-center">
            <Shield className="w-4 h-4 text-[#1E9E6A]" />
            <span>
              Your profile is kept strictly in your local browser session and is never sold or shared.
            </span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
