"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import type { NutritionRecipe } from "../types";

const TYPES = ["all", "breakfast", "lunch", "dinner", "snack"] as const;
const LOADING_KEYS = ["a", "b", "c", "d"] as const;

export function RecipesPanel({
  recipes,
  loading,
  errorMessage,
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  onViewRecipe,
}: {
  recipes: NutritionRecipe[];
  loading: boolean;
  errorMessage: string | null;
  search: string;
  onSearchChange: (v: string) => void;
  typeFilter: string;
  onTypeFilterChange: (v: string) => void;
  onViewRecipe: (r: NutritionRecipe) => void;
}) {
  return (
    <section className="rounded-2xl border border-border/60 bg-card/60 p-4 lg:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search recipes..."
            aria-label="Search recipes"
          />
        </div>
        <div className="flex-1 sm:max-w-[220px]">
          <Select
            value={typeFilter || "all"}
            onValueChange={(v) => onTypeFilterChange(v === "all" ? "" : v)}
          >
            <SelectTrigger aria-label="Filter by meal type">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t === "all" ? "All meal types" : t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {loading ? (
          LOADING_KEYS.map((k) => (
            <div
              key={k}
              className="rounded-2xl border border-border/60 bg-card/60 p-3"
            >
              <Skeleton className="h-24 w-full rounded-xl" />
              <div className="mt-3">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="mt-2 h-3 w-full" />
                <Skeleton className="mt-4 h-9 w-full" />
              </div>
            </div>
          ))
        ) : errorMessage ? (
          <p className="col-span-full text-sm text-destructive">
            {errorMessage}
          </p>
        ) : recipes.length === 0 ? (
          <p className="col-span-full text-sm text-muted-foreground">
            No recipes found. Try a different search.
          </p>
        ) : (
          recipes.map((r) => (
            <article
              key={`${r.name}-${r.mealType}`}
              className="rounded-2xl border border-border/60 bg-card/60 p-4"
            >
              <div
                className="aspect-[4/3] w-full rounded-xl bg-secondary/30"
                aria-hidden
              />
              <h3 className="mt-3 truncate font-heading text-sm font-semibold">
                {r.name}
              </h3>
              <p className="mt-1 text-[12px] text-muted-foreground">
                {r.mealType} · Prep {r.prepTime}m · Cook {r.cookTime}m
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-4 w-full"
                onClick={() => onViewRecipe(r)}
              >
                View Recipe
              </Button>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
