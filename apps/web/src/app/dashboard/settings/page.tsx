"use client";

import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { SubscriptionManagementScreen } from "@/features/subscription";

export default function DashboardSettingsPage() {
  return (
    <ProtectedRoute>
      <SubscriptionManagementScreen />
    </ProtectedRoute>
  );
}
