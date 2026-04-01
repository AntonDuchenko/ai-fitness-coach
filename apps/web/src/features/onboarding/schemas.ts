import { z } from "zod";
import type { OnboardingData } from "./types";

export const stepSchemas = [
  // Step 1: Basic Info
  z.object({
    age: z.string().min(1, "Age is required"),
    height: z.string().min(1, "Height is required"),
    weight: z.string().min(1, "Weight is required"),
  }),
  // Step 2: Goals
  z.object({
    primaryGoal: z.string().min(1, "Select a primary goal"),
  }),
  // Step 3: Experience
  z.object({
    fitnessLevel: z.string().min(1, "Select your fitness level"),
    nutritionKnowledge: z.string().min(1, "Select your nutrition knowledge"),
  }),
  // Step 4: Schedule
  z.object({
    trainingDaysPerWeek: z.number().min(1, "Select at least 1 day"),
    sessionDuration: z.string().min(1, "Select session duration"),
  }),
  // Step 5: Equipment
  z.object({
    trainingLocation: z.string().min(1, "Select a training location"),
  }),
  // Step 6: Limitations (all optional)
  z.object({}),
  // Step 7: Nutrition
  z.object({
    cookingLevel: z.string().min(1, "Select your cooking level"),
    foodBudget: z.string().min(1, "Enter your food budget"),
  }),
  // Step 8: Motivation
  z.object({
    motivation: z.string().min(1, "Tell us your motivation"),
  }),
] as const;

export type StepErrors = Record<string, string>;

export function validateStep(step: number, data: OnboardingData): StepErrors {
  const schema = stepSchemas[step - 1];
  if (!schema) return {};

  const result = schema.safeParse(data);
  if (result.success) return {};

  const errors: StepErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (key) errors[String(key)] = issue.message;
  }
  return errors;
}
