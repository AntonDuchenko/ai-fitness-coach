"use client";

import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MobileDrawer } from "@/features/chat/components/MobileDrawer";
import { WorkoutMobileHeader } from "@/features/workout/components/WorkoutMobileHeader";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useSubscriptionManagement } from "../hooks/useSubscriptionManagement";
import { BenefitsComparisonCard } from "./BenefitsComparisonCard";
import { CurrentPlanCard } from "./CurrentPlanCard";
import { FreeUpgradeCard } from "./FreeUpgradeCard";
import { SubscriptionErrorState } from "./SubscriptionErrorState";
import { SubscriptionLoadingState } from "./SubscriptionLoadingState";
import { SubscriptionStatusList } from "./SubscriptionStatusList";

function formatPrice(amountCents?: number, currency = "usd"): string {
  if (typeof amountCents !== "number") return "USD 29/month";
  return `${new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(amountCents / 100)}/month`;
}

export function SubscriptionManagementScreen() {
  const router = useRouter();
  const subscription = useSubscriptionManagement();
  const [menuOpen, setMenuOpen] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const premiumPriceLabel = useMemo(
    () =>
      formatPrice(
        subscription.premiumPrice?.amountCents,
        subscription.premiumPrice?.currency,
      ),
    [
      subscription.premiumPrice?.amountCents,
      subscription.premiumPrice?.currency,
    ],
  );

  const handleManageSubscription = async () => {
    const result = await subscription.handleManageSubscription();
    if (result.ok) {
      window.location.href = result.redirectUrl;
      return;
    }
    if (result.reason === "unauthorized") {
      router.push("/login?redirect=/dashboard/settings");
      return;
    }
    if (result.reason === "no_subscription") {
      setActionMessage("No active Stripe subscription found. Upgrade first.");
      return;
    }
    setActionMessage("Could not open billing portal. Try again in a moment.");
  };

  const handleUpgrade = async () => {
    const result = await subscription.handleUpgrade();
    if (result.ok) {
      window.location.href = result.redirectUrl;
      return;
    }
    if (result.reason === "unauthorized") {
      router.push("/login?redirect=/dashboard/settings");
      return;
    }
    setActionMessage("Could not start checkout. Please try again.");
  };

  const handleViewPricing = () => router.push("/pricing");

  if (subscription.isInitialLoading) {
    return <SubscriptionLoadingState />;
  }

  if (subscription.isInitialError || !subscription.subscription) {
    return (
      <SubscriptionErrorState
        onRetry={() => subscription.refetchSubscription()}
      />
    );
  }

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-background text-foreground lg:flex-row">
      <DashboardSidebar className="hidden lg:flex" />
      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)}>
        <DashboardSidebar className="h-full border-r-0" />
      </MobileDrawer>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <WorkoutMobileHeader
          title="Subscription"
          onOpenMenu={() => setMenuOpen(true)}
        />

        <header className="hidden h-[72px] shrink-0 items-center justify-between border-b border-border px-6 lg:flex">
          <div>
            <h1 className="font-heading text-base font-semibold">
              Subscription Management
            </h1>
            <p className="text-[12px] text-muted-foreground">
              Manage plan, billing, and access states
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={subscription.isActionPending}
            onClick={handleManageSubscription}
          >
            Manage Subscription
          </Button>
        </header>

        <div className="flex flex-1 flex-col gap-4 overflow-auto p-4 lg:p-6">
          <CurrentPlanCard
            isPremium={subscription.subscription.isPremium}
            priceLabel={
              subscription.subscription.isPremium ? premiumPriceLabel : "Free"
            }
            nextBillingDateLabel={subscription.nextBillingDateLabel}
            status={subscription.normalizedStatus}
            actionPending={subscription.isActionPending}
            onManageSubscription={handleManageSubscription}
            onUpgrade={
              !subscription.subscription.isPremium ? handleUpgrade : undefined
            }
          />

          {!subscription.subscription.isPremium ? (
            <div className="hidden lg:block">
              <FreeUpgradeCard
                actionPending={subscription.isActionPending}
                onUpgrade={handleUpgrade}
              />
            </div>
          ) : null}

          <BenefitsComparisonCard onViewPricing={handleViewPricing} />
          <SubscriptionStatusList
            currentStatus={subscription.normalizedStatus}
          />

          {actionMessage ? (
            <p className="text-sm text-muted-foreground">{actionMessage}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
