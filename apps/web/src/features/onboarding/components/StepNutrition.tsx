"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { CheckRow } from "./CheckRow";

interface StepNutritionProps {
  data: OnboardingData;
  errors: StepErrors;
  onUpdate: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K],
  ) => void;
  onToggle: (key: "cuisinePreferences", value: string) => void;
}

const COOKING_LEVELS = ["Beginner", "Intermediate", "Advanced", "Chef"];
const CUISINES = [
  { value: "mediterranean", label: "Mediterranean" },
  { value: "asian", label: "Asian" },
  { value: "mexican", label: "Mexican" },
  { value: "american", label: "American" },
];

export function StepNutrition({
  data,
  errors,
  onUpdate,
  onToggle,
}: StepNutritionProps) {
  return (
    <div className="space-y-3">
      <div>
        <p className="mb-1.5 text-[11px] text-muted-foreground">
          Meals per day
        </p>
        <div
          className="grid grid-cols-5 gap-2"
          role="radiogroup"
          aria-label="Meals per day"
        >
          {[2, 3, 4, 5, 6].map((n) => (
            <OptionButton
              key={n}
              active={data.mealsPerDay === n}
              label={`${n}`}
              onClick={() => onUpdate("mealsPerDay", n)}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="mb-1.5 text-[11px] text-muted-foreground">
          Cooking Level
        </p>
        <Select
          value={data.cookingLevel}
          onValueChange={(v) => onUpdate("cookingLevel", v)}
        >
          <SelectTrigger
            className="h-9 w-full text-xs"
            aria-label="Cooking level"
          >
            <SelectValue placeholder="Select cooking level" />
          </SelectTrigger>
          <SelectContent>
            {COOKING_LEVELS.map((level) => (
              <SelectItem key={level} value={level.toLowerCase()}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.cookingLevel && (
          <p className="mt-1 text-[10px] text-destructive">
            {errors.cookingLevel}
          </p>
        )}
      </div>
      <p className="text-[11px] text-muted-foreground">Cuisine Preferences</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {CUISINES.map((item) => (
          <CheckRow
            key={item.value}
            id={`cuisine-${item.value}`}
            active={data.cuisinePreferences.includes(item.value)}
            label={item.label}
            onClick={() => onToggle("cuisinePreferences", item.value)}
          />
        ))}
      </div>
      <div>
        <Label
          htmlFor="dislikedFoods"
          className="text-[11px] text-muted-foreground"
        >
          Disliked Foods
        </Label>
        <Input
          id="dislikedFoods"
          value={data.dislikedFoods}
          onChange={(e) => onUpdate("dislikedFoods", e.target.value)}
          placeholder="e.g. broccoli, fish..."
          className="mt-1.5 h-9 text-xs"
        />
      </div>
      <div>
        <Label
          htmlFor="foodBudget"
          className="text-[11px] text-muted-foreground"
        >
          Monthly food budget ($)
        </Label>
        <Input
          id="foodBudget"
          value={data.foodBudget}
          onChange={(e) => onUpdate("foodBudget", e.target.value)}
          placeholder="Monthly food budget ($)"
          aria-invalid={!!errors.foodBudget}
          className="mt-1.5 h-9 text-xs"
        />
        {errors.foodBudget && (
          <p className="mt-1 text-[10px] text-destructive">
            {errors.foodBudget}
          </p>
        )}
      </div>
    </div>
  );
}
