import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { SubscriptionStatus } from "../types";

interface SubscriptionStatusListProps {
  currentStatus: SubscriptionStatus;
}

const STATUS_ROWS = [
  {
    id: "active" as const,
    label: "Active subscription: renewal is enabled and benefits are available now.",
    icon: CheckCircle2,
    variant: "success" as const,
  },
  {
    id: "canceled" as const,
    label: "Canceled: premium access remains until the end of your current billing period.",
    icon: AlertTriangle,
    variant: "info" as const,
  },
  {
    id: "past_due" as const,
    label: "Past due: payment failed. Update payment method to avoid service interruption.",
    icon: AlertCircle,
    variant: "destructive" as const,
  },
];

export function SubscriptionStatusList({
  currentStatus,
}: SubscriptionStatusListProps) {
  return (
    <div className="space-y-2">
      {STATUS_ROWS.map((row) => {
        const isActive = currentStatus === row.id;
        const Icon = row.icon;
        return (
          <Alert
            key={row.id}
            variant={isActive ? row.variant : "default"}
            className={cn(
              "text-xs sm:text-sm",
              !isActive && "border-border text-muted-foreground",
            )}
          >
            <Icon className="size-4" />
            <AlertDescription>{row.label}</AlertDescription>
          </Alert>
        );
      })}
    </div>
  );
}
