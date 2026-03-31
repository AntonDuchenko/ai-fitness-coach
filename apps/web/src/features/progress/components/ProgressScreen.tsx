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
      <div className="flex h-[100dvh] flex-col bg-m3-surface text-m3-on-surface lg:flex-row">
        <DashboardSidebar className="hidden lg:flex" />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <ProgressPageSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-m3-surface text-m3-on-surface lg:flex-row">
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

        <main className="glow-bg flex-1 overflow-auto p-6 lg:p-10">
          {/* Header */}
          <header className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <h2 className="font-heading text-4xl font-extrabold tracking-tight text-m3-on-surface">
                Progress
              </h2>
              <p className="font-medium text-muted-foreground">
                Your journey to peak performance, visualised.
              </p>
            </div>
            <ProgressToolbar
              period={period}
              onPeriodChange={setPeriod}
              logOpen={logOpen}
              onLogOpenChange={setLogOpen}
            />
          </header>

          {d.weight.isError || d.consistency.isError ? (
            <p className="mb-6 text-sm text-destructive">
              Some progress data could not be loaded. Refresh the page or try
              again later.
            </p>
          ) : null}

          {/* Stat cards */}
          <section className="mb-10">
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
          </section>

          {/* Main grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Weight chart full width */}
            <div className="lg:col-span-12">
              <WeightProgressChartCard
                logs={d.weight.data?.logs ?? []}
                startWeight={d.weight.data?.startWeight ?? null}
                targetWeight={d.summary.data?.weight.targetWeight ?? null}
                isLoading={d.weight.isLoading}
              />
            </div>

            {/* Strength + Consistency */}
            <div className="lg:col-span-7">
              <StrengthProgressCard
                exercises={d.exerciseOptions}
                selectedExercise={d.selectedExercise}
                onExerciseChange={d.setSelectedExercise}
                data={d.strength.data}
                isLoading={d.strength.isLoading}
                isError={d.strength.isError}
              />
            </div>
            <div className="lg:col-span-5">
              <ConsistencyHeatmapCard
                data={d.consistency.data}
                isLoading={d.consistency.isLoading}
              />
            </div>

            {/* Volume section full width */}
            <div className="lg:col-span-12">
              <VolumeSectionCard
                weekly={d.volume.data}
                muscleRows={d.muscleRows}
                imbalanceMessage={d.imbalance}
                isLoadingWeekly={d.volume.isLoading}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
