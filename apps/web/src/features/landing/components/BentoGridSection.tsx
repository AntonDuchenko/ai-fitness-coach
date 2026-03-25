"use client";

import { AnimatedSection } from "@/features/landing/components/AnimatedSection";
import { bentoItems } from "@/features/landing/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";

const smallCardBg = ["bg-emerald-50", "bg-blue-50"] as const;

export function BentoGridSection() {
  let smallIndex = 0;

  return (
    <section id="features" className="bg-slate-50 px-6 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection>
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-heading text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              Meet ForgeFit: Your AI-Powered Coach
            </h2>
            <p className="font-medium text-slate-500">
              The sophisticated coaching of a pro, powered by advanced artificial
              intelligence.
            </p>
          </div>
        </AnimatedSection>

        {/* Mobile: simple vertical stack */}
        <div className="flex flex-col gap-6 md:hidden">
          {bentoItems.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1}>
              <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                <h3 className="mb-4 font-heading text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mb-8 text-slate-600">{item.description}</p>
                <div className="overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={300}
                    unoptimized
                    className="h-48 w-full object-cover"
                  />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Desktop: bento grid */}
        <div className="hidden auto-rows-[300px] grid-cols-12 gap-6 md:grid">
          {bentoItems.map((item, i) => {
            const bg =
              item.span === "small"
                ? smallCardBg[smallIndex++ % smallCardBg.length]
                : "bg-white";

            return (
              <AnimatedSection
                key={item.title}
                delay={i * 0.1}
                className={cn(
                  item.span === "large" ? "md:col-span-8" : "md:col-span-4",
                )}
              >
                <BentoCard item={item} index={i} bg={bg} />
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  item,
  index,
  bg,
}: {
  item: (typeof bentoItems)[number];
  index: number;
  bg: string;
}) {
  const isReversed = index === 3;

  return (
    <div
      className={cn(
        "group relative h-full overflow-hidden rounded-[2rem] border border-slate-200/50 p-8 shadow-sm",
        bg,
      )}
    >
      <div
        className={cn(
          "relative z-10",
          item.span === "large" ? "w-1/2" : "w-3/5",
          isReversed && "ml-auto text-right",
        )}
      >
        <h3 className="mb-3 text-2xl font-bold text-slate-900">
          {item.title}
        </h3>
        <p className="text-slate-700">
          {item.description}
        </p>
      </div>

      <div
        className={cn(
          "absolute overflow-hidden shadow-2xl transition-transform duration-500",
          item.span === "small"
            ? "bottom-[-20%] right-[-20%] w-3/5 rounded-2xl group-hover:-translate-y-2"
            : isReversed
              ? "bottom-0 left-0 w-[48%] -translate-x-6 translate-y-6 rounded-tr-3xl group-hover:scale-105"
              : "bottom-0 right-0 w-[48%] translate-x-6 translate-y-6 rounded-tl-3xl group-hover:scale-105",
        )}
      >
        <Image
          src={item.image}
          alt={item.title}
          width={500}
          height={300}
          unoptimized
          className="size-full object-cover"
        />
      </div>
    </div>
  );
}
