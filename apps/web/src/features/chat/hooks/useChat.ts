"use client";

import { useAuth } from "@/features/auth";
import { ApiError, apiClient } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import type { ChatMessage, ChatUsage, SendMessageResponse } from "../types";

export function useChat(activeConversationId: string | null) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [limitModalOpen, setLimitModalOpen] = useState(false);
  const [optimisticUserMsg, setOptimisticUserMsg] =
    useState<ChatMessage | null>(null);
  const [animatingMessageId, setAnimatingMessageId] = useState<string | null>(
    null,
  );

  const historyKey = ["chat", "history", activeConversationId] as const;
  const usageKey = ["chat", "usage"] as const;

  const historyQuery = useQuery({
    queryKey: historyKey,
    queryFn: () => {
      const params = new URLSearchParams({ limit: "50", offset: "0" });
      if (activeConversationId) {
        params.set("conversationId", activeConversationId);
      }
      return apiClient<ChatMessage[]>(`/chat/history?${params}`);
    },
    enabled: activeConversationId !== null,
  });

  const usageQuery = useQuery({
    queryKey: usageKey,
    queryFn: () => apiClient<ChatUsage>("/chat/usage"),
  });

  const sendMutation = useMutation({
    mutationFn: (payload: { message: string; conversationId?: string }) =>
      apiClient<SendMessageResponse>("/chat/send", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onMutate: (payload) => {
      setOptimisticUserMsg({
        id: `optimistic-${Date.now()}`,
        role: "user",
        content: payload.message,
        createdAt: new Date().toISOString(),
      });
    },
    onSuccess: (data) => {
      const key = ["chat", "history", data.conversationId];
      queryClient.setQueryData<ChatMessage[]>(key, (old) => [
        ...(old ?? []),
        data.userMessage,
        data.aiMessage,
      ]);
      setOptimisticUserMsg(null);
      setAnimatingMessageId(data.aiMessage.id);
      void queryClient.invalidateQueries({ queryKey: usageKey });
      return data;
    },
    onError: (err) => {
      setOptimisticUserMsg(null);
      if (err instanceof ApiError && err.statusCode === 403) {
        setLimitModalOpen(true);
        void queryClient.invalidateQueries({ queryKey: usageKey });
      }
    },
  });

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      sendMutation.mutate({
        message: trimmed,
        conversationId: activeConversationId ?? undefined,
      });
    },
    [sendMutation, activeConversationId],
  );

  const messages = useMemo(() => {
    const history = historyQuery.data ?? [];
    if (optimisticUserMsg) return [...history, optimisticUserMsg];
    return history;
  }, [historyQuery.data, optimisticUserMsg]);

  return {
    user,
    messages,
    isHistoryLoading: historyQuery.isLoading,
    isHistoryError: historyQuery.isError,
    refetchHistory: historyQuery.refetch,
    usage: usageQuery.data,
    isUsageLoading: usageQuery.isLoading,
    sendMessage,
    sendMutationData: sendMutation.data,
    isSending: sendMutation.isPending,
    limitModalOpen,
    setLimitModalOpen,
    animatingMessageId,
    onAnimationDone: useCallback(() => setAnimatingMessageId(null), []),
  };
}
