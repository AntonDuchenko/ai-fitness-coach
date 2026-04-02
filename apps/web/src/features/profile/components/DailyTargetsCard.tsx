import type { ProfileData } from "../types";

interface DailyTargetsCardProps {
  profile: ProfileData;
}

export function DailyTargetsCard({ profile }: DailyTargetsCardProps) {
  const calories = profile.targetCalories;
  const protein = profile.targetProtein;
  const carbs = profile.targetCarbs;
  const fats = profile.targetFat;

  if (!calories) return null;

  const totalGrams = (protein ?? 0) + (carbs ?? 0) + (fats ?? 0);
  const proteinPct =
    totalGrams > 0 ? Math.round(((protein ?? 0) / totalGrams) * 100) : 33;
  const carbsPct =
    totalGrams > 0 ? Math.round(((carbs ?? 0) / totalGrams) * 100) : 34;
  const fatsPct = 100 - proteinPct - carbsPct;

  return (
    <section className="relative overflow-hidden rounded-[24px] bg-m3-primary-container p-6 text-m3-on-primary-container lg:rounded-[1.5rem] lg:p-8">
      <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-3xl lg:-bottom-12 lg:-right-12 lg:top-auto lg:size-48" />

      <h3 className="mb-6 flex items-center gap-2 font-heading text-lg font-bold lg:text-xl lg:font-extrabold">
        Daily Targets
      </h3>

      {/* Mobile layout */}
      <div className="space-y-4 lg:hidden">
        <div className="mb-8 grid grid-cols-3 gap-2">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-md">
            <p className="text-[9px] font-bold uppercase tracking-wider opacity-70">
              BMR
            </p>
            <p className="text-sm font-extrabold">
              {profile.bmr?.toLocaleString()}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-md">
            <p className="text-[9px] font-bold uppercase tracking-wider opacity-70">
              TDEE
            </p>
            <p className="text-sm font-extrabold">
              {profile.tdee?.toLocaleString()}
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/20 p-3 backdrop-blur-md">
            <p className="text-[9px] font-bold uppercase tracking-wider">
              Goal
            </p>
            <p className="text-sm font-black">{calories.toLocaleString()}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="mb-1 flex items-end justify-between">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
              Macronutrients
            </p>
          </div>
          <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full bg-m3-on-primary-container"
              style={{ width: `${proteinPct}%` }}
            />
            <div
              className="h-full bg-m3-secondary"
              style={{ width: `${carbsPct}%` }}
            />
            <div
              className="h-full bg-m3-tertiary"
              style={{ width: `${fatsPct}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm font-black">{protein}g</p>
              <p className="text-[9px] font-bold uppercase opacity-60">
                Protein
              </p>
            </div>
            <div>
              <p className="text-sm font-black">{carbs}g</p>
              <p className="text-[9px] font-bold uppercase opacity-60">Carbs</p>
            </div>
            <div>
              <p className="text-sm font-black">{fats}g</p>
              <p className="text-[9px] font-bold uppercase opacity-60">Fats</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="relative z-10 hidden space-y-6 lg:block">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-70">
              Recommended Intake
            </p>
            <p className="text-5xl font-black tracking-tighter">
              {calories.toLocaleString()}{" "}
              <span className="text-sm font-bold uppercase opacity-80">
                kcal
              </span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-white/10 p-3 backdrop-blur-md">
            <p className="text-[10px] font-bold opacity-80">Protein</p>
            <p className="font-black">{protein}g</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3 backdrop-blur-md">
            <p className="text-[10px] font-bold opacity-80">Carbs</p>
            <p className="font-black">{carbs}g</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3 backdrop-blur-md">
            <p className="text-[10px] font-bold opacity-80">Fats</p>
            <p className="font-black">{fats}g</p>
          </div>
        </div>
        <div className="flex items-center gap-4 border-t border-white/10 pt-4 text-xs font-medium opacity-80">
          <span>BMR: {profile.bmr?.toLocaleString()}</span>
          <span>&bull;</span>
          <span>TDEE: {profile.tdee?.toLocaleString()}</span>
        </div>
      </div>
    </section>
  );
}
