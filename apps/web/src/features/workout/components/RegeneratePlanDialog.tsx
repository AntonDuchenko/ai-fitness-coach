"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
      <DialogContent showCloseButton={!isLoading}>
        <DialogHeader>
          <DialogTitle className="font-heading">Regenerate plan?</DialogTitle>
          <DialogDescription>
            Your current {durationWeeks}-week program will be replaced with a
            new AI-generated plan. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isLoading}
            onClick={() => onConfirm()}
          >
            {isLoading ? "Regenerating…" : "Regenerate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
