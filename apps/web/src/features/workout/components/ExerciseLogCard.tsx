"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown, Info } from "lucide-react";
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
  return (
    <Card className={cn("gap-3 py-4", className)}>
      <CardHeader className="gap-1 px-4 pb-0">
        <CardTitle className="text-lg">{name}</CardTitle>
        {meta ? (
          <p className="text-sm text-muted-foreground">{meta}</p>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-3 px-4 pt-0">
        {lastTimeLabel ? (
          <Collapsible open={lastExpanded} onOpenChange={onLastExpandedChange}>
            <div className="flex items-start gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm">
              <Info
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 text-left font-medium text-foreground">
                  <span className="line-clamp-2">{lastTimeLabel}</span>
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 transition-transform",
                      lastExpanded && "rotate-180",
                    )}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-1 text-muted-foreground">
                  Previous session values for this exercise. Use &quot;Same as
                  last time&quot; to copy into this workout.
                </CollapsibleContent>
              </div>
            </div>
          </Collapsible>
        ) : logsLoading ? (
          <p className="text-xs text-muted-foreground">
            Loading previous sessions…
          </p>
        ) : null}

        <SetLogger
          sets={sets}
          onChange={onSetChange}
          onMarkDone={onMarkDone}
        />

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => onBumpWeights(2.5)}
          >
            +2.5 kg
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => onBumpWeights(5)}
          >
            +5 kg
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onSameAsLastTime}
            disabled={!lastTimeLabel}
          >
            Same as last time
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
