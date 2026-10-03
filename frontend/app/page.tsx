"use client";

import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { CategoriesSection } from "@/components/landing/CategoriesSection";
import { PersonalizedSection } from "@/components/landing/PersonalizedSection";
import { MitraSection } from "@/components/landing/MitraSection";
import { DocumentsSection } from "@/components/landing/DocumentsSection";
import { FeaturedSection } from "@/components/landing/FeaturedSection";
import { SocialProofSection } from "@/components/landing/SocialProofSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { CtaBand } from "@/components/landing/CtaBand";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7EE]">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <TrustStrip />
        <HowItWorksSection />
        <CategoriesSection />
        <PersonalizedSection />
        <MitraSection />
        <DocumentsSection />
        <FeaturedSection />
        <SocialProofSection />
        <FaqSection />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
