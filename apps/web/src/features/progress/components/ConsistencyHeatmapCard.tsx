"use client";

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
      <div className="overflow-hidden rounded-[2rem] border border-m3-outline-variant/10 bg-m3-surface-low p-8">
        <div className="mb-8">
          <Skeleton className="mb-1 h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-[120px] w-full rounded-lg" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-m3-outline-variant/10 bg-m3-surface-low p-8">
      <div className="mb-8">
        <h3 className="mb-1 font-heading text-xl font-bold text-m3-on-surface">
          Consistency
        </h3>
        <p className="text-sm text-muted-foreground">
          Last 12 weeks of training
        </p>
      </div>

      <div
        className="flex gap-1.5 overflow-x-auto pb-1"
        aria-label="Workout consistency, last 12 weeks"
      >
        {grid.map((column) => (
          <div
            key={column.map((c) => c.key).join("|")}
            className="flex flex-col gap-1.5"
          >
            {column.map((cell) => {
              const level = heatmapIntensity(cell.count);
              const bg =
                level === 0
                  ? "bg-m3-surface-high"
                  : level === 1
                    ? "bg-m3-secondary-container"
                    : "bg-m3-secondary";
              return (
                <Link
                  key={cell.key}
                  href="/dashboard/workouts"
                  className={`aspect-square size-3 shrink-0 rounded-[4px] ${bg} outline-none transition hover:ring-2 hover:ring-ring focus-visible:ring-2 focus-visible:ring-ring`}
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

      <div className="mt-6 flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Less
        </p>
        <div className="flex gap-1.5">
          <div className="size-2.5 rounded-sm bg-m3-surface-high" />
          <div className="size-2.5 rounded-sm bg-m3-secondary-container" />
          <div className="size-2.5 rounded-sm bg-m3-secondary" />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          More
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span>
          Total:{" "}
          <span className="font-medium text-foreground">
            {data?.totalWorkouts ?? 0}
          </span>
        </span>
        <span>
          Avg/week:{" "}
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
    </div>
  );
}
