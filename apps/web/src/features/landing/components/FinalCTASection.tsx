"use client";

import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/features/landing/components/AnimatedSection";
import Link from "next/link";

const avatarInitials = ["J", "S", "M", "A", "R"];

export function FinalCTASection() {
  return (
    <section className="bg-black px-6 py-20 text-center lg:px-10">
      <AnimatedSection>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {avatarInitials.map((letter) => (
                <div
                  key={letter}
                  className="flex size-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-white ring-2 ring-black"
                >
                  {letter}
                </div>
              ))}
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-left">
              <p className="font-heading text-lg font-bold text-white">
                50,000+ members
              </p>
              <p className="text-sm text-zinc-500">
                already transforming their lives
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <h2 className="mx-auto mt-8 max-w-3xl font-heading text-5xl font-bold text-white">
          Stop Guessing. Start Training.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-zinc-400">
          Join 50,000+ people who chose results over excuses.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <Button asChild size="lg">
            <Link href="/signup">Download Free</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/30 bg-white/5 text-white hover:bg-white/10"
          >
            <Link href="/pricing">See Pricing</Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-zinc-500">
          No credit card required &bull; 7-day free trial &bull; Cancel anytime
        </p>
      </AnimatedSection>
    </section>
  );
}
