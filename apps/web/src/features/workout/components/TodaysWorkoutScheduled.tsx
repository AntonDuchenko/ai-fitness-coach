import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dumbbell, Timer } from "lucide-react";
import Link from "next/link";
import type { WorkoutDaySchedule } from "../types";

function formatPreviewLine(ex: WorkoutDaySchedule["exercises"][0], i: number) {
  return `${i + 1}. ${ex.name} — ${ex.sets}×${ex.reps}`;
}

interface TodaysWorkoutScheduledProps {
  todayWorkout: WorkoutDaySchedule;
  onStartWorkout: () => void;
}

export function TodaysWorkoutScheduled({
  todayWorkout,
  onStartWorkout,
}: TodaysWorkoutScheduledProps) {
  const preview = todayWorkout.exercises.slice(0, 3);
  const durationLabel =
    todayWorkout.duration != null
      ? `Est. ${todayWorkout.duration} min`
      : null;

  return (
    <Card className="flex min-h-[320px] flex-col border-border bg-card shadow-sm">
      <CardHeader className="gap-2">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Dumbbell className="size-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Today&apos;s session
            </p>
            <CardTitle className="font-heading text-lg">
              {todayWorkout.focus}
            </CardTitle>
            {durationLabel ? (
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Timer className="size-3.5 shrink-0" aria-hidden />
                {durationLabel}
              </p>
            ) : null}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Preview
        </p>
        <ul className="space-y-1.5 text-sm text-foreground">
          {preview.map((ex, i) => (
            <li key={`${ex.name}-${i}`}>{formatPreviewLine(ex, i)}</li>
          ))}
        </ul>
        <Link
          href="/dashboard/workouts"
          className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          View full plan
        </Link>
      </CardContent>
      <CardFooter className="mt-auto justify-end border-t border-border pt-6">
        <Button type="button" onClick={onStartWorkout}>
          Start workout
        </Button>
      </CardFooter>
    </Card>
  );
}
