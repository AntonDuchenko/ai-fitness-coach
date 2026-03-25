"use client";

import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/features/landing/components/AnimatedSection";
import { heroAvatars, heroImage } from "@/features/landing/constants";
import { Users, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <header className="relative flex min-h-[calc(100vh-64px)] items-center overflow-hidden bg-background px-6 pb-20 pt-12 md:px-8 md:pt-16">
      {/* Blue glow background */}
      <div className="pointer-events-none absolute left-1/2 top-0 size-[300px] -translate-x-1/2 rounded-full bg-primary/15 blur-[100px] md:left-1/4 md:top-1/4 md:size-[500px] md:-translate-y-1/2" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 md:gap-16 md:grid-cols-2">
        <AnimatedSection>
          <div className="text-center md:text-left">
            <div className="mb-6 hidden items-center gap-2 rounded-full bg-card px-3 py-1 md:inline-flex">
              <span className="size-2 rounded-full bg-success" />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Voted #1 Fitness App of 2024
              </span>
            </div>

            <h1 className="mb-6 font-heading text-4xl font-extrabold leading-[1.1] text-white md:text-7xl">
              Get in the{" "}
              <span className="text-primary">Best Shape</span> of Your Life
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-muted-foreground md:mb-10 md:max-w-lg md:text-xl">
              Personalized coaching powered by AI that evolves with you. No generic
              templates, just science-backed results for your unique body.
            </p>

            <div className="mb-8 flex flex-col gap-4 md:mb-12 md:flex-row">
              <Button asChild className="h-14 rounded-xl text-lg font-bold md:h-auto md:px-8 md:py-4">
                <Link href="/signup">Start Your Transformation</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-14 rounded-xl text-lg font-bold md:h-auto md:px-8 md:py-4"
              >
                <Link href="#testimonials">View Our Programs</Link>
              </Button>
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <div className="flex -space-x-3">
                {heroAvatars.map((avatar) => (
                  <Image
                    key={avatar.alt}
                    src={avatar.src}
                    alt={avatar.alt}
                    width={40}
                    height={40}
                    unoptimized
                    className="size-10 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Joined by{" "}
                <span className="font-bold text-white">15,000+ athletes</span>{" "}
                this month
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="relative">
          <div className="pointer-events-none absolute -inset-4 hidden rounded-full bg-primary/10 blur-3xl transition-all duration-700 group-hover:bg-primary/20 md:block" />

          <div className="relative overflow-hidden rounded-3xl shadow-2xl md:rounded-[2.5rem]">
            <Image
              src={heroImage}
              alt="Confident fitness professional in a modern gym"
              width={640}
              height={800}
              unoptimized
              className="relative z-10 aspect-[4/5] w-full object-cover md:aspect-auto md:h-[600px]"
              priority
            />

            {/* Mobile floating stats overlay */}
            <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col gap-3 md:hidden">
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary">
                  <Users className="size-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">15K+ Members</p>
                  <p className="text-xs text-white/60">Active community</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div className="flex size-10 items-center justify-center rounded-full bg-success">
                  <Star className="size-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">4.8 Rating</p>
                  <p className="text-xs text-white/60">Trustpilot verified</p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop floating stat: Active Members */}
          <div className="absolute -left-8 top-10 z-20 hidden rounded-2xl border border-white/5 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl md:block">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/20 p-2 text-primary">
                <Users className="size-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">15,000+</p>
                <p className="text-xs font-medium text-muted-foreground">
                  Active Members
                </p>
              </div>
            </div>
          </div>

          {/* Desktop floating stat: User Rating */}
          <div className="absolute -right-8 bottom-10 z-20 hidden rounded-2xl border border-white/5 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl md:block">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/20 p-2 text-success">
                <Star className="size-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">4.8★</p>
                <p className="text-xs font-medium text-muted-foreground">
                  User Rating
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </header>
  );
}
