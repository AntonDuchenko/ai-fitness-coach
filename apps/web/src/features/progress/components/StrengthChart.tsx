"use client";

import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { StrengthProgressResponse } from "../types";

interface StrengthChartProps {
  data: StrengthProgressResponse;
}

export function StrengthChart({ data }: StrengthChartProps) {
  const chartRows = useMemo(() => {
    if (!data.data.length) return [];
    return data.data.map((d) => ({
      label: new Date(d.date).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      maxWeight: d.maxWeight,
      volume: Math.round(d.totalVolume),
    }));
  }, [data]);

  if (chartRows.length === 0) return null;

  return (
    <div className="h-[220px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartRows}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="label" tick={{ fontSize: 10 }} />
          <YAxis
            tick={{ fontSize: 10 }}
            width={40}
            label={{
              value: "kg",
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 10 },
            }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
              background: "var(--card)",
            }}
            labelStyle={{ color: "var(--foreground)" }}
            itemStyle={{ color: "var(--foreground)" }}
            cursor={{ stroke: "var(--muted-foreground)", strokeOpacity: 0.3 }}
            formatter={(value, _name, item) => {
              const w = Number(value ?? 0);
              const row = item?.payload as { volume?: number };
              return [
                `${w} kg (volume ${row?.volume ?? "—"})`,
                "Max weight",
              ];
            }}
          />
          <Line
            type="monotone"
            dataKey="maxWeight"
            stroke="var(--primary)"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
