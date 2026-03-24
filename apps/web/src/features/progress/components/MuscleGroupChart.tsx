"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MuscleVolumeRow } from "../utils/muscleVolume";

interface MuscleGroupChartProps {
  muscleRows: MuscleVolumeRow[];
}

export function MuscleGroupChart({ muscleRows }: MuscleGroupChartProps) {
  const muscleChart = useMemo(
    () =>
      muscleRows.map((r) => ({
        name: r.muscle,
        volume: Math.round(r.volume),
        imbalanced: r.imbalanced ?? false,
      })),
    [muscleRows],
  );

  if (muscleChart.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No workout logs with recognizable exercises in this period.
      </p>
    );
  }

  return (
    <div className="h-[220px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={muscleChart}
          layout="vertical"
          margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
          <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
          <Tooltip
            contentStyle={{ borderRadius: "var(--radius)", border: "1px solid var(--border)", background: "var(--card)" }}
            formatter={(v) => [`${Number(v ?? 0)}`, "Volume (kg·reps)"]}
            labelStyle={{ color: "var(--foreground)" }}
            itemStyle={{ color: "var(--foreground)" }}
            cursor={{ fill: "var(--muted)", opacity: 0.3 }}
          />
          <Bar dataKey="volume" radius={[0, 4, 4, 0]}>
            {muscleChart.map((entry) => (
              <Cell
                key={entry.name}
                fill={entry.imbalanced ? "var(--warning)" : "var(--primary)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
