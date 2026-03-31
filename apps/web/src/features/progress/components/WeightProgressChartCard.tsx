"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import type { WeightLogResponse } from "../types";
import { WeightChart } from "./WeightChart";

interface WeightProgressChartCardProps {
  logs: WeightLogResponse[];
  startWeight: number | null;
  targetWeight: number | null;
  isLoading: boolean;
}

export function WeightProgressChartCard({
  logs,
  startWeight,
  targetWeight,
  isLoading,
}: WeightProgressChartCardProps) {
  const [picked, setPicked] = useState<{
    date: string;
    weight: number;
  } | null>(null);

  if (isLoading) {
    return (
      <div className="rounded-[2rem] border border-m3-outline-variant/10 bg-m3-surface-low p-8 shadow-2xl">
        <div className="mb-10">
          <Skeleton className="mb-1 h-6 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="rounded-[2rem] border border-m3-outline-variant/10 bg-m3-surface-low p-8 shadow-2xl">
        <h3 className="mb-1 font-heading text-xl font-bold text-m3-on-surface">
          Weight Progress
        </h3>
        <p className="text-sm text-muted-foreground">
          Log weight a few times to see your trend chart.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-m3-outline-variant/10 bg-m3-surface-low p-8 shadow-2xl">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h3 className="mb-1 font-heading text-xl font-bold text-m3-on-surface">
            Weight Progress
          </h3>
          <p className="text-sm text-muted-foreground">
            Tracking your physical evolution
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 rounded-full bg-m3-surface-high px-3 py-1.5 text-xs font-semibold">
            <span className="size-2 rounded-full bg-m3-primary" />
            Actual
          </div>
          <div className="flex items-center gap-2 rounded-full bg-m3-surface-high px-3 py-1.5 text-xs font-semibold">
            <span className="h-0.5 w-2 border-t border-dashed border-m3-outline" />
            Trend
          </div>
        </div>
      </div>

      <WeightChart
        logs={logs}
        startWeight={startWeight}
        targetWeight={targetWeight}
        onPointClick={setPicked}
      />

      {picked ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Selected:{" "}
          <span className="font-medium text-foreground">
            {picked.weight} kg
          </span>{" "}
          on {new Date(picked.date).toLocaleDateString()}
        </p>
      ) : null}
    </div>
  );
}
