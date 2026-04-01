"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Calendar, Moon, Sun, SunMedium } from "lucide-react";
import type { StepErrors } from "../schemas";
import type { OnboardingData } from "../types";

interface StepScheduleProps {
  data: OnboardingData;
  errors: StepErrors;
  onUpdate: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K],
  ) => void;
}

const DURATIONS = ["30 min", "45 min", "45-60 min", "60 min", "90 min"];

const TIMES = [
  { value: "morning", label: "Morning", icon: Sun },
  { value: "afternoon", label: "Afternoon", icon: SunMedium },
  { value: "evening", label: "Evening", icon: Moon },
  { value: "flexible", label: "Flexible", icon: Calendar },
];

export function StepSchedule({ data, errors, onUpdate }: StepScheduleProps) {
  return (
    <div className="space-y-10">
      {/* Training Days */}
      <div className="space-y-4">
        <span className="font-heading text-sm font-bold uppercase tracking-wider text-m3-primary">
          Training Days Per Week
        </span>
        <div
          className="flex justify-between gap-2"
          role="radiogroup"
          aria-label="Training days per week"
        >
          {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => {
            const sel = data.trainingDaysPerWeek === day;
            return (
              <button
                key={day}
                type="button"
                aria-checked={sel}
                onClick={() => onUpdate("trainingDaysPerWeek", day)}
                className={cn(
                  "glass-card flex aspect-square flex-1 items-center justify-center rounded-2xl font-heading font-bold transition-all duration-200 active:scale-90",
                  sel
                    ? "border border-m3-primary-container/30 bg-m3-primary-container/20 text-m3-primary-container shadow-[0_0_20px_rgba(77,142,255,0.1)]"
                    : "border border-white/5 text-zinc-500 hover:bg-white/5",
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
        {errors.trainingDaysPerWeek && (
          <p className="text-xs text-destructive">
            {errors.trainingDaysPerWeek}
          </p>
        )}
      </div>

      {/* Session Duration */}
      <div className="space-y-4">
        <span
          id="session-duration-label"
          className="font-heading text-sm font-bold uppercase tracking-wider text-m3-primary"
        >
          Session Duration
        </span>
        <Select
          value={data.sessionDuration}
          onValueChange={(v) => onUpdate("sessionDuration", v)}
        >
          <SelectTrigger className="glass-card h-16 w-full rounded-2xl border border-white/10 px-6 text-m3-on-surface focus:ring-2 focus:ring-m3-primary-container/40">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent className="border-m3-outline-variant/20 bg-m3-surface-high text-m3-on-surface">
            {DURATIONS.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.sessionDuration && (
          <p className="text-xs text-destructive">{errors.sessionDuration}</p>
        )}
      </div>

      {/* Preferred Time */}
      <div className="space-y-4">
        <span className="font-heading text-sm font-bold uppercase tracking-wider text-m3-primary">
          Preferred Time of Day
        </span>
        <div className="grid grid-cols-2 gap-3">
          {TIMES.map((t) => {
            const sel = data.preferredTime === t.value;
            const Icon = t.icon;
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => onUpdate("preferredTime", t.value)}
                className={cn(
                  "glass-card flex h-14 items-center justify-center gap-3 rounded-full border px-4 font-medium transition-all active:scale-95",
                  sel
                    ? "border-m3-primary-container/40 bg-m3-primary-container/10 text-m3-primary-container"
                    : "border-white/10 text-m3-outline hover:bg-white/5",
                )}
              >
                <Icon className="size-5" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
