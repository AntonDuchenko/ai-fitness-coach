"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Volume by Muscle Group</CardTitle>
        <CardDescription>
          Track total training volume and detect imbalances
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
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

        <div>
          <h3 className="mb-2 text-sm font-medium">Weekly volume</h3>
          <WeeklyVolumeChart weekly={weekly} isLoading={isLoadingWeekly} />
        </div>
      </CardContent>
    </Card>
  );
}
