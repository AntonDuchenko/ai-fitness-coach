"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { OnboardingData } from "../types";
import { CheckRow } from "./CheckRow";

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
    <div className="space-y-3">
      <div>
        <Label htmlFor="injuries" className="text-[11px] text-muted-foreground">
          Injuries or pain areas
        </Label>
        <Textarea
          id="injuries"
          value={data.injuries}
          onChange={(e) => onUpdate("injuries", e.target.value)}
          placeholder="Describe any injuries..."
          className="mt-1.5 min-h-[60px] text-xs"
        />
      </div>
      <div>
        <Label
          htmlFor="medicalConditions"
          className="text-[11px] text-muted-foreground"
        >
          Medical conditions
        </Label>
        <Textarea
          id="medicalConditions"
          value={data.medicalConditions}
          onChange={(e) => onUpdate("medicalConditions", e.target.value)}
          placeholder="Any medical conditions..."
          className="mt-1.5 min-h-[60px] text-xs"
        />
      </div>
      <p className="pt-1 text-[11px] text-muted-foreground">
        Dietary Restrictions
      </p>
      <div className="space-y-2">
        {DIETARY_OPTIONS.map((item) => (
          <CheckRow
            key={item.value}
            id={`diet-${item.value}`}
            active={data.dietaryRestrictions.includes(item.value)}
            label={item.label}
            onClick={() => onToggle("dietaryRestrictions", item.value)}
          />
        ))}
      </div>
    </div>
  );
}
