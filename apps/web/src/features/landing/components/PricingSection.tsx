"use client";

import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/features/landing/components/AnimatedSection";
import { pricingPlans } from "@/features/landing/constants";
import { cn } from "@/lib/utils";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";

const ctaLinks: Record<string, string> = {
  "Get Started": "/signup",
  "Go Premium": "/signup",
  "Select Teams": "/signup",
};

export function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-background px-6 py-24 md:px-8">
      <div className="pointer-events-none absolute bottom-0 right-0 size-[600px] translate-x-1/2 translate-y-1/2 rounded-full bg-primary/15 opacity-20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <AnimatedSection>
          <div className="mb-16 text-center">
            <h2 className="font-heading text-3xl font-bold text-white md:text-5xl">
              Simple, Honest Pricing
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <AnimatedSection key={plan.name} delay={i * 0.1}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-[2rem] border p-10",
                  plan.featured
                    ? "relative border-2 border-primary bg-card shadow-[0_0_50px_rgba(37,99,235,0.2)]"
                    : "border-border/10 bg-card",
                )}
              >
                {plan.featured && (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary px-4 py-1 text-xs font-black uppercase tracking-widest text-primary-foreground">
                    Most Popular
                  </div>
                )}

                <h3 className="mb-2 text-xl font-bold text-white">
                  {plan.name}
                </h3>
                <div className="mb-8">
                  <span className="text-5xl font-black text-white">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.suffix}</span>
                </div>

                <ul className="mb-10 flex-grow space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={cn(
                        "flex items-center gap-3",
                        plan.featured
                          ? "font-medium text-white"
                          : "text-muted-foreground",
                      )}
                    >
                      <CircleCheckBig
                        className={cn(
                          "size-5 shrink-0",
                          plan.featured
                            ? "fill-success text-success-foreground"
                            : "text-success",
                        )}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="w-full rounded-xl py-4 font-bold"
                  variant={plan.featured ? "default" : "outline"}
                >
                  <Link href={ctaLinks[plan.cta] ?? "/signup"}>
                    {plan.cta}
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
