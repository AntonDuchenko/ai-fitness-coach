"use client";

import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Clock,
  Dumbbell,
  History,
  Info,
  Layers,
  Video,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { SessionSet } from "../workoutLog.types";
import { SetLogger } from "./SetLogger";

interface ExerciseLogCardProps {
  name: string;
  meta: string;
  sets: SessionSet[];
  lastTimeLabel: string | null;
  lastExpanded: boolean;
  onLastExpandedChange: (open: boolean) => void;
  logsLoading: boolean;
  onSetChange: (setIndex: number, patch: Partial<SessionSet>) => void;
  onMarkDone: (setIndex: number, done: boolean) => void;
  onBumpWeights: (delta: number) => void;
  onSameAsLastTime: () => void;
  className?: string;
}

export function ExerciseLogCard({
  name,
  meta,
  sets,
  lastTimeLabel,
  lastExpanded,
  onLastExpandedChange,
  logsLoading,
  onSetChange,
  onMarkDone,
  onBumpWeights,
  onSameAsLastTime,
  className,
}: ExerciseLogCardProps) {
  // Parse meta string "4 sets · Rest 120s · Chest"
  const metaParts = meta.split("·").map((s) => s.trim());
  const setsLabel = metaParts[0] ?? "";
  const restLabel = metaParts[1] ?? "";
  const muscleLabel = metaParts[2] ?? "";

  return (
    <section className={cn("space-y-6", className)}>
      {/* Exercise heading + meta chips */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-m3-on-surface">
            {name}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-m3-on-surface-variant">
            {setsLabel && (
              <span className="flex items-center gap-1 rounded-full bg-m3-surface-high px-3 py-1">
                <Layers className="size-3.5" /> {setsLabel}
              </span>
            )}
            {restLabel && (
              <span className="flex items-center gap-1 rounded-full bg-m3-surface-high px-3 py-1">
                <Clock className="size-3.5" /> {restLabel}
              </span>
            )}
            {muscleLabel && (
              <span className="flex items-center gap-1 rounded-full bg-m3-primary/10 px-3 py-1 font-semibold text-m3-primary">
                <Dumbbell className="size-3.5" /> {muscleLabel}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-m3-outline-variant px-3 py-2 text-xs font-bold uppercase tracking-wider text-m3-outline transition-colors hover:text-m3-primary"
          >
            <History className="size-3.5" /> History
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-m3-outline-variant px-3 py-2 text-xs font-bold uppercase tracking-wider text-m3-outline transition-colors hover:text-m3-primary"
          >
            <Video className="size-3.5" /> Form
          </button>
        </div>
      </div>

      {/* Last time collapsible */}
      {lastTimeLabel ? (
        <Collapsible open={lastExpanded} onOpenChange={onLastExpandedChange}>
          <div className="flex items-start gap-2 rounded-lg bg-m3-primary/10 px-3 py-2 text-sm">
            <Info className="mt-0.5 size-4 shrink-0 text-m3-primary" aria-hidden />
            <div className="min-w-0 flex-1">
              <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 text-left font-medium text-m3-on-surface">
                <span className="line-clamp-2">{lastTimeLabel}</span>
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 transition-transform",
                    lastExpanded && "rotate-180",
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-1 text-m3-outline">
                Previous session values for this exercise.
              </CollapsibleContent>
            </div>
          </div>
        </Collapsible>
      ) : logsLoading ? (
        <p className="text-xs text-m3-outline">Loading previous sessions…</p>
      ) : null}

      {/* Quick action chips */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onBumpWeights(2.5)}
          className="rounded-xl border border-m3-outline-variant/30 bg-m3-surface-high px-4 py-2 text-xs font-bold text-m3-on-surface-variant transition-all hover:bg-m3-surface-bright active:scale-95"
        >
          +2.5kg all
        </button>
        <button
          type="button"
          onClick={() => onBumpWeights(5)}
          className="rounded-xl border border-m3-outline-variant/30 bg-m3-surface-high px-4 py-2 text-xs font-bold text-m3-on-surface-variant transition-all hover:bg-m3-surface-bright active:scale-95"
        >
          +5kg all
        </button>
        <button
          type="button"
          onClick={onSameAsLastTime}
          disabled={!lastTimeLabel}
          className="rounded-xl border border-m3-outline-variant/30 bg-m3-surface-high px-4 py-2 text-xs font-bold text-m3-on-surface-variant transition-all hover:bg-m3-surface-bright active:scale-95 disabled:opacity-40"
        >
          Same as last
        </button>
      </div>

      {/* Set logger table */}
      <SetLogger sets={sets} onChange={onSetChange} onMarkDone={onMarkDone} />
    </section>
  );
}
