"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckRowProps {
  id: string;
  active: boolean;
  label: string;
  onClick: () => void;
}

export function CheckRow({ id, active, label, onClick }: CheckRowProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={id}
        checked={active}
        onCheckedChange={onClick}
        aria-label={label}
      />
      <Label
        htmlFor={id}
        className="cursor-pointer text-xs text-muted-foreground"
      >
        {label}
      </Label>
    </div>
  );
}
