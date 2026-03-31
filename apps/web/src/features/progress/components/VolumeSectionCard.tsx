"use client";

import { AlertTriangle } from "lucide-react";
import type { VolumeProgressResponse } from "../types";
import type { MuscleVolumeRow } from "../utils/muscleVolume";
import { MuscleGroupChart } from "./MuscleGroupChart";
import { WeeklyVolumeChart } from "./WeeklyVolumeChart";

interface VolumeSectionCardProps {
  weekly: VolumeProgressResponse | undefined;
  muscleRows: MuscleVolumeRow[];
  imbalanceMessage: string | null;
  isLoadingWeekly: boolean;
}

export function VolumeSectionCard({
  weekly,
  muscleRows,
  imbalanceMessage,
  isLoadingWeekly,
}: VolumeSectionCardProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-m3-outline-variant/10 bg-m3-surface-low p-8">
      <div className="flex flex-col gap-12 md:flex-row">
        <div className="flex-1">
          <div className="mb-8">
            <h3 className="mb-1 font-heading text-xl font-bold text-m3-on-surface">
              Muscle Group Focus
            </h3>
            <p className="text-sm text-muted-foreground">
              Volume distribution by set count
            </p>
          </div>
          <MuscleGroupChart muscleRows={muscleRows} />
          {imbalanceMessage ? (
            <output
              className="mt-3 flex gap-2 rounded-lg border border-warning/40 bg-secondary px-3 py-2 text-sm text-foreground"
              aria-live="polite"
            >
              <AlertTriangle
                className="mt-0.5 size-4 shrink-0 text-warning"
                aria-hidden
              />
              <span>{imbalanceMessage}</span>
            </output>
          ) : null}
        </div>

        <div className="flex-1">
          <div className="mb-8">
            <h3 className="mb-1 font-heading text-xl font-bold text-m3-on-surface">
              Weekly Load
            </h3>
            <p className="text-sm text-muted-foreground">
              Total volume moved (kg)
            </p>
          </div>
          <WeeklyVolumeChart weekly={weekly} isLoading={isLoadingWeekly} />
        </div>
      </div>
    </div>
  );
}
