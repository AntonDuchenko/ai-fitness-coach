"use client";

import { cn } from "@/lib/utils";

interface ProgressStatBoxProps {
  label: string;
  value: string | number;
  suffix: string;
  valueColor?: string;
  icon: React.ReactNode;
}

export function ProgressStatBox({ label, value, suffix, valueColor, icon }: ProgressStatBoxProps) {
  return (
    <div className="rounded-2xl border border-m3-outline-variant/10 bg-m3-surface-low p-5">
      <div className="mb-1 flex items-center gap-1 text-m3-outline">
        {icon}
        <p className="text-xs font-medium">{label}</p>
      </div>
      <p className={cn("font-heading text-2xl font-bold", valueColor)}>
        {value}
        <span className="ml-1 text-sm font-normal text-m3-outline">{suffix}</span>
      </p>
    </div>
  );
}
