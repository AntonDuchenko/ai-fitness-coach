"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ProgressPageSkeleton() {
  return (
    <div className="glow-bg flex-1 overflow-auto p-6 lg:p-10">
      {/* Header */}
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-5 w-72" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-12 w-[180px] rounded-xl" />
          <Skeleton className="h-12 w-36 rounded-xl" />
        </div>
      </div>

      {/* Stat cards */}
      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-3xl bg-m3-surface-high p-6">
            <Skeleton className="mb-4 h-4 w-24" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="mt-4 h-3 w-40" />
          </div>
        ))}
      </div>

      {/* Weight chart */}
      <div className="mb-8 rounded-[2rem] border border-m3-outline-variant/10 bg-m3-surface-low p-8 shadow-2xl">
        <Skeleton className="mb-1 h-6 w-40" />
        <Skeleton className="mb-10 h-4 w-64" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>

      {/* Strength + Consistency */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="rounded-[2rem] border border-m3-outline-variant/10 bg-m3-surface-low p-8 lg:col-span-7">
          <Skeleton className="mb-1 h-6 w-40" />
          <Skeleton className="mt-2 h-8 w-48 rounded-lg" />
          <Skeleton className="mt-8 h-[220px] w-full rounded-lg" />
        </div>
        <div className="rounded-[2rem] border border-m3-outline-variant/10 bg-m3-surface-low p-8 lg:col-span-5">
          <Skeleton className="mb-1 h-6 w-32" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="mt-8 h-[120px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
