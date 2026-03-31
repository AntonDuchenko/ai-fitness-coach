"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import type { StrengthProgressResponse } from "../types";
import { StrengthChart } from "./StrengthChart";

interface StrengthProgressCardProps {
  exercises: string[];
  selectedExercise: string;
  onExerciseChange: (name: string) => void;
  data: StrengthProgressResponse | undefined;
  isLoading: boolean;
  isError: boolean;
}

export function StrengthProgressCard({
  exercises,
  selectedExercise,
  onExerciseChange,
  data,
  isLoading,
  isError,
}: StrengthProgressCardProps) {
  const prWeight = useMemo(() => {
    if (!data?.data.length) return null;
    return Math.max(...data.data.map((d) => d.maxWeight));
  }, [data]);

  return (
    <div className="flex flex-col overflow-hidden rounded-[2rem] border border-m3-outline-variant/10 bg-m3-surface-low p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h3 className="mb-1 font-heading text-xl font-bold text-m3-on-surface">
            Strength Progress
          </h3>
          <div className="mt-2">
            <Label htmlFor="exercise-select" className="sr-only">
              Exercise
            </Label>
            {exercises.length > 0 ? (
              <Select value={selectedExercise} onValueChange={onExerciseChange}>
                <SelectTrigger
                  id="exercise-select"
                  className="w-full max-w-full rounded-lg border-none bg-m3-surface-high text-xs font-bold text-m3-primary sm:w-[280px]"
                >
                  <SelectValue placeholder="Choose exercise" />
                </SelectTrigger>
                <SelectContent>
                  {exercises.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm text-muted-foreground" id="exercise-select">
                Log workouts to unlock exercise progression.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="min-h-[220px] flex-1">
        {isLoading ? (
          <Skeleton className="h-[220px] w-full rounded-lg" />
        ) : isError ? (
          <p className="text-sm text-destructive">
            Could not load strength data.
          </p>
        ) : !selectedExercise ? (
          <p className="text-sm text-muted-foreground">
            Log workouts with named exercises to see progression.
          </p>
        ) : !data?.data.length ? (
          <p className="text-sm text-muted-foreground">
            No sessions including &quot;{selectedExercise}&quot; in this period.
          </p>
        ) : (
          <>
            {prWeight !== null && (
              <p className="mb-3 text-xs font-bold text-m3-secondary">
                PR: {prWeight} kg
              </p>
            )}
            <StrengthChart data={data} />
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span>
                Start:{" "}
                <span className="font-medium text-foreground">
                  {data.startMaxWeight != null
                    ? `${data.startMaxWeight} kg`
                    : "—"}
                </span>
              </span>
              <span>
                Current:{" "}
                <span className="font-medium text-foreground">
                  {data.currentMaxWeight != null
                    ? `${data.currentMaxWeight} kg`
                    : "—"}
                </span>
              </span>
              <span>
                Improvement:{" "}
                <span className="font-medium text-success">
                  {data.improvementPercent != null
                    ? `${data.improvementPercent >= 0 ? "+" : ""}${data.improvementPercent.toFixed(1)}%`
                    : "—"}
                </span>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
