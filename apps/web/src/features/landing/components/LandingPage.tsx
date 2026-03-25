"use client";

import { FeaturesSection } from "@/features/landing/components/FeaturesSection";
import { FinalCTASection } from "@/features/landing/components/FinalCTASection";
import { Footer } from "@/features/landing/components/Footer";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { HowItWorksSection } from "@/features/landing/components/HowItWorksSection";
import { Navbar } from "@/features/landing/components/Navbar";
import { PricingSection } from "@/features/landing/components/PricingSection";
import { ProblemSection } from "@/features/landing/components/ProblemSection";
import { SolutionSection } from "@/features/landing/components/SolutionSection";
import { StatsBar } from "@/features/landing/components/StatsBar";
import { TestimonialsSection } from "@/features/landing/components/TestimonialsSection";

export function LandingPage() {
  return (
    <main className="h-screen overflow-y-auto bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
