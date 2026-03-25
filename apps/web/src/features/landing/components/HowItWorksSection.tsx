"use client";

import { AnimatedSection } from "@/features/landing/components/AnimatedSection";
import { steps } from "@/features/landing/constants";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white px-6 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection>
          <div className="mb-16 text-center md:mb-20">
            <h2 className="font-heading text-3xl font-bold text-slate-900 md:text-5xl">
              How It Works
            </h2>
          </div>
        </AnimatedSection>

        {/* Mobile: horizontal layout with left connector */}
        <div className="relative flex flex-col gap-12 md:hidden">
          <div className="absolute bottom-10 left-10 top-10 -z-10 w-0.5 bg-slate-100" />
          {steps.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 0.15}>
              <div className="flex items-start gap-6">
                <div className="flex size-20 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-white text-2xl font-black text-primary shadow-xl shadow-primary/10">
                  {step.number}
                </div>
                <div>
                  <h3 className="mb-2 font-heading text-xl font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-slate-500">{step.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Desktop: centered columns */}
        <div className="relative hidden items-center justify-between gap-12 md:flex">
          <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-slate-100" />
          {steps.map((step, i) => (
            <AnimatedSection
              key={step.number}
              delay={i * 0.15}
              className="relative z-10 flex max-w-sm flex-col items-center text-center"
            >
              <div className="mb-8 flex size-20 items-center justify-center rounded-full bg-primary text-3xl font-black text-white shadow-xl shadow-primary/30">
                {step.number}
              </div>
              <h3 className="mb-4 text-2xl font-bold text-slate-900">
                {step.title}
              </h3>
              <p className="font-medium text-slate-500">
                {step.description}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
