"use client";

import { AnimatedSection } from "@/features/landing/components/AnimatedSection";
import { problemCards } from "@/features/landing/constants";
import { cn } from "@/lib/utils";

export function ProblemSection() {
  return (
    <section className="bg-gradient-to-b from-card to-background px-6 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection>
          <div className="mb-16 text-center md:mb-20">
            <h2 className="mb-6 font-heading text-3xl font-bold text-white md:text-5xl">
              Why Traditional Fitness{" "}
              <span className="text-destructive">Fails</span> Most People
            </h2>
            <p className="mx-auto hidden max-w-2xl text-lg leading-relaxed text-muted-foreground md:block">
              Most programs are designed for the &ldquo;average person,&rdquo;
              but nobody is average. That&rsquo;s why traditional methods often
              lead to plateaus and frustration.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {problemCards.map((card, i) => (
            <AnimatedSection key={card.title} delay={i * 0.1}>
              {/* Mobile: border-l card */}
              <div className="rounded-2xl border-l-4 border-primary bg-card p-8 shadow-xl md:hidden">
                <card.icon className="mb-4 size-7 text-primary" />
                <h3 className="mb-3 font-heading text-xl font-bold text-white">
                  {card.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </div>
              {/* Desktop: icon card */}
              <div className="group hidden h-full flex-col rounded-3xl bg-card p-10 transition-all duration-300 hover:bg-accent md:flex">
                <div className={cn("mb-8 flex size-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110", card.iconBg, card.iconColor)}>
                  <card.icon className="size-7" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">
                  {card.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
