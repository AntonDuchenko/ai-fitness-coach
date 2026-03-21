"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

interface ScrollToBottomButtonProps {
  onClick: () => void;
}

export function ScrollToBottomButton({ onClick }: ScrollToBottomButtonProps) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
      <Button
        type="button"
        variant="secondary"
        size="icon"
        className="size-10 rounded-full border border-border shadow-lg"
        onClick={onClick}
        aria-label="Scroll to bottom"
      >
        <ArrowDown className="size-4" />
      </Button>
    </div>
  );
}
