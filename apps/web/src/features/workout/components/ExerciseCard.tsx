"use client";

import { cn } from "@/lib/utils";
import { Dumbbell } from "lucide-react";
import type { WorkoutExercise } from "../types";

interface ExerciseCardProps {
  exercise: WorkoutExercise;
  className?: string;
}

export function ExerciseCard({ exercise, className }: ExerciseCardProps) {
  const muscles = exercise.muscleGroup
    .split(/[\/,]/)
    .map((m) => m.trim())
    .filter(Boolean);

  return (
    <div
      className={cn(
        "group flex gap-4 rounded-2xl border border-m3-outline-variant/10 bg-m3-surface-high/50 p-5 transition-all duration-300 hover:border-m3-primary/20 hover:bg-m3-surface-high lg:items-center lg:justify-between lg:gap-6 lg:rounded-2xl",
        className,
      )}
    >
      {/* Exercise image placeholder */}
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-m3-surface-highest lg:h-14 lg:w-14 lg:rounded-xl">
        <div className="flex h-full w-full items-center justify-center text-m3-outline">
          <Dumbbell className="size-8 lg:size-5" />
        </div>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0">
          {/* Mobile: muscle tag on top */}
          <div className="mb-1 lg:hidden">
            <span className="rounded bg-m3-primary-container/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-m3-primary">
              {exercise.muscleGroup}
            </span>
          </div>

          <h4 className="truncate font-heading text-base font-bold text-m3-on-surface lg:text-lg">
            {exercise.name}
          </h4>

          {/* Desktop: muscle tags below name */}
          <div className="mt-1 hidden gap-2 lg:flex">
            {muscles.map((m) => (
              <span
                key={m}
                className="rounded bg-m3-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase text-m3-primary"
              >
                {m}
              </span>
            ))}
          </div>

          {/* Mobile: stats columns */}
          <div className="mt-3 flex gap-4 lg:hidden">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-tighter text-m3-outline">
                Sets
              </span>
              <span className="text-sm font-semibold text-m3-on-surface">
                {exercise.sets} Sets
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-tighter text-m3-outline">
                Reps
              </span>
              <span className="text-sm font-semibold text-m3-on-surface">
                {exercise.reps} Reps
              </span>
            </div>
            {exercise.rest ? (
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-tighter text-m3-outline">
                  Rest
                </span>
                <span className="text-sm font-semibold text-m3-on-surface">
                  {exercise.rest}
                </span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Desktop: right-aligned stats */}
        <div className="hidden shrink-0 text-right lg:block">
          <p className="font-heading text-xl font-black text-m3-primary">
            {exercise.sets} x {exercise.reps}
          </p>
          {exercise.rest ? (
            <p className="text-xs font-medium text-m3-outline">
              Rest: {exercise.rest}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
