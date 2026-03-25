"use client";

import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const main = document.querySelector("main");
    if (!main) return;
    setVisible(main.scrollTop > 500);
  }, []);

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    main.addEventListener("scroll", handleScroll, { passive: true });
    return () => main.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-slate-900/80 text-white backdrop-blur-sm shadow-lg shadow-black/25 transition-all duration-300 hover:scale-110 hover:bg-slate-900 active:scale-95",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
