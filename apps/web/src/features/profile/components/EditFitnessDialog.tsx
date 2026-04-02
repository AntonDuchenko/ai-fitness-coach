"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import type { ProfileData } from "../types";

interface EditFitnessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: ProfileData;
  onSave: (data: Partial<ProfileData>) => void;
  isPending: boolean;
}

const GOALS = [
  { value: "weight_loss", label: "Weight Loss" },
  { value: "muscle_gain", label: "Muscle Gain" },
  { value: "recomp", label: "Body Recomposition" },
  { value: "health", label: "General Health" },
  { value: "performance", label: "Performance" },
];

const LEVELS = [
  { value: "complete_beginner", label: "Complete Beginner" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const TIMES = [
  { value: "morning", label: "Morning" },
  { value: "midday", label: "Midday" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
  { value: "flexible", label: "Flexible" },
];

const EQUIPMENT_OPTIONS = [
  "barbell",
  "dumbbells",
  "pull_up_bar",
  "kettlebell",
  "resistance_bands",
  "cables",
  "machines",
  "bodyweight",
];

function formatLabel(value: string): string {
  return value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function EditFitnessDialog({
  open,
  onOpenChange,
  profile,
  onSave,
  isPending,
}: EditFitnessDialogProps) {
  const [goal, setGoal] = useState(profile.primaryGoal);
  const [level, setLevel] = useState(profile.fitnessLevel);
  const [days, setDays] = useState(String(profile.trainingDaysPerWeek));
  const [duration, setDuration] = useState(String(profile.sessionDuration));
  const [time, setTime] = useState(profile.preferredTime);
  const [equipment, setEquipment] = useState<string[]>(profile.equipment);

  const toggleEquipment = (item: string) => {
    setEquipment((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      primaryGoal: goal,
      fitnessLevel: level,
      trainingDaysPerWeek: Number(days),
      sessionDuration: Number(duration),
      preferredTime: time,
      equipment,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Fitness Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-goal">Primary Goal</Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger id="edit-goal">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GOALS.map((g) => (
                  <SelectItem key={g.value} value={g.value}>
                    {g.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-level">Experience Level</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger id="edit-level">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LEVELS.map((l) => (
                  <SelectItem key={l.value} value={l.value}>
                    {l.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-days">Days/Week</Label>
              <Input
                id="edit-days"
                type="number"
                min={1}
                max={7}
                value={days}
                onChange={(e) => setDays(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-duration">Duration (min)</Label>
              <Input
                id="edit-duration"
                type="number"
                min={15}
                max={180}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-time">Preferred Time</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger id="edit-time">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIMES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Equipment</Label>
            <div className="grid grid-cols-2 gap-2">
              {EQUIPMENT_OPTIONS.map((item) => (
                <label
                  key={item}
                  htmlFor={`equip-${item}`}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-border p-2 text-sm transition-colors hover:bg-secondary"
                >
                  <Checkbox
                    id={`equip-${item}`}
                    checked={equipment.includes(item)}
                    onCheckedChange={() => toggleEquipment(item)}
                  />
                  {formatLabel(item)}
                </label>
              ))}
            </div>
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
