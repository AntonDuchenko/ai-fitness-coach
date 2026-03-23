"use client";

import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { NutritionPlanScreen } from "@/features/nutrition";

export default function NutritionPage() {
  return (
    <ProtectedRoute>
      <NutritionPlanScreen />
    </ProtectedRoute>
  );
}
