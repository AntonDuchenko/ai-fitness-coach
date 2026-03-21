"use client";

import { cn } from "@/lib/utils";
import { Circle, CircleCheckBig } from "lucide-react";
import type { PasswordStrengthResult } from "../types";

interface PasswordStrengthProps {
  strength: PasswordStrengthResult;
}

const strengthLabels = ["Weak", "Weak", "Medium", "Strong", "Very Strong"];
const strengthBarColors = [
  "bg-destructive",
  "bg-destructive",
  "bg-yellow-500",
  "bg-success",
  "bg-success",
];
const strengthBadgeColors = [
  "bg-destructive/20 text-destructive",
  "bg-destructive/20 text-destructive",
  "bg-yellow-500/20 text-yellow-500",
  "bg-success/20 text-success",
  "bg-success/20 text-success",
];

export function PasswordStrength({ strength }: PasswordStrengthProps) {
  const { score, requirements } = strength;

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-muted-foreground">
          Password strength
        </span>
        {score > 0 && (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[11px] font-medium",
              strengthBadgeColors[score],
            )}
          >
            {strengthLabels[score]}
          </span>
        )}
      </div>

      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "h-[3px] flex-1 rounded-full",
              i < score ? strengthBarColors[score] : "bg-border",
            )}
          />
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        {requirements.map((req) => (
          <div key={req.label} className="flex items-center gap-1.5">
            {req.met ? (
              <CircleCheckBig className="size-3.5 text-success" />
            ) : (
              <Circle className="size-3.5 text-muted-foreground" />
            )}
            <span
              className={cn(
                "text-[11px]",
                req.met ? "text-success" : "text-muted-foreground",
              )}
            >
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
