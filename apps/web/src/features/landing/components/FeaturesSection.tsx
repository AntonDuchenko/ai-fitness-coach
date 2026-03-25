"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/features/landing/components/AnimatedSection";
import { SectionTitle } from "@/features/landing/components/SectionTitle";
import { featureCards } from "@/features/landing/constants";

export function FeaturesSection() {
  return (
    <section id="features" className="bg-blue-50 px-6 py-20 lg:px-10">
      <AnimatedSection>
        <SectionTitle
          eyebrow="FEATURES"
          title="Everything Your Trainer Would Do - And More"
          subtitle="Six powerful tools working together to deliver real, lasting results."
        />
      </AnimatedSection>
      <div className="mx-auto mt-10 grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featureCards.map((feature, i) => (
          <AnimatedSection key={feature.title} delay={i * 0.08}>
            <Card className="h-full">
              <CardContent className="space-y-4 p-6">
                <feature.icon className="size-8 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500">
                  {feature.description}
                </p>
                <p className="text-xs font-semibold text-primary">
                  {feature.tag}
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
