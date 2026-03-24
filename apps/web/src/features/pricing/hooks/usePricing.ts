"use client";

import { ApiError, apiClient } from "@/lib/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import type { BillingPeriod, PricingProductsResponse } from "../types";

const PRODUCTS_QUERY_KEY = ["payments", "products"] as const;

const FALLBACK_PRODUCTS: PricingProductsResponse = {
  monthly: {
    id: "premium-monthly-fallback",
    interval: "month",
    amountCents: 2000,
    currency: "usd",
  },
  annual: {
    id: "premium-annual-fallback",
    interval: "year",
    amountCents: 20000,
    currency: "usd",
  },
};

export function usePricing() {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  const productsQuery = useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: () => apiClient<PricingProductsResponse>("/payments/products"),
  });

  const checkoutMutation = useMutation({
    mutationFn: (priceId: string) =>
      apiClient<{ sessionId: string; url: string }>(
        "/payments/create-checkout-session",
        { method: "POST", body: JSON.stringify({ priceId }) },
      ),
  });

  const products = productsQuery.data ?? FALLBACK_PRODUCTS;
  const monthlyPrice = products.monthly;
  const annualPrice = products.annual;

  const selectedPrice = useMemo(() => {
    if (period === "annual") return annualPrice ?? monthlyPrice;
    return monthlyPrice ?? annualPrice;
  }, [annualPrice, monthlyPrice, period]);

  const checkoutPriceId = selectedPrice?.id ?? null;

  const handleUpgrade = async (): Promise<
    | { ok: true; redirectUrl: string }
    | { ok: false; reason: "unauthorized" | "missing_price" | "unknown" }
  > => {
    if (!checkoutPriceId) {
      return { ok: false, reason: "missing_price" };
    }

    try {
      const data = await checkoutMutation.mutateAsync(checkoutPriceId);
      return { ok: true, redirectUrl: data.url };
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 401) {
        return { ok: false, reason: "unauthorized" };
      }
      return { ok: false, reason: "unknown" };
    }
  };

  return {
    period,
    setPeriod,
    monthlyPrice,
    annualPrice,
    isProductsLoading: productsQuery.isLoading,
    isProductsError: productsQuery.isError,
    isCheckingOut: checkoutMutation.isPending,
    checkoutPriceId,
    handleUpgrade,
  };
}
