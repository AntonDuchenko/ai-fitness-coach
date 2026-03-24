"use client";

import { ApiError, apiClient } from "@/lib/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type {
  PricingProductsResponse,
  SubscriptionResponse,
  SubscriptionStatus,
} from "../types";

const SUBSCRIPTION_QUERY_KEY = ["payments", "subscription"] as const;
const PRODUCTS_QUERY_KEY = ["payments", "products"] as const;

function normalizeStatus(rawStatus: string | null): SubscriptionStatus {
  if (rawStatus === "active") return "active";
  if (rawStatus === "canceled") return "canceled";
  if (rawStatus === "past_due") return "past_due";
  return "none";
}

export function useSubscriptionManagement() {
  const subscriptionQuery = useQuery({
    queryKey: SUBSCRIPTION_QUERY_KEY,
    queryFn: () => apiClient<SubscriptionResponse>("/payments/subscription"),
  });

  const productsQuery = useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: () => apiClient<PricingProductsResponse>("/payments/products"),
  });

  const portalMutation = useMutation({
    mutationFn: () =>
      apiClient<{ url: string }>("/payments/create-portal-session", {
        method: "POST",
      }),
  });

  const checkoutMutation = useMutation({
    mutationFn: (priceId: string) =>
      apiClient<{ sessionId: string; url: string }>(
        "/payments/create-checkout-session",
        {
          method: "POST",
          body: JSON.stringify({ priceId }),
        },
      ),
  });

  const subscription = subscriptionQuery.data ?? null;
  const premiumMonthlyPriceId = productsQuery.data?.monthly?.id ?? null;

  const normalizedStatus = useMemo(
    () => normalizeStatus(subscription?.subscriptionStatus ?? null),
    [subscription?.subscriptionStatus],
  );

  const nextBillingDateLabel = useMemo(() => {
    const rawDate = subscription?.subscriptionEndsAt;
    if (!rawDate) return "Auto-renewal enabled";
    const parsed = new Date(rawDate);
    if (Number.isNaN(parsed.getTime())) return "Auto-renewal enabled";
    return parsed.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }, [subscription?.subscriptionEndsAt]);

  const handleManageSubscription = async (): Promise<
    | { ok: true; redirectUrl: string }
    | {
        ok: false;
        reason: "unauthorized" | "no_subscription" | "unknown";
      }
  > => {
    try {
      const data = await portalMutation.mutateAsync();
      return { ok: true, redirectUrl: data.url };
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 401) {
        return { ok: false, reason: "unauthorized" };
      }
      if (error instanceof ApiError && error.statusCode === 400) {
        return { ok: false, reason: "no_subscription" };
      }
      return { ok: false, reason: "unknown" };
    }
  };

  const handleUpgrade = async (): Promise<
    | { ok: true; redirectUrl: string }
    | { ok: false; reason: "unauthorized" | "missing_price" | "unknown" }
  > => {
    if (!premiumMonthlyPriceId) {
      return { ok: false, reason: "missing_price" };
    }

    try {
      const data = await checkoutMutation.mutateAsync(premiumMonthlyPriceId);
      return { ok: true, redirectUrl: data.url };
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 401) {
        return { ok: false, reason: "unauthorized" };
      }
      return { ok: false, reason: "unknown" };
    }
  };

  return {
    subscription,
    normalizedStatus,
    nextBillingDateLabel,
    premiumPrice: productsQuery.data?.monthly ?? null,
    isInitialLoading: subscriptionQuery.isLoading || productsQuery.isLoading,
    isInitialError: subscriptionQuery.isError,
    isActionPending: portalMutation.isPending || checkoutMutation.isPending,
    refetchSubscription: subscriptionQuery.refetch,
    handleManageSubscription,
    handleUpgrade,
  };
}
