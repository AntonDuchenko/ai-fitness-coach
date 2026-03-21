"use client";

import type { OnboardingData } from "../types";
import type { StepErrors } from "../schemas";
import { OptionButton } from "./OptionButton";
import { CheckRow } from "./CheckRow";

interface StepEquipmentProps {
  data: OnboardingData;
  errors: StepErrors;
  onUpdate: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K],
  ) => void;
  onToggle: (key: "equipment", value: string) => void;
}

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
    <div className="space-y-3">
      <p className="text-[11px] text-muted-foreground">Training Location</p>
      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Training location">
        <OptionButton
          active={data.trainingLocation === "gym"}
          label="Gym"
          onClick={() => onUpdate("trainingLocation", "gym")}
        />
        <OptionButton
          active={data.trainingLocation === "home"}
          label="Home"
          onClick={() => onUpdate("trainingLocation", "home")}
        />
        <OptionButton
          active={data.trainingLocation === "outdoor"}
          label="Outdoor"
          onClick={() => onUpdate("trainingLocation", "outdoor")}
        />
      </div>
      {errors.trainingLocation && (
        <p className="text-[10px] text-destructive">
          {errors.trainingLocation}
        </p>
      )}
      <p className="pt-1 text-[11px] text-muted-foreground">
        Available Equipment
      </p>
      <div className="space-y-2">
        {EQUIPMENT_OPTIONS.map((item) => (
          <CheckRow
            key={item.value}
            id={`equip-${item.value}`}
            active={data.equipment.includes(item.value)}
            label={item.label}
            onClick={() => onToggle("equipment", item.value)}
          />
        ))}
      </div>
    </div>
  );
}
