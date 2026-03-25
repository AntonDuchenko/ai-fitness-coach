"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/features/landing/components/AnimatedSection";
import { SectionTitle } from "@/features/landing/components/SectionTitle";
import { pricingPlans } from "@/features/landing/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ctaLinks: Record<string, string> = {
  "Get Started": "/signup",
  "Start Free Trial": "/signup",
  "Contact Sales": "/contact",
};

export function PricingSection() {
  return (
    <section id="pricing" className="bg-black px-6 py-20 lg:px-10">
      <AnimatedSection>
        <SectionTitle
          eyebrow="PRICING"
          title="Invest In Your Best Self"
          subtitle="Less than one training session with a personal trainer."
          dark
        />
      </AnimatedSection>
      <AnimatedSection delay={0.15}>
        <Card className="mx-auto mt-8 max-w-5xl border-white/10 bg-zinc-900 text-zinc-100">
          <CardContent className="flex flex-col items-center justify-between gap-2 p-6 text-center text-sm md:flex-row">
            <p className="text-zinc-400">Personal Trainer: $400/mo</p>
            <p className="font-heading text-xl font-bold text-emerald-500">
              You save $381 every month
            </p>
            <p className="text-zinc-400">ForgeFit: $19/mo</p>
          </CardContent>
        </Card>
      </AnimatedSection>
      <div className="mx-auto mt-8 grid max-w-7xl items-end gap-4 lg:grid-cols-3">
        {pricingPlans.map((plan, i) => (
          <AnimatedSection key={plan.name} delay={i * 0.1}>
            <Card
              className={cn(
                "h-full border-white/10 bg-zinc-900 text-zinc-100",
                plan.featured &&
                  "border-primary bg-gradient-to-b from-zinc-800 to-zinc-900",
              )}
            >
              {plan.featured && (
                <div className="py-2 text-center text-xs font-bold tracking-widest text-primary">
                  MOST POPULAR
                </div>
              )}
              <CardContent className="space-y-5 p-8">
                <p
                  className={cn(
                    "text-xs font-semibold tracking-widest text-zinc-400",
                    plan.featured && "text-primary",
                  )}
                >
                  {plan.name}
                </p>
                <div>
                  <p className="font-heading text-6xl font-bold">
                    {plan.price}
                  </p>
                  <p className="text-zinc-400">{plan.suffix}</p>
                </div>
                <ul className="space-y-2 text-sm text-zinc-200">
                  {plan.features.map((f) => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="w-full"
                  variant={plan.featured ? "default" : "outline"}
                >
                  <Link href={ctaLinks[plan.cta] ?? "/signup"}>
                    {plan.cta}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
