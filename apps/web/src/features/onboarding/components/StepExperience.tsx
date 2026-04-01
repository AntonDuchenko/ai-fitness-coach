"use client";

import { cn } from "@/lib/utils";
import { Dumbbell, UtensilsCrossed } from "lucide-react";
import type { StepErrors } from "../schemas";
import type { OnboardingData } from "../types";

interface StepExperienceProps {
  data: OnboardingData;
  errors: StepErrors;
  onUpdate: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K],
  ) => void;
}

const FITNESS_LEVELS = [
  {
    value: "beginner",
    label: "Beginner",
    desc: "New to working out or back after a long break.",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    desc: "Regularly active for 6-12 months.",
  },
  {
    value: "advanced",
    label: "Advanced",
    desc: "Consistent training for 2+ years.",
  },
  {
    value: "athlete",
    label: "Athlete",
    desc: "Competitive or professional standards.",
  },
];

const NUTRITION_LEVELS = [
  { value: "none", label: "None" },
  { value: "basic", label: "Basic" },
  { value: "good", label: "Good" },
  { value: "expert", label: "Expert" },
];

export function StepExperience({
  data,
  errors,
  onUpdate,
}: StepExperienceProps) {
  return (
    <div className="space-y-12">
      {/* Fitness Level */}
      <section>
        <div className="mb-5 flex items-center gap-3">
          <Dumbbell className="size-5 text-m3-primary" />
          <h2 className="font-heading text-xl font-bold">Fitness Level</h2>
        </div>
        <div className="space-y-3" role="radiogroup" aria-label="Fitness level">
          {FITNESS_LEVELS.map((l) => {
            const sel = data.fitnessLevel === l.value;
            return (
              <button
                key={l.value}
                type="button"
                aria-checked={sel}
                onClick={() => onUpdate("fitnessLevel", l.value)}
                className={cn(
                  "glass-card flex w-full items-center justify-between rounded-xl border p-5 text-left transition-all duration-300",
                  sel
                    ? "border-m3-primary-container/60 bg-m3-primary-container/10"
                    : "border-m3-outline-variant/20 hover:bg-white/5",
                )}
              >
                <div>
                  <h3 className="font-heading font-bold text-m3-on-surface">
                    {l.label}
                  </h3>
                  <p className="text-sm text-m3-outline">{l.desc}</p>
                </div>
                <RadioDot selected={sel} color="primary" />
              </button>
            );
          })}
        </div>
        {errors.fitnessLevel && (
          <p className="mt-2 text-xs text-destructive">{errors.fitnessLevel}</p>
        )}
      </section>

      {/* Nutrition Knowledge */}
      <section>
        <div className="mb-5 flex items-center gap-3">
          <UtensilsCrossed className="size-5 text-m3-secondary" />
          <h2 className="font-heading text-xl font-bold">
            Nutrition Knowledge
          </h2>
        </div>
        <div
          className="space-y-3"
          role="radiogroup"
          aria-label="Nutrition knowledge"
        >
          {NUTRITION_LEVELS.map((l) => {
            const sel = data.nutritionKnowledge === l.value;
            return (
              <button
                key={l.value}
                type="button"
                aria-checked={sel}
                onClick={() => onUpdate("nutritionKnowledge", l.value)}
                className={cn(
                  "glass-card flex w-full items-center justify-between rounded-xl border p-5 text-left transition-all duration-300",
                  sel
                    ? "border-m3-secondary/60 bg-m3-secondary/10"
                    : "border-m3-outline-variant/20 hover:bg-white/5",
                )}
              >
                <h3 className="font-heading font-bold text-m3-on-surface">
                  {l.label}
                </h3>
                <RadioDot selected={sel} color="secondary" />
              </button>
            );
          })}
        </div>
        {errors.nutritionKnowledge && (
          <p className="mt-2 text-xs text-destructive">
            {errors.nutritionKnowledge}
          </p>
        )}
      </section>
    </div>
  );
}

function RadioDot({
  selected,
  color,
}: { selected: boolean; color: "primary" | "secondary" }) {
  const ring =
    color === "primary"
      ? "border-m3-primary-container bg-m3-primary-container"
      : "border-m3-secondary bg-m3-secondary";
  const dot = color === "primary" ? "bg-m3-on-primary-container" : "bg-white";
  return (
    <div
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-full border-2",
        selected ? ring : "border-m3-outline-variant",
      )}
    >
      {selected && <div className={cn("size-2 rounded-full", dot)} />}
    </div>
  );
}
