"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MobileDrawer } from "@/features/chat/components/MobileDrawer";
import { WorkoutMobileHeader } from "@/features/workout/components/WorkoutMobileHeader";
import { useState } from "react";
import type { ProgressPeriod } from "../constants";
import { useProgressScreenData } from "../hooks/useProgressScreenData";
import { ConsistencyHeatmapCard } from "./ConsistencyHeatmapCard";
import { ProgressPageSkeleton } from "./ProgressPageSkeleton";
import { ProgressQuickStats } from "./ProgressQuickStats";
import { ProgressToolbar } from "./ProgressToolbar";
import { StrengthProgressCard } from "./StrengthProgressCard";
import { VolumeSectionCard } from "./VolumeSectionCard";
import { WeightProgressChartCard } from "./WeightProgressChartCard";

export function ProgressScreen() {
  const [period, setPeriod] = useState<ProgressPeriod>("3months");
  const [logOpen, setLogOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const d = useProgressScreenData(period);

  if (d.initialLoading) {
    return (
      <div className="flex h-[100dvh] flex-col bg-background text-foreground lg:flex-row">
        <DashboardSidebar className="hidden lg:flex" />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <ProgressPageSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-background text-foreground lg:flex-row">
      <DashboardSidebar className="hidden lg:flex" />
      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)}>
        <DashboardSidebar className="h-full border-r-0" />
      </MobileDrawer>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <WorkoutMobileHeader
          variant="generic"
          title="Progress"
          onOpenMenu={() => setMenuOpen(true)}
        />

        <header className="hidden h-[72px] shrink-0 items-center border-b border-border px-6 lg:flex">
          <div>
            <h1 className="font-heading text-base font-semibold">Progress</h1>
            <p className="text-[12px] text-muted-foreground">
              Weight, strength, consistency and volume
            </p>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 overflow-auto p-4 lg:p-6">
          <ProgressToolbar
            period={period}
            onPeriodChange={setPeriod}
            logOpen={logOpen}
            onLogOpenChange={setLogOpen}
          />

          {d.weight.isError || d.consistency.isError ? (
            <p className="text-sm text-destructive">
              Some progress data could not be loaded. Refresh the page or try
              again later.
            </p>
          ) : null}

          <ProgressQuickStats
            weightLabel={d.stats.weightLabel}
            weightSub={d.stats.weightSub}
            workoutsLabel={d.stats.workoutsLabel}
            workoutsSub={d.stats.workoutsSub}
            streakLabel={d.stats.streakLabel}
            streakSub={d.stats.streakSub}
            strengthLabel={d.stats.strengthLabel}
            strengthSub={d.stats.strengthSub}
          />

          <WeightProgressChartCard
            logs={d.weight.data?.logs ?? []}
            startWeight={d.weight.data?.startWeight ?? null}
            targetWeight={d.summary.data?.weight.targetWeight ?? null}
            isLoading={d.weight.isLoading}
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <StrengthProgressCard
              exercises={d.exerciseOptions}
              selectedExercise={d.selectedExercise}
              onExerciseChange={d.setSelectedExercise}
              data={d.strength.data}
              isLoading={d.strength.isLoading}
              isError={d.strength.isError}
            />
            <ConsistencyHeatmapCard
              data={d.consistency.data}
              isLoading={d.consistency.isLoading}
            />
          </div>

          <VolumeSectionCard
            weekly={d.volume.data}
            muscleRows={d.muscleRows}
            imbalanceMessage={d.imbalance}
            isLoadingWeekly={d.volume.isLoading}
          />
        </div>
      </div>
    </div>
  );
}
