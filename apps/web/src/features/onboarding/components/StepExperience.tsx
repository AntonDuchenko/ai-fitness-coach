"use client";

import type { OnboardingData } from "../types";
import type { StepErrors } from "../schemas";
import { OptionButton } from "./OptionButton";

interface StepExperienceProps {
  data: OnboardingData;
  errors: StepErrors;
  onUpdate: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K],
  ) => void;
}

const FITNESS_LEVELS = ["beginner", "intermediate", "advanced", "athlete"];
const NUTRITION_LEVELS = ["none", "basic", "good", "expert"];

export function StepExperience({
  data,
  errors,
  onUpdate,
}: StepExperienceProps) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] text-muted-foreground">Fitness Level</p>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Fitness level">
        {FITNESS_LEVELS.map((level) => (
          <OptionButton
            key={level}
            active={data.fitnessLevel === level}
            label={level}
            onClick={() => onUpdate("fitnessLevel", level)}
          />
        ))}
      </div>
      {errors.fitnessLevel && (
        <p className="text-[10px] text-destructive">{errors.fitnessLevel}</p>
      )}
      <p className="pt-1 text-[11px] text-muted-foreground">
        Nutrition Knowledge
      </p>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Nutrition knowledge">
        {NUTRITION_LEVELS.map((level) => (
          <OptionButton
            key={level}
            active={data.nutritionKnowledge === level}
            label={level}
            onClick={() => onUpdate("nutritionKnowledge", level)}
          />
        ))}
      </div>
      {errors.nutritionKnowledge && (
        <p className="text-[10px] text-destructive">
          {errors.nutritionKnowledge}
        </p>
      )}
    </div>
  );
}
