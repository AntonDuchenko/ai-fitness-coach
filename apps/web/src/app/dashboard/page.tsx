"use client";

import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { DashboardContent } from "@/features/dashboard/components/DashboardContent";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
