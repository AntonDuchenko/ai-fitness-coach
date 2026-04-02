import { Pencil } from "lucide-react";
import type { ProfileData } from "../types";
import { WeightProgressRing } from "./WeightProgressRing";

interface PersonalInfoCardProps {
  profile: ProfileData;
  onEdit?: () => void;
}

function formatGender(gender: string): string {
  return gender.charAt(0).toUpperCase() + gender.slice(1).replace("_", " ");
}

export function PersonalInfoCard({ profile, onEdit }: PersonalInfoCardProps) {
  return (
    <section className="glass-card flex flex-col gap-6 rounded-[24px] p-6 lg:rounded-[1.5rem] lg:bg-m3-surface-high lg:p-8">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-m3-primary lg:text-xl lg:font-bold">
          Personal Information
        </h3>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="rounded-lg p-1.5 text-m3-primary transition-colors hover:bg-m3-primary/10"
            aria-label="Edit personal information"
          >
            <Pencil className="size-4" />
          </button>
        )}
      </div>

      {/* Mobile layout */}
      <div className="space-y-4 lg:hidden">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-m3-surface-lowest p-4">
            <p className="mb-1 text-[10px] uppercase tracking-wider text-m3-outline">
              Age
            </p>
            <p className="font-heading font-bold text-m3-on-surface">
              {profile.age}{" "}
              <span className="text-xs font-normal text-m3-outline">years</span>
            </p>
          </div>
          <div className="rounded-xl bg-m3-surface-lowest p-4">
            <p className="mb-1 text-[10px] uppercase tracking-wider text-m3-outline">
              Gender
            </p>
            <p className="font-heading font-bold text-m3-on-surface">
              {formatGender(profile.gender)}
            </p>
          </div>
        </div>

        {profile.targetWeight && (
          <div className="flex items-center gap-6 rounded-xl bg-m3-surface-lowest p-4">
            <WeightProgressRing
              current={profile.weight}
              target={profile.targetWeight}
            />
            <div className="grid flex-1 grid-cols-3 gap-2">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-m3-outline">
                  Height
                </p>
                <p className="text-sm font-bold">
                  {profile.height}{" "}
                  <span className="text-[10px] font-normal text-m3-outline">
                    cm
                  </span>
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-m3-outline">
                  Current
                </p>
                <p className="text-sm font-bold">
                  {profile.weight}{" "}
                  <span className="text-[10px] font-normal text-m3-outline">
                    kg
                  </span>
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-m3-outline">
                  Target
                </p>
                <p className="text-sm font-bold text-m3-secondary">
                  {profile.targetWeight}{" "}
                  <span className="text-[10px] font-normal text-m3-outline">
                    kg
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop layout */}
      <div className="hidden gap-x-4 gap-y-6 lg:grid lg:grid-cols-2">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-m3-outline">
            Age
          </p>
          <p className="text-lg font-semibold">{profile.age} years</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-m3-outline">
            Gender
          </p>
          <p className="text-lg font-semibold">
            {formatGender(profile.gender)}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-m3-outline">
            Height
          </p>
          <p className="text-lg font-semibold">{profile.height} cm</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-m3-outline">
            Weight
          </p>
          <p className="text-lg font-semibold">{profile.weight} kg</p>
        </div>
        {profile.targetWeight && (
          <div className="col-span-2 flex items-center justify-between rounded-xl bg-m3-surface-lowest p-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-m3-outline">
                Target Weight
              </p>
              <p className="text-lg font-bold text-m3-secondary">
                {profile.targetWeight} kg
              </p>
            </div>
            <WeightProgressRing
              current={profile.weight}
              target={profile.targetWeight}
            />
          </div>
        )}
      </div>
    </section>
  );
}
