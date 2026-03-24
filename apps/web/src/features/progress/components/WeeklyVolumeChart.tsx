"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { VolumeProgressResponse } from "../types";

interface WeeklyVolumeChartProps {
  weekly: VolumeProgressResponse | undefined;
  isLoading: boolean;
}

export function WeeklyVolumeChart({
  weekly,
  isLoading,
}: WeeklyVolumeChartProps) {
  const weeklyChart = useMemo(() => {
    if (!weekly?.weeklyData.length) return [];
    return weekly.weeklyData.map((w) => ({
      label: new Date(w.weekStart).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      volume: Math.round(w.totalVolume),
      workouts: w.workoutCount,
    }));
  }, [weekly]);

  if (isLoading) {
    return <Skeleton className="h-[200px] w-full rounded-lg" />;
  }

  if (weeklyChart.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No weekly volume in this range.
      </p>
    );
  }

  return (
    <div className="h-[200px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={weeklyChart}
          margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="label" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
          <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} width={100} />
          <Tooltip
            contentStyle={{
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
              background: "var(--card)",
            }}
            labelStyle={{ color: "var(--foreground)" }}
            itemStyle={{ color: "var(--foreground)" }}
            cursor={{ fill: "var(--muted)", opacity: 0.3 }}
          />
          <Bar
            dataKey="volume"
            fill="var(--primary)"
            fillOpacity={0.85}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
