"use client";

import { useAuth } from "@/features/auth";
import { ApiError, apiClient } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import type { ChatMessage, ChatUsage } from "../types";

const CHAT_HISTORY_KEY = ["chat", "history"] as const;
const CHAT_USAGE_KEY = ["chat", "usage"] as const;

export function useChat() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [limitModalOpen, setLimitModalOpen] = useState(false);
  const [optimisticUserMsg, setOptimisticUserMsg] =
    useState<ChatMessage | null>(null);
  const [animatingMessageId, setAnimatingMessageId] = useState<string | null>(
    null,
  );

  const historyQuery = useQuery({
    queryKey: CHAT_HISTORY_KEY,
    queryFn: () => apiClient<ChatMessage[]>("/chat/history?limit=50&offset=0"),
  });

  const usageQuery = useQuery({
    queryKey: CHAT_USAGE_KEY,
    queryFn: () => apiClient<ChatUsage>("/chat/usage"),
  });

  const sendMutation = useMutation({
    mutationFn: (message: string) =>
      apiClient<{ userMessage: ChatMessage; aiMessage: ChatMessage }>(
        "/chat/send",
        { method: "POST", body: JSON.stringify({ message }) },
      ),
    onMutate: (message) => {
      setOptimisticUserMsg({
        id: `optimistic-${Date.now()}`,
        role: "user",
        content: message,
        createdAt: new Date().toISOString(),
      });
    },
    onSuccess: (data) => {
      // Put both messages into cache at once
      queryClient.setQueryData<ChatMessage[]>([...CHAT_HISTORY_KEY], (old) => [
        ...(old ?? []),
        data.userMessage,
        data.aiMessage,
      ]);
      setOptimisticUserMsg(null);
      setAnimatingMessageId(data.aiMessage.id);
      void queryClient.invalidateQueries({ queryKey: CHAT_USAGE_KEY });
    },
    onError: (err) => {
      setOptimisticUserMsg(null);
      if (err instanceof ApiError && err.statusCode === 403) {
        setLimitModalOpen(true);
        void queryClient.invalidateQueries({ queryKey: CHAT_USAGE_KEY });
      }
    },
  });

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      sendMutation.mutate(trimmed);
    },
    [sendMutation],
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
    isSending: sendMutation.isPending,
    limitModalOpen,
    setLimitModalOpen,
    animatingMessageId,
    onAnimationDone: useCallback(() => setAnimatingMessageId(null), []),
  };
}
