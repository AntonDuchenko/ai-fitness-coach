"use client";

import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { ProfileContent } from "@/features/profile";

export default function DashboardSettingsPage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
