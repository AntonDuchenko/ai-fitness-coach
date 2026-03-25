"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/features/landing/components/AnimatedSection";
import { SectionTitle } from "@/features/landing/components/SectionTitle";
import { solutionCards, solutionStats } from "@/features/landing/constants";
import Image from "next/image";

export function SolutionSection() {
  return (
    <section className="bg-slate-50 px-6 py-20 lg:px-10">
      <AnimatedSection>
        <SectionTitle
          eyebrow="THE SOLUTION"
          title="Your Personal AI Coach. Ready in 60 Seconds."
          subtitle="Personalized plans. Real-time coaching. Zero guesswork."
        />
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <div className="mx-auto mt-10 grid max-w-6xl gap-4 rounded-2xl border bg-white p-6 shadow-sm md:grid-cols-3">
          {solutionStats.map((stat) => (
            <div
              key={stat.value}
              className="rounded-xl bg-blue-50 p-5 text-center"
            >
              <p className="font-heading text-4xl font-extrabold text-primary">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <div className="mx-auto mt-8 grid max-w-6xl gap-6 md:grid-cols-[1fr_320px]">
        {solutionCards.slice(0, 2).map((item, i) => (
          <AnimatedSection key={item.title} delay={0.1 * i}>
            <Card className="h-full overflow-hidden">
              <CardContent className="flex h-full flex-col p-6">
                <p className="text-xs font-bold tracking-wide text-primary">
                  {item.badge}
                </p>
                <h3 className="mt-2 font-heading text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <div className="relative mt-4 flex-1 overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={300}
                    className="size-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>

      <div className="mx-auto mt-6 grid max-w-6xl gap-6 md:grid-cols-[320px_1fr]">
        {solutionCards.slice(2).map((item, i) => (
          <AnimatedSection key={item.title} delay={0.1 * i}>
            <Card className="h-full overflow-hidden">
              <CardContent className="flex h-full flex-col p-6">
                <p className="text-xs font-bold tracking-wide text-primary">
                  {item.badge}
                </p>
                <h3 className="mt-2 font-heading text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <div className="relative mt-4 flex-1 overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={300}
                    className="size-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
