import { Badge } from "@/components/ui/badge";
import { Calendar, Dumbbell, MapPin, Pencil } from "lucide-react";
import type { ProfileData } from "../types";

interface FitnessProfileCardProps {
  profile: ProfileData;
  onEdit?: () => void;
}

function formatEnum(value: string): string {
  return value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatLocation(loc: string): string {
  const map: Record<string, string> = {
    home_none: "Home (No Equipment)",
    home_basic: "Home (Basic)",
    home_gym: "Home Gym",
    commercial_gym: "Commercial Gym",
    outdoor: "Outdoor",
  };
  return map[loc] || formatEnum(loc);
}

function formatTime(time: string): string {
  return time.charAt(0).toUpperCase() + time.slice(1);
}

export function FitnessProfileCard({
  profile,
  onEdit,
}: FitnessProfileCardProps) {
  return (
    <section className="glass-card flex flex-col gap-5 rounded-[24px] p-6 lg:rounded-[1.5rem] lg:bg-m3-surface-high lg:p-8">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-m3-primary lg:text-xl lg:font-bold">
          Fitness Profile
        </h3>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="rounded-lg p-1.5 text-m3-primary transition-colors hover:bg-m3-primary/10"
            aria-label="Edit fitness profile"
          >
            <Pencil className="size-4" />
          </button>
        )}
      </div>

      {/* Mobile layout */}
      <div className="space-y-5 lg:hidden">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-m3-primary-container/10">
              <Dumbbell className="size-5 text-m3-primary" aria-hidden />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-m3-outline">
                Primary Goal
              </p>
              <p className="font-heading font-semibold">
                {formatEnum(profile.primaryGoal)}
              </p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="bg-m3-surface-highest text-m3-outline-variant"
          >
            {formatEnum(profile.fitnessLevel)}
          </Badge>
        </div>

        <div className="rounded-xl border border-m3-outline-variant/10 bg-m3-surface-low/50 p-4">
          <div className="mb-3 flex items-center gap-3">
            <Calendar className="size-4 text-m3-outline" aria-hidden />
            <p className="text-xs">
              {profile.trainingDaysPerWeek} days/week &bull;{" "}
              {profile.sessionDuration} min &bull;{" "}
              {formatTime(profile.preferredTime)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="size-4 text-m3-outline" aria-hidden />
            <p className="text-xs">
              {formatLocation(profile.trainingLocation)}
            </p>
          </div>
        </div>

        <div>
          <p className="mb-2 text-[10px] uppercase tracking-wider text-m3-outline">
            Available Equipment
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.equipment.map((item) => (
              <span
                key={item}
                className="rounded-full border border-m3-outline-variant/20 bg-m3-surface-lowest px-3 py-1.5 text-[10px] font-medium"
              >
                {formatEnum(item)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden space-y-4 lg:block">
        <div className="flex items-center justify-between border-b border-white/5 py-2">
          <span className="text-m3-outline">Primary Goal</span>
          <span className="font-bold">{formatEnum(profile.primaryGoal)}</span>
        </div>
        <div className="flex items-center justify-between border-b border-white/5 py-2">
          <span className="text-m3-outline">Experience Level</span>
          <Badge className="border-0 bg-m3-primary/10 text-m3-primary">
            {formatEnum(profile.fitnessLevel)}
          </Badge>
        </div>
        <div className="flex items-center justify-between border-b border-white/5 py-2">
          <span className="text-m3-outline">Frequency</span>
          <span className="font-bold">
            {profile.trainingDaysPerWeek} days / week
          </span>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {profile.equipment.map((item) => (
            <span
              key={item}
              className="rounded-md bg-m3-surface-lowest px-3 py-1 text-xs"
            >
              {formatEnum(item)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
