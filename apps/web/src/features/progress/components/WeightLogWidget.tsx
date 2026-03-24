"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useLogWeightMutation } from "../hooks/useLogWeightMutation";
import { useWeightHistoryQuery } from "../hooks/useWeightHistoryQuery";

const LBS_PER_KG = 2.20462;
const UNIT_KEY = "weight_unit";

function getStoredUnit(): "kg" | "lbs" {
  if (typeof window === "undefined") return "kg";
  return (localStorage.getItem(UNIT_KEY) as "kg" | "lbs") || "kg";
}

interface WeightLogWidgetProps {
  /** Called after a successful log (e.g. close dialog). */
  onLogged?: () => void;
}

export function WeightLogWidget({ onLogged }: WeightLogWidgetProps) {
  const [unit, setUnit] = useState<"kg" | "lbs">(getStoredUnit);
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState("");

  const history = useWeightHistoryQuery("3months");
  const mutation = useLogWeightMutation();

  const toggleUnit = useCallback(() => {
    setUnit((prev) => {
      const next = prev === "kg" ? "lbs" : "kg";
      localStorage.setItem(UNIT_KEY, next);
      return next;
    });
  }, []);

  const handleSubmit = useCallback(() => {
    const num = Number.parseFloat(value);
    if (Number.isNaN(num) || num <= 0) {
      toast.error("Please enter a valid weight");
      return;
    }

    const weightKg = unit === "lbs" ? num / LBS_PER_KG : num;

    mutation.mutate(
      { weight: Math.round(weightKg * 100) / 100, notes: notes || undefined },
      {
        onSuccess: () => {
          toast.success("Weight logged successfully");
          setValue("");
          setNotes("");
          onLogged?.();
        },
        onError: (err) => {
          toast.error(err.message || "Failed to log weight");
        },
      },
    );
  }, [value, unit, notes, mutation, onLogged]);

  const lastWeight = history.data?.currentWeight;
  const displayLast =
    lastWeight !== null && lastWeight !== undefined
      ? unit === "lbs"
        ? `${(lastWeight * LBS_PER_KG).toFixed(1)} lbs`
        : `${lastWeight} kg`
      : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-heading">Log weight</CardTitle>
        {history.isLoading ? (
          <Skeleton className="h-4 w-32" />
        ) : displayLast ? (
          <CardDescription>Last logged: {displayLast}</CardDescription>
        ) : (
          <CardDescription>No weight logged yet</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="weight-input" className="sr-only">
                Weight
              </Label>
              <Input
                id="weight-input"
                type="text"
                inputMode="decimal"
                placeholder={`Weight in ${unit}`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={mutation.isPending}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              className="shrink-0 w-16"
              onClick={toggleUnit}
              aria-label={`Switch to ${unit === "kg" ? "lbs" : "kg"}`}
            >
              {unit}
            </Button>
          </div>
          <div>
            <Label htmlFor="weight-notes" className="sr-only">
              Notes
            </Label>
            <Input
              id="weight-notes"
              type="text"
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={mutation.isPending}
            />
          </div>
          <Button
            type="button"
            size="sm"
            className="self-start"
            onClick={handleSubmit}
            disabled={mutation.isPending || !value}
          >
            {mutation.isPending ? "Logging..." : "Log weight"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
