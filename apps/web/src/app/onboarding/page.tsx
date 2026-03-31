import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { OnboardingScreen } from "@/features/onboarding";

export default function OnboardingPage() {
  return (
    <ProtectedRoute>
      <main className="flex min-h-screen items-start justify-center bg-background px-3 py-4 sm:px-4 sm:py-8">
        <OnboardingScreen />
      </main>
    </ProtectedRoute>
  );
}
