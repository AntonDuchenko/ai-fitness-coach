"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
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
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle className="font-heading">Strength progress</CardTitle>
        <CardDescription>
          Max weight and volume per logged session
        </CardDescription>
        <div className="pt-2">
          <Label htmlFor="exercise-select" className="sr-only">
            Exercise
          </Label>
          {exercises.length > 0 ? (
            <Select value={selectedExercise} onValueChange={onExerciseChange}>
              <SelectTrigger
                id="exercise-select"
                className="w-full max-w-full sm:w-[280px]"
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
      </CardHeader>
      <CardContent className="space-y-4">
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
            {prWeight !== null ? (
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="success" className="gap-1 font-normal">
                  <Star className="size-3" aria-hidden />
                  PR {prWeight} kg
                </Badge>
              </div>
            ) : null}
            <StrengthChart data={data} />
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
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
      </CardContent>
    </Card>
  );
}
