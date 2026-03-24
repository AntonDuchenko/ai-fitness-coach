import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SubscriptionStatus } from "../types";

interface CurrentPlanCardProps {
  isPremium: boolean;
  priceLabel: string;
  nextBillingDateLabel: string;
  status: SubscriptionStatus;
  actionPending: boolean;
  onManageSubscription: () => void;
  onUpgrade?: () => void;
}

function statusLabel(status: SubscriptionStatus): string {
  if (status === "active") return "active";
  if (status === "canceled") return "canceled";
  if (status === "past_due") return "past due";
  return "none";
}

export function CurrentPlanCard({
  isPremium,
  priceLabel,
  nextBillingDateLabel,
  status,
  actionPending,
  onManageSubscription,
  onUpgrade,
}: CurrentPlanCardProps) {
  return (
    <Card className="border-border bg-card/60 py-0">
      <CardHeader className="px-5 py-4 sm:px-6">
        <CardTitle className="font-heading text-base">
          Current Plan: {isPremium ? "Premium" : "Free"}
        </CardTitle>
        <CardDescription>
          {isPremium
            ? `${priceLabel} · Next billing: ${nextBillingDateLabel}`
            : "Upgrade to unlock all premium features"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 px-5 pb-4 sm:px-6 sm:pb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Status: {statusLabel(status)}
            {isPremium
              ? ". Full access to chat, workout, nutrition, and advanced analytics."
              : " (free tier)"}
          </p>
          <div className="hidden items-center gap-2 lg:flex">
            <Badge variant="secondary" className="capitalize">
              {statusLabel(status)}
            </Badge>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              disabled={actionPending}
              onClick={onManageSubscription}
            >
              Manage Subscription
            </Button>
          </div>
        </div>

        {/* Mobile: stacked full-width buttons inside card */}
        <div className="flex flex-col gap-2.5 lg:hidden">
          {!isPremium && onUpgrade ? (
            <Button
              type="button"
              disabled={actionPending}
              onClick={onUpgrade}
              className="w-full"
            >
              Upgrade to Premium
            </Button>
          ) : null}
          <Button
            type="button"
            variant="outline"
            disabled={actionPending}
            onClick={onManageSubscription}
            className="w-full"
          >
            Manage Subscription
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
