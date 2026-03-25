"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/features/landing/components/AnimatedSection";
import { SectionTitle } from "@/features/landing/components/SectionTitle";
import { testimonials } from "@/features/landing/constants";

export function TestimonialsSection() {
  return (
    <section className="bg-slate-50 px-6 py-20 lg:px-10">
      <AnimatedSection>
        <SectionTitle
          eyebrow="SUCCESS STORIES"
          title="Real People. Real Results."
          subtitle="Not influencers. Not actors. Just everyday people who showed up."
        />
      </AnimatedSection>
      <div className="mx-auto mt-10 grid max-w-7xl gap-4 md:grid-cols-3">
        {testimonials.map((item, i) => (
          <AnimatedSection key={item.author} delay={i * 0.1}>
            <Card className="h-full">
              <CardContent className="space-y-4 p-6">
                <p className="font-heading text-5xl font-extrabold text-emerald-500">
                  {item.result}
                </p>
                <p className="text-amber-500" aria-label="5 stars">
                  ★★★★★
                </p>
                <p className="text-sm italic leading-relaxed text-slate-700">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div>
                  <p className="font-heading text-sm font-bold text-slate-900">
                    {item.author}
                  </p>
                  <p className="text-xs text-slate-500">{item.meta}</p>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
