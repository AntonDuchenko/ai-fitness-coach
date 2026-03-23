"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { CalendarDaySlot } from "../types";

interface DayCardProps {
  slot: CalendarDaySlot;
  selected: boolean;
  onSelect: () => void;
}

function statusBadge(status: CalendarDaySlot["status"]) {
  switch (status) {
    case "rest":
      return (
        <Badge variant="secondary" className="font-semibold">
          Rest day
        </Badge>
      );
    case "completed":
      return (
        <Badge variant="success" className="font-semibold">
          Completed
        </Badge>
      );
    case "missed":
      return (
        <Badge variant="destructive" className="font-semibold">
          Missed
        </Badge>
      );
    default:
      return (
        <Badge variant="default" className="font-semibold">
          Scheduled
        </Badge>
      );
  }
}

function accentColor(slot: CalendarDaySlot): string {
  if (slot.isRest) return "bg-muted-foreground";
  switch (slot.status) {
    case "completed":
      return "bg-success";
    case "missed":
      return "bg-destructive";
    default:
      return "bg-primary";
  }
}

export function DayCardSkeleton() {
  return (
    <div className="flex min-h-[124px] w-full min-w-0 flex-1 flex-col rounded-xl border border-border/60 bg-card p-0 sm:min-w-[100px]">
      <div className="flex min-h-[124px] w-full overflow-hidden rounded-xl">
        <div className="w-1 shrink-0 bg-muted sm:w-1.5" aria-hidden />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-2.5 sm:p-3">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-full" />
        </div>
      </div>
    </div>
  );
}

export function DayCard({ slot, selected, onSelect }: DayCardProps) {
  const title = slot.isRest ? "Recovery" : (slot.workout?.focus ?? "Training");
  const preview =
    slot.isRest || !slot.workout
      ? "Mobility, walking, or complete rest"
      : slot.workout.exercises
          .slice(0, 2)
          .map((e) => e.name)
          .join(" · ");

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onSelect}
      className={cn(
        "flex h-auto min-h-[124px] w-full min-w-0 flex-1 flex-col rounded-xl border p-0 text-left transition-colors sm:min-w-[100px]",
        slot.isRest
          ? "border-border/80 bg-muted/20"
          : "border-border/60 bg-card",
        selected && "ring-2 ring-primary ring-offset-2 ring-offset-background",
      )}
    >
      <div className="flex min-h-[124px] w-full overflow-hidden rounded-xl">
        <div
          className={cn("w-1 shrink-0 sm:w-1.5", accentColor(slot))}
          aria-hidden
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-2.5 sm:p-3">
          <p className="text-[11px] text-muted-foreground">{slot.labelShort}</p>
          {statusBadge(slot.status)}
          <p
            className={cn(
              "truncate font-heading text-sm font-semibold",
              slot.isRest && "text-muted-foreground",
            )}
          >
            {title}
          </p>
          <p className="line-clamp-2 text-[12px] leading-snug text-muted-foreground">
            {preview}
          </p>
        </div>
      </div>
    </Button>
  );
}
