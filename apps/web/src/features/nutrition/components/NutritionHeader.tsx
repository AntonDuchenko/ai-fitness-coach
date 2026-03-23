"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
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
      <div className="flex flex-col gap-2 border-b border-border px-4 py-3 lg:hidden">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h1 className="font-heading text-base font-semibold">
              Nutrition Plan
            </h1>
            <p className="mt-1 text-[12px] text-muted-foreground">
              {planName}
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="shrink-0"
            onClick={() => setConfirmOpen(true)}
            disabled={regenerating}
          >
            Regenerate
          </Button>
        </div>
      </div>

      <header className="hidden h-[72px] shrink-0 items-center gap-3 border-b border-border px-6 lg:flex">
        <div className="min-w-0 flex-1">
          <h1 className="font-heading text-base font-semibold">
            Nutrition Plan
          </h1>
          <p className="mt-1 text-[12px] text-muted-foreground">{planName}</p>
        </div>
        <Button
          type="button"
          variant="secondary"
          disabled={regenerating}
          onClick={() => setConfirmOpen(true)}
        >
          Regenerate plan
        </Button>
      </header>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-md">
          <DialogTitle className="font-heading">
            Regenerate Nutrition Plan?
          </DialogTitle>
          <DialogDescription>
            Your current meal plan, recipes, and grocery list will be permanently
            deleted and replaced with a new AI-generated plan.
          </DialogDescription>
          <DialogFooter className="mt-4 flex gap-3 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
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
