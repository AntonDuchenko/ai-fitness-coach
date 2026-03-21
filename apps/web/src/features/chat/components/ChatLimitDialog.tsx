"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface ChatLimitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChatLimitDialog({ open, onOpenChange }: ChatLimitDialogProps) {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[440px] gap-6 border-border bg-card p-8 sm:max-w-[440px]"
        showCloseButton={false}
      >
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-secondary text-3xl">
            ⚡
          </div>
          <DialogHeader className="gap-3 text-center sm:text-center">
            <DialogTitle className="font-heading text-2xl font-bold">
              Daily Message Limit Reached
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed text-muted-foreground">
              You&apos;ve used all 5 free messages for today.
              <br />
              Upgrade to Pro for unlimited AI coaching.
            </DialogDescription>
          </DialogHeader>
          <Button
            type="button"
            className="h-12 w-full rounded-[10px] text-[15px] font-semibold"
            onClick={() => {
              onOpenChange(false);
              router.push("/");
            }}
          >
            Upgrade to Pro — $9.99/mo
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="h-11 w-full text-sm font-medium text-muted-foreground"
            onClick={() => onOpenChange(false)}
          >
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
