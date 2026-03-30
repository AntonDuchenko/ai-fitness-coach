"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface WorkoutDesktopHeaderProps {
  planName: string;
  currentWeek: number;
  durationWeeks: number;
  progressPct: number;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

export function WorkoutDesktopHeader({
  planName,
  currentWeek,
  durationWeeks,
  progressPct,
  onRegenerate,
  isRegenerating,
}: WorkoutDesktopHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-m3-surface-low/50 bg-m3-surface/80 px-8 py-6 backdrop-blur-md">
      <div className="max-w-2xl flex-1">
        <div className="mb-3 flex items-center gap-4">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-m3-on-surface">
            {planName}
          </h2>
          <span className="rounded-full border border-m3-outline-variant/20 bg-m3-surface-high px-3 py-1 text-xs font-bold uppercase tracking-tighter text-m3-primary">
            Plan: Pro
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-m3-surface-low">
            <div
              className="h-full rounded-full bg-m3-secondary shadow-[0_0_8px_rgba(74,225,118,0.5)] transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="shrink-0 text-sm font-medium text-gray-400">
            Week {currentWeek} of {durationWeeks}
          </span>
        </div>
      </div>

      <div className="ml-8 flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="gap-2 rounded-xl border-m3-outline-variant bg-transparent px-5 py-2.5 text-sm font-semibold text-m3-on-surface hover:bg-m3-surface-high"
        >
          <RefreshCw className="size-4" />
          Regenerate Plan
        </Button>
      </div>
    </header>
  );
}
