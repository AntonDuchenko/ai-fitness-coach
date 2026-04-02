"use client";

import { useAuth } from "@/features/auth";
import { useSubscriptionManagement } from "@/features/subscription/hooks/useSubscriptionManagement";
import { useProfileQuery } from "./useProfileQuery";

export function useProfilePage() {
  const { user, logout } = useAuth();
  const {
    profile,
    isLoading: profileLoading,
    isError,
    refetch,
  } = useProfileQuery();
  const {
    normalizedStatus,
    nextBillingDateLabel,
    premiumPrice,
    isInitialLoading: subscriptionLoading,
    handleManageSubscription,
  } = useSubscriptionManagement();

  const isLoading = profileLoading || subscriptionLoading;

  return {
    user,
    profile,
    isLoading,
    isError,
    refetch,
    logout,
    subscription: {
      status: normalizedStatus,
      nextBillingDate: nextBillingDateLabel,
      price: premiumPrice,
      handleManage: handleManageSubscription,
    },
  };
}
