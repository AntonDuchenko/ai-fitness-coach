"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MobileDrawer } from "@/features/chat/components/MobileDrawer";
import { useState } from "react";
import { isPlanNotFound } from "../hooks/useWorkoutPlan";
import { dayKey, useWorkoutPlanView } from "../hooks/useWorkoutPlanView";
import { RegeneratePlanDialog } from "./RegeneratePlanDialog";
import { WorkoutDayCard } from "./WorkoutDayCard";
import { WorkoutDesktopHeader } from "./WorkoutDesktopHeader";
import { WorkoutDetailPanel } from "./WorkoutDetailPanel";
import { WorkoutMobileDayPills } from "./WorkoutMobileDayPills";
import { WorkoutMobileHeader } from "./WorkoutMobileHeader";
import { WorkoutPlanEmpty } from "./WorkoutPlanEmpty";
import { WorkoutPlanError } from "./WorkoutPlanError";
import { WorkoutPlanSkeleton } from "./WorkoutPlanSkeleton";
import { WorkoutSessionDialog } from "./WorkoutSessionDialog";

export function WorkoutPlanScreen() {
  const v = useWorkoutPlanView();
  const [workoutSessionOpen, setWorkoutSessionOpen] = useState(false);

  if (v.isLoading) return <WorkoutPlanSkeleton />;

  if (v.isError && isPlanNotFound(v.error)) return <WorkoutPlanEmpty />;

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

  const canStart =
    Boolean(v.plan.id && v.selectedDayKey) &&
    Boolean(v.selectedSlot?.workout?.exercises.length);

  return (
    <div className="flex h-[100dvh] flex-col bg-m3-surface text-m3-on-surface lg:flex-row">
      {/* Desktop sidebar */}
      <DashboardSidebar className="hidden lg:flex" />

      <MobileDrawer open={v.menuOpen} onClose={() => v.setMenuOpen(false)}>
        <DashboardSidebar className="h-full border-r-0" />
      </MobileDrawer>

      {/* Main content */}
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="pointer-events-none absolute inset-0 glow-bg" />

        {/* Desktop header */}
        <div className="hidden lg:block">
          <WorkoutDesktopHeader
            planName={v.plan.name}
            currentWeek={v.currentWeek}
            durationWeeks={v.durationWeeks}
            progressPct={v.progressPct}
            onRegenerate={() => v.setRegenOpen(true)}
            isRegenerating={v.regenerate.isPending}
          />
        </div>

        {/* Mobile header */}
        <WorkoutMobileHeader onMoreClick={() => v.setMenuOpen(true)} />

        {/* Desktop two-panel layout */}
        <div className="hidden min-h-0 flex-1 gap-8 p-8 lg:flex">
          {/* Left: day list (35%) */}
          <section className="w-[35%] space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-gray-300">
                Weekly Schedule
              </h3>
            </div>
            <div className="space-y-3">
              {v.slots.map((slot) => (
                <WorkoutDayCard
                  key={dayKey(slot.date)}
                  slot={slot}
                  selected={dayKey(slot.date) === v.selectedDayKey}
                  onSelect={() => v.onSelectDay(slot)}
                />
              ))}
            </div>
          </section>

          {/* Right: detail panel (65%) */}
          <section className="glass-card flex min-h-[716px] w-[65%] flex-col rounded-3xl border border-m3-outline-variant/10 shadow-2xl">
            <WorkoutDetailPanel
              slot={v.selectedSlot}
              canStart={canStart}
              onStartWorkout={() => setWorkoutSessionOpen(true)}
            />
          </section>
        </div>

        {/* Mobile layout */}
        <div className="min-h-0 flex-1 overflow-y-auto pb-40 pt-20 lg:hidden">
          <WorkoutMobileDayPills
            planName={v.plan.name}
            currentWeek={v.currentWeek}
            durationWeeks={v.durationWeeks}
            slots={v.slots}
            selectedDayKey={v.selectedDayKey}
            onSelectDay={v.onSelectDay}
          />

          {/* Inline detail */}
          <div className="px-6">
            <WorkoutDetailPanel
              slot={v.selectedSlot}
              canStart={canStart}
              onStartWorkout={() => setWorkoutSessionOpen(true)}
              className="px-0"
            />
          </div>
        </div>

        {/* Mobile sticky start button */}
        {canStart && (
          <div className="fixed bottom-0 left-0 z-[60] w-full px-6 pb-4 lg:hidden">
            <button
              type="button"
              onClick={() => setWorkoutSessionOpen(true)}
              className="w-full rounded-2xl bg-m3-primary-container py-5 font-heading text-lg font-extrabold uppercase tracking-tight text-m3-on-primary-container shadow-[0_12px_24px_rgba(77,142,255,0.3)] transition-all duration-200 active:scale-95"
            >
              Start Workout
            </button>
          </div>
        )}
      </div>

      {/* Dialogs */}
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
    </div>
  );
}
