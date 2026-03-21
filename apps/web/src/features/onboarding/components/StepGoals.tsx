"use client";

import type { OnboardingData } from "../types";
import type { StepErrors } from "../schemas";
import { OptionButton } from "./OptionButton";
import { CheckRow } from "./CheckRow";

interface StepGoalsProps {
  data: OnboardingData;
  errors: StepErrors;
  onUpdate: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K],
  ) => void;
  onToggle: (key: "secondaryGoals", value: string) => void;
}

const SECONDARY_GOALS = [
  { value: "improve_flexibility", label: "Improve Flexibility" },
  { value: "reduce_stress", label: "Reduce Stress" },
  { value: "better_sleep", label: "Better Sleep" },
  { value: "more_energy", label: "More Energy" },
];

export function StepGoals({
  data,
  errors,
  onUpdate,
  onToggle,
}: StepGoalsProps) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] text-muted-foreground">Primary Goal</p>
      <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Primary goal">
        <OptionButton
          active={data.primaryGoal === "lose_weight"}
          label="Lose Weight"
          onClick={() => onUpdate("primaryGoal", "lose_weight")}
        />
        <OptionButton
          active={data.primaryGoal === "build_muscle"}
          label="Build Muscle"
          onClick={() => onUpdate("primaryGoal", "build_muscle")}
        />
        <OptionButton
          active={data.primaryGoal === "get_fit"}
          label="Get Fit"
          onClick={() => onUpdate("primaryGoal", "get_fit")}
        />
        <OptionButton
          active={data.primaryGoal === "eat_healthier"}
          label="Eat Healthier"
          onClick={() => onUpdate("primaryGoal", "eat_healthier")}
        />
      </div>
      {errors.primaryGoal && (
        <p className="text-[10px] text-destructive">{errors.primaryGoal}</p>
      )}
      <p className="pt-1 text-[11px] text-muted-foreground">
        Secondary Goals (optional)
      </p>
      <div className="space-y-2">
        {SECONDARY_GOALS.map((goal) => (
          <CheckRow
            key={goal.value}
            id={`goal-${goal.value}`}
            active={data.secondaryGoals.includes(goal.value)}
            label={goal.label}
            onClick={() => onToggle("secondaryGoals", goal.value)}
          />
        ))}
      </div>
    </div>
  );
}
