"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export function NutritionPlanSkeleton() {
  return (
    <div className="flex h-[100dvh] flex-col bg-background lg:flex-row">
      <DashboardSidebar className="hidden lg:flex" />
      <div className="min-h-0 flex-1 space-y-4 p-4 sm:p-6 lg:p-8">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-12 w-full rounded-2xl" />
        <Skeleton className="h-[400px] w-full rounded-2xl" />
      </div>
    </div>
  );
}

export function NutritionPlanEmpty() {
  return (
    <div className="flex h-[100dvh] flex-col bg-background lg:flex-row">
      <DashboardSidebar className="hidden lg:flex" />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
        <h1 className="font-heading text-xl font-semibold">
          No nutrition plan yet
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Complete onboarding and generate your nutrition plan to see meal
          targets and recipes.
        </p>
        <Button asChild className="mt-2">
          <Link href="/onboarding">Go to onboarding</Link>
        </Button>
      </div>
    </div>
  );
}

export function NutritionPlanError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex h-[100dvh] flex-col bg-background lg:flex-row">
      <DashboardSidebar className="hidden lg:flex" />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
        <p className="text-sm text-destructive">{message}</p>
        <Button type="button" variant="outline" onClick={onRetry}>
          Retry
        </Button>
      </div>
    </div>
  );
}
