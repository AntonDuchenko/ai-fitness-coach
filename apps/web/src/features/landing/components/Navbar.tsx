"use client";

import { BrandLogo } from "@/components/common/BrandLogo";
import { Button } from "@/components/ui/button";
import { navItems } from "@/features/landing/constants";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const sectionIds: Record<string, string> = {
  Features: "features",
  "How It Works": "how-it-works",
  Pricing: "pricing",
};

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const scrollTo = (item: string) => {
    const id = sectionIds[item];
    if (id) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const handleScroll = useCallback(() => {
    const scrollContainer = document.querySelector("main");
    if (!scrollContainer) return;
    const scrollY = scrollContainer.scrollTop;
    let current: string | null = null;
    for (const item of navItems) {
      const id = sectionIds[item];
      if (!id) continue;
      const el = document.getElementById(id);
      if (el && el.offsetTop - 120 <= scrollY) {
        current = item;
      }
    }
    setActiveItem(current);
  }, []);

  useEffect(() => {
    const scrollContainer = document.querySelector("main");
    if (!scrollContainer) return;
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-xl"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <BrandLogo size={28} />
          <span className="text-2xl font-black tracking-tight text-white">
            ForgeFit
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => scrollTo(item)}
              className={cn(
                "cursor-pointer pb-1 text-sm transition-colors",
                activeItem === item
                  ? "border-b-2 border-primary font-semibold text-primary"
                  : "text-muted-foreground hover:text-white",
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden text-sm text-muted-foreground transition-colors hover:text-white sm:inline"
          >
            Log In
          </Link>
          <Button
            asChild
            className="rounded-full bg-primary font-bold text-background hover:scale-105 active:scale-95 md:rounded-xl"
          >
            <Link href="/signup">
              <span className="md:hidden">Join Now</span>
              <span className="hidden md:inline">Start Free Trial</span>
            </Link>
          </Button>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-64" : "max-h-0",
        )}
      >
        <div className="flex flex-col gap-4 px-8 pb-6">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => scrollTo(item)}
              className={cn(
                "text-left text-sm transition-colors",
                activeItem === item
                  ? "font-semibold text-primary"
                  : "text-muted-foreground hover:text-white",
              )}
            >
              {item}
            </button>
          ))}
          <Link
            href="/login"
            className="text-sm text-muted-foreground transition-colors hover:text-white"
          >
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
}
