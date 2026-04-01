"use client";

import { cn } from "@/lib/utils";
import { Check, Dumbbell, Home, TreePine } from "lucide-react";
import type { StepErrors } from "../schemas";
import type { OnboardingData } from "../types";

interface StepEquipmentProps {
  data: OnboardingData;
  errors: StepErrors;
  onUpdate: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K],
  ) => void;
  onToggle: (key: "equipment", value: string) => void;
}

const LOCATIONS = [
  {
    value: "gym" as const,
    label: "Gym",
    desc: "Full access to equipment",
    icon: Dumbbell,
  },
  {
    value: "home" as const,
    label: "Home",
    desc: "Limited space and tools",
    icon: Home,
  },
  {
    value: "outdoor" as const,
    label: "Outdoor",
    desc: "Bodyweight and fresh air",
    icon: TreePine,
  },
];

const EQUIPMENT_OPTIONS = [
  { value: "dumbbells", label: "Dumbbells" },
  { value: "resistance_bands", label: "Resistance Bands" },
  { value: "pull_up_bar", label: "Pull Up Bar" },
  { value: "kettlebells", label: "Kettlebells" },
  { value: "yoga_mat", label: "Yoga Mat" },
];

export function StepEquipment({
  data,
  errors,
  onUpdate,
  onToggle,
}: StepEquipmentProps) {
  return (
    <div className="space-y-10">
      {/* Location */}
      <div
        className="grid grid-cols-3 gap-4"
        role="radiogroup"
        aria-label="Training location"
      >
        {LOCATIONS.map((loc) => {
          const sel = data.trainingLocation === loc.value;
          const Icon = loc.icon;
          return (
            <button
              key={loc.value}
              type="button"
              aria-checked={sel}
              onClick={() => onUpdate("trainingLocation", loc.value)}
              className={cn(
                "relative flex flex-col items-center rounded-xl bg-m3-surface-high p-5 text-center transition-all duration-300",
                sel
                  ? "border-2 border-m3-primary ring-2 ring-m3-primary/20"
                  : "border border-m3-outline-variant/20 hover:border-m3-primary/50",
              )}
            >
              {sel && (
                <span className="absolute right-2 top-2 rounded-full bg-m3-primary px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-m3-on-primary-container">
                  Active
                </span>
              )}
              <Icon className="mb-3 size-7 text-m3-primary" />
              <h3 className="font-heading text-lg font-bold">{loc.label}</h3>
              <p className="mt-1 text-xs text-m3-outline">{loc.desc}</p>
            </button>
          );
        })}
      </div>
      {errors.trainingLocation && (
        <p className="text-xs text-destructive">{errors.trainingLocation}</p>
      )}

      {/* Equipment Checklist */}
      <div className="space-y-5">
        <h2 className="font-heading text-xl font-bold">Equipment Checklist</h2>
        <div className="space-y-3">
          {EQUIPMENT_OPTIONS.map((item) => {
            const active = data.equipment.includes(item.value);
            return (
              <button
                key={item.value}
                type="button"
                aria-checked={active}
                aria-label={item.label}
                onClick={() => onToggle("equipment", item.value)}
                className="glass-card group flex w-full items-center justify-between rounded-xl border border-m3-outline-variant/10 p-5 text-left transition-all hover:border-m3-outline-variant/30"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-m3-surface-container">
                    <Dumbbell className="size-4 text-m3-outline transition-colors group-hover:text-m3-primary" />
                  </div>
                  <span className="font-medium text-m3-on-surface">
                    {item.label}
                  </span>
                </div>
                <div
                  className={cn(
                    "flex size-6 items-center justify-center rounded-md border-2 transition-colors",
                    active
                      ? "border-m3-secondary bg-m3-secondary text-white"
                      : "border-m3-outline-variant",
                  )}
                >
                  {active && <Check className="size-4" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
