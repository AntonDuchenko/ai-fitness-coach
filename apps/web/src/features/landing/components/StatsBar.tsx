"use client";

import { AnimatedSection } from "@/features/landing/components/AnimatedSection";
import { heroStats } from "@/features/landing/constants";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");
  const numericPart = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numericPart;
      setDisplay(
        Number.isInteger(numericPart)
          ? Math.round(current).toString()
          : current.toFixed(1),
      );
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, numericPart]);

  return (
    <p ref={ref} className="font-heading text-5xl font-bold text-white">
      {display}
      {suffix}
    </p>
  );
}

export function StatsBar() {
  return (
    <section className="border-t border-white/10 bg-zinc-950 px-6 py-10 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-4">
        {heroStats.map((stat, i) => (
          <AnimatedSection key={stat.label} delay={i * 0.1}>
            <div className="flex flex-col items-center gap-2 border-white/10 text-center lg:border-r lg:last:border-r-0">
              <stat.icon className="size-7 text-white" />
              <AnimatedNumber value={stat.value} />
              <p className="text-xs font-medium tracking-[0.12em] text-zinc-400">
                {stat.label}
              </p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
