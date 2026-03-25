"use client";

import { AnimatedSection } from "@/features/landing/components/AnimatedSection";
import { heroStats } from "@/features/landing/constants";

export function StatsBar() {
  return (
    <section className="overflow-hidden bg-card px-6 py-12 md:px-8 md:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 lg:grid-cols-4">
        {heroStats.map((stat, i) => (
          <AnimatedSection key={stat.label} delay={i * 0.1}>
            <div className="group flex flex-col gap-1 text-center">
              <div className="mb-2 hidden text-primary transition-transform group-hover:scale-110 md:block">
                <stat.icon className="mx-auto size-9" />
              </div>
              <p className="text-3xl font-black text-primary md:text-4xl md:text-white">
                {stat.value}
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground md:text-sm md:tracking-wide">
                {stat.label}
              </p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
