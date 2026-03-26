"use client";

import { BrandLogo } from "@/components/common/BrandLogo";
import { Activity, Flame, TrendingUp } from "lucide-react";

const glassCard =
  "flex items-center gap-4 rounded-2xl border border-foreground/5 bg-card/40 p-5 shadow-xl backdrop-blur-xl max-w-[85%]";

export function AuthHero() {
  return (
    <section className="relative flex flex-col justify-between overflow-hidden bg-background p-12">
      {/* Glow effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-primary/5 to-transparent" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 size-96 rounded-full bg-primary/15 blur-[100px]" />

      {/* Brand + Headline */}
      <div className="relative z-10">
        <div className="mb-12 flex items-center gap-2.5">
          <BrandLogo size={40} />
          <h1 className="font-heading text-3xl font-extrabold uppercase tracking-tight text-foreground">
            ForgeFit
          </h1>
        </div>
        <div className="max-w-md">
          <h2 className="mb-4 font-heading text-5xl font-bold leading-tight text-foreground">
            Your AI-Powered Fitness Coach
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Precision-engineered workouts tailored to your metabolism and daily
            activity. Elevate your potential.
          </p>
        </div>
      </div>

      {/* Glass stat cards */}
      <div className="relative z-10 space-y-5">
        <div className={`${glassCard} translate-x-8`}>
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-orange-500/20">
            <Flame className="size-5 text-orange-400" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Active Burn
            </p>
            <h3 className="text-xl font-bold text-foreground">
              520 kcal{" "}
              <span className="text-sm font-normal text-muted-foreground">
                burned
              </span>
            </h3>
          </div>
        </div>

        <div
          className={`${glassCard} border-l-4 border-l-success`}
        >
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-success/20">
            <Activity className="size-5 text-success" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Consistency
            </p>
            <h3 className="text-xl font-bold text-foreground">
              12 day streak
            </h3>
          </div>
        </div>

        <div className={`${glassCard} translate-x-14`}>
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/20">
            <TrendingUp className="size-5 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Performance
            </p>
            <h3 className="text-xl font-bold text-foreground">
              Weekly progress{" "}
              <span className="text-success">+15%</span>
            </h3>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center gap-4 text-sm text-muted-foreground">
        <span className="h-px w-8 bg-border" />
        <span>Trusted by 50,000+ athletes worldwide</span>
      </div>
    </section>
  );
}
