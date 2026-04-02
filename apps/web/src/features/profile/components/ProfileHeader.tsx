import { Badge } from "@/components/ui/badge";
import type { User } from "@/features/auth/types";

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const initials =
    user.name
      ?.split(/\s+/)
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "ME";

  const displayName = user.name?.trim() || "Member";
  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-m3-surface-low p-6 lg:flex lg:items-end lg:gap-8 lg:p-8">
      <div className="pointer-events-none absolute -mr-32 -mt-32 right-0 top-0 size-64 rounded-full bg-m3-primary-container/10 blur-[100px]" />

      {/* Desktop avatar */}
      <div className="relative z-10 hidden size-32 items-center justify-center rounded-3xl bg-m3-primary-container text-4xl font-extrabold text-m3-on-primary-container shadow-2xl shadow-m3-primary-container/20 lg:flex">
        {initials}
      </div>

      {/* Mobile avatar */}
      <div className="relative z-10 mx-auto mb-4 flex size-24 items-center justify-center rounded-full border-4 border-m3-surface bg-m3-primary-container shadow-xl lg:hidden">
        <span className="font-heading text-3xl font-extrabold text-m3-on-primary-container">
          {initials}
        </span>
        {user.isPremium && (
          <div className="absolute bottom-0 right-0 rounded-full border-2 border-m3-surface bg-m3-secondary p-1">
            <svg
              className="size-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              role="img"
              aria-label="Verified"
            >
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
            </svg>
          </div>
        )}
      </div>

      <div className="relative z-10 flex-1 text-center lg:text-left">
        <div className="mb-1 flex items-center justify-center gap-3 lg:justify-start">
          <h2 className="font-heading text-2xl font-extrabold tracking-tight lg:text-4xl">
            {displayName}
          </h2>
          {user.isPremium && (
            <Badge className="hidden border-m3-secondary/20 bg-m3-secondary-container/20 text-m3-secondary lg:inline-flex">
              Premium
            </Badge>
          )}
        </div>
        <p className="mb-3 text-sm text-m3-outline">{user.email}</p>
        <div className="flex items-center justify-center gap-2 lg:justify-start">
          {user.isPremium && (
            <Badge className="border-m3-secondary/20 bg-m3-secondary-container/20 text-[10px] font-bold uppercase tracking-widest text-m3-secondary lg:hidden">
              Premium
            </Badge>
          )}
          <span className="text-[11px] text-m3-outline-variant">
            Member since {memberSince}
          </span>
        </div>
      </div>
    </section>
  );
}
