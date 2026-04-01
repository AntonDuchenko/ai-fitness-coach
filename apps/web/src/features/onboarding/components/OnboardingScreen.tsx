"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { ONBOARDING_STEPS } from "../constants";
import { useOnboarding } from "../hooks/useOnboarding";
import { GeneratingScreen } from "./GeneratingScreen";
import { OnboardingStepContent } from "./OnboardingStepContent";

const TITLES = [
  "Tell us about yourself",
  "What are your goals?",
  "Your experience level",
  "Design your perfect week",
  "Where do you train?",
  "Any limitations?",
  "Fuel your ambition",
  "Your motivation",
];

export function OnboardingScreen() {
  const router = useRouter();
  const {
    state,
    canContinue,
    isGenerating,
    isHydrated,
    generationProgress,
    isComplete,
    isFailed,
    error,
    stepErrors,
    updateData,
    toggleArrayValue,
    nextStep,
    prevStep,
    handleComplete,
  } = useOnboarding();

  if (!isHydrated) {
    return (
      <div className="mx-auto w-full max-w-2xl space-y-6 px-6 pt-20">
        <Skeleton className="h-6 w-32 bg-m3-surface-high" />
        <Skeleton className="h-10 w-3/4 bg-m3-surface-high" />
        <Skeleton className="h-1.5 w-full bg-m3-surface-high" />
        <div className="space-y-4 pt-4">
          <Skeleton className="h-14 w-full bg-m3-surface-high" />
          <Skeleton className="h-14 w-full bg-m3-surface-high" />
          <Skeleton className="h-14 w-full bg-m3-surface-high" />
        </div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <GeneratingScreen
        progress={generationProgress}
        isComplete={isComplete ?? false}
        isFailed={isFailed ?? false}
        error={error instanceof Error ? error : null}
        onComplete={() => {
          handleComplete();
          router.push("/dashboard");
        }}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const progressPct = (state.step / ONBOARDING_STEPS) * 100;
  const isLastStep = state.step === ONBOARDING_STEPS;

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-m3-surface text-m3-on-surface">
      <div className="glow-bg pointer-events-none fixed inset-0 -z-10" />

      {/* Header */}
      <header className="flex w-full shrink-0 items-center justify-between px-6 py-4">
        <button
          type="button"
          onClick={prevStep}
          disabled={state.step === 1}
          className="p-2 text-m3-primary transition-opacity hover:opacity-80 active:scale-95 disabled:pointer-events-none disabled:opacity-0"
          aria-label="Go back"
        >
          <ChevronLeft className="size-5" />
        </button>
        <span className="font-heading text-xl font-black tracking-widest text-m3-primary">
          FORGEFIT
        </span>
        <div className="w-9" />
      </header>

      {/* Main content */}
      <main className="mx-auto w-full max-w-2xl flex-1 overflow-y-auto px-6 pb-32 pt-4">
        {/* Progress */}
        <div className="mb-10">
          <div className="mb-3 flex items-end justify-between">
            <span className="font-heading text-3xl font-bold text-m3-primary">
              {state.step}
              <span className="text-xl font-medium text-m3-outline/40">
                /{ONBOARDING_STEPS}
              </span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-m3-outline">
              {Math.round(progressPct)}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-m3-surface-highest">
            <div
              className="h-full rounded-full bg-m3-primary-container shadow-[0_0_12px_rgba(77,142,255,0.4)] transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-3 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
          {TITLES[state.step - 1]}
        </h1>

        {/* Step Content */}
        <div className="mt-8">
          <OnboardingStepContent
            step={state.step}
            data={state.data}
            errors={stepErrors}
            onUpdate={updateData}
            onToggle={toggleArrayValue}
          />
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 z-50 flex w-full items-center justify-between rounded-t-3xl border-t border-white/10 bg-zinc-950/60 px-6 py-5 shadow-[0_-10px_40px_rgba(77,142,255,0.1)] backdrop-blur-xl sm:px-10">
        <button
          type="button"
          onClick={prevStep}
          disabled={state.step === 1}
          className="p-3 text-zinc-500 transition-colors hover:bg-white/5 active:scale-90 disabled:opacity-0"
          aria-label="Previous step"
        >
          <ChevronLeft className="size-5" />
        </button>
        <Button
          onClick={nextStep}
          disabled={!canContinue}
          className={cn(
            "rounded-full px-10 py-5 font-heading text-lg font-bold shadow-xl transition-all active:scale-95",
            isLastStep
              ? "bg-m3-secondary-container text-white shadow-m3-secondary-container/30"
              : "bg-m3-primary-container text-m3-on-primary-container shadow-m3-primary-container/20",
          )}
        >
          {isLastStep ? (
            <>
              Generate My Plan <Sparkles className="ml-2 size-4" />
            </>
          ) : (
            "Continue"
          )}
        </Button>
        <button
          type="button"
          onClick={nextStep}
          disabled={!canContinue}
          className="p-3 text-zinc-500 transition-colors hover:bg-white/5 active:scale-90 disabled:opacity-30"
          aria-label="Next step"
        >
          <ChevronRight className="size-5" />
        </button>
      </nav>
    </div>
  );
}
