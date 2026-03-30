"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X, Timer } from "lucide-react";
import type { useWorkoutSession } from "../hooks/useWorkoutSession";
import { ExerciseLogCard } from "./ExerciseLogCard";
import { RestTimerBar } from "./RestTimerBar";

type Session = ReturnType<typeof useWorkoutSession>;

interface WorkoutLoggingViewProps {
  session: Session;
  workoutTitle: string;
  onClose: () => void;
  className?: string;
}

export function WorkoutLoggingView({
  session,
  workoutTitle,
  onClose,
  className,
}: WorkoutLoggingViewProps) {
  const ex = session.currentExercise;
  if (!ex) return null;

  const isLast = session.exerciseIndex >= session.exercises.length - 1;

  return (
    <div className={cn("flex min-h-0 flex-1 flex-col bg-m3-surface", className)}>
      {/* Header */}
      <header className="flex w-full shrink-0 flex-col bg-m3-surface-low px-6 pb-4 pt-6">
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-m3-on-surface-variant transition-colors hover:bg-m3-surface-high"
            aria-label="Close workout"
          >
            <X className="size-5" />
          </button>
          <div className="flex flex-col items-center">
            <span className="font-heading text-lg font-bold tracking-tight text-m3-on-surface">
              {session.exerciseLabel}
            </span>
            <span className="text-xs font-medium uppercase tracking-widest text-m3-outline">
              {workoutTitle}
            </span>
          </div>
          <button
            type="button"
            className="rounded-full p-2 text-m3-primary transition-colors hover:bg-m3-surface-high"
            aria-label="Timer"
          >
            <Timer className="size-5" />
          </button>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-m3-surface-highest">
          <div
            className="h-full rounded-full bg-m3-primary transition-all duration-500"
            style={{
              width: `${Math.min(100, session.progressFraction * 100)}%`,
            }}
          />
        </div>
      </header>

      {/* Main content */}
      <main className="relative mx-auto min-h-0 w-full max-w-4xl flex-1 space-y-8 overflow-y-auto px-4 py-8 md:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10 glow-bg" />

        <ExerciseLogCard
          name={ex.name}
          meta={`${ex.sets} sets${ex.rest ? ` · Rest ${ex.rest}` : ""} · ${ex.muscleGroup}`}
          sets={session.currentSets}
          lastTimeLabel={session.lastTimeLabel}
          lastExpanded={session.lastExpanded}
          onLastExpandedChange={session.setLastExpanded}
          logsLoading={session.logsLoading}
          onSetChange={session.updateSet}
          onMarkDone={session.markSetDone}
          onBumpWeights={session.bumpWeights}
          onSameAsLastTime={session.applySameAsLastTime}
        />

      </main>

      {/* Footer nav */}
      <footer className="mt-auto">
        {/* Rest timer bar — above nav */}
        <RestTimerBar
          restRemaining={session.restRemaining}
          restSeconds={session.restSeconds}
          onSkip={session.skipRest}
        />
        <nav className="border-t border-m3-outline-variant/10 bg-m3-surface-low px-6 py-6">
          <div className="mx-auto flex max-w-4xl items-center justify-between gap-6">
            <button
              type="button"
              disabled={session.exerciseIndex === 0}
              onClick={() => session.goPrevExercise()}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-m3-surface-high py-4 font-bold text-m3-on-surface-variant transition-all hover:bg-m3-surface-bright active:scale-95 disabled:opacity-40"
            >
              <ChevronLeft className="size-5" /> Previous
            </button>
            <button
              type="button"
              onClick={() =>
                isLast ? session.goToComplete() : session.goNextExercise()
              }
              className="flex flex-[2] items-center justify-center gap-2 rounded-2xl bg-m3-primary-container py-4 text-sm font-black uppercase tracking-wider text-m3-on-primary-container shadow-lg shadow-m3-primary-container/20 transition-all hover:brightness-110 active:scale-95"
            >
              {isLast ? "Complete Workout" : "Next Exercise"}
              <ChevronRight className="size-5" />
            </button>
          </div>
        </nav>
      </footer>
    </div>
  );
}
