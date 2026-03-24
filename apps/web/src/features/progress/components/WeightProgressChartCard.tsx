"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import type { WeightLogResponse } from "../types";
import { WeightChart } from "./WeightChart";

interface WeightProgressChartCardProps {
  logs: WeightLogResponse[];
  startWeight: number | null;
  targetWeight: number | null;
  isLoading: boolean;
}

export function WeightProgressChartCard({
  logs,
  startWeight,
  targetWeight,
  isLoading,
}: WeightProgressChartCardProps) {
  const [picked, setPicked] = useState<{
    date: string;
    weight: number;
  } | null>(null);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Weight progress</CardTitle>
          <CardDescription>Trend, goal and starting reference</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[320px] w-full rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  if (logs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Weight progress</CardTitle>
          <CardDescription>
            Log weight a few times to see your trend chart.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No weight entries in this period.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="font-heading">Weight progress</CardTitle>
          <CardDescription>
            Line chart with start / goal guides and trend. Click a point for
            details.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <WeightChart
          logs={logs}
          startWeight={startWeight}
          targetWeight={targetWeight}
          onPointClick={setPicked}
        />
        {picked ? (
          <p className="text-sm text-muted-foreground">
            Selected:{" "}
            <span className="font-medium text-foreground">
              {picked.weight} kg
            </span>{" "}
            on {new Date(picked.date).toLocaleDateString()}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
