"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MobileDrawer } from "@/features/chat/components/MobileDrawer";
import { cn } from "@/lib/utils";
import { isPlanNotFound } from "../hooks/useWorkoutPlan";
import { dayKey, useWorkoutPlanView } from "../hooks/useWorkoutPlanView";
import { RegeneratePlanDialog } from "./RegeneratePlanDialog";
import { WorkoutDayDetailPanel } from "./WorkoutDayDetailPanel";
import { WorkoutSessionDialog } from "./WorkoutSessionDialog";
import { WorkoutMobileHeader } from "./WorkoutMobileHeader";
import { WorkoutPlanEmpty } from "./WorkoutPlanEmpty";
import { WorkoutPlanError } from "./WorkoutPlanError";
import { WorkoutPlanSkeleton } from "./WorkoutPlanSkeleton";
import { WorkoutWeekContent } from "./WorkoutWeekContent";

export function WorkoutPlanScreen() {
  const v = useWorkoutPlanView();
  const [workoutSessionOpen, setWorkoutSessionOpen] = useState(false);

  if (v.isLoading) {
    return <WorkoutPlanSkeleton />;
  }

  if (v.isError && isPlanNotFound(v.error)) {
    return <WorkoutPlanEmpty />;
  }

  if (v.isError || !v.plan) {
    return (
      <WorkoutPlanError
        message={
          v.error instanceof Error ? v.error.message : "Failed to load plan."
        }
        onRetry={() => v.refetch()}
      />
    );
  }

  const planHeader = (
    <>
      <h1 className="font-heading text-base font-semibold">Workout Plan</h1>
      <p className="text-[12px] text-muted-foreground">
        Week {v.selectedWeek} of {v.plan.durationWeeks} · {v.plan.name}
      </p>
    </>
  );

  return (
    <div className="flex h-[100dvh] flex-col bg-background text-foreground lg:flex-row">
      <DashboardSidebar className="hidden lg:flex" />

      <MobileDrawer open={v.menuOpen} onClose={() => v.setMenuOpen(false)}>
        <DashboardSidebar className="h-full border-r-0" />
      </MobileDrawer>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <WorkoutMobileHeader onOpenMenu={() => v.setMenuOpen(true)} />

        <div className="flex flex-col gap-2 border-b border-border px-4 py-3 lg:hidden">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">{planHeader}</div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="shrink-0"
              onClick={() => v.setRegenOpen(true)}
              disabled={v.regenerate.isPending}
            >
              Regenerate
            </Button>
          </div>
        </div>

        <header className="hidden h-[72px] shrink-0 items-center gap-3 border-b border-border px-6 lg:flex">
          <div className="min-w-0 flex-1">{planHeader}</div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => v.setRegenOpen(true)}
            disabled={v.regenerate.isPending}
          >
            Regenerate plan
          </Button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <WorkoutWeekContent
            durationWeeks={v.durationWeeks}
            selectedWeek={v.selectedWeek}
            onSelectWeek={v.setSelectedWeek}
            currentWeek={v.currentWeek}
            progressPct={v.progressPct}
            slots={v.slots}
            selectedDayKey={v.selectedDayKey}
            onSelectDay={v.onSelectDay}
            dayKey={dayKey}
          />

          <aside
            className={cn(
              "hidden w-full max-w-md shrink-0 border-l border-border bg-card/30 lg:flex lg:max-w-[420px]",
            )}
          >
            <WorkoutDayDetailPanel
              slot={v.selectedSlot}
              planId={v.plan.id}
              dayKey={v.selectedDayKey ?? undefined}
              onStartWorkout={() => setWorkoutSessionOpen(true)}
              className="h-full min-h-0"
            />
          </aside>
        </div>
      </div>

      <RegeneratePlanDialog
        open={v.regenOpen}
        onOpenChange={v.setRegenOpen}
        onConfirm={v.onRegenerate}
        isLoading={v.regenerate.isPending}
        durationWeeks={v.plan.durationWeeks}
      />

      {v.selectedSlot?.workout ? (
        <WorkoutSessionDialog
          key={`${v.plan.id}-${v.selectedDayKey ?? ""}`}
          open={workoutSessionOpen}
          onOpenChange={setWorkoutSessionOpen}
          planId={v.plan.id}
          dayKey={v.selectedDayKey ?? ""}
          workoutName={v.selectedSlot.workout.focus}
          exercises={v.selectedSlot.workout.exercises}
        />
      ) : null}

      <Dialog
        open={v.mobileDetailOpen}
        onOpenChange={v.setMobileDetailOpen}
      >
        <DialogContent
          showCloseButton
          className="flex h-[90dvh] max-h-[90dvh] w-full max-w-lg flex-col gap-0 overflow-hidden p-0 sm:max-w-lg"
        >
          <DialogTitle className="sr-only">Workout details</DialogTitle>
          <WorkoutDayDetailPanel
            slot={v.selectedSlot}
            planId={v.plan.id}
            dayKey={v.selectedDayKey ?? undefined}
            onStartWorkout={() => setWorkoutSessionOpen(true)}
            className="min-h-0 flex-1"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
