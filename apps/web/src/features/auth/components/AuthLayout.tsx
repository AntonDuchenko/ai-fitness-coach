"use client";

import { BrandLogo } from "@/components/common/BrandLogo";
import { GuestRoute } from "@/components/common/GuestRoute";
import { AuthHero } from "./AuthHero";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <GuestRoute>
    <div className="min-h-screen bg-background">
      {/* Desktop: centered card with rounded corners */}
      <div className="hidden min-h-screen items-center justify-center p-6 lg:flex">
        <main className="grid w-full max-w-6xl grid-cols-2 overflow-hidden rounded-[2rem] bg-card shadow-2xl">
          <AuthHero />
          <section className="flex flex-col items-center justify-center overflow-y-auto bg-card px-12 py-16 xl:px-24">
            <div className="w-full max-w-md">{children}</div>
          </section>
        </main>
      </div>

      {/* Mobile: single column */}
      <div className="flex min-h-screen flex-col lg:hidden">
        <header className="flex items-center gap-2 px-6 py-4">
          <BrandLogo size={28} />
          <span className="font-heading text-xl font-extrabold tracking-tight text-foreground">
            ForgeFit
          </span>
        </header>
        <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">
          <div className="relative w-full max-w-md">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -top-24 left-1/2 size-[300px] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />
            <div className="relative z-10">{children}</div>
          </div>
        </main>
      </div>
    </div>
    </GuestRoute>
  );
}
