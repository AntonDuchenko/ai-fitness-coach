"use client";

import { AnimatedSection } from "@/features/landing/components/AnimatedSection";
import { faqItems } from "@/features/landing/constants";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-slate-50 px-6 py-24 md:px-8">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection>
          <h2 className="mb-12 text-center font-heading text-3xl font-bold text-slate-900 md:text-4xl">
            Frequently Asked Questions
          </h2>
        </AnimatedSection>

        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <AnimatedSection key={item.question} delay={i * 0.05}>
              <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between px-6 py-6 text-left text-sm font-bold text-slate-900 md:px-8 md:text-lg"
                  aria-expanded={openIndex === i}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-slate-400 transition-transform duration-200",
                      openIndex === i && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300",
                    openIndex === i
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 font-medium leading-relaxed text-slate-600 md:px-8">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
