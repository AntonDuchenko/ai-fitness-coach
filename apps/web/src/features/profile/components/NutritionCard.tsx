import { AlertTriangle, Pencil, UtensilsCrossed } from "lucide-react";
import type { ProfileData } from "../types";

interface NutritionCardProps {
  profile: ProfileData;
  onEdit?: () => void;
}

function formatCuisines(cuisines: string[]): string {
  return cuisines.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(", ");
}

export function NutritionCard({ profile, onEdit }: NutritionCardProps) {
  return (
    <section className="glass-card flex flex-col gap-5 rounded-[24px] p-6 lg:rounded-[1.5rem] lg:bg-m3-surface-high lg:p-8">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-m3-primary lg:text-xl lg:font-bold">
          Nutrition
        </h3>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="rounded-lg p-1.5 text-m3-primary transition-colors hover:bg-m3-primary/10"
            aria-label="Edit nutrition preferences"
          >
            <Pencil className="size-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 lg:gap-4">
        <div className="rounded-xl bg-m3-surface-lowest p-3 text-center lg:rounded-2xl lg:p-4">
          <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-m3-outline lg:mb-1">
            Meals/Day
          </p>
          <p className="text-2xl font-black">{profile.mealsPerDay}</p>
        </div>
        <div className="rounded-xl bg-m3-surface-lowest p-3 text-center lg:rounded-2xl lg:p-4">
          <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-m3-outline lg:mb-1">
            Budget
          </p>
          <p className="text-2xl font-black text-m3-secondary">
            ${profile.foodBudget}
            <span className="text-sm font-normal text-m3-outline">/day</span>
          </p>
        </div>
      </div>

      <div className="space-y-3 lg:space-y-4">
        {profile.cuisinePreferences.length > 0 && (
          <div className="flex items-center gap-2 text-sm lg:gap-3">
            <UtensilsCrossed className="size-5 text-m3-tertiary" aria-hidden />
            <span className="text-m3-outline lg:hidden">
              {formatCuisines(profile.cuisinePreferences)}
            </span>
            <span className="hidden text-m3-outline lg:inline">Cuisine:</span>
            <span className="hidden font-semibold lg:inline">
              {formatCuisines(profile.cuisinePreferences)}
            </span>
          </div>
        )}

        {profile.dietaryRestrictions.length > 0 && (
          <div className="flex items-center gap-2 rounded-xl border border-m3-error-container/20 bg-m3-error-container/10 p-3 text-sm">
            <AlertTriangle className="size-5 text-m3-error" aria-hidden />
            <span className="text-m3-on-surface/80">
              {profile.dietaryRestrictions
                .map((r) => r.charAt(0).toUpperCase() + r.slice(1))
                .join(", ")}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
