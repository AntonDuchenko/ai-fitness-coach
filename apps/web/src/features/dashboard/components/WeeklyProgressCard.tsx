"use client";

import { Skeleton } from "@/components/ui/skeleton";
import type { ProgressSummaryResponse } from "@/features/progress/types";
import { cn } from "@/lib/utils";
import { Flame, Target, TrendingDown } from "lucide-react";
import Link from "next/link";
import { ProgressStatBox } from "./ProgressStatBox";

interface WeeklyProgressCardProps {
  data: ProgressSummaryResponse | null;
  isLoading: boolean;
}

const DAYS = ["M", "T", "W", "T", "F", "S", "S"] as const;

export function WeeklyProgressCard({ data, isLoading }: WeeklyProgressCardProps) {
  if (isLoading) {
    return (
      <div className="rounded-[2rem] border border-m3-outline-variant/5 bg-m3-surface-container p-8">
        <Skeleton className="mb-3 h-5 w-28 rounded-full" />
        <Skeleton className="mb-10 h-7 w-40" />
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
        </div>
        <Skeleton className="mt-10 h-32 w-full" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-[2rem] border border-m3-outline-variant/5 bg-m3-surface-container p-8">
        <p className="text-sm text-muted-foreground">No progress data yet</p>
      </div>
    );
  }

  const { workouts, weight } = data;
  const completedDays = workouts.thisWeek;
  const targetDays = 5;

  return (
    <div className="flex flex-col rounded-[2rem] border border-m3-outline-variant/5 bg-m3-surface-container p-8">
      <div className="mb-10 flex items-start justify-between">
        <div>
          <span className="mb-3 inline-block rounded-full bg-m3-secondary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-m3-secondary">
            Weekly Overview
          </span>
          <h3 className="font-heading text-2xl font-semibold text-m3-on-surface">Consistency Hub</h3>
        </div>
        <Link href="/dashboard/progress" className="text-sm font-bold text-m3-primary hover:underline" aria-label="View full progress report">
          View Report
        </Link>
      </div>

      <div className="mb-10 grid grid-cols-3 gap-4">
        <ProgressStatBox label="Workouts" value={completedDays} suffix={`/ ${targetDays}`} icon={<Target className="size-4" aria-hidden />} />
        <ProgressStatBox label="Streak" value={workouts.currentStreak} suffix="days" valueColor="text-m3-secondary" icon={<Flame className="size-4" aria-hidden />} />
        <ProgressStatBox label="Weight" value={weight.change !== null ? `${weight.change > 0 ? "+" : ""}${weight.change.toFixed(1)}` : "—"} suffix="kg" valueColor="text-m3-primary" icon={<TrendingDown className="size-4" aria-hidden />} />
      </div>

      <div className="mt-auto">
        <div className="flex h-32 items-end justify-between gap-2 px-2">
          {DAYS.map((day, i) => {
            const isCompleted = i < completedDays;
            const isToday = i === ((new Date().getDay() + 6) % 7);
            const height = isCompleted ? `${60 + Math.random() * 40}%` : "10%";
            return (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className={cn(
                    "w-full rounded-t-lg transition-all",
                    isCompleted ? "bg-m3-secondary shadow-[0_0_15px_rgba(74,225,118,0.2)]" : isToday ? "border-2 border-dashed border-m3-outline-variant/30" : "bg-m3-surface-high",
                  )}
                  style={{ height }}
                />
                <span className={cn("text-[10px] font-medium", isToday ? "font-bold text-m3-primary" : "text-m3-outline")}>{day}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-m3-outline-variant/10 pt-4 text-xs text-m3-outline">
          <span>Activity Target: 45 min/day</span>
          <span className="font-semibold text-m3-secondary">
            {targetDays > 0 ? Math.round((completedDays / targetDays) * 100) : 0}% Weekly Completion
          </span>
        </div>
      </div>
    </div>
  );
}
