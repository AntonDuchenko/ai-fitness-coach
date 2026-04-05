"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dumbbell,
  LayoutDashboard,
  MessageSquare,
  Plus,
  Settings,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import type { Conversation } from "../types";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: string) => void;
  userInitials: string;
  displayName: string;
  planLabel: string;
  className?: string;
}

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/chat", label: "AI Coach", icon: MessageSquare, active: true },
  { href: "/dashboard/workouts", label: "Training Plan", icon: Dumbbell },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
] as const;

export function ChatSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  userInitials,
  displayName,
  planLabel,
  className,
}: ChatSidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-full w-64 shrink-0 flex-col border-r border-white/5 bg-m3-surface p-6 shadow-[20px_0_40px_rgba(0,0,0,0.3)]",
        className,
      )}
    >
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-black tracking-tighter text-white">
          ForgeFit
        </h1>
        <p className="mt-1 text-xs font-medium uppercase tracking-widest text-m3-outline">
          The Luminous Mentor
        </p>
      </div>

      <Button
        type="button"
        className="mb-4 w-full gap-2 rounded-xl bg-m3-primary-container py-3 font-bold text-m3-on-primary-container shadow-lg shadow-m3-primary-container/20 transition-transform hover:bg-m3-primary-container/90 active:scale-[0.98]"
        onClick={onNewChat}
      >
        <Plus className="size-4" />
        Start New Session
      </Button>

      <div className="mb-6 min-h-0 flex-1 overflow-y-auto">
        <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-m3-outline">
          Conversations
        </p>
        <div className="flex flex-col gap-0.5">
          {conversations.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelectConversation(c.id)}
              className={cn(
                "group flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-all",
                c.id === activeConversationId
                  ? "bg-m3-surface-low text-white"
                  : "text-m3-outline hover:bg-m3-surface-low/50 hover:text-white",
              )}
            >
              <MessageSquare className="size-3.5 shrink-0" aria-hidden />
              <span className="flex-1 truncate">
                {c.title || "New chat"}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteConversation(c.id);
                }}
                className="shrink-0 rounded p-0.5 opacity-0 transition-opacity hover:text-m3-error group-hover:opacity-100"
                aria-label="Delete conversation"
              >
                <Trash2 className="size-3.5" />
              </button>
            </button>
          ))}
          {conversations.length === 0 && (
            <p className="px-3 py-4 text-center text-xs text-m3-outline">
              No conversations yet
            </p>
          )}
        </div>
      </div>

      <nav className="mb-4 flex flex-col gap-1" aria-label="Main navigation">
        {NAV_ITEMS.map(({ href, label, icon: Icon, ...rest }) => {
          const isActive = "active" in rest;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium tracking-tight transition-all duration-300",
                isActive
                  ? "bg-m3-surface-low text-m3-primary-container shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                  : "text-m3-outline hover:bg-m3-surface-low hover:text-white",
              )}
            >
              <Icon className="size-5" aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex items-center gap-3 border-t border-white/5 pt-4">
        <div className="relative">
          <div className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-m3-primary-container text-xs font-bold text-m3-on-primary-container">
            {userInitials}
          </div>
          <div className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-m3-surface bg-m3-secondary" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white">{displayName}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-m3-outline">
            {planLabel}
          </span>
        </div>
      </div>
    </aside>
  );
}
