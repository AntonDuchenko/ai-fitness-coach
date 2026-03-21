"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useTypewriter } from "../hooks/useTypewriter";
import type { ChatMessage } from "../types";
import { formatChatTime } from "../utils";
import { MarkdownContent } from "./MarkdownContent";

interface ChatMessageListProps {
  messages: ChatMessage[];
  userInitials: string;
  animatingMessageId?: string | null;
  onAnimationDone?: () => void;
}

export function ChatMessageList({
  messages,
  userInitials,
  animatingMessageId,
  onAnimationDone,
}: ChatMessageListProps) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {messages.map((m) =>
        m.role === "user" ? (
          <UserRow
            key={m.id}
            content={m.content}
            time={formatChatTime(m.createdAt)}
            initials={userInitials}
          />
        ) : (
          <AssistantRow
            key={m.id}
            content={m.content}
            time={formatChatTime(m.createdAt)}
            animate={m.id === animatingMessageId}
            onAnimationDone={onAnimationDone}
          />
        ),
      )}
    </div>
  );
}

function AssistantRow({
  content,
  time,
  animate,
  onAnimationDone,
}: {
  content: string;
  time: string;
  animate?: boolean;
  onAnimationDone?: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(() => {
    void navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [content]);

  return (
    <div className="group flex max-w-full gap-2 sm:gap-3">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground sm:size-9 sm:text-[11px]">
        AI
      </div>
      <div className="min-w-0 max-w-[min(580px,85%)] rounded-xl bg-card px-3.5 py-3 sm:px-4">
        {animate ? (
          <TypewriterContent content={content} onDone={onAnimationDone} />
        ) : (
          <MarkdownContent content={content} />
        )}
        <div className="mt-2 flex items-center gap-2">
          <p className="text-[10px] text-muted-foreground sm:text-[11px]">
            {time}
          </p>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="opacity-0 transition-opacity group-hover:opacity-100"
            onClick={copyToClipboard}
            aria-label={copied ? "Copied" : "Copy message"}
          >
            {copied ? (
              <Check className="size-3 text-success" />
            ) : (
              <Copy className="size-3 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function TypewriterContent({
  content,
  onDone,
}: {
  content: string;
  onDone?: () => void;
}) {
  const { displayed, isDone } = useTypewriter(content);

  useEffect(() => {
    if (isDone && onDone) onDone();
  }, [isDone, onDone]);

  return <MarkdownContent content={displayed} />;
}

function UserRow({
  content,
  time,
  initials,
}: {
  content: string;
  time: string;
  initials: string;
}) {
  return (
    <div className="flex w-full justify-end">
      <div className="flex max-w-[min(420px,85%)] items-start gap-2 sm:gap-3">
        <div className="min-w-0 flex-1 rounded-xl bg-primary px-3.5 py-3 text-primary-foreground sm:px-4">
          <p className="whitespace-pre-wrap text-[13px] leading-relaxed sm:text-sm">
            {content}
          </p>
          <p
            className={cn(
              "mt-2 text-[10px] text-primary-foreground/60 sm:text-[11px]",
            )}
          >
            {time}
          </p>
        </div>
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-[9px] font-bold text-secondary-foreground sm:size-9 sm:text-[11px]">
          {initials}
        </div>
      </div>
    </div>
  );
}
