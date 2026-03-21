"use client";

import { Apple } from "lucide-react";

export function SocialButtons() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[#1F1F23]" />
        <span className="text-xs text-muted-foreground">or continue with</span>
        <div className="h-px flex-1 bg-[#1F1F23]" />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          disabled
          className="flex flex-1 items-center justify-center gap-2 rounded-[10px] border border-[#1F1F23] bg-[#1F2937] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1F2937]/80 disabled:opacity-60"
          aria-label="Sign in with Google"
        >
          <span className="text-base font-bold">G</span>
          Google
        </button>
        <button
          type="button"
          disabled
          className="flex flex-1 items-center justify-center gap-2 rounded-[10px] border border-[#1F1F23] bg-[#161618] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#161618]/80 disabled:opacity-60"
          aria-label="Sign in with Apple"
        >
          <Apple className="size-[18px]" />
          Apple
        </button>
      </div>
    </div>
  );
}
