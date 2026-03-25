"use client";

import { BrandLogo } from "@/components/common/BrandLogo";
import { Button } from "@/components/ui/button";
import { navItems } from "@/features/landing/constants";
import Link from "next/link";

const sectionIds: Record<string, string> = {
  Features: "features",
  "How It Works": "how-it-works",
  Pricing: "pricing",
};

export function Navbar() {
  const scrollTo = (item: string) => {
    const id = sectionIds[item];
    if (id) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b border-border/30 bg-black/90 backdrop-blur-md"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <div className="flex items-center gap-2">
          <BrandLogo size={32} />
          <p className="font-heading text-lg font-bold text-white">
            ForgeFit
          </p>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => scrollTo(item)}
              className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm text-muted-foreground transition-colors hover:text-white sm:inline"
          >
            Log In
          </Link>
          <Button asChild>
            <Link href="/signup">Start Free Trial</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
