"use client";

import { GuestRoute } from "@/components/common/GuestRoute";
import { BentoGridSection } from "@/features/landing/components/BentoGridSection";
import { FAQSection } from "@/features/landing/components/FAQSection";
import { FinalCTASection } from "@/features/landing/components/FinalCTASection";
import { Footer } from "@/features/landing/components/Footer";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { HowItWorksSection } from "@/features/landing/components/HowItWorksSection";
import { Navbar } from "@/features/landing/components/Navbar";
import { PricingSection } from "@/features/landing/components/PricingSection";
import { ProblemSection } from "@/features/landing/components/ProblemSection";
import { ScrollToTop } from "@/features/landing/components/ScrollToTop";
import { StatsBar } from "@/features/landing/components/StatsBar";
import { TestimonialsSection } from "@/features/landing/components/TestimonialsSection";

export function LandingPage() {
  return (
    <GuestRoute>
    <main className="h-screen overflow-y-auto bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <ProblemSection />
      <BentoGridSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
      <ScrollToTop />
    </main>
    </GuestRoute>
  );
}
