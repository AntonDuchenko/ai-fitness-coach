"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, Flame } from "lucide-react";

interface WorkoutSuccessViewProps {
  xp: number;
  levelUp: boolean;
  newLevel: number;
  streak: number;
  onDone: () => void;
  className?: string;
}

export function WorkoutSuccessView({
  xp,
  levelUp,
  newLevel,
  streak,
  onDone,
  className,
}: WorkoutSuccessViewProps) {
  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-6 py-10 text-center",
        className,
      )}
    >
      <p className="font-heading text-2xl font-bold">Saved!</p>
      <Badge
        variant="default"
        className="bg-success/15 px-3 py-1 text-sm font-semibold text-success"
      >
        +{xp} XP
      </Badge>
      <div className="flex w-full max-w-sm items-start gap-3 rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-left text-sm">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" />
        <p className="text-foreground">
          Workout saved. Your stats are updated.
        </p>
      </div>
      {levelUp ? (
        <p className="text-sm font-semibold text-primary">
          Level up! You&apos;re now level {newLevel}.
        </p>
      ) : null}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Flame className="size-4 text-amber-500" aria-hidden />
        <span>{streak}-day streak · Keep it going!</span>
      </div>
      <p className="text-4xl" aria-hidden>
        🎉
      </p>
      <Button type="button" className="mt-4 w-full max-w-xs" onClick={onDone}>
        Done
      </Button>
    </div>
  );
}
