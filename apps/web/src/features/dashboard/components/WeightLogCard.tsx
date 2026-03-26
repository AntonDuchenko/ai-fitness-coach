"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogWeightMutation } from "@/features/progress/hooks/useLogWeightMutation";
import { cn } from "@/lib/utils";
import { Scale, TrendingDown, TrendingUp } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface WeightLogCardProps {
  currentWeight: number | null;
  change: number | null;
  sparklineWeights: number[];
  isLoading: boolean;
}

export function WeightLogCard({
  currentWeight,
  change,
  sparklineWeights,
  isLoading,
}: WeightLogCardProps) {
  const [value, setValue] = useState("");
  const mutation = useLogWeightMutation();

  const handleLog = useCallback(() => {
    const num = Number.parseFloat(value);
    if (Number.isNaN(num) || num <= 0) {
      toast.error("Please enter a valid weight");
      return;
    }
    mutation.mutate(
      { weight: Math.round(num * 100) / 100 },
      {
        onSuccess: () => {
          toast.success("Weight logged");
          setValue("");
        },
        onError: (err) => toast.error(err.message || "Failed to log weight"),
      },
    );
  }, [value, mutation]);

  if (isLoading) {
    return (
      <Card className="border-0 rounded-2xl">
        <CardHeader>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-36" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-16 w-40" />
          <Skeleton className="h-[60px] w-full" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    );
  }

  const isNegative = change !== null && change < 0;
  const TrendIcon = isNegative ? TrendingDown : TrendingUp;
  const bars = sparklineWeights.slice(-7);
  const maxW = Math.max(...bars, 1);
  const minW = Math.min(...bars, maxW - 1);
  const range = maxW - minW || 1;

  return (
    <Card className="flex flex-col justify-between border-0 rounded-2xl">
      <CardHeader>
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          Body Metrics
        </p>
        <CardTitle className="font-heading text-xl">Current Weight</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex items-end justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-7xl font-black tracking-tighter text-foreground">
              {currentWeight ?? "—"}
            </span>
            <span className="text-2xl font-bold text-muted-foreground">kg</span>
          </div>
          {change !== null && (
            <div className="pb-2 text-right">
              <div
                className={cn(
                  "flex items-center justify-end gap-1 text-lg font-bold",
                  isNegative ? "text-success" : "text-orange-400",
                )}
              >
                <TrendIcon className="size-5" aria-hidden />
                {change > 0 ? "+" : ""}
                {change.toFixed(1)} kg
              </div>
              <p className="text-xs text-muted-foreground">this week</p>
            </div>
          )}
        </div>

        {bars.length > 0 && (
          <div className="group relative flex h-[60px] items-end gap-1.5 px-2">
            <div className="absolute inset-x-0 bottom-0 h-full rounded-t-lg bg-gradient-to-t from-primary/10 to-transparent" />
            {bars.map((w, i) => {
              const pct = ((w - minW) / range) * 80 + 20;
              const isLast = i === bars.length - 1;
              return (
                <div
                  key={i}
                  className={cn(
                    "z-10 flex-1 rounded-t-sm transition-all",
                    isLast
                      ? "bg-success shadow-lg shadow-success/20"
                      : "bg-muted-foreground/20 group-hover:bg-primary/40",
                  )}
                  style={{ height: `${pct}%` }}
                />
              );
            })}
          </div>
        )}

        <div className="flex gap-3">
          <div className="relative flex-1">
            <Scale className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              className="pl-10"
              placeholder="Enter weight (kg)"
              type="text"
              inputMode="decimal"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={mutation.isPending}
              aria-label="Weight in kg"
            />
          </div>
          <Button
            variant="secondary"
            onClick={handleLog}
            disabled={mutation.isPending || !value}
          >
            {mutation.isPending ? "..." : "Log"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
