"use client";

import { cn } from "@/lib/utils";
import { Check, Dumbbell, Flame, Salad, Zap } from "lucide-react";
import type { StepErrors } from "../schemas";
import type { OnboardingData } from "../types";

interface StepGoalsProps {
  data: OnboardingData;
  errors: StepErrors;
  onUpdate: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K],
  ) => void;
  onToggle: (key: "secondaryGoals", value: string) => void;
}

const PRIMARY_GOALS = [
  {
    value: "lose_weight" as const,
    label: "Lose Weight",
    desc: "Burn fat and optimize body composition.",
    icon: Flame,
  },
  {
    value: "build_muscle" as const,
    label: "Build Muscle",
    desc: "Increase strength and aesthetics.",
    icon: Dumbbell,
  },
  {
    value: "get_fit" as const,
    label: "Get Fit",
    desc: "Improve endurance and cardio health.",
    icon: Zap,
  },
  {
    value: "eat_healthier" as const,
    label: "Eat Healthier",
    desc: "Nourish your body with better nutrition.",
    icon: Salad,
  },
];

const SECONDARY_GOALS = [
  { value: "improve_flexibility", label: "Flexibility" },
  { value: "reduce_stress", label: "Stress" },
  { value: "better_sleep", label: "Sleep" },
  { value: "more_energy", label: "Energy" },
];

export function StepGoals({
  data,
  errors,
  onUpdate,
  onToggle,
}: StepGoalsProps) {
  return (
    <div className="space-y-10">
      {/* Primary Goals */}
      <div
        className="grid grid-cols-2 gap-4"
        role="radiogroup"
        aria-label="Primary goal"
      >
        {PRIMARY_GOALS.map((goal) => {
          const sel = data.primaryGoal === goal.value;
          const Icon = goal.icon;
          return (
            <button
              key={goal.value}
              type="button"
              aria-checked={sel}
              onClick={() => onUpdate("primaryGoal", goal.value)}
              className={cn(
                "relative flex flex-col items-start rounded-xl p-5 text-left transition-all duration-300 active:scale-95",
                sel
                  ? "border-2 border-m3-primary-container bg-m3-primary-container/10"
                  : "glass-card border border-white/5 hover:border-m3-primary-container/40",
              )}
            >
              {sel && (
                <Check className="absolute right-2 top-2 size-5 text-m3-primary-container" />
              )}
              <div
                className={cn(
                  "mb-5 flex size-11 items-center justify-center rounded-lg",
                  sel ? "bg-m3-primary-container" : "bg-m3-surface-high",
                )}
              >
                <Icon
                  className={cn(
                    "size-5",
                    sel
                      ? "text-m3-on-primary-container"
                      : "text-m3-primary-container",
                  )}
                />
              </div>
              <h3 className="font-heading text-lg font-bold">{goal.label}</h3>
              <p className="mt-1 text-xs leading-snug text-m3-outline">
                {goal.desc}
              </p>
            </button>
          );
        })}
      </div>
      {errors.primaryGoal && (
        <p className="text-xs text-destructive">{errors.primaryGoal}</p>
      )}

      {/* Secondary Goals */}
      <div>
        <h4 className="mb-5 flex items-center gap-2 font-heading text-lg font-bold">
          Secondary focuses
          <span className="rounded-full bg-m3-surface-container px-2 py-0.5 text-xs font-medium uppercase tracking-widest text-m3-outline">
            Multi-select
          </span>
        </h4>
        <div className="flex flex-wrap gap-3">
          {SECONDARY_GOALS.map((goal) => {
            const active = data.secondaryGoals.includes(goal.value);
            return (
              <button
                key={goal.value}
                type="button"
                onClick={() => onToggle("secondaryGoals", goal.value)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "border border-m3-primary-container/50 bg-m3-primary-container/20 text-m3-primary"
                    : "border border-white/5 bg-m3-surface-high text-m3-outline hover:bg-m3-surface-highest",
                )}
              >
                {goal.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
