"use client";

import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { MobileDrawer } from "@/features/chat/components/MobileDrawer";
import { WeightLogWidget } from "@/features/progress/components/WeightLogWidget";
import { TodaysWorkoutWidget } from "@/features/workout/components/TodaysWorkoutWidget";
import { WorkoutMobileHeader } from "@/features/workout/components/WorkoutMobileHeader";
import { WorkoutSessionDialog } from "@/features/workout/components/WorkoutSessionDialog";
import { useTodaysWorkoutWidget } from "@/features/workout/hooks/useTodaysWorkoutWidget";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardHomeContent />
    </ProtectedRoute>
  );
}

function DashboardHomeContent() {
  const w = useTodaysWorkoutWidget();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sessionOpen, setSessionOpen] = useState(false);

  const openSession = () => {
    if (w.sessionPayload) setSessionOpen(true);
  };

  return (
    <div className="flex h-[100dvh] flex-col bg-background text-foreground lg:flex-row">
      <DashboardSidebar className="hidden lg:flex" />
      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)}>
        <DashboardSidebar className="h-full border-r-0" />
      </MobileDrawer>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <WorkoutMobileHeader
          title="Dashboard"
          onOpenMenu={() => setMenuOpen(true)}
        />

        <header className="hidden h-[72px] shrink-0 items-center border-b border-border px-6 lg:flex">
          <div>
            <h1 className="font-heading text-base font-semibold">Dashboard</h1>
            <p className="text-[12px] text-muted-foreground">
              Today&apos;s workout and quick links
            </p>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 overflow-auto p-4 lg:p-6">
          <section aria-labelledby="today-heading">
            <h2
              id="today-heading"
              className="mb-3 font-heading text-sm font-semibold"
            >
              Today&apos;s workout
            </h2>
            <TodaysWorkoutWidget
              status={w.status}
              todayWorkout={w.todayWorkout}
              todayLog={w.todayLog}
              sessionPayload={w.sessionPayload}
              onStartWorkout={openSession}
              onRetry={w.refetch}
            />
          </section>

          <section aria-labelledby="weight-heading">
            <h2
              id="weight-heading"
              className="mb-3 font-heading text-sm font-semibold"
            >
              Quick weight log
            </h2>
            <WeightLogWidget />
          </section>

          <section className="flex flex-wrap gap-3" aria-label="Quick links">
            <Button type="button" variant="secondary" asChild>
              <Link href="/dashboard/workouts">Full workout plan</Link>
            </Button>
            <Button type="button" variant="secondary" asChild>
              <Link href="/chat">AI coach</Link>
            </Button>
          </section>
        </div>
      </div>

      {w.sessionPayload ? (
        <WorkoutSessionDialog
          key={`${w.sessionPayload.planId}-${w.sessionPayload.dayKey}`}
          open={sessionOpen}
          onOpenChange={setSessionOpen}
          planId={w.sessionPayload.planId}
          dayKey={w.sessionPayload.dayKey}
          workoutName={w.sessionPayload.workoutName}
          exercises={w.sessionPayload.exercises}
        />
      ) : null}
    </div>
  );
}
