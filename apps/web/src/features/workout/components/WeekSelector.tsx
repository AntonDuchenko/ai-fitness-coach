"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WeekSelectorProps {
  durationWeeks: number;
  selectedWeek: number;
  onSelect: (week: number) => void;
}

export function WeekSelector({
  durationWeeks,
  selectedWeek,
  onSelect,
}: WeekSelectorProps) {
  const weeks = Array.from({ length: durationWeeks }, (_, i) => i + 1);

  return (
    <div className="flex min-w-0 gap-2 overflow-x-auto pb-1">
      {weeks.map((w) => {
        const active = w === selectedWeek;
        return (
          <Button
            key={w}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onSelect(w)}
            className={cn(
              "shrink-0 rounded-lg px-3.5 text-[13px] font-semibold",
              active
                ? "border-primary bg-primary/15 text-primary"
                : "border-border bg-card text-muted-foreground hover:border-border hover:bg-muted/50",
            )}
          >
            W{w}
          </Button>
        );
      })}
    </div>
  );
}
