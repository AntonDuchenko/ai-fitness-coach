"use client";

import { useCallback, useRef, useState } from "react";
import { useActiveConversation } from "../hooks/useActiveConversation";
import { useChat } from "../hooks/useChat";
import { useChatScrollBottom } from "../hooks/useChatScroll";
import { useConversations } from "../hooks/useConversations";
import { chatUsageLabels, userInitials } from "../utils";
import { ChatComposer } from "./ChatComposer";
import { ChatDesktopHeader } from "./ChatDesktopHeader";
import { ChatEmptyState } from "./ChatEmptyState";
import { ChatQuickActions } from "./ChatQuickActions";
import { ChatErrorState } from "./ChatErrorState";
import { ChatLimitDialog } from "./ChatLimitDialog";
import { ChatLoadingSkeleton } from "./ChatLoadingSkeleton";
import { ChatMessageList } from "./ChatMessageList";
import { ChatMobileHeader } from "./ChatMobileHeader";
import { ChatSidebar } from "./ChatSidebar";
import { ChatTypingIndicator } from "./ChatTypingIndicator";
import { MobileDrawer } from "./MobileDrawer";
import { ScrollToBottomButton } from "./ScrollToBottomButton";

export function ChatScreen() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { conversations, isLoading: isConvLoading, deleteConversation, addConversationToCache } =
    useConversations();

  const [activeId, setActiveId] = useState<string | null>(null);
  const isNewChatMode = useRef(false);

  const wrappedSetActiveId = useCallback((id: string | null) => {
    isNewChatMode.current = id === null;
    setActiveId(id);
  }, []);

  const {
    user, messages, isHistoryLoading, isHistoryError, refetchHistory,
    usage, sendMessage, sendMutationData, isSending,
    limitModalOpen, setLimitModalOpen, animatingMessageId, onAnimationDone,
  } = useChat(activeId);

  useActiveConversation(
    conversations, activeId, wrappedSetActiveId,
    sendMutationData, addConversationToCache, isNewChatMode,
  );

  const initials = userInitials(user?.name);
  const displayName = user?.name?.trim() || "Member";
  const planLabel = user?.isPremium ? "Pro Plan" : "Free Plan";
  const { full: usageFull, compact: usageCompact, isLimit: usageLimit } =
    chatUsageLabels(usage);
  const isAtLimit = Boolean(
    usage && !usage.isPremium && usage.dailyLimit > 0 && usage.remaining === 0,
  );
  const { ref: scrollRef, showScrollButton, scrollToBottom } =
    useChatScrollBottom(messages.length, isSending);

  const isNewChat = !activeId && isNewChatMode.current;
  const showEmpty = isNewChat || messages.length === 0;
  const loading = !isNewChat && ((activeId && isHistoryLoading) || isConvLoading);

  const handleNewChat = () => wrappedSetActiveId(null);
  const handleDeleteConv = (id: string) => {
    deleteConversation(id);
    if (activeId === id) {
      const rest = conversations.filter((c) => c.id !== id);
      wrappedSetActiveId(rest.length > 0 ? rest[0].id : null);
    }
  };

  const sidebarProps = {
    conversations,
    activeConversationId: activeId,
    onDeleteConversation: handleDeleteConv,
    userInitials: initials,
    displayName,
    planLabel,
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-m3-surface text-m3-on-surface">
      <ChatSidebar
        className="fixed left-0 top-0 z-40 hidden lg:flex"
        onSelectConversation={setActiveId}
        onNewChat={handleNewChat}
        {...sidebarProps}
      />
      <MobileDrawer open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <ChatSidebar
          onSelectConversation={(id) => { setActiveId(id); setMobileMenuOpen(false); }}
          onNewChat={() => { handleNewChat(); setMobileMenuOpen(false); }}
          {...sidebarProps}
        />
      </MobileDrawer>

      <main className="relative flex min-h-0 flex-1 flex-col bg-m3-surface-lowest lg:ml-64">
        <div className="pointer-events-none absolute right-[-5%] top-[-10%] size-[500px] rounded-full bg-m3-primary-container/10 blur-[120px]" />
        <ChatMobileHeader
          title="AI Coach"
          usageCompact={usageCompact}
          isLimitReached={usageLimit}
          onOpenMenu={() => setMobileMenuOpen(true)}
          userInitials={initials}
        />
        <div className="hidden lg:block">
          <ChatDesktopHeader title="AI Coach" usageLabel={usageFull} isLimitReached={usageLimit} />
        </div>

        <div className="relative min-h-0 flex-1">
          <div ref={scrollRef} className="h-full overflow-y-auto scroll-smooth p-4 sm:p-8">
            <div className="mx-auto max-w-3xl space-y-8">
              {loading ? (
                <ChatLoadingSkeleton />
              ) : isHistoryError ? (
                <ChatErrorState onRetry={() => refetchHistory()} />
              ) : showEmpty && !isSending ? (
                <ChatEmptyState onPick={sendMessage} disabled={isAtLimit || isSending} />
              ) : (
                <>
                  <ChatMessageList
                    messages={messages}
                    userInitials={initials}
                    animatingMessageId={animatingMessageId}
                    onAnimationDone={onAnimationDone}
                  />
                  {isSending && (
                    <div className="mt-4 sm:mt-6"><ChatTypingIndicator /></div>
                  )}
                </>
              )}
            </div>
          </div>
          {showScrollButton && <ScrollToBottomButton onClick={scrollToBottom} />}
        </div>

        {!showEmpty && messages.length > 0 && (
          <ChatQuickActions onPick={sendMessage} disabled={isAtLimit || isSending} />
        )}
        <ChatComposer onSend={sendMessage} disabled={isAtLimit} isSending={isSending} showSuggestions={!showEmpty && messages.length > 0} />
      </main>

      <ChatLimitDialog open={limitModalOpen} onOpenChange={setLimitModalOpen} />
    </div>
  );
}
