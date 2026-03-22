"use client";

import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";

interface RestTimerBarProps {
  restRemaining: number;
  restSeconds: number;
  onSkip: () => void;
}

function formatClock(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function RestTimerBar({
  restRemaining,
  restSeconds,
  onSkip,
}: RestTimerBarProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-muted px-3 py-2.5 text-sm">
      <div className="flex items-center gap-2">
        <Timer className="size-4 text-muted-foreground" aria-hidden />
        <span className="tabular-nums text-foreground">
          {restRemaining > 0
            ? `Rest ${formatClock(restRemaining)}`
            : `Rest — tap ✓ on a set to start ${restSeconds}s`}
        </span>
      </div>
      {restRemaining > 0 ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8"
          onClick={onSkip}
        >
          Skip
        </Button>
      ) : null}
    </div>
  );
}
