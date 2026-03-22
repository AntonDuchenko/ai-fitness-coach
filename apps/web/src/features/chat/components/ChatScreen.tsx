"use client";

import { useMemo, useState } from "react";
import { useChat } from "../hooks/useChat";
import { useChatScrollBottom } from "../hooks/useChatScroll";
import { chatUsageLabels, conversationTitle, userInitials } from "../utils";
import { ChatComposer } from "./ChatComposer";
import { ChatDesktopHeader } from "./ChatDesktopHeader";
import { ChatEmptyState } from "./ChatEmptyState";
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
  const {
    user,
    messages,
    isHistoryLoading,
    isHistoryError,
    refetchHistory,
    usage,
    sendMessage,
    isSending,
    limitModalOpen,
    setLimitModalOpen,
    animatingMessageId,
    onAnimationDone,
  } = useChat();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const title = useMemo(() => conversationTitle(messages), [messages]);
  const initials = userInitials(user?.name);
  const displayName = user?.name?.trim() || "Member";
  const planLabel = user?.isPremium ? "Pro Plan" : "Free Plan";
  const {
    full: usageFull,
    compact: usageCompact,
    isLimit: usageLimit,
  } = chatUsageLabels(usage);

  const isAtLimit = Boolean(
    usage && !usage.isPremium && usage.dailyLimit > 0 && usage.remaining === 0,
  );

  const {
    ref: scrollRef,
    showScrollButton,
    scrollToBottom,
  } = useChatScrollBottom(messages.length, isSending);

  const headerTitle = messages.length === 0 ? "New Chat" : title;

  return (
    <div className="flex h-[100dvh] flex-col bg-background text-foreground lg:flex-row">
      <ChatSidebar
        className="hidden lg:flex"
        conversationTitle={title}
        hasMessages={messages.length > 0}
        userInitials={initials}
        displayName={displayName}
        planLabel={planLabel}
        onNewChat={scrollToBottom}
      />

      <MobileDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <ChatSidebar
          conversationTitle={title}
          hasMessages={messages.length > 0}
          userInitials={initials}
          displayName={displayName}
          planLabel={planLabel}
          onNewChat={() => {
            scrollToBottom();
            setMobileMenuOpen(false);
          }}
        />
      </MobileDrawer>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <ChatMobileHeader
          title={headerTitle}
          usageCompact={usageCompact}
          isLimitReached={usageLimit}
          onOpenMenu={() => setMobileMenuOpen(true)}
        />

        <div className="hidden lg:block">
          <ChatDesktopHeader
            title={headerTitle}
            usageLabel={usageFull}
            isLimitReached={usageLimit}
          />
        </div>

        <div className="relative min-h-0 flex-1">
          <div
            ref={scrollRef}
            className="h-full overflow-y-auto px-3 py-4 sm:px-8 sm:py-6"
          >
            {isHistoryLoading ? (
              <ChatLoadingSkeleton />
            ) : isHistoryError ? (
              <ChatErrorState onRetry={() => refetchHistory()} />
            ) : messages.length === 0 ? (
              <ChatEmptyState
                onPick={sendMessage}
                disabled={isAtLimit || isSending}
              />
            ) : (
              <>
                <ChatMessageList
                  messages={messages}
                  userInitials={initials}
                  animatingMessageId={animatingMessageId}
                  onAnimationDone={onAnimationDone}
                />
                {isSending ? (
                  <div className="mt-4 sm:mt-6">
                    <ChatTypingIndicator />
                  </div>
                ) : null}
              </>
            )}
          </div>
          {showScrollButton ? (
            <ScrollToBottomButton onClick={scrollToBottom} />
          ) : null}
        </div>

        <div className="shrink-0 border-t border-border">
          <ChatComposer
            onSend={sendMessage}
            disabled={isAtLimit}
            isSending={isSending}
          />
        </div>
      </div>

      <ChatLimitDialog open={limitModalOpen} onOpenChange={setLimitModalOpen} />
    </div>
  );
}
