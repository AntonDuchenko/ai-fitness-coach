"use client";

import { cn } from "@/lib/utils";
import { Check, Info } from "lucide-react";
import type { OnboardingData } from "../types";

interface StepLimitationsProps {
  data: OnboardingData;
  onUpdate: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K],
  ) => void;
  onToggle: (key: "dietaryRestrictions", value: string) => void;
}

const DIETARY_OPTIONS = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "lactose_intolerant", label: "Lactose Intolerant" },
  { value: "gluten_free", label: "Gluten Free" },
];

export function StepLimitations({
  data,
  onUpdate,
  onToggle,
}: StepLimitationsProps) {
  return (
    <div className="space-y-8">
      {/* Info Banner */}
      <div className="flex items-center gap-3 rounded-xl border border-m3-primary/20 bg-m3-primary/10 p-4">
        <Info className="size-5 shrink-0 text-m3-primary" />
        <p className="text-sm font-medium text-m3-primary">
          All fields are optional
        </p>
      </div>

      {/* Text Inputs */}
      <div className="space-y-6">
        <div>
          <label
            htmlFor="injuries"
            className="mb-3 ml-1 block text-sm font-semibold tracking-wide text-m3-on-surface"
          >
            Recent Injuries
          </label>
          <textarea
            id="injuries"
            value={data.injuries}
            onChange={(e) => onUpdate("injuries", e.target.value)}
            placeholder="e.g. Lower back pain, sprained ankle..."
            rows={2}
            className="w-full resize-none rounded-xl border-none bg-m3-surface-lowest p-4 text-m3-on-surface placeholder:text-m3-outline/50 focus:outline-none focus:ring-2 focus:ring-m3-primary/40"
          />
        </div>
        <div>
          <label
            htmlFor="medicalConditions"
            className="mb-3 ml-1 block text-sm font-semibold tracking-wide text-m3-on-surface"
          >
            Medical Conditions
          </label>
          <textarea
            id="medicalConditions"
            value={data.medicalConditions}
            onChange={(e) => onUpdate("medicalConditions", e.target.value)}
            placeholder="e.g. Asthma, Hypertension..."
            rows={2}
            className="w-full resize-none rounded-xl border-none bg-m3-surface-lowest p-4 text-m3-on-surface placeholder:text-m3-outline/50 focus:outline-none focus:ring-2 focus:ring-m3-primary/40"
          />
        </div>
      </div>

      {/* Dietary Restrictions */}
      <div>
        <span className="mb-4 ml-1 block text-sm font-semibold tracking-wide text-m3-on-surface">
          Dietary Restrictions
        </span>
        <div className="grid grid-cols-2 gap-4">
          {DIETARY_OPTIONS.map((item) => {
            const active = data.dietaryRestrictions.includes(item.value);
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onToggle("dietaryRestrictions", item.value)}
                className={cn(
                  "flex flex-col items-start rounded-xl border-2 p-4 text-left transition-all",
                  active
                    ? "border-m3-secondary/40 bg-m3-secondary/10"
                    : "border-transparent bg-m3-surface-high hover:bg-m3-surface-highest",
                )}
              >
                <div className="mb-3 flex w-full justify-end">
                  <div
                    className={cn(
                      "flex size-5 items-center justify-center rounded-full border-2 transition-colors",
                      active
                        ? "border-m3-secondary bg-m3-secondary"
                        : "border-m3-outline-variant",
                    )}
                  >
                    {active && <Check className="size-3 text-white" />}
                  </div>
                </div>
                <span className="text-sm font-semibold text-m3-on-surface">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
