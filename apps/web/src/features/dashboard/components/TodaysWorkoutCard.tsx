import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type {
  SessionStartPayload,
  TodaysWorkoutWidgetStatus,
} from "@/features/workout/hooks/useTodaysWorkoutWidget";
import type { WorkoutDaySchedule } from "@/features/workout/types";
import type { WorkoutLogResponse } from "@/features/workout/workoutLog.types";
import { CheckCircle, Dumbbell } from "lucide-react";
import Link from "next/link";
import { WorkoutScheduledCard } from "./WorkoutScheduledCard";

interface TodaysWorkoutCardProps {
  status: TodaysWorkoutWidgetStatus;
  todayWorkout: WorkoutDaySchedule | null | undefined;
  todayLog: WorkoutLogResponse | undefined;
  sessionPayload: SessionStartPayload | null;
  onStartWorkout: () => void;
  onRetry: () => void;
}

export function TodaysWorkoutCard({
  status,
  todayWorkout,
  todayLog,
  onStartWorkout,
  onRetry,
}: TodaysWorkoutCardProps) {
  if (status === "loading") {
    return (
      <Card className="border-0 rounded-2xl">
        <CardHeader className="flex flex-row items-center gap-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-20" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-40 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (status === "error") {
    return (
      <Card className="flex min-h-[200px] flex-col items-center justify-center gap-4 border-0 rounded-2xl">
        <p className="text-sm text-muted-foreground">Failed to load workout</p>
        <Button variant="outline" size="sm" onClick={onRetry}>
          Retry
        </Button>
      </Card>
    );
  }

  if (status === "no-plan") {
    return (
      <Card className="flex min-h-[200px] flex-col items-center justify-center gap-3 border-0 rounded-2xl">
        <Dumbbell className="size-8 text-muted-foreground" aria-hidden />
        <p className="text-sm text-muted-foreground">No workout plan yet</p>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/workouts">Create plan</Link>
        </Button>
      </Card>
    );
  }

  if (status === "rest") {
    return (
      <Card className="flex min-h-[200px] flex-col items-center justify-center gap-3 border-0 rounded-2xl">
        <span className="text-3xl" role="img" aria-label="rest day">
          😴
        </span>
        <p className="font-heading text-lg font-semibold">Rest Day</p>
        <p className="text-sm text-muted-foreground">Recovery is part of the process</p>
      </Card>
    );
  }

  if (status === "completed") {
    return (
      <Card className="flex min-h-[200px] flex-col items-center justify-center gap-3 border-0 rounded-2xl border-success/30 bg-success/5">
        <CheckCircle className="size-8 text-success" aria-hidden />
        <p className="font-heading text-lg font-semibold text-success">
          Workout Completed!
        </p>
        {todayLog && (
          <p className="text-sm text-muted-foreground">{todayLog.workoutName}</p>
        )}
      </Card>
    );
  }

  if (status === "scheduled" && todayWorkout) {
    return <WorkoutScheduledCard workout={todayWorkout} onStart={onStartWorkout} />;
  }

  return null;
}
