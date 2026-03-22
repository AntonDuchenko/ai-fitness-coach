"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import type { WorkoutExercise } from "../types";

interface ExerciseItemProps {
  exercise: WorkoutExercise;
}

export function ExerciseItem({ exercise }: ExerciseItemProps) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-3.5">
      <div className="flex gap-2">
        <div className="min-w-0 flex-1">
          <p className="font-medium text-foreground">{exercise.name}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px] text-muted-foreground">
            <Badge variant="default" className="font-semibold">
              {exercise.muscleGroup}
            </Badge>
            <span>
              {exercise.sets} × {exercise.reps}
            </span>
            {exercise.rest ? (
              <>
                <span aria-hidden>·</span>
                <span>Rest {exercise.rest}</span>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {exercise.notes ? (
        <Collapsible className="mt-3 border-t border-border/50 pt-2">
          <CollapsibleTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="group h-auto w-full justify-start gap-1 px-0 py-1 text-[13px] font-semibold"
            >
              <ChevronDown className="size-4 shrink-0 transition-transform group-data-[state=open]:rotate-180" />
              Form notes
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
              {exercise.notes}
            </p>
          </CollapsibleContent>
        </Collapsible>
      ) : null}

      {exercise.alternatives && exercise.alternatives.length > 0 ? (
        <Collapsible className="mt-2 border-t border-border/50 pt-2">
          <CollapsibleTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="group h-auto w-full justify-start gap-1 px-0 py-1 text-[13px] font-semibold"
            >
              <ChevronDown className="size-4 shrink-0 transition-transform group-data-[state=open]:rotate-180" />
              Alternatives
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
              {exercise.alternatives.join(" · ")}
            </p>
          </CollapsibleContent>
        </Collapsible>
      ) : null}

      <Button
        type="button"
        variant="link"
        size="sm"
        className="mt-3 h-auto justify-start px-0 py-0 text-[13px] font-semibold"
        onClick={() =>
          toast.message("Video tutorials will be linked per exercise soon.")
        }
      >
        Watch video tutorial →
      </Button>
    </div>
  );
}
