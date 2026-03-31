"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export function NutritionHeader({
  planName,
  onRegenerate,
  regenerating,
}: {
  planName: string;
  onRegenerate: () => void;
  regenerating: boolean;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirm = () => {
    setConfirmOpen(false);
    onRegenerate();
  };

  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-m3-primary-container">
            Daily Optimization
          </span>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-m3-on-surface md:text-5xl">
            {planName}
          </h1>
          <p className="mt-2 max-w-xl text-m3-outline">
            A precision-engineered dietary strategy designed to support
            hypertrophy while maintaining athletic metabolic health.
          </p>
        </div>
        <button
          type="button"
          className="flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-m3-outline-variant/20 bg-m3-surface-high px-6 py-3 font-semibold text-m3-on-surface transition-all hover:bg-m3-surface-highest active:scale-95"
          onClick={() => setConfirmOpen(true)}
          disabled={regenerating}
        >
          <RefreshCw className="size-4" aria-hidden />
          {regenerating ? "Regenerating..." : "Regenerate Plan"}
        </button>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-md">
          <DialogTitle className="font-heading">
            Regenerate Nutrition Plan?
          </DialogTitle>
          <DialogDescription>
            Your current meal plan, recipes, and grocery list will be
            permanently deleted and replaced with a new AI-generated plan.
          </DialogDescription>
          <DialogFooter className="mt-4 flex gap-3 sm:justify-end">
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              disabled={regenerating}
            >
              {regenerating ? "Regenerating..." : "Regenerate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
