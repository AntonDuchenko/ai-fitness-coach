"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Star, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import type { useWorkoutSession } from "../hooks/useWorkoutSession";
import { formatVolumeTonnes } from "../utils/workoutLogHelpers";

type Session = ReturnType<typeof useWorkoutSession>;

interface WorkoutCompleteFormProps {
  session: Session;
  className?: string;
}

export function WorkoutCompleteForm({
  session,
  className,
}: WorkoutCompleteFormProps) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 10_000);
    return () => window.clearInterval(id);
  }, [session.sessionStartedAt]);

  const durationMin = Math.max(
    1,
    Math.round((Date.now() - session.sessionStartedAt) / 60_000),
  );
  const vol = formatVolumeTonnes(session.volumeKg);

  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-6",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2 py-6 text-center">
        <Trophy className="size-10 text-amber-500" aria-hidden />
        <h2 className="font-heading text-xl font-bold">Workout complete!</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Great session — you hit every exercise.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Card className="py-3">
          <CardContent className="space-y-1 px-3 text-center">
            <p className="font-heading text-xl font-bold text-primary tabular-nums">
              {session.exercises.length}
            </p>
            <p className="text-[11px] text-muted-foreground">Exercises</p>
          </CardContent>
        </Card>
        <Card className="py-3">
          <CardContent className="space-y-1 px-3 text-center">
            <p className="font-heading text-xl font-bold text-primary tabular-nums">
              {durationMin}m
            </p>
            <p className="text-[11px] text-muted-foreground">Duration</p>
          </CardContent>
        </Card>
        <Card className="py-3">
          <CardContent className="space-y-1 px-3 text-center">
            <p className="font-heading text-xl font-bold text-success tabular-nums">
              {vol}
            </p>
            <p className="text-[11px] text-muted-foreground">Volume</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 space-y-2">
        <Label>Rate this workout</Label>
        <div className="flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <Button
              key={n}
              type="button"
              variant="ghost"
              size="icon"
              className="size-10"
              onClick={() => session.setRating(n)}
              aria-label={`${n} stars`}
            >
              <Star
                className={cn(
                  "size-8",
                  session.rating >= n
                    ? "fill-amber-500 text-amber-500"
                    : "text-muted-foreground",
                )}
              />
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <Label htmlFor="workout-notes">Notes (optional)</Label>
        <Textarea
          id="workout-notes"
          placeholder="Felt strong on bench today…"
          value={session.notes}
          onChange={(e) => session.setNotes(e.target.value)}
          rows={3}
        />
      </div>

      <Button
        type="button"
        className="mt-8 w-full"
        size="lg"
        disabled={session.logMutation.isPending}
        onClick={() => void session.submitWorkout()}
      >
        {session.logMutation.isPending ? "Saving…" : "Save workout"}
      </Button>
    </div>
  );
}
