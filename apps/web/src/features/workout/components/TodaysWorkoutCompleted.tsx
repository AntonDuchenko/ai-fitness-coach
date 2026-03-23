import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { WorkoutDaySchedule } from "../types";
import type { WorkoutLogResponse } from "../workoutLog.types";

interface TodaysWorkoutCompletedProps {
  todayWorkout: WorkoutDaySchedule | null | undefined;
  todayLog: WorkoutLogResponse;
  showLogAgain: boolean;
  onStartWorkout: () => void;
}

export function TodaysWorkoutCompleted({
  todayWorkout,
  todayLog,
  showLogAgain,
  onStartWorkout,
}: TodaysWorkoutCompletedProps) {
  const minutes =
    todayLog.duration != null
      ? `${todayLog.duration} min`
      : todayWorkout?.duration != null
        ? `Est. ${todayWorkout.duration} min`
        : null;

  return (
    <Card
      className={cn(
        "flex min-h-[320px] flex-col border-2 border-primary/50 bg-card shadow-sm",
      )}
    >
      <CardHeader className="gap-2">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <CheckCircle2 className="size-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Today
            </p>
            <CardTitle className="font-heading text-lg">
              {todayLog.workoutName}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Completed today
              {minutes ? ` · ${minutes}` : ""}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2 text-sm text-muted-foreground">
        <p>
          You&apos;re all set — workout saved to your log. Log session again if
          you trained outside the app.
        </p>
      </CardContent>
      <CardFooter className="mt-auto flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="ghost"
          className="text-muted-foreground"
          asChild
        >
          <Link href="/dashboard/workouts">View workout log</Link>
        </Button>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          {showLogAgain ? (
            <Button type="button" variant="outline" onClick={onStartWorkout}>
              Log session again
            </Button>
          ) : null}
        </div>
      </CardFooter>
    </Card>
  );
}
