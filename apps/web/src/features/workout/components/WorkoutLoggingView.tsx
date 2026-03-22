"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
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

  const meta = [
    `${ex.sets} sets`,
    ex.rest ? `Rest ${ex.rest}` : null,
    ex.muscleGroup,
  ]
    .filter(Boolean)
    .join(" · ");

  const isLast = session.exerciseIndex >= session.exercises.length - 1;

  return (
    <div className={cn("flex min-h-0 flex-1 flex-col", className)}>
      <header className="flex shrink-0 items-start justify-between gap-2 border-b border-border px-4 py-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={onClose}
          aria-label="Close workout"
        >
          <X className="size-5" />
        </Button>
        <div className="min-w-0 flex-1 text-center">
          <p className="font-heading text-base font-semibold leading-tight">
            {workoutTitle}
          </p>
          <p className="mt-0.5 text-[13px] text-muted-foreground">
            {session.exerciseLabel}
          </p>
        </div>
        <div className="size-9 shrink-0" aria-hidden />
      </header>

      <div className="shrink-0 px-4 pb-3">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-[width]"
            style={{
              width: `${Math.min(100, session.progressFraction * 100)}%`,
            }}
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-4">
        <ExerciseLogCard
          name={ex.name}
          meta={meta}
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

        <RestTimerBar
          restRemaining={session.restRemaining}
          restSeconds={session.restSeconds}
          onSkip={session.skipRest}
        />
      </div>

      <div className="flex shrink-0 gap-2 border-t border-border p-4">
        <Button
          type="button"
          variant="ghost"
          className="flex-1"
          disabled={session.exerciseIndex === 0}
          onClick={() => session.goPrevExercise()}
        >
          ← Previous
        </Button>
        {isLast ? (
          <Button
            type="button"
            className="flex-1"
            onClick={() => session.goToComplete()}
          >
            Complete workout
          </Button>
        ) : (
          <Button
            type="button"
            className="flex-1"
            onClick={() => session.goNextExercise()}
          >
            Next exercise →
          </Button>
        )}
      </div>
    </div>
  );
}
