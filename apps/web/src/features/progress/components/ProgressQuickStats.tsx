"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Flame, Scale, TrendingUp } from "lucide-react";

interface ProgressQuickStatsProps {
  weightLabel: string;
  weightSub: string;
  workoutsLabel: string;
  workoutsSub: string;
  streakLabel: string;
  streakSub: string;
  strengthLabel: string;
  strengthSub: string;
}

export function ProgressQuickStats({
  weightLabel,
  weightSub,
  workoutsLabel,
  workoutsSub,
  streakLabel,
  streakSub,
  strengthLabel,
  strengthSub,
}: ProgressQuickStatsProps) {
  const items = [
    {
      title: "Body weight",
      label: weightLabel,
      sub: weightSub,
      Icon: Scale,
    },
    {
      title: "Workouts",
      label: workoutsLabel,
      sub: workoutsSub,
      Icon: Dumbbell,
    },
    {
      title: "Streak",
      label: streakLabel,
      sub: streakSub,
      Icon: Flame,
    },
    {
      title: "Strength",
      label: strengthLabel,
      sub: strengthSub,
      Icon: TrendingUp,
    },
  ] as const;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(({ title, label, sub, Icon }) => (
        <Card key={title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {title}
            </CardTitle>
            <Icon className="size-4 text-primary" aria-hidden />
          </CardHeader>
          <CardContent>
            <p className="font-heading text-2xl font-semibold tracking-tight">
              {label}
            </p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
