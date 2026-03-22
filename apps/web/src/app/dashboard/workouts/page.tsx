"use client";

import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { WorkoutPlanScreen } from "@/features/workout";

export default function WorkoutsPage() {
  return (
    <ProtectedRoute>
      <WorkoutPlanScreen />
    </ProtectedRoute>
  );
}
