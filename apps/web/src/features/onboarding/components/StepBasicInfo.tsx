"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { OnboardingData } from "../types";
import type { StepErrors } from "../schemas";
import { OptionButton } from "./OptionButton";

interface StepBasicInfoProps {
  data: OnboardingData;
  errors: StepErrors;
  onUpdate: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K],
  ) => void;
}

export function StepBasicInfo({ data, errors, onUpdate }: StepBasicInfoProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-1">
          <Label htmlFor="age" className="sr-only">
            Age
          </Label>
          <Input
            id="age"
            value={data.age}
            onChange={(e) => onUpdate("age", e.target.value)}
            placeholder="Age"
            aria-invalid={!!errors.age}
            className="h-9 text-xs"
          />
          {errors.age && (
            <p className="mt-1 text-[10px] text-destructive">{errors.age}</p>
          )}
        </div>
        <OptionButton
          active={data.gender === "male"}
          label="Male"
          onClick={() => onUpdate("gender", "male")}
        />
        <OptionButton
          active={data.gender === "female"}
          label="Female"
          onClick={() => onUpdate("gender", "female")}
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-3">
          <Label htmlFor="height" className="sr-only">
            Height
          </Label>
          <Input
            id="height"
            value={data.height}
            onChange={(e) => onUpdate("height", e.target.value)}
            placeholder="Height"
            aria-invalid={!!errors.height}
            className="h-9 text-xs"
          />
          {errors.height && (
            <p className="mt-1 text-[10px] text-destructive">
              {errors.height}
            </p>
          )}
        </div>
        <OptionButton
          active={data.heightUnit === "cm"}
          label="cm"
          onClick={() => onUpdate("heightUnit", "cm")}
        />
      </div>
      <div>
        <Label htmlFor="weight" className="sr-only">
          Current Weight
        </Label>
        <Input
          id="weight"
          value={data.weight}
          onChange={(e) => onUpdate("weight", e.target.value)}
          placeholder="Current Weight (kg)"
          aria-invalid={!!errors.weight}
          className="h-9 text-xs"
        />
        {errors.weight && (
          <p className="mt-1 text-[10px] text-destructive">{errors.weight}</p>
        )}
      </div>
      <div>
        <Label htmlFor="targetWeight" className="sr-only">
          Target Weight
        </Label>
        <Input
          id="targetWeight"
          value={data.targetWeight}
          onChange={(e) => onUpdate("targetWeight", e.target.value)}
          placeholder="Target Weight (optional)"
          className="h-9 text-xs"
        />
      </div>
    </div>
  );
}
