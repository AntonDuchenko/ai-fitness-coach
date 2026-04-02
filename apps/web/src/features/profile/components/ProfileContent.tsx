"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { MobileDrawer } from "@/features/chat/components/MobileDrawer";
import { WorkoutMobileHeader } from "@/features/workout/components/WorkoutMobileHeader";
import { AlertTriangle, LogOut } from "lucide-react";
import { useState } from "react";
import { useProfilePage } from "../hooks/useProfilePage";
import { useUpdateProfileMutation } from "../hooks/useUpdateProfileMutation";
import type { ProfileData } from "../types";
import { DailyTargetsCard } from "./DailyTargetsCard";
import { EditFitnessDialog } from "./EditFitnessDialog";
import { EditNutritionDialog } from "./EditNutritionDialog";
import { EditPersonalInfoDialog } from "./EditPersonalInfoDialog";
import { FitnessProfileCard } from "./FitnessProfileCard";
import { NutritionCard } from "./NutritionCard";
import { PersonalInfoCard } from "./PersonalInfoCard";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileSkeleton } from "./ProfileSkeleton";
import { SubscriptionCard } from "./SubscriptionCard";

type EditSection = "personal" | "fitness" | "nutrition" | null;

export function ProfileContent() {
  const { user, profile, isLoading, isError, refetch, logout, subscription } =
    useProfilePage();
  const updateMutation = useUpdateProfileMutation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [editSection, setEditSection] = useState<EditSection>(null);

  const priceLabel = subscription.price
    ? `$${(subscription.price.amountCents / 100).toFixed(0)}/mo`
    : null;

  const handleSave = (data: Partial<ProfileData>) => {
    updateMutation.mutate(data, {
      onSuccess: () => setEditSection(null),
    });
  };

  return (
    <div className="flex h-[100dvh] flex-col bg-background text-foreground lg:flex-row">
      <DashboardSidebar className="hidden lg:flex" />
      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)}>
        <DashboardSidebar className="h-full border-r-0" />
      </MobileDrawer>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <WorkoutMobileHeader
          variant="generic"
          title="Profile & Settings"
          onOpenMenu={() => setMenuOpen(true)}
        />
        <div className="hidden lg:block">
          <header className="flex items-center gap-2 border-b border-border bg-background/60 px-10 py-4 backdrop-blur-xl">
            <span className="text-muted-foreground">Account</span>
            <span className="text-muted-foreground/40">/</span>
            <span className="font-bold text-primary">
              Profile &amp; Settings
            </span>
          </header>
        </div>

        <main className="flex-1 overflow-auto px-4 py-6 lg:px-10 lg:py-8">
          {isLoading && <ProfileSkeleton />}

          {isError && (
            <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-20 text-center">
              <AlertTriangle className="size-10 text-destructive" />
              <p className="text-lg font-semibold">Failed to load profile</p>
              <p className="text-sm text-muted-foreground">
                Something went wrong. Please try again.
              </p>
              <Button onClick={() => refetch()} variant="default">
                Retry
              </Button>
            </div>
          )}

          {!isLoading && !isError && user && profile && (
            <div className="mx-auto max-w-4xl space-y-6 lg:space-y-8">
              <ProfileHeader user={user} />

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <PersonalInfoCard
                  profile={profile}
                  onEdit={() => setEditSection("personal")}
                />
                <FitnessProfileCard
                  profile={profile}
                  onEdit={() => setEditSection("fitness")}
                />
                <NutritionCard
                  profile={profile}
                  onEdit={() => setEditSection("nutrition")}
                />
                <DailyTargetsCard profile={profile} />
              </div>

              <SubscriptionCard
                status={subscription.status}
                nextBillingDate={subscription.nextBillingDate}
                priceLabel={priceLabel}
                onManage={subscription.handleManage}
              />

              <div className="flex justify-center pb-8 pt-4">
                <Button
                  variant="outline"
                  className="rounded-full border-2 border-m3-outline-variant px-10 py-6 font-bold transition-all duration-300 hover:border-destructive hover:text-destructive"
                  onClick={logout}
                >
                  <LogOut className="mr-3 size-4" aria-hidden />
                  Log Out
                </Button>
              </div>

              <EditPersonalInfoDialog
                open={editSection === "personal"}
                onOpenChange={(open) => !open && setEditSection(null)}
                profile={profile}
                onSave={handleSave}
                isPending={updateMutation.isPending}
              />
              <EditFitnessDialog
                open={editSection === "fitness"}
                onOpenChange={(open) => !open && setEditSection(null)}
                profile={profile}
                onSave={handleSave}
                isPending={updateMutation.isPending}
              />
              <EditNutritionDialog
                open={editSection === "nutrition"}
                onOpenChange={(open) => !open && setEditSection(null)}
                profile={profile}
                onSave={handleSave}
                isPending={updateMutation.isPending}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
