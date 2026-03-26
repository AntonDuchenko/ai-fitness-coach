import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProgressSummaryResponse } from "@/features/progress/types";
import { cn } from "@/lib/utils";
import { Flame, Target, TrendingDown } from "lucide-react";
import Link from "next/link";

interface WeeklyProgressCardProps {
  data: ProgressSummaryResponse | null;
  isLoading: boolean;
}

const DAYS = ["M", "T", "W", "T", "F", "S", "S"] as const;

export function WeeklyProgressCard({ data, isLoading }: WeeklyProgressCardProps) {
  if (isLoading) {
    return (
      <Card className="border-0 rounded-2xl">
        <CardHeader>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="flex min-h-[200px] items-center justify-center border-0 rounded-2xl">
        <p className="text-sm text-muted-foreground">No progress data yet</p>
      </Card>
    );
  }

  const { workouts, weight } = data;
  const completedDays = workouts.thisWeek;
  const targetDays = 5;

  return (
    <Card className="border-0 rounded-2xl">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Performance Analytics
          </p>
          <CardTitle className="font-heading text-2xl">Weekly Progress</CardTitle>
        </div>
        <Link
          href="/dashboard/progress"
          className="text-sm font-bold text-primary hover:underline"
        >
          View Full Report
        </Link>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-3 gap-4">
          <StatBox
            label="Workouts"
            value={completedDays}
            suffix={`/${targetDays}`}
            icon={<Target className="size-4" aria-hidden />}
          />
          <StatBox
            label="Streak"
            value={workouts.currentStreak}
            suffix="days"
            colorClass="text-success"
            icon={<Flame className="size-4" aria-hidden />}
          />
          <StatBox
            label="Weight"
            value={weight.change !== null ? weight.change.toFixed(1) : "—"}
            suffix="kg"
            colorClass="text-orange-400"
            icon={<TrendingDown className="size-4" aria-hidden />}
          />
        </div>

        <div className="space-y-4">
          <div className="flex h-48 items-end justify-between gap-3 px-2">
            {DAYS.map((day, i) => {
              const isCompleted = i < completedDays;
              const isToday = i === new Date().getDay() - 1;
              const height = isCompleted ? `${60 + Math.random() * 40}%` : "10%";

              return (
                <div key={i} className="flex flex-1 flex-col items-center gap-3">
                  <div
                    className={cn(
                      "w-full rounded-lg transition-all",
                      isCompleted && isToday
                        ? "bg-primary shadow-lg shadow-primary/20"
                        : isCompleted
                          ? "border-t-4 border-primary bg-primary/20"
                          : "bg-muted/30 opacity-30",
                    )}
                    style={{ height }}
                  />
                  <span
                    className={cn(
                      "text-[10px] font-bold uppercase",
                      isToday ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {day}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="pt-2 text-center text-xs text-muted-foreground">
            Completed vs. Planned Workouts
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function StatBox({
  label,
  value,
  suffix,
  colorClass,
  icon,
}: {
  label: string;
  value: string | number;
  suffix: string;
  colorClass?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:bg-muted/50 hover:shadow-lg hover:shadow-primary/10">
      <div className="mb-2 flex items-center gap-2 text-muted-foreground">
        {icon}
        <p className="text-[10px] font-bold uppercase tracking-widest">{label}</p>
      </div>
      <p className={cn("font-heading text-3xl font-black", colorClass)}>
        {value}
        <span className="ml-1 text-sm font-bold text-muted-foreground">{suffix}</span>
      </p>
    </div>
  );
}
