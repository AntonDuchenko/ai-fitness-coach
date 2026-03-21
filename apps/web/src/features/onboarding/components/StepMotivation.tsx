"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { OnboardingData } from "../types";
import type { StepErrors } from "../schemas";
import { OptionButton } from "./OptionButton";
import { CheckRow } from "./CheckRow";

interface StepMotivationProps {
  data: OnboardingData;
  errors: StepErrors;
  onUpdate: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K],
  ) => void;
  onToggle: (key: "biggestChallenges", value: string) => void;
}

const CHALLENGES = [
  { value: "staying_consistent", label: "Staying Consistent" },
  { value: "finding_time", label: "Finding Time" },
  { value: "sticking_with_a_diet", label: "Sticking With a Diet" },
];

export function StepMotivation({
  data,
  errors,
  onUpdate,
  onToggle,
}: StepMotivationProps) {
  return (
    <div className="space-y-3">
      <div>
        <Label
          htmlFor="motivation"
          className="text-[11px] text-muted-foreground"
        >
          Why are you starting this journey?
        </Label>
        <Textarea
          id="motivation"
          value={data.motivation}
          onChange={(e) => onUpdate("motivation", e.target.value)}
          placeholder="What drives you to get started?"
          aria-invalid={!!errors.motivation}
          className="mt-1.5 min-h-[60px] text-xs"
        />
        {errors.motivation && (
          <p className="mt-1 text-[10px] text-destructive">
            {errors.motivation}
          </p>
        )}
      </div>
      <p className="text-[11px] text-muted-foreground">
        Have you tried before?
      </p>
      <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Previous attempts">
        <OptionButton
          active={data.previousAttempts}
          label="Yes"
          onClick={() => onUpdate("previousAttempts", true)}
        />
        <OptionButton
          active={!data.previousAttempts}
          label="No"
          onClick={() => onUpdate("previousAttempts", false)}
        />
      </div>
      {data.previousAttempts && (
        <div>
          <Label
            htmlFor="previousDetails"
            className="text-[11px] text-muted-foreground"
          >
            What happened previously?
          </Label>
          <Textarea
            id="previousDetails"
            value={data.previousAttemptsDetails}
            onChange={(e) =>
              onUpdate("previousAttemptsDetails", e.target.value)
            }
            placeholder="Tell us about your previous experience..."
            className="mt-1.5 min-h-[60px] text-xs"
          />
        </div>
      )}
      <p className="text-[11px] text-muted-foreground">Biggest Challenges</p>
      <div className="space-y-2">
        {CHALLENGES.map((item) => (
          <CheckRow
            key={item.value}
            id={`challenge-${item.value}`}
            active={data.biggestChallenges.includes(item.value)}
            label={item.label}
            onClick={() => onToggle("biggestChallenges", item.value)}
          />
        ))}
      </div>
    </div>
  );
}
