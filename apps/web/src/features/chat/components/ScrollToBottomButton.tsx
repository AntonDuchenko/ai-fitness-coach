"use client";

import { ArrowDown } from "lucide-react";

interface ScrollToBottomButtonProps {
  onClick: () => void;
}

export function ScrollToBottomButton({ onClick }: ScrollToBottomButtonProps) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
      <button
        type="button"
        className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-m3-surface-high text-m3-on-surface shadow-2xl transition-all hover:bg-m3-surface-highest active:scale-95"
        onClick={onClick}
        aria-label="Scroll to bottom"
      >
        <ArrowDown className="size-4" />
      </button>
    </div>
  );
}
