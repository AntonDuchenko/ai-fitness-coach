"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WeightLogWidget } from "./WeightLogWidget";

interface LogWeightDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LogWeightDialog({ open, onOpenChange }: LogWeightDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Log weight</DialogTitle>
        </DialogHeader>
        <WeightLogWidget onLogged={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
