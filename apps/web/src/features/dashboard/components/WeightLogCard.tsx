"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogWeightMutation } from "@/features/progress/hooks/useLogWeightMutation";
import { cn } from "@/lib/utils";
import { Scale, TrendingDown, TrendingUp } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { WeightSparkline } from "./WeightSparkline";

interface WeightLogCardProps {
  currentWeight: number | null;
  change: number | null;
  sparklineWeights: number[];
  isLoading: boolean;
}

export function WeightLogCard({ currentWeight, change, sparklineWeights, isLoading }: WeightLogCardProps) {
  const [value, setValue] = useState("");
  const mutation = useLogWeightMutation();

  const handleLog = useCallback(() => {
    const num = Number.parseFloat(value);
    if (Number.isNaN(num) || num <= 0) return toast.error("Please enter a valid weight");
    mutation.mutate(
      { weight: Math.round(num * 100) / 100 },
      { onSuccess: () => { toast.success("Weight logged"); setValue(""); }, onError: (err) => toast.error(err.message || "Failed to log weight") },
    );
  }, [value, mutation]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="rounded-[2rem] border border-m3-outline-variant/20 bg-m3-surface-high p-8">
          <Skeleton className="mb-6 h-5 w-36" />
          <Skeleton className="h-16 w-48" />
          <Skeleton className="mt-8 h-16 w-full" />
          <Skeleton className="mt-10 h-12 w-full rounded-xl" />
        </div>
        <Skeleton className="h-20 rounded-3xl" />
      </div>
    );
  }

  const isNegative = change !== null && change < 0;
  const TrendIcon = isNegative ? TrendingDown : TrendingUp;
  const bars = sparklineWeights.slice(-7);

  return (
    <div className="flex flex-col gap-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-m3-outline-variant/20 bg-m3-surface-high p-8">
        <div className="absolute right-0 top-0 p-8 opacity-10">
          <Scale className="size-24" aria-hidden />
        </div>
        <div className="relative z-10">
          <div className="mb-6 flex items-center gap-2">
            <Scale className="size-5 text-m3-primary" aria-hidden />
            <h3 className="font-heading text-lg font-semibold text-m3-on-surface">Body Composition</h3>
          </div>
          <div className="mb-2 flex items-baseline gap-4">
            <span className="font-heading text-6xl font-extrabold tracking-tighter">{currentWeight ?? "—"}</span>
            <span className="font-heading text-2xl font-medium text-m3-outline">kg</span>
            {change !== null && (
              <div className="ml-2 flex items-center rounded-lg bg-m3-secondary/10 px-2 py-1">
                <TrendIcon className="mr-1 size-4 text-m3-secondary" aria-hidden />
                <span className="text-sm font-bold text-m3-secondary">{Math.abs(change).toFixed(1)}</span>
              </div>
            )}
          </div>
          <p className="mb-8 text-sm text-m3-outline">Recent weight trend</p>
          <WeightSparkline weights={bars} />
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Input
                className="rounded-xl border-none bg-m3-surface-lowest px-5 py-4 text-m3-on-surface placeholder:text-m3-outline/50 focus:ring-2 focus:ring-m3-primary/40"
                placeholder="Enter weight..." type="text" inputMode="decimal" value={value}
                onChange={(e) => setValue(e.target.value)} disabled={mutation.isPending} aria-label="Weight in kg"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-medium text-m3-outline">kg</span>
            </div>
            <Button onClick={handleLog} disabled={mutation.isPending || !value}
              className={cn("rounded-xl bg-m3-primary-container px-8 py-4 font-heading font-bold", "text-m3-on-primary-container shadow-lg shadow-m3-primary/20 hover:opacity-90 active:scale-95")}>
              {mutation.isPending ? "..." : "Log"}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-3xl border border-m3-outline-variant/10 bg-m3-surface-container p-6">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-m3-tertiary/20">
            <Scale className="size-5 text-m3-tertiary" aria-hidden />
          </div>
          <div>
            <p className="text-xs text-m3-outline">Body Fat %</p>
            <p className="font-heading text-xl font-bold">—</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-m3-on-surface">N/A</p>
          <div className="mt-2 h-1.5 w-24 overflow-hidden rounded-full bg-m3-surface-high">
            <div className="h-full w-0 rounded-full bg-m3-tertiary" />
          </div>
        </div>
      </div>
    </div>
  );
}
