"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, ArrowRight, Check } from "lucide-react";

interface GeneratingScreenProps {
  progress: number;
  isComplete: boolean;
  isFailed: boolean;
  error: Error | null;
  onComplete: () => void;
  onRetry: () => void;
}

const STATUSES = [
  "Analyzing profile",
  "Calculating macros",
  "Designing workout",
  "Creating meal plans",
  "Finalizing",
];

const RING_RADIUS = 88;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export function GeneratingScreen({
  progress,
  isComplete,
  isFailed,
  error,
  onComplete,
  onRetry,
}: GeneratingScreenProps) {
  const hasError = isFailed || error !== null;
  const offset = RING_CIRCUMFERENCE - (progress / 100) * RING_CIRCUMFERENCE;

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-m3-surface px-6 text-m3-on-surface">
      <div className="glow-bg pointer-events-none fixed inset-0" />

      {/* Branding */}
      <nav className="absolute left-0 top-0 flex w-full items-center px-6 py-4">
        <span className="font-heading text-xl font-black tracking-widest text-m3-primary">
          FORGEFIT
        </span>
      </nav>

      <section className="relative z-10 w-full max-w-xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-4 font-heading text-4xl font-extrabold tracking-tighter">
            {hasError ? "Something went wrong" : "Generating your plan"}
          </h1>
          <p className="mx-auto max-w-md text-lg font-medium leading-relaxed text-m3-outline">
            {hasError
              ? error?.message || "Plan generation failed. Please try again."
              : "Our AI is synchronizing your biometric data with our coaching protocols."}
          </p>
        </div>

        {hasError ? (
          <div className="flex flex-col items-center gap-6">
            <AlertCircle className="size-16 text-m3-error" />
            <Button
              onClick={onRetry}
              className="w-full rounded-xl bg-m3-primary-container py-5 text-lg font-bold text-m3-on-primary-container"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <>
            {/* Progress Card */}
            <div className="glass-card mb-8 rounded-2xl border border-m3-outline-variant/15 p-8 shadow-2xl sm:p-12">
              <div className="flex flex-col items-center gap-10 sm:flex-row">
                {/* Circular Progress */}
                <div className="relative flex size-48 shrink-0 items-center justify-center">
                  <svg className="size-full -rotate-90" aria-hidden="true">
                    <title>Generation progress</title>
                    <circle
                      cx="96"
                      cy="96"
                      r={RING_RADIUS}
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-m3-surface-high"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r={RING_RADIUS}
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray={RING_CIRCUMFERENCE}
                      strokeDashoffset={offset}
                      strokeLinecap="round"
                      className="text-m3-secondary drop-shadow-[0_0_8px_rgba(74,225,118,0.4)] transition-all duration-700"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="font-heading text-4xl font-black text-m3-secondary">
                      {Math.round(progress)}%
                    </span>
                    <span className="mt-1 text-xs font-bold uppercase tracking-widest text-m3-outline">
                      {isComplete ? "Ready" : "Processing"}
                    </span>
                  </div>
                </div>

                {/* Checklist */}
                <div className="w-full flex-grow space-y-5" aria-live="polite">
                  {STATUSES.map((item, idx) => {
                    const done = idx < Math.floor(progress / 20);
                    return (
                      <div key={item} className="flex items-center gap-4">
                        <div
                          className={cn(
                            "flex size-6 items-center justify-center rounded-full",
                            done
                              ? "bg-m3-secondary/20 text-m3-secondary"
                              : "bg-m3-surface-high text-m3-outline",
                          )}
                        >
                          {done && <Check className="size-3.5" />}
                        </div>
                        <span
                          className={cn(
                            "text-base font-medium tracking-tight",
                            done ? "text-m3-on-surface" : "text-m3-outline",
                          )}
                        >
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTA */}
            {isComplete && (
              <div className="flex flex-col items-center gap-6">
                <Button
                  onClick={onComplete}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-m3-secondary-container py-5 text-lg font-bold text-white shadow-lg"
                >
                  Go to Dashboard
                  <ArrowRight className="size-5" />
                </Button>
                <p className="text-sm font-medium text-m3-outline">
                  Your transformation journey starts now.
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
