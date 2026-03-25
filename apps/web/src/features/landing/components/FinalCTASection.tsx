"use client";

import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/features/landing/components/AnimatedSection";
import { ctaAvatars } from "@/features/landing/constants";
import Image from "next/image";
import Link from "next/link";

export function FinalCTASection() {
  return (
    <section className="relative overflow-hidden bg-primary px-6 py-24 md:px-8">
      {/* Decorative SVG */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <svg
          className="size-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <path
            d="M0 100 Q 50 0 100 100"
            fill="transparent"
            stroke="white"
            strokeWidth="0.5"
          />
          <path
            d="M0 80 Q 50 -20 100 80"
            fill="transparent"
            stroke="white"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <AnimatedSection>
          <div className="mb-10 flex justify-center -space-x-4">
            {ctaAvatars.map((avatar) => (
              <Image
                key={avatar.alt}
                src={avatar.src}
                alt={avatar.alt}
                width={64}
                height={64}
                unoptimized
                className="size-12 rounded-full border-2 border-primary object-cover shadow-xl md:size-16 md:border-4"
              />
            ))}
            <div className="flex size-12 items-center justify-center rounded-full border-2 border-primary bg-white text-sm font-black text-primary shadow-xl md:size-16 md:border-4 md:text-base">
              +2K
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <h2 className="mb-6 font-heading text-4xl font-black leading-tight text-white md:text-6xl">
            Stop Guessing. Start Seeing Results.
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-primary-foreground/80">
            Join thousands of athletes who have ditched generic plans for the
            precision of ForgeFit.
          </p>
          <Button
            asChild
            size="lg"
            className="w-full rounded-2xl bg-white px-8 py-6 text-xl font-black text-primary shadow-2xl hover:bg-white/90 md:w-auto md:px-12 md:text-2xl"
          >
            <Link href="/signup">Claim Your Free 14-Day Trial</Link>
          </Button>
          <p className="mt-6 text-sm font-medium text-primary-foreground/60">
            No credit card required &bull; Cancel anytime
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
