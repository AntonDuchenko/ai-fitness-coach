"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { History } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useLogWeightMutation } from "../hooks/useLogWeightMutation";
import { useWeightHistoryQuery } from "../hooks/useWeightHistoryQuery";

const LBS_PER_KG = 2.20462;
const UNIT_KEY = "weight_unit";

function getStoredUnit(): "kg" | "lbs" {
  if (typeof window === "undefined") return "kg";
  return (localStorage.getItem(UNIT_KEY) as "kg" | "lbs") || "kg";
}

interface WeightLogWidgetProps {
  onLogged?: () => void;
}

export function WeightLogWidget({ onLogged }: WeightLogWidgetProps) {
  const [unit, setUnit] = useState<"kg" | "lbs">(getStoredUnit);
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState("");
  const history = useWeightHistoryQuery("3months");
  const mutation = useLogWeightMutation();

  const selectUnit = useCallback((u: "kg" | "lbs") => {
    setUnit(u);
    localStorage.setItem(UNIT_KEY, u);
  }, []);

  const handleSubmit = useCallback(() => {
    const num = Number.parseFloat(value);
    if (Number.isNaN(num) || num <= 0) return toast.error("Please enter a valid weight");
    const weightKg = unit === "lbs" ? num / LBS_PER_KG : num;
    mutation.mutate(
      { weight: Math.round(weightKg * 100) / 100, notes: notes || undefined },
      {
        onSuccess: () => { toast.success("Weight logged successfully"); setValue(""); setNotes(""); onLogged?.(); },
        onError: (err) => toast.error(err.message || "Failed to log weight"),
      },
    );
  }, [value, unit, notes, mutation, onLogged]);

  const lastWeight = history.data?.currentWeight;
  const displayLast = lastWeight != null
    ? unit === "lbs" ? `${(lastWeight * LBS_PER_KG).toFixed(1)} lbs` : `${lastWeight} kg`
    : null;

  return (
    <>
      <div className="flex items-center gap-3 bg-m3-surface-lowest/50 px-6 py-3">
        <History className="size-4 text-m3-secondary" aria-hidden />
        {history.isLoading ? <Skeleton className="h-4 w-32" /> : displayLast ? (
          <span className="text-sm text-muted-foreground">
            Last logged weight: <strong className="font-semibold text-m3-secondary">{displayLast}</strong>
          </span>
        ) : <span className="text-sm text-muted-foreground">No weight logged yet</span>}
      </div>

      <form className="space-y-6 p-6" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div className="space-y-3">
          <Label className="ml-1 text-sm font-medium text-muted-foreground">Current Weight</Label>
          <div className="flex gap-3">
            <Input
              type="number" step={0.1} placeholder="00.0" value={value}
              onChange={(e) => setValue(e.target.value)} disabled={mutation.isPending}
              className="h-auto flex-1 rounded-lg border-m3-outline-variant/15 bg-m3-surface-lowest px-5 py-4 font-heading text-2xl font-bold text-m3-on-surface placeholder:text-muted-foreground/40 focus-visible:border-m3-primary/50 focus-visible:ring-m3-primary/20"
              aria-label={`Weight in ${unit}`}
            />
            <div className="flex rounded-lg border border-m3-outline-variant/15 bg-m3-surface-lowest p-1">
              <Button type="button" variant="ghost" size="sm" onClick={() => selectUnit("kg")}
                className={cn("rounded-md px-4 py-2 text-sm font-bold", unit === "kg" ? "bg-m3-primary-container text-m3-on-primary-container hover:bg-m3-primary-container" : "text-muted-foreground hover:text-foreground")}>
                kg
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => selectUnit("lbs")}
                className={cn("rounded-md px-4 py-2 text-sm font-bold", unit === "lbs" ? "bg-m3-primary-container text-m3-on-primary-container hover:bg-m3-primary-container" : "text-muted-foreground hover:text-foreground")}>
                lbs
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="ml-1 text-sm font-medium text-muted-foreground">Notes (Optional)</Label>
          <Textarea
            rows={3} placeholder="How are you feeling today?" value={notes}
            onChange={(e) => setNotes(e.target.value)} disabled={mutation.isPending}
            className="resize-none rounded-lg border-m3-outline-variant/15 bg-m3-surface-lowest text-m3-on-surface placeholder:text-muted-foreground/40 focus-visible:border-m3-primary/50 focus-visible:ring-m3-primary/20"
          />
        </div>

        <div className="flex gap-4 rounded-xl border border-m3-primary/10 bg-m3-primary/5 p-4">
          <div className="w-1 shrink-0 rounded-full bg-m3-primary" />
          <p className="text-xs italic leading-relaxed text-muted-foreground">
            &quot;Your weight is a single data point, not a definition of your worth. Focus on the trend of your consistency.&quot;
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Button type="submit" disabled={mutation.isPending || !value}
            className="w-full rounded-xl bg-m3-primary-container py-4 font-heading font-bold text-m3-on-primary-container shadow-lg shadow-m3-primary/10 hover:brightness-110 active:scale-[0.98]">
            {mutation.isPending ? "Logging..." : "Log Weight"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => onLogged?.()}
            className="w-full rounded-xl py-3 text-m3-outline hover:bg-m3-surface-highest/50">
            Cancel
          </Button>
        </div>
      </form>

      <div className="h-1 bg-gradient-to-r from-transparent via-m3-primary/30 to-transparent" />
    </>
  );
}
