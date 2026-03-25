"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/features/landing/components/AnimatedSection";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="overflow-hidden bg-black px-6 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <AnimatedSection>
          <Badge className="border-primary/30 bg-primary/10 text-primary hover:bg-transparent">
            POWERED BY AI
          </Badge>
          <h1 className="mt-6 font-heading text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl">
            YOUR AI TRAINER.
          </h1>
          <p className="font-heading text-5xl font-extrabold leading-[0.95] tracking-tight text-primary sm:text-7xl">
            ALWAYS ON.
          </p>
          <p className="mt-6 max-w-xl text-lg text-zinc-300">
            Get personalized workout plans, nutrition guidance, and 24/7 expert
            advice for $20/month instead of $400
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 bg-white/5 text-white hover:bg-white/10"
            >
              <Link href="/pricing">See Pricing</Link>
            </Button>
          </div>
          <p className="mt-5 text-sm text-zinc-400">
            ✓ Join 50,000+ people transforming their lives
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="relative">
          <div className="pointer-events-none absolute -left-12 top-5 size-[700px] rounded-full bg-red-500/[0.24] blur-[80px]" />

          <div className="relative rotate-[4deg] overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900 shadow-[_-20px_40px_80px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-2 bg-[#252525] px-4 py-2.5">
              <span className="size-3 rounded-full bg-[#FF5F57]" />
              <span className="size-3 rounded-full bg-[#FEBC2E]" />
              <span className="size-3 rounded-full bg-[#28C840]" />
              <span className="ml-4 text-xs text-zinc-400">
                app.aifitness.com/dashboard
              </span>
            </div>
            <Image
              src="/images/landing/hero-dashboard.jpg"
              alt="ForgeFit dashboard showing workout plans, nutrition tracking, and progress charts"
              width={640}
              height={400}
              className="w-full object-cover"
              priority
            />
          </div>

          <div className="pointer-events-none absolute bottom-0 left-1/2 size-96 -translate-x-1/4 rounded-full bg-red-500/[0.12] blur-[80px]" />
        </AnimatedSection>
      </div>
    </section>
  );
}
