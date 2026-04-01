"use client";

import { cn } from "@/lib/utils";
import type { StepErrors } from "../schemas";
import type { OnboardingData } from "../types";

interface StepMotivationProps {
  data: OnboardingData;
  errors: StepErrors;
  onUpdate: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K],
  ) => void;
  onToggle: (key: "biggestChallenges", value: string) => void;
}

const CHALLENGES = [
  { value: "staying_consistent", label: "Staying Consistent" },
  { value: "finding_time", label: "Finding Time" },
  { value: "sticking_with_a_diet", label: "Sticking With a Diet" },
];

export function StepMotivation({
  data,
  errors,
  onUpdate,
  onToggle,
}: StepMotivationProps) {
  return (
    <div className="space-y-10">
      {/* Why */}
      <div className="space-y-4">
        <label
          htmlFor="motivation"
          className="font-heading text-xl font-semibold"
        >
          Why are you starting?
        </label>
        <textarea
          id="motivation"
          value={data.motivation}
          onChange={(e) => onUpdate("motivation", e.target.value)}
          placeholder="e.g. I want to feel stronger for my kids, or I'm training for my first 5k..."
          aria-invalid={!!errors.motivation}
          className="min-h-[140px] w-full resize-none rounded-xl border border-m3-outline-variant/15 bg-m3-surface-lowest p-5 text-m3-on-surface placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-m3-primary/40"
        />
        {errors.motivation && (
          <p className="text-xs text-destructive">{errors.motivation}</p>
        )}
      </div>

      {/* Previous Attempts */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="font-heading text-xl font-semibold">
            Tried before?
          </span>
          <div className="flex rounded-full border border-m3-outline-variant/10 bg-m3-surface-lowest p-1">
            <button
              type="button"
              onClick={() => onUpdate("previousAttempts", false)}
              className={cn(
                "rounded-full px-6 py-2 text-sm font-bold transition-all",
                !data.previousAttempts
                  ? "bg-m3-primary-container text-m3-on-primary-container shadow-lg"
                  : "text-zinc-500 hover:text-m3-on-surface",
              )}
            >
              No
            </button>
            <button
              type="button"
              onClick={() => onUpdate("previousAttempts", true)}
              className={cn(
                "rounded-full px-6 py-2 text-sm font-bold transition-all",
                data.previousAttempts
                  ? "bg-m3-primary-container text-m3-on-primary-container shadow-lg"
                  : "text-zinc-500 hover:text-m3-on-surface",
              )}
            >
              Yes
            </button>
          </div>
        </div>

        {data.previousAttempts && (
          <div className="glass-card space-y-4 rounded-2xl border border-white/5 p-6">
            <label
              htmlFor="prevDetails"
              className="text-sm font-medium uppercase tracking-wider text-m3-primary"
            >
              What happened?
            </label>
            <textarea
              id="prevDetails"
              value={data.previousAttemptsDetails}
              onChange={(e) =>
                onUpdate("previousAttemptsDetails", e.target.value)
              }
              placeholder="Tell us about your previous experience..."
              rows={3}
              className="w-full resize-none rounded-xl border-none bg-white/5 p-4 text-m3-on-surface placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-m3-primary/40"
            />
          </div>
        )}
      </div>

      {/* Biggest Challenges */}
      <div className="space-y-5">
        <span className="font-heading text-xl font-semibold">
          Biggest Challenges
        </span>
        <div className="flex flex-wrap gap-3">
          {CHALLENGES.map((c) => {
            const active = data.biggestChallenges.includes(c.value);
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => onToggle("biggestChallenges", c.value)}
                className={cn(
                  "rounded-full border px-5 py-3 text-sm font-medium transition-all",
                  active
                    ? "border-m3-primary/40 bg-m3-primary-container/10 text-m3-primary"
                    : "border-m3-outline-variant/20 bg-m3-surface-low text-m3-outline hover:border-m3-primary/40",
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
