"use client";

import { Card } from "@/components/ui/card";
import { AnimatedSection } from "@/features/landing/components/AnimatedSection";
import { SectionTitle } from "@/features/landing/components/SectionTitle";
import { steps } from "@/features/landing/constants";
import Image from "next/image";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-black px-6 py-20 lg:px-10">
      <AnimatedSection>
        <SectionTitle
          eyebrow="HOW IT WORKS"
          title="Get Started in 3 Simple Steps"
          subtitle="From zero to your first AI-powered workout in under 5 minutes"
          dark
        />
      </AnimatedSection>
      <div className="mx-auto mt-10 grid max-w-7xl gap-5 md:grid-cols-3">
        {steps.map((step, i) => (
          <AnimatedSection key={step.step} delay={i * 0.15}>
            <Card className="relative h-full overflow-hidden border-white/5 bg-zinc-950 text-zinc-100">
              <div className="h-1 w-full bg-gradient-to-r from-red-500 to-red-400" />
              <p className="pointer-events-none absolute -left-3 -top-8 font-heading text-[11rem] font-extrabold leading-none text-white/[0.03]">
                {step.watermark}
              </p>
              <div className="relative space-y-4 p-8">
                <span className="inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-bold tracking-[0.14em] text-primary">
                  {step.step}
                </span>
                <div className="flex size-[72px] items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-400 shadow-lg shadow-primary/40">
                  <step.icon className="size-8 text-white" />
                </div>
                <h3 className="font-heading text-xl font-bold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {step.description}
                </p>
              </div>
              <div className="relative h-32 w-full overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
