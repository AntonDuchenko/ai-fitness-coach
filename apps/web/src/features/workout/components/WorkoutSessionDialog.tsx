"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWorkoutSession } from "../hooks/useWorkoutSession";
import type { WorkoutExercise } from "../types";
import { WorkoutCompleteForm } from "./WorkoutCompleteForm";
import { WorkoutLoggingView } from "./WorkoutLoggingView";
import { WorkoutSuccessView } from "./WorkoutSuccessView";

interface WorkoutSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planId: string;
  dayKey: string;
  workoutName: string;
  exercises: WorkoutExercise[];
}

export function WorkoutSessionDialog({
  open,
  onOpenChange,
  planId,
  dayKey,
  workoutName,
  exercises,
}: WorkoutSessionDialogProps) {
  const session = useWorkoutSession({
    open,
    planId,
    dayKey,
    workoutName,
    exercises,
  });

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="h-[100dvh] max-h-[100dvh] w-full max-w-lg gap-0 overflow-hidden rounded-none border-0 p-0"
      >
        <DialogTitle className="sr-only">Workout session</DialogTitle>
        <DialogDescription className="sr-only">
          Log sets, rate your session, and save your workout.
        </DialogDescription>
        {exercises.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">
            No exercises in this session.
          </p>
        ) : session.step === "logging" ? (
          <WorkoutLoggingView
            session={session}
            workoutTitle={workoutName}
            onClose={handleClose}
          />
        ) : session.step === "complete" ? (
          <WorkoutCompleteForm session={session} />
        ) : session.successMeta ? (
          <WorkoutSuccessView
            xp={session.successMeta.xp}
            levelUp={session.successMeta.levelUp}
            newLevel={session.successMeta.newLevel}
            streak={session.successMeta.streak}
            onDone={() => {
              session.finishSuccess();
              handleClose();
            }}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
