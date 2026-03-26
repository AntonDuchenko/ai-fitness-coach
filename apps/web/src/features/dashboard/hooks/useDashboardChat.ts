"use client";

import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export interface ChatMessageApi {
  id: string;
  role: string;
  content: string;
  createdAt: string;
}

export interface ChatUsageApi {
  messagesUsedToday: number;
  dailyLimit: number;
  isPremium: boolean;
  remaining: number;
}

export function useDashboardChat() {
  const historyQuery = useQuery({
    queryKey: ["dashboard", "chat", "last"],
    queryFn: () => apiClient<ChatMessageApi[]>("/chat/history?limit=5&offset=0"),
    staleTime: 60_000,
  });

  const usageQuery = useQuery({
    queryKey: ["chat", "usage"],
    queryFn: () => apiClient<ChatUsageApi>("/chat/usage"),
    staleTime: 60_000,
  });

  const lastAiMessage = useMemo(() => {
    if (!historyQuery.data) return null;
    const aiMessages = historyQuery.data.filter((m) => m.role === "assistant");
    return aiMessages.length > 0 ? aiMessages[aiMessages.length - 1] : null;
  }, [historyQuery.data]);

  return {
    lastAiMessage,
    usage: usageQuery.data ?? null,
    isLoading: historyQuery.isLoading || usageQuery.isLoading,
  };
}
