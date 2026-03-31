"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export function NutritionPlanSkeleton() {
  return (
    <div className="flex h-[100dvh] flex-col bg-m3-surface lg:flex-row">
      <DashboardSidebar className="hidden lg:flex" />
      <div className="min-h-0 flex-1 space-y-6 p-4 sm:p-6 lg:p-10">
        <Skeleton className="h-40 w-full rounded-[2rem]" />
        <Skeleton className="h-16 w-full rounded-[2rem]" />
        <Skeleton className="h-48 w-full rounded-3xl" />
        <Skeleton className="h-48 w-full rounded-3xl" />
      </div>
    </div>
  );
}

export function NutritionPlanEmpty() {
  return (
    <div className="flex h-[100dvh] flex-col bg-m3-surface lg:flex-row">
      <DashboardSidebar className="hidden lg:flex" />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
        <h1 className="font-heading text-xl font-semibold text-m3-on-surface">
          No nutrition plan yet
        </h1>
        <p className="max-w-md text-sm text-m3-outline">
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
    <div className="flex h-[100dvh] flex-col bg-m3-surface lg:flex-row">
      <DashboardSidebar className="hidden lg:flex" />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
        <p className="text-sm text-destructive">{message}</p>
        <Button variant="outline" onClick={onRetry}>
          Retry
        </Button>
      </div>
    </div>
  );
}
