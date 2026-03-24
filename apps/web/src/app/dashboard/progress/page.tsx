"use client";

import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { ProgressScreen } from "@/features/progress/components/ProgressScreen";

export default function ProgressPage() {
  return (
    <ProtectedRoute>
      <ProgressScreen />
    </ProtectedRoute>
  );
}
