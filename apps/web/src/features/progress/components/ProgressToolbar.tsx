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
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Label htmlFor="period-range" className="sr-only">
          Date range
        </Label>
        <Select
          value={period}
          onValueChange={(v) => onPeriodChange(v as ProgressPeriod)}
        >
          <SelectTrigger id="period-range" className="w-full sm:w-[220px]">
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
      </div>
      <div className="flex shrink-0 gap-2">
        <Button type="button" onClick={() => onLogOpenChange(true)}>
          Log weight
        </Button>
        <LogWeightDialog open={logOpen} onOpenChange={onLogOpenChange} />
      </div>
    </div>
  );
}
