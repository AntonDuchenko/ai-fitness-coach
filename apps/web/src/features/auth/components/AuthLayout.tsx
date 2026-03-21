"use client";

import { AuthHero } from "./AuthHero";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <AuthHero />
      <div
        className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-[520px] lg:shrink-0 lg:border-l lg:border-border lg:px-12"
        style={{
          background:
            "linear-gradient(180deg, #161618 0%, #1A1A1F 50%, #161618 100%)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
