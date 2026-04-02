"use client";

import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import type { ProfileData } from "../types";

const PROFILE_QUERY_KEY = ["users", "profile"] as const;

export function useProfileQuery() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: () => apiClient<ProfileData>("/users/profile"),
  });

  return {
    profile: data ?? null,
    isLoading,
    isError,
    refetch,
  };
}
