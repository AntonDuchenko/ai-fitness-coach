"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import {
  PROGRESS_PERIOD_LABELS,
  PROGRESS_PERIOD_VALUES,
  type ProgressPeriod,
} from "../constants";
import { LogWeightDialog } from "./LogWeightDialog";

interface ProgressToolbarProps {
  period: ProgressPeriod;
  onPeriodChange: (p: ProgressPeriod) => void;
  logOpen: boolean;
  onLogOpenChange: (open: boolean) => void;
}

export function ProgressToolbar({
  period,
  onPeriodChange,
  logOpen,
  onLogOpenChange,
}: ProgressToolbarProps) {
  return (
    <div className="flex items-center gap-4">
      <Label htmlFor="period-range" className="sr-only">
        Date range
      </Label>
      <Select
        value={period}
        onValueChange={(v) => onPeriodChange(v as ProgressPeriod)}
      >
        <SelectTrigger
          id="period-range"
          className="w-[180px] rounded-xl border-none bg-m3-surface-high text-sm font-semibold"
        >
          <SelectValue placeholder="Period" />
        </SelectTrigger>
        <SelectContent>
          {PROGRESS_PERIOD_VALUES.map((p) => (
            <SelectItem key={p} value={p}>
              {PROGRESS_PERIOD_LABELS[p]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        type="button"
        onClick={() => onLogOpenChange(true)}
        className="rounded-xl bg-m3-primary-container px-6 py-3 font-bold text-m3-on-primary-container shadow-lg shadow-m3-primary-container/20 hover:brightness-105"
      >
        <Plus className="mr-2 size-4" aria-hidden />
        Log Weight
      </Button>
      <LogWeightDialog open={logOpen} onOpenChange={onLogOpenChange} />
    </div>
  );
}
