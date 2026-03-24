"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useMemo } from "react";
import type { ConsistencyResponse } from "../types";
import { buildHeatmapGrid, heatmapIntensity } from "../utils/heatmap";

interface ConsistencyHeatmapCardProps {
  data: ConsistencyResponse | undefined;
  isLoading: boolean;
}

export function ConsistencyHeatmapCard({
  data,
  isLoading,
}: ConsistencyHeatmapCardProps) {
  const grid = useMemo(
    () => (data?.dailyData ? buildHeatmapGrid(data.dailyData) : []),
    [data?.dailyData],
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Consistency</CardTitle>
          <CardDescription>Last 12 weeks</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[120px] w-full rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle className="font-heading">Consistency</CardTitle>
        <CardDescription>
          Workout intensity by day (darker green = more sessions). Click a cell
          to open workouts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="flex gap-1 overflow-x-auto pb-1"
          aria-label="Workout consistency, last 12 weeks"
        >
          {grid.map((column) => (
            <div
              key={column.map((c) => c.key).join("|")}
              className="flex flex-col gap-1"
            >
              {column.map((cell) => {
                const level = heatmapIntensity(cell.count);
                const bg =
                  level === 0
                    ? "bg-muted"
                    : level === 1
                      ? "bg-success/30"
                      : "bg-success";
                return (
                  <Link
                    key={cell.key}
                    href="/dashboard/workouts"
                    className={`size-3 shrink-0 rounded-sm ${bg} outline-none ring-offset-background transition hover:ring-2 hover:ring-ring focus-visible:ring-2 focus-visible:ring-ring`}
                    title={
                      cell.key
                        ? `${cell.key}: ${cell.count} workout(s)`
                        : undefined
                    }
                    aria-label={
                      cell.key
                        ? `${cell.key}, ${cell.count} workouts`
                        : "No date"
                    }
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span>
            Total workouts:{" "}
            <span className="font-medium text-foreground">
              {data?.totalWorkouts ?? 0}
            </span>
          </span>
          <span>
            Avg / week:{" "}
            <span className="font-medium text-foreground">
              {data?.workoutsPerWeek != null
                ? data.workoutsPerWeek.toFixed(1)
                : "—"}
            </span>
          </span>
          <span>
            Streak:{" "}
            <span className="font-medium text-foreground">
              {data?.currentStreak ?? 0}
            </span>{" "}
            (best {data?.bestStreak ?? 0})
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
