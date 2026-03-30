"use client";

import { Clock, Dumbbell, MoreHorizontal, Play } from "lucide-react";
import type { WorkoutDaySchedule } from "../types";

interface TodaysWorkoutScheduledProps {
  todayWorkout: WorkoutDaySchedule;
  onStartWorkout: () => void;
}

export function TodaysWorkoutScheduled({
  todayWorkout,
  onStartWorkout,
}: TodaysWorkoutScheduledProps) {
  const durationLabel =
    todayWorkout.duration != null ? `~${todayWorkout.duration} min` : null;
  const exerciseCount = todayWorkout.exercises.length;

  return (
    <div className="group relative overflow-hidden rounded-[2rem] bg-m3-surface-low p-1 transition-all duration-500 hover:shadow-2xl hover:shadow-m3-primary/5">
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-m3-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.9rem] bg-m3-surface-low md:flex-row">
        {/* Image section */}
        <div className="relative h-64 overflow-hidden md:h-auto md:w-2/5">
          <div className="size-full bg-gradient-to-br from-m3-primary-container/20 via-m3-surface-high to-m3-surface-lowest" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-m3-surface-low via-transparent to-transparent md:bg-gradient-to-r" />
          {/* Scheduled badge */}
          <div className="absolute left-6 top-6 flex flex-col gap-2">
            <span className="rounded-full bg-m3-primary-container px-4 py-1 text-xs font-bold uppercase tracking-widest text-m3-on-primary-container">
              Scheduled
            </span>
          </div>
        </div>

        {/* Content section */}
        <div className="flex flex-col justify-between p-8 md:w-3/5">
          <div>
            {/* Labels */}
            <div className="mb-2 flex items-center gap-3">
              <span className="font-heading text-sm font-bold uppercase tracking-widest text-m3-primary">
                {todayWorkout.dayOfWeek}
              </span>
              <span className="text-sm text-m3-outline-variant">•</span>
              <span className="text-sm font-medium italic text-m3-outline">
                {todayWorkout.focus}
              </span>
            </div>
            {/* Title */}
            <h4 className="mb-6 font-heading text-3xl font-bold text-m3-on-surface">
              {todayWorkout.focus}
            </h4>
            {/* Stats grid */}
            <div className="mb-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-4 rounded-2xl bg-m3-surface-lowest p-4">
                <div className="rounded-xl bg-m3-surface-high p-2 text-m3-primary">
                  <Dumbbell className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-tighter text-m3-outline">
                    Exercises
                  </p>
                  <p className="font-bold text-m3-on-surface">
                    {exerciseCount} exercises
                  </p>
                </div>
              </div>
              {durationLabel && (
                <div className="flex items-center gap-4 rounded-2xl bg-m3-surface-lowest p-4">
                  <div className="rounded-xl bg-m3-surface-high p-2 text-m3-secondary">
                    <Clock className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-tighter text-m3-outline">
                      Duration
                    </p>
                    <p className="font-bold text-m3-on-surface">
                      {durationLabel}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onStartWorkout}
              className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-m3-primary-container py-4 px-6 font-heading font-bold text-m3-on-primary-container transition-all hover:bg-m3-primary active:scale-95"
            >
              <span>Start Workout</span>
              <Play className="size-5" />
            </button>
            <button
              type="button"
              className="flex size-14 items-center justify-center rounded-xl bg-m3-surface-high text-m3-outline transition-colors hover:text-m3-primary"
              aria-label="More options"
            >
              <MoreHorizontal className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
