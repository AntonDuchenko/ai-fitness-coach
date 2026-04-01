"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Zap } from "lucide-react";
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
        className="max-w-md gap-0 overflow-hidden rounded-[2rem] border border-white/5 bg-m3-surface-low p-0 shadow-[0_40px_100px_rgba(0,0,0,0.6)] sm:max-w-md"
        showCloseButton={false}
      >
        {/* Glow Effect */}
        <div className="pointer-events-none absolute -top-24 left-1/2 size-64 -translate-x-1/2 rounded-full bg-m3-primary-container/20 blur-[80px]" />

        <div className="relative flex flex-col items-center p-8 text-center">
          {/* Icon */}
          <div className="relative mb-8">
            <div className="flex size-20 items-center justify-center rounded-[1.5rem] bg-m3-surface-high shadow-2xl">
              <Zap className="size-10 text-m3-primary-container" />
            </div>
            <div className="absolute -inset-2 rounded-[2rem] border-2 border-m3-primary/20 blur-sm" />
          </div>

          {/* Content */}
          <DialogHeader className="mb-10 space-y-4 text-center sm:text-center">
            <DialogTitle className="font-heading text-2xl font-black tracking-tight text-white">
              Daily Message Limit Reached
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed text-m3-on-surface">
              You&apos;ve used all{" "}
              <span className="font-bold text-white">5 free messages</span> for
              today. Upgrade to Pro for unlimited AI coaching and personalized
              routines.
            </DialogDescription>
          </DialogHeader>

          {/* Progress Bars */}
          <div className="mb-10 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-1.5 w-8 rounded-full bg-m3-primary-container shadow-[0_0_8px_rgba(77,142,255,0.4)]"
              />
            ))}
          </div>
          <p className="mb-10 text-[11px] font-bold uppercase tracking-[0.1em] text-m3-primary">
            5 of 5 Free Messages Used
          </p>

          {/* CTA */}
          <Button
            type="button"
            className="w-full rounded-2xl bg-m3-primary-container py-5 font-heading font-extrabold text-m3-on-primary-container shadow-[0_8px_30px_rgba(77,142,255,0.3)] transition-all hover:bg-m3-primary-container/90 active:scale-[0.97]"
            onClick={() => {
              onOpenChange(false);
              router.push("/");
            }}
          >
            Upgrade to Pro — $9.99/mo
          </Button>
          <button
            type="button"
            className="mt-4 py-2 text-sm font-semibold text-m3-outline transition-colors hover:text-m3-on-surface"
            onClick={() => onOpenChange(false)}
          >
            Maybe later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
