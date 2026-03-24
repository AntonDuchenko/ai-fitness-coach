import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { BillingPeriod } from "../types";

interface PricingToggleProps {
  value: BillingPeriod;
  onChange: (next: BillingPeriod) => void;
}

export function PricingToggle({ value, onChange }: PricingToggleProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Billing period"
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card p-1"
    >
      <Button
        type="button"
        size="sm"
        role="radio"
        aria-checked={value === "monthly"}
        onClick={() => onChange("monthly")}
        className={cn(
          "rounded-full px-5",
          value === "monthly" ? "bg-primary text-primary-foreground" : "bg-transparent",
        )}
      >
        Monthly
      </Button>
      <Button
        type="button"
        size="sm"
        role="radio"
        aria-checked={value === "annual"}
        onClick={() => onChange("annual")}
        className={cn(
          "rounded-full px-5",
          value === "annual" ? "bg-primary text-primary-foreground" : "bg-transparent",
        )}
      >
        Annual
      </Button>
      <Badge variant="success" className="rounded-full px-3 py-1 text-[11px]">
        Save 17%
      </Badge>
    </div>
  );
}
