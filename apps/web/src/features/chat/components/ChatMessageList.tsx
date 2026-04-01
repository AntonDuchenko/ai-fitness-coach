"use client";

import { Button } from "@/components/ui/button";
import { Bot, Check, Copy } from "lucide-react";
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
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Date Divider */}
      <div className="flex justify-center">
        <span className="rounded-full bg-m3-surface-low px-4 py-1 text-[10px] font-black uppercase tracking-widest text-m3-outline">
          Today
        </span>
      </div>

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
    <div className="group flex max-w-3xl gap-3 sm:gap-4">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-m3-primary-container/20">
        <Bot className="size-4 text-m3-primary" aria-hidden />
      </div>
      <div className="min-w-0 space-y-2">
        <div className="rounded-2xl rounded-tl-none border border-white/5 bg-m3-surface-high p-5 shadow-xl backdrop-blur-sm">
          {animate ? (
            <TypewriterContent content={content} onDone={onAnimationDone} />
          ) : (
            <MarkdownContent content={content} />
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="ml-1 text-[10px] font-bold uppercase text-m3-outline">
            Coach &bull; {time}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="opacity-0 transition-opacity group-hover:opacity-100"
            onClick={copyToClipboard}
            aria-label={copied ? "Copied" : "Copy message"}
          >
            {copied ? (
              <Check className="size-3 text-m3-secondary" />
            ) : (
              <Copy className="size-3 text-m3-outline" />
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
    <div className="flex max-w-2xl flex-row-reverse gap-3 self-end sm:gap-4">
      <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-m3-surface-high text-[10px] font-bold text-m3-on-surface">
        {initials}
      </div>
      <div className="space-y-2 text-right">
        <div className="rounded-2xl rounded-tr-none bg-m3-primary-container p-5 shadow-lg shadow-m3-primary-container/10">
          <p className="text-left text-[15px] font-semibold leading-relaxed text-m3-on-primary-container">
            {content}
          </p>
        </div>
        <span className="mr-1 text-[10px] font-bold uppercase text-m3-outline">
          Read &bull; {time}
        </span>
      </div>
    </div>
  );
}
