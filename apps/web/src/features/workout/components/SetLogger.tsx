"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import type { SessionSet } from "../workoutLog.types";

interface SetLoggerProps {
  sets: SessionSet[];
  onChange: (setIndex: number, patch: Partial<SessionSet>) => void;
  onMarkDone: (setIndex: number, done: boolean) => void;
  className?: string;
}

export function SetLogger({
  sets,
  onChange,
  onMarkDone,
  className,
}: SetLoggerProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full min-w-[340px] border-collapse text-sm">
        <thead>
          <tr className="text-left text-[11px] text-muted-foreground">
            <th className="pb-2 pr-1 font-medium">#</th>
            <th className="pb-2 pr-1 font-medium">Target</th>
            <th className="pb-2 pr-2 font-medium">Weight</th>
            <th className="pb-2 pr-1 font-medium">Reps</th>
            <th className="pb-2 pr-1 font-medium">RPE</th>
            <th className="pb-2 w-8 text-center font-medium">✓</th>
          </tr>
        </thead>
        <tbody>
          {sets.map((row, i) => (
            <tr key={row.setNumber} className="border-t border-border/60">
              <td className="py-2 pr-1 align-middle text-foreground tabular-nums">
                {row.setNumber}
              </td>
              <td className="py-2 pr-1 align-middle text-muted-foreground tabular-nums">
                {row.targetReps}
              </td>
              <td className="py-2 pr-2 align-middle">
                <div className="flex max-w-[120px] items-center gap-0.5">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-8 shrink-0"
                    onClick={() => {
                      const w = parseFloat(row.weight) || 0;
                      onChange(i, { weight: String(Math.max(0, w - 2.5)) });
                    }}
                    aria-label="Decrease weight"
                  >
                    <Minus className="size-3.5" />
                  </Button>
                  <Input
                    inputMode="decimal"
                    className="h-8 min-w-0 flex-1 px-1.5 text-center text-sm tabular-nums"
                    value={row.weight}
                    onChange={(e) => onChange(i, { weight: e.target.value })}
                    aria-label={`Weight set ${row.setNumber}`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-8 shrink-0"
                    onClick={() => {
                      const w = parseFloat(row.weight) || 0;
                      onChange(i, { weight: String(w + 2.5) });
                    }}
                    aria-label="Increase weight"
                  >
                    <Plus className="size-3.5" />
                  </Button>
                </div>
              </td>
              <td className="py-2 pr-1 align-middle">
                <Input
                  inputMode="numeric"
                  className="h-8 w-12 px-1.5 text-center text-sm tabular-nums"
                  value={row.reps}
                  onChange={(e) => onChange(i, { reps: e.target.value })}
                  aria-label={`Reps set ${row.setNumber}`}
                />
              </td>
              <td className="py-2 pr-1 align-middle">
                <Select
                  value={row.rpe ? row.rpe : "__none__"}
                  onValueChange={(v) =>
                    onChange(i, { rpe: v === "__none__" ? "" : v })
                  }
                >
                  <SelectTrigger size="sm" className="h-8 w-[4.5rem] px-1.5">
                    <SelectValue placeholder="—" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">—</SelectItem>
                    {Array.from({ length: 10 }, (_, n) => n + 1).map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </td>
              <td className="py-2 align-middle text-center">
                <Checkbox
                  checked={row.done}
                  onCheckedChange={(c) => onMarkDone(i, c === true)}
                  aria-label={`Set ${row.setNumber} complete`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
