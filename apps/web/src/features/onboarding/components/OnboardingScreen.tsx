"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Dumbbell, Sparkles } from "lucide-react";
import { ONBOARDING_STEPS } from "../constants";
import { useOnboarding } from "../hooks/useOnboarding";
import { GeneratingScreen } from "./GeneratingScreen";
import { OnboardingStepContent } from "./OnboardingStepContent";

const TITLES = [
  "Tell us about yourself",
  "What are your goals?",
  "Your experience level",
  "Your schedule",
  "Where do you train?",
  "Any limitations?",
  "Nutrition preferences",
  "Your motivation",
];

export function OnboardingScreen() {
  const {
    state,
    canContinue,
    isGenerating,
    isHydrated,
    generationProgress,
    stepErrors,
    updateData,
    toggleArrayValue,
    nextStep,
    prevStep,
    reset,
  } = useOnboarding();

  if (!isHydrated) {
    return (
      <div className="mx-auto w-full max-w-[430px] rounded-xl border border-border bg-card p-4 shadow-2xl sm:p-6">
        <Skeleton className="mx-auto mb-4 h-4 w-32" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="mt-2 h-3 w-20" />
        <Skeleton className="mt-3 h-1 w-full" />
        <div className="mt-4 space-y-3">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
        <Skeleton className="mt-5 h-10 w-full" />
      </div>
    );
  }

  if (isGenerating) {
    return <GeneratingScreen progress={generationProgress} onComplete={reset} />;
  }

  const progressValue = (state.step / ONBOARDING_STEPS) * 100;

  return (
    <div className="mx-auto max-h-[calc(100dvh-2rem)] w-full max-w-[430px] overflow-y-auto rounded-xl border border-border bg-card p-4 text-card-foreground shadow-2xl sm:p-6">
      <div className="mb-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Dumbbell className="size-4 text-primary" aria-hidden="true" /> AI
        Pocket Trainer
      </div>
      <h1 className="font-heading text-2xl font-bold sm:text-3xl">
        {TITLES[state.step - 1]}
      </h1>
      <p className="mt-2 text-xs text-muted-foreground">
        Step {state.step} of {ONBOARDING_STEPS}
      </p>
      <Progress
        value={progressValue}
        className="mt-3"
        aria-label={`Step ${state.step} of ${ONBOARDING_STEPS}`}
      />

      <div className="mt-4">
        <OnboardingStepContent
          step={state.step}
          data={state.data}
          errors={stepErrors}
          onUpdate={updateData}
          onToggle={toggleArrayValue}
        />
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <Button
          variant="outline"
          disabled={state.step === 1}
          onClick={prevStep}
          className="h-10 w-full sm:w-auto"
        >
          Back
        </Button>
        <Button
          onClick={nextStep}
          disabled={!canContinue}
          variant={state.step === ONBOARDING_STEPS ? "default" : "default"}
          className={
            state.step === ONBOARDING_STEPS
              ? "h-10 flex-1 bg-success text-success-foreground hover:bg-success/90"
              : "h-10 flex-1"
          }
        >
          {state.step === ONBOARDING_STEPS ? (
            <>
              Generate My Plan{" "}
              <Sparkles className="size-4" aria-hidden="true" />
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </div>
    </div>
  );
}
