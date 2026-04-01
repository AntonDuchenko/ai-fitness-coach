"use client";

import type { StepErrors } from "../schemas";
import type { OnboardingData } from "../types";
import { StepBasicInfo } from "./StepBasicInfo";
import { StepEquipment } from "./StepEquipment";
import { StepExperience } from "./StepExperience";
import { StepGoals } from "./StepGoals";
import { StepLimitations } from "./StepLimitations";
import { StepMotivation } from "./StepMotivation";
import { StepNutrition } from "./StepNutrition";
import { StepSchedule } from "./StepSchedule";

type ToggleKey =
  | "secondaryGoals"
  | "equipment"
  | "dietaryRestrictions"
  | "cuisinePreferences"
  | "biggestChallenges";

interface OnboardingStepContentProps {
  step: number;
  data: OnboardingData;
  errors: StepErrors;
  onUpdate: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K],
  ) => void;
  onToggle: (key: ToggleKey, value: string) => void;
}

export function OnboardingStepContent({
  step,
  data,
  errors,
  onUpdate,
  onToggle,
}: OnboardingStepContentProps) {
  switch (step) {
    case 1:
      return <StepBasicInfo data={data} errors={errors} onUpdate={onUpdate} />;
    case 2:
      return (
        <StepGoals
          data={data}
          errors={errors}
          onUpdate={onUpdate}
          onToggle={(key, val) => onToggle(key, val)}
        />
      );
    case 3:
      return <StepExperience data={data} errors={errors} onUpdate={onUpdate} />;
    case 4:
      return <StepSchedule data={data} errors={errors} onUpdate={onUpdate} />;
    case 5:
      return (
        <StepEquipment
          data={data}
          errors={errors}
          onUpdate={onUpdate}
          onToggle={(key, val) => onToggle(key, val)}
        />
      );
    case 6:
      return (
        <StepLimitations
          data={data}
          onUpdate={onUpdate}
          onToggle={(key, val) => onToggle(key, val)}
        />
      );
    case 7:
      return (
        <StepNutrition
          data={data}
          errors={errors}
          onUpdate={onUpdate}
          onToggle={(key, val) => onToggle(key, val)}
        />
      );
    case 8:
      return (
        <StepMotivation
          data={data}
          errors={errors}
          onUpdate={onUpdate}
          onToggle={(key, val) => onToggle(key, val)}
        />
      );
    default:
      return null;
  }
}
