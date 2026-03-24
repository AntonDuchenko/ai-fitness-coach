"use client";

import { useId, useMemo } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { WeightLogResponse } from "../types";
import { linearRegression } from "../utils/linearRegression";

const TOOLTIP_STYLE = {
  borderRadius: "var(--radius)",
  border: "1px solid var(--border)",
  background: "var(--card)",
} as const;

interface WeightChartProps {
  logs: WeightLogResponse[];
  startWeight: number | null;
  targetWeight: number | null;
  onPointClick: (point: { date: string; weight: number }) => void;
}

export function WeightChart({ logs, startWeight, targetWeight, onPointClick }: WeightChartProps) {
  const gradId = useId();

  const chartData = useMemo(() => {
    const sorted = [...logs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const rows = sorted.map((l, i) => ({
      i, date: l.date, weight: l.weight,
      label: new Date(l.date).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    }));
    const ys = rows.map((r) => r.weight);
    const { slope, intercept } = linearRegression(ys);
    return rows.map((r) => ({ ...r, trend: slope * r.i + intercept }));
  }, [logs]);

  const trendLabel = useMemo(() => {
    if (chartData.length < 2) return null;
    const first = chartData[0]?.weight;
    const last = chartData[chartData.length - 1]?.weight;
    if (first === undefined || last === undefined) return null;
    const days = (new Date(chartData[chartData.length - 1].date).getTime() - new Date(chartData[0].date).getTime()) / 86_400_000;
    if (days <= 0) return null;
    const perWeek = ((last - first) / days) * 7;
    return `${perWeek >= 0 ? "+" : ""}${perWeek.toFixed(2)} kg / week`;
  }, [chartData]);

  if (chartData.length === 0) return null;

  return (
    <>
      {trendLabel ? (
        <div className="text-xs text-muted-foreground">
          Trend: <span className="text-primary">{trendLabel}</span>
        </div>
      ) : null}
      <div className="h-[320px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="label" tick={{ fontSize: 11 }} className="text-muted-foreground" />
            <YAxis domain={["auto", "auto"]} tick={{ fontSize: 11 }} width={40} className="text-muted-foreground" />
            <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={{ color: "var(--foreground)" }} formatter={(value, name) => {
              const v = Number(value ?? 0);
              return [`${v} kg`, String(name ?? "") === "weight" ? "Weight" : String(name)];
            }} />
            {startWeight !== null ? (
              <ReferenceLine y={startWeight} stroke="var(--muted-foreground)" strokeDasharray="5 5"
                label={{ value: `Start ${startWeight}`, position: "insideTopRight", fill: "var(--muted-foreground)", fontSize: 11 }} />
            ) : null}
            {targetWeight !== null ? (
              <ReferenceLine y={targetWeight} stroke="var(--success)" strokeDasharray="5 5"
                label={{ value: `Goal ${targetWeight}`, position: "insideBottomRight", fill: "var(--success)", fontSize: 11 }} />
            ) : null}
            <Area type="monotone" dataKey="weight" stroke="var(--primary)" fill={`url(#${gradId})`} strokeWidth={2}
              activeDot={{ r: 6, onClick: (_e, payload) => {
                const p = payload as { payload?: { date: string; weight: number } };
                if (p.payload) onPointClick({ date: p.payload.date, weight: p.payload.weight });
              }}} />
            <Line type="monotone" dataKey="trend" stroke="var(--primary)" strokeWidth={1} strokeOpacity={0.5} dot={false} strokeDasharray="4 4" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
