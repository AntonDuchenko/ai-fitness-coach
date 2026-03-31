"use client";

import { cn } from "@/lib/utils";
import {
  Dumbbell,
  Flame,
  Scale,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

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

const STAT_ITEMS: {
  key: string;
  title: string;
  Icon: LucideIcon;
  iconColor: string;
  subColor: string;
  labelProp: keyof ProgressQuickStatsProps;
  subProp: keyof ProgressQuickStatsProps;
}[] = [
  {
    key: "weight",
    title: "Body Weight",
    Icon: Scale,
    iconColor: "text-m3-primary",
    subColor: "text-m3-secondary",
    labelProp: "weightLabel",
    subProp: "weightSub",
  },
  {
    key: "workouts",
    title: "Workouts",
    Icon: Dumbbell,
    iconColor: "text-m3-primary",
    subColor: "text-m3-primary",
    labelProp: "workoutsLabel",
    subProp: "workoutsSub",
  },
  {
    key: "streak",
    title: "Current Streak",
    Icon: Flame,
    iconColor: "text-m3-secondary",
    subColor: "text-m3-tertiary",
    labelProp: "streakLabel",
    subProp: "streakSub",
  },
  {
    key: "strength",
    title: "Strength",
    Icon: TrendingUp,
    iconColor: "text-m3-primary",
    subColor: "text-m3-secondary",
    labelProp: "strengthLabel",
    subProp: "strengthSub",
  },
];

export function ProgressQuickStats(props: ProgressQuickStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {STAT_ITEMS.map(
        ({ key, title, Icon, iconColor, subColor, labelProp, subProp }) => (
          <div
            key={key}
            className="group relative overflow-hidden rounded-3xl bg-m3-surface-high p-6"
          >
            <div className="absolute -bottom-4 -right-4 opacity-5 transition-opacity group-hover:opacity-10">
              <Icon className="size-20" aria-hidden />
            </div>
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Icon className={cn("size-4", iconColor)} aria-hidden />
              {title}
            </p>
            <p className="font-heading text-3xl font-extrabold tracking-tight">
              {props[labelProp]}
            </p>
            <p
              className={cn(
                "mt-4 flex items-center gap-1 text-xs font-bold",
                subColor,
              )}
            >
              {props[subProp]}
            </p>
          </div>
        ),
      )}
    </div>
  );
}
