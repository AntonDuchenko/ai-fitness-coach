"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface RegeneratePlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading: boolean;
  durationWeeks: number;
}

export function RegeneratePlanDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading,
  durationWeeks,
}: RegeneratePlanDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="glass-card w-full max-w-md gap-0 overflow-hidden rounded-[2rem] border border-m3-outline-variant/20 p-0 shadow-2xl"
      >
        {/* Signature glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(77,142,255,0.15)_0%,rgba(77,142,255,0)_70%)]" />

        <div className="relative flex flex-col items-center p-8 text-center">
          {/* Icon */}
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-m3-primary-container/10">
            <AlertTriangle className="size-9 text-m3-primary" />
          </div>

          {/* Content */}
          <DialogTitle className="mb-3 font-heading text-2xl font-bold tracking-tight text-m3-on-surface">
            Regenerate Workout Plan?
          </DialogTitle>
          <DialogDescription className="mb-8 leading-relaxed text-m3-outline">
            Your current {durationWeeks}-week plan will be archived. A new plan
            will be generated based on your profile.
          </DialogDescription>

          {/* Actions */}
          <div className="flex w-full flex-col gap-3">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => onConfirm()}
              className="w-full rounded-xl bg-m3-primary-container py-4 font-heading text-sm font-bold tracking-wide text-m3-on-primary-container transition-all duration-150 hover:brightness-110 active:scale-95 disabled:opacity-50"
            >
              {isLoading ? "Regenerating…" : "Regenerate"}
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => onOpenChange(false)}
              className="w-full rounded-xl bg-transparent py-4 font-heading text-sm font-medium text-m3-outline transition-all duration-150 hover:bg-m3-surface-high/50 active:scale-95"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Decorative bottom gradient */}
        <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-m3-primary/30 to-transparent" />
      </DialogContent>
    </Dialog>
  );
}
