"use client";

import { BrandLogo } from "@/components/common/BrandLogo";
import { AuthHero } from "./AuthHero";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#090A0F]">
      <div className="hidden min-h-screen lg:flex">
        <AuthHero />
        <div
          className="flex w-[520px] shrink-0 items-center justify-center border-l border-[#1F1F23] px-12"
          style={{
            background:
              "linear-gradient(180deg, #161618 0%, #1A1A1F 50%, #161618 100%)",
          }}
        >
          {children}
        </div>
      </div>

      <div className="lg:hidden">
        <div
          className="relative overflow-hidden px-6 pb-8 pt-10 md:px-8 md:pb-10 md:pt-8"
          style={{
            background:
              "linear-gradient(180deg, #0F172A 0%, #0F172A 42%, #1E3A5F 72%, #0F172A 100%)",
          }}
        >
          <div className="mx-auto flex w-full max-w-[390px] flex-col items-center md:max-w-[768px]">
            <div className="mb-4 flex items-center gap-3 md:mb-5">
              <BrandLogo size={36} />
              <span className="font-heading text-xl font-semibold text-white">
                ForgeFit
              </span>
            </div>
            <h1 className="max-w-[280px] text-center font-heading text-[44px] font-extrabold leading-[1.05] tracking-tight text-white md:max-w-none md:text-[48px]">
              Transform Your
              <br />
              Fitness Journey
            </h1>
            <p className="mt-3 max-w-[310px] text-center text-[15px] leading-relaxed text-slate-300 md:max-w-[520px] md:text-[16px]">
              ForgeFit adapts to your goals, schedule, and progress
            </p>
            <div className="mt-8 hidden w-full grid-cols-3 gap-3 md:grid">
              <div className="rounded-xl border border-[#1F1F23] bg-[#161618]/85 px-4 py-3 text-center">
                <p className="font-heading text-[30px] font-bold text-white">
                  2,450
                </p>
                <p className="text-[13px] text-slate-400">Calories</p>
              </div>
              <div className="rounded-xl border border-[#1F1F23] bg-[#161618]/85 px-4 py-3 text-center">
                <p className="font-heading text-[30px] font-bold text-white">
                  14
                </p>
                <p className="text-[13px] text-slate-400">Day Streak</p>
              </div>
              <div className="rounded-xl border border-[#1F1F23] bg-[#161618]/85 px-4 py-3 text-center">
                <p className="font-heading text-[30px] font-bold text-emerald-400">
                  +18%
                </p>
                <p className="text-[13px] text-slate-400">This Week</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-[390px] justify-center px-6 pb-10 pt-6 md:max-w-[768px] md:px-8 md:pb-12 md:pt-8">
          <div className="w-full rounded-none bg-transparent md:max-w-[528px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
