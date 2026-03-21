"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { OnboardingData } from "../types";
import type { StepErrors } from "../schemas";
import { OptionButton } from "./OptionButton";

interface StepScheduleProps {
  data: OnboardingData;
  errors: StepErrors;
  onUpdate: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K],
  ) => void;
}

const DURATIONS = ["30 min", "45 min", "45-60 min", "60 min", "90 min"];
const TIMES = ["Morning", "Afternoon", "Evening", "Flexible"];

export function StepSchedule({ data, errors, onUpdate }: StepScheduleProps) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] text-muted-foreground">
        Training days per week
      </p>
      <div
        className="grid grid-cols-4 gap-2 sm:grid-cols-7"
        role="radiogroup"
        aria-label="Training days per week"
      >
        {Array.from({ length: 7 }, (_, idx) => idx + 1).map((day) => (
          <OptionButton
            key={day}
            active={data.trainingDaysPerWeek === day}
            label={`${day}`}
            onClick={() => onUpdate("trainingDaysPerWeek", day)}
          />
        ))}
      </div>
      {errors.trainingDaysPerWeek && (
        <p className="text-[10px] text-destructive">
          {errors.trainingDaysPerWeek}
        </p>
      )}
      <div>
        <p className="mb-1.5 text-[11px] text-muted-foreground">
          Session Duration
        </p>
        <Select
          value={data.sessionDuration}
          onValueChange={(v) => onUpdate("sessionDuration", v)}
        >
          <SelectTrigger
            className="h-9 w-full text-xs"
            aria-label="Session duration"
          >
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            {DURATIONS.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.sessionDuration && (
          <p className="mt-1 text-[10px] text-destructive">
            {errors.sessionDuration}
          </p>
        )}
      </div>
      <div>
        <p className="mb-1.5 text-[11px] text-muted-foreground">
          Preferred Time
        </p>
        <Select
          value={data.preferredTime}
          onValueChange={(v) => onUpdate("preferredTime", v)}
        >
          <SelectTrigger
            className="h-9 w-full text-xs"
            aria-label="Preferred training time"
          >
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            {TIMES.map((t) => (
              <SelectItem key={t} value={t.toLowerCase()}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
