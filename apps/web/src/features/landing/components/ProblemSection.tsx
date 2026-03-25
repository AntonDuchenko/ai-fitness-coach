"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/features/landing/components/AnimatedSection";
import { SectionTitle } from "@/features/landing/components/SectionTitle";
import { problemCards } from "@/features/landing/constants";

export function ProblemSection() {
  return (
    <section className="bg-gradient-to-b from-zinc-800 to-black px-6 py-20 lg:px-10">
      <AnimatedSection>
        <SectionTitle
          eyebrow="THE PROBLEM"
          title="Why 73% Never Reach Their Goals"
          subtitle="Traditional fitness is expensive, generic, and leaves you without support when it matters most."
          dark
        />
      </AnimatedSection>
      <div className="mx-auto mt-12 grid max-w-7xl gap-4">
        {problemCards.map((card, i) => (
          <AnimatedSection key={card.title} delay={i * 0.1}>
            <Card className="border-red-500/20 bg-zinc-950/90 text-zinc-100">
              <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-4xl">
                  <h3 className="font-heading text-2xl font-bold">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {card.description}
                  </p>
                </div>
                <div className="min-w-32 text-left md:text-right">
                  <p className="font-heading text-4xl font-extrabold text-primary">
                    {card.metric}
                  </p>
                  <p className="text-xs uppercase tracking-wide text-zinc-400">
                    {card.metricLabel}
                  </p>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
