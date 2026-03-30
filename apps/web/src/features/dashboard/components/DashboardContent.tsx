"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MobileDrawer } from "@/features/chat/components/MobileDrawer";
import { WorkoutMobileHeader } from "@/features/workout/components/WorkoutMobileHeader";
import { WorkoutSessionDialog } from "@/features/workout/components/WorkoutSessionDialog";
import { useState } from "react";
import { useDashboardData } from "../hooks/useDashboardData";
import { AiCoachCard } from "./AiCoachCard";
import { DailyMacrosCard } from "./DailyMacrosCard";
import { DashboardHeader } from "./DashboardHeader";
import { QuickActionsRow } from "./QuickActionsRow";
import { TodaysWorkoutCard } from "./TodaysWorkoutCard";
import { WeeklyProgressCard } from "./WeeklyProgressCard";
import { WeightLogCard } from "./WeightLogCard";

export function DashboardContent() {
  const { user, workout, weight, nutrition, progress, chat } = useDashboardData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sessionOpen, setSessionOpen] = useState(false);

  const userName = user?.name?.trim() || "there";

  const openSession = () => {
    if (workout.sessionPayload) setSessionOpen(true);
  };

  return (
    <div className="flex h-[100dvh] flex-col bg-background text-foreground lg:flex-row">
      <DashboardSidebar className="hidden lg:flex" />
      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)}>
        <DashboardSidebar className="h-full border-r-0" />
      </MobileDrawer>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <WorkoutMobileHeader
          variant="generic"
          title="Dashboard"
          onOpenMenu={() => setMenuOpen(true)}
        />
        <div className="hidden lg:block">
          <DashboardHeader userName={userName} />
        </div>

        <main className="flex-1 overflow-auto px-4 py-6 lg:px-10 lg:py-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <TodaysWorkoutCard
              status={workout.status}
              todayWorkout={workout.todayWorkout}
              todayLog={workout.todayLog}
              sessionPayload={workout.sessionPayload}
              onStartWorkout={openSession}
              onRetry={workout.refetch}
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <WeightLogCard
                currentWeight={weight.currentWeight}
                change={weight.change}
                sparklineWeights={weight.logs.map((l) => l.weight)}
                isLoading={weight.isLoading}
              />
              <DailyMacrosCard
                targets={nutrition.targets}
                totals={nutrition.totals}
                isLoading={nutrition.isLoading}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <WeeklyProgressCard
                data={progress.data}
                isLoading={progress.isLoading}
              />
              <AiCoachCard
                lastMessage={chat.lastAiMessage?.content ?? null}
                messagesUsed={chat.usage?.messagesUsedToday ?? 0}
                dailyLimit={chat.usage?.dailyLimit ?? 5}
                isPremium={chat.usage?.isPremium ?? false}
                isLoading={chat.isLoading}
              />
            </div>

            <QuickActionsRow />
          </div>
        </main>
      </div>

      {workout.sessionPayload && (
        <WorkoutSessionDialog
          key={`${workout.sessionPayload.planId}-${workout.sessionPayload.dayKey}`}
          open={sessionOpen}
          onOpenChange={setSessionOpen}
          planId={workout.sessionPayload.planId}
          dayKey={workout.sessionPayload.dayKey}
          workoutName={workout.sessionPayload.workoutName}
          exercises={workout.sessionPayload.exercises}
        />
      )}
    </div>
  );
}
