"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BrandLogo } from "@/components/common/BrandLogo";
import { AlertCircle } from "lucide-react";

interface GeneratingScreenProps {
  progress: number;
  isComplete: boolean;
  isFailed: boolean;
  error: Error | null;
  onComplete: () => void;
  onRetry: () => void;
}

const STATUSES = [
  "Analyzing your profile",
  "Calculating optimal macros",
  "Designing workout program",
  "Creating meal plans",
  "Finalizing your plan",
];

export function GeneratingScreen({
  progress,
  isComplete,
  isFailed,
  error,
  onComplete,
  onRetry,
}: GeneratingScreenProps) {
  const hasError = isFailed || error !== null;

  return (
    <div className="mx-auto max-h-[calc(100dvh-2rem)] w-full max-w-[430px] overflow-y-auto rounded-xl border border-border bg-card p-4 text-card-foreground shadow-2xl sm:p-6">
      <div className="mb-6 flex items-center justify-center gap-2 text-xs text-muted-foreground sm:mb-8">
        <BrandLogo size={16} /> ForgeFit
      </div>

      {hasError ? (
        <>
          <div className="flex flex-col items-center gap-3">
            <AlertCircle
              className="size-10 text-destructive"
              aria-hidden="true"
            />
            <h2 className="text-center font-heading text-xl font-bold sm:text-2xl">
              Something went wrong
            </h2>
            <p className="text-center text-sm text-muted-foreground">
              {error?.message || "Plan generation failed. Please try again."}
            </p>
          </div>
          <Button className="mt-6 h-10 w-full" onClick={onRetry}>
            Try Again
          </Button>
        </>
      ) : (
        <>
          <h2 className="text-center font-heading text-xl font-bold sm:text-2xl">
            Generating your plan...
          </h2>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Our AI is creating a personalized fitness and nutrition plan just
            for you.
          </p>
          <p
            className="mt-6 text-center font-heading text-3xl font-bold text-primary sm:text-4xl"
            aria-live="polite"
          >
            {Math.round(progress)}%
          </p>
          <Progress
            value={progress}
            className="mt-4"
            aria-label="Plan generation progress"
          />
          <div className="mt-6 space-y-2 text-sm" aria-live="polite">
            {STATUSES.map((item, idx) => {
              const done = idx < Math.floor(progress / 20);
              return (
                <p
                  key={item}
                  className={done ? "text-success" : "text-muted-foreground"}
                >
                  {done ? "\u25CF" : "\u25CB"} {item}
                </p>
              );
            })}
          </div>
          {isComplete && (
            <Button className="mt-6 h-10 w-full" onClick={onComplete}>
              Go to Dashboard
            </Button>
          )}
        </>
      )}
    </div>
  );
}
