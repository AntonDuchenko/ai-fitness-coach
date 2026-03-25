"use client";

import { AnimatedSection } from "@/features/landing/components/AnimatedSection";
import { testimonials } from "@/features/landing/constants";
import { CircleCheckBig, Star } from "lucide-react";
import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-white px-6 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection>
          <div className="mb-16 text-center">
            <h2 className="font-heading text-3xl font-bold text-slate-900 md:text-5xl">
              Real Results
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <AnimatedSection key={item.author} delay={i * 0.1}>
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-8">
                {/* Mobile: avatar+name first, then stars, then quote */}
                <div className="mb-6 flex items-center gap-4 md:hidden">
                  <Image
                    src={item.avatar}
                    alt={item.author}
                    width={56}
                    height={56}
                    unoptimized
                    className="size-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-slate-900">{item.author}</p>
                    <div className="flex items-center gap-1 text-success">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="size-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Desktop: stars first */}
                <div className="mb-4 hidden items-center gap-1 text-success md:flex">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="size-5 fill-current" />
                  ))}
                </div>

                <p className="mb-8 text-lg italic text-slate-700 md:mb-8">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Desktop: author at bottom */}
                <div className="hidden items-center gap-4 md:flex">
                  <Image
                    src={item.avatar}
                    alt={item.author}
                    width={56}
                    height={56}
                    unoptimized
                    className="size-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="flex items-center gap-2 font-bold text-slate-900">
                      {item.author}
                      <CircleCheckBig className="size-4 text-primary" />
                    </p>
                    <p className="text-xs text-slate-500">{item.meta}</p>
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
