import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Bot, MessageSquare } from "lucide-react";
import Link from "next/link";

interface AiCoachCardProps {
  lastMessage: string | null;
  messagesUsed: number;
  dailyLimit: number;
  isPremium: boolean;
  isLoading: boolean;
}

const QUICK_PROMPTS = [
  "What should I eat today?",
  "Modify my routine",
  "Show my weak points",
] as const;

export function AiCoachCard({
  lastMessage,
  messagesUsed,
  dailyLimit,
  isPremium,
  isLoading,
}: AiCoachCardProps) {
  if (isLoading) {
    return (
      <Card className="border-0 rounded-2xl">
        <CardContent className="space-y-6 p-8">
          <div className="flex items-center gap-4">
            <Skeleton className="size-16 rounded-2xl" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-10 w-40" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col justify-between border-0 rounded-2xl border-t-4 border-primary/40">
      <CardContent className="flex flex-1 flex-col p-8">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative">
            <div className="flex size-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
              <Bot className="size-8" aria-hidden />
            </div>
            <div className="absolute -bottom-1 -right-1 size-5 rounded-full border-4 border-card bg-success" />
          </div>
          <div>
            <h4 className="font-heading text-xl font-bold">AI Coach</h4>
            <p className="text-xs font-bold uppercase tracking-widest text-success">
              Active
            </p>
          </div>
        </div>

        {!isPremium && (
          <div className="mb-6">
            <span className="inline-block rounded-full bg-success px-3 py-1 text-xs font-bold uppercase tracking-wide text-success-foreground">
              Free Tier
            </span>
          </div>
        )}

        {lastMessage ? (
          <div className="relative mb-8 rounded-2xl border border-border bg-background/50 p-6">
            <p className="text-base italic leading-relaxed text-muted-foreground">
              &ldquo;{lastMessage.slice(0, 200)}
              {lastMessage.length > 200 ? "..." : ""}&rdquo;
            </p>
            <div className="absolute -bottom-2 left-8 size-4 rotate-45 border-b border-r border-border bg-background/50" />
          </div>
        ) : (
          <div className="mb-8 flex flex-col items-center gap-2 rounded-2xl border border-border bg-background/50 p-6">
            <MessageSquare className="size-6 text-muted-foreground" aria-hidden />
            <p className="text-sm text-muted-foreground">
              Start a conversation with your AI coach
            </p>
          </div>
        )}

        <div className="mb-6 flex flex-col gap-2">
          {QUICK_PROMPTS.map((prompt) => (
            <Link
              key={prompt}
              href="/chat"
              className="rounded-lg border border-border bg-muted/50 px-4 py-2.5 text-xs font-bold text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-foreground"
            >
              {prompt}
            </Link>
          ))}
        </div>

        <div className="mt-auto space-y-3">
          <Button size="lg" className="w-full gap-3 shadow-lg shadow-primary/20" asChild>
            <Link href="/chat">
              Open Coach Chat
              <ArrowRight className="size-5" aria-hidden />
            </Link>
          </Button>
          {!isPremium && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-bold uppercase tracking-widest">
                  Messages today
                </span>
                <span className="font-bold text-foreground">
                  {messagesUsed} / {dailyLimit}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${Math.min((messagesUsed / dailyLimit) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
