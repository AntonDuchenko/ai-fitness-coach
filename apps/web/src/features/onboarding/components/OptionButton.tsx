"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OptionButtonProps {
  active: boolean;
  label: string;
  onClick: () => void;
  className?: string;
}

export function OptionButton({
  active,
  label,
  onClick,
  className,
}: OptionButtonProps) {
  return (
    <Button
      type="button"
      variant={active ? "default" : "outline"}
      size="sm"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        "min-h-9 text-[11px] leading-tight capitalize sm:text-xs",
        !active && "text-muted-foreground",
        className,
      )}
    >
      {label}
    </Button>
  );
}
