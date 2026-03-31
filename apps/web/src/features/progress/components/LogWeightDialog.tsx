"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Scale } from "lucide-react";
import { WeightLogWidget } from "./WeightLogWidget";

interface LogWeightDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LogWeightDialog({ open, onOpenChange }: LogWeightDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-xl border border-m3-outline-variant/10 bg-m3-surface-high p-0 shadow-2xl sm:max-w-[440px]">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-m3-outline-variant/10 p-6 pb-4">
          <div>
            <DialogTitle className="font-heading text-2xl font-bold tracking-tight text-m3-on-surface">
              Weight Tracking
            </DialogTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Consistency is key to your progress.
            </p>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full bg-m3-primary/10">
            <Scale className="size-5 text-m3-primary" aria-hidden />
          </div>
        </DialogHeader>
        <WeightLogWidget onLogged={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
