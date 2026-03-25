"use client";

import { BrandLogo } from "@/components/common/BrandLogo";
import { FloatingCards } from "./FloatingCards";

export function AuthHero() {
  return (
    <div className="relative hidden flex-1 overflow-hidden lg:block">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0F172A 0%, #0F172A 40%, #1E3A5F 65%, #0F172A 100%)",
        }}
      />

      {/* Glows — simulate mesh gradient: center #1E3A5F, bottom-center #2563EB */}
      <div className="absolute left-[20%] top-[25%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,_rgba(30,58,95,0.7)_0%,_transparent_70%)]" />
      <div className="absolute left-[30%] top-[55%] h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle,_rgba(37,99,235,0.35)_0%,_transparent_70%)]" />
      <div className="absolute right-[10%] top-[30%] h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle,_rgba(30,58,95,0.4)_0%,_transparent_70%)]" />

      <div className="absolute left-1/2 top-[9%] z-10 flex -translate-x-1/2 flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <BrandLogo size={44} />
          <span className="font-heading text-lg font-semibold text-white">
            ForgeFit
          </span>
        </div>

        <h1 className="w-[520px] text-center font-heading text-[42px] font-extrabold leading-[1.15] tracking-tight text-white">
          Transform Your
          <br />
          Fitness Journey
        </h1>

        <p className="max-w-[440px] text-center text-base leading-relaxed text-slate-400">
          ForgeFit adapts to your goals, schedule, and progress in real time.
        </p>
      </div>

      <FloatingCards />
    </div>
  );
}
