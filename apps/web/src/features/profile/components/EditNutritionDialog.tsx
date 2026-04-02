"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import type { ProfileData } from "../types";

interface EditNutritionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: ProfileData;
  onSave: (data: Partial<ProfileData>) => void;
  isPending: boolean;
}

export function EditNutritionDialog({
  open,
  onOpenChange,
  profile,
  onSave,
  isPending,
}: EditNutritionDialogProps) {
  const [mealsPerDay, setMealsPerDay] = useState(String(profile.mealsPerDay));
  const [foodBudget, setFoodBudget] = useState(String(profile.foodBudget));
  const [cuisines, setCuisines] = useState(
    profile.cuisinePreferences.join(", "),
  );
  const [restrictions, setRestrictions] = useState(
    profile.dietaryRestrictions.join(", "),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      mealsPerDay: Number(mealsPerDay),
      foodBudget: Number(foodBudget),
      cuisinePreferences: cuisines
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean),
      dietaryRestrictions: restrictions
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Nutrition Preferences</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-meals">Meals per Day</Label>
              <Input
                id="edit-meals"
                type="number"
                min={2}
                max={6}
                value={mealsPerDay}
                onChange={(e) => setMealsPerDay(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-budget">Budget ($/day)</Label>
              <Input
                id="edit-budget"
                type="number"
                min={0}
                step="1"
                value={foodBudget}
                onChange={(e) => setFoodBudget(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-cuisines">Cuisine Preferences</Label>
            <Input
              id="edit-cuisines"
              value={cuisines}
              onChange={(e) => setCuisines(e.target.value)}
              placeholder="e.g. mediterranean, asian"
            />
            <p className="text-xs text-muted-foreground">
              Comma-separated list
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-restrictions">Dietary Restrictions</Label>
            <Input
              id="edit-restrictions"
              value={restrictions}
              onChange={(e) => setRestrictions(e.target.value)}
              placeholder="e.g. lactose intolerant, gluten free"
            />
            <p className="text-xs text-muted-foreground">
              Comma-separated list
            </p>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
