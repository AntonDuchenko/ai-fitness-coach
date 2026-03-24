"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PRICING_PLANS } from "@/features/pricing/constants";
import { usePricing } from "@/features/pricing/hooks/usePricing";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { FaqSection } from "./FaqSection";
import { FeatureComparisonTable } from "./FeatureComparisonTable";
import { FinalCtaSection } from "./FinalCtaSection";
import { PricingCard } from "./PricingCard";
import { PricingToggle } from "./PricingToggle";
import { TestimonialsSection } from "./TestimonialsSection";

function formatCurrency(amountCents?: number, currency = "usd"): string {
  if (typeof amountCents !== "number") return "$20";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(amountCents / 100);
}

export function PricingPage() {
  const router = useRouter();
  const pricing = usePricing();

  const premiumLabels = useMemo(() => {
    return {
      monthly: formatCurrency(
        pricing.monthlyPrice?.amountCents,
        pricing.monthlyPrice?.currency,
      ),
      annual: formatCurrency(
        pricing.annualPrice?.amountCents,
        pricing.annualPrice?.currency,
      ),
    };
  }, [pricing.annualPrice, pricing.monthlyPrice]);

  const handleUpgrade = async () => {
    const result = await pricing.handleUpgrade();
    if (result.ok) {
      window.location.href = result.redirectUrl;
      return;
    }
    if (result.reason === "unauthorized") {
      router.push("/login?redirect=/pricing");
    }
    if (result.reason === "missing_price") {
      router.push("/login?redirect=/pricing");
    }
  };

  return (
    <main className="h-[100dvh] overflow-y-auto bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
        <section className="space-y-6 text-center">
          <Badge className="bg-primary/15 text-primary">PRICING</Badge>
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Invest in your best self
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Less than one training session with a personal trainer.
          </p>
          <PricingToggle value={pricing.period} onChange={pricing.setPeriod} />
          <Card className="mx-auto max-w-3xl border-border bg-card">
            <CardContent className="flex flex-col gap-2 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <span>Personal trainer: ~$400 / month</span>
              <span className="font-semibold text-success">
                You save ~{formatCurrency(38000)} every month
              </span>
              <span>AI Fitness Coach: {premiumLabels.monthly} / month</span>
            </CardContent>
          </Card>
        </section>

        {pricing.isProductsLoading ? (
          <section className="grid gap-5 lg:grid-cols-3 lg:items-stretch">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="h-full border-border bg-card/90">
                <CardContent className="space-y-4 pt-6">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-10 w-24" />
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </div>
                  <Skeleton className="mt-4 h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </section>
        ) : pricing.isProductsError ? (
          <section className="mx-auto max-w-md text-center">
            <Card className="border-destructive/30 bg-card">
              <CardContent className="flex flex-col items-center gap-3 pt-6">
                <AlertCircle className="size-8 text-destructive" />
                <p className="text-sm text-muted-foreground">
                  Could not load pricing. Please refresh the page or try again later.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.reload()}
                >
                  Refresh
                </Button>
              </CardContent>
            </Card>
          </section>
        ) : (
          <section className="grid gap-5 lg:grid-cols-3 lg:items-stretch">
            {PRICING_PLANS.map((plan) => {
              const priceLabel =
                plan.id === "premium"
                  ? pricing.period === "annual"
                    ? `${premiumLabels.annual}/year`
                    : `${premiumLabels.monthly}/month`
                  : plan.monthlyLabel;
              const ctaLabel =
                plan.id === "free"
                  ? "Get started"
                  : plan.id === "enterprise"
                    ? "Contact sales"
                    : "Upgrade";
              const onCtaClick =
                plan.id === "premium"
                  ? handleUpgrade
                  : () => router.push(plan.id === "free" ? "/onboarding" : "/login");

              return (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  priceLabel={priceLabel}
                  ctaLabel={ctaLabel}
                  onCtaClick={onCtaClick}
                  ctaDisabled={plan.id === "premium" && pricing.isCheckingOut}
                />
              );
            })}
          </section>
        )}

        <FeatureComparisonTable />
        <TestimonialsSection />
        <FaqSection />
        <FinalCtaSection onUpgrade={handleUpgrade} disabled={pricing.isCheckingOut} />
      </div>
    </main>
  );
}
