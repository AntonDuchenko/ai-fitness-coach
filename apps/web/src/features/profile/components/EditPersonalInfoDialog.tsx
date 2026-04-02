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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import type { ProfileData } from "../types";

interface EditPersonalInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: ProfileData;
  onSave: (data: Partial<ProfileData>) => void;
  isPending: boolean;
}

const GENDERS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "not_specified", label: "Prefer not to say" },
];

export function EditPersonalInfoDialog({
  open,
  onOpenChange,
  profile,
  onSave,
  isPending,
}: EditPersonalInfoDialogProps) {
  const [age, setAge] = useState(String(profile.age));
  const [gender, setGender] = useState(profile.gender);
  const [height, setHeight] = useState(String(profile.height));
  const [weight, setWeight] = useState(String(profile.weight));
  const [targetWeight, setTargetWeight] = useState(
    profile.targetWeight ? String(profile.targetWeight) : "",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      age: Number(age),
      gender,
      height: Number(height),
      weight: Number(weight),
      targetWeight: targetWeight ? Number(targetWeight) : undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Personal Information</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-age">Age</Label>
              <Input
                id="edit-age"
                type="number"
                min={16}
                max={80}
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-gender">Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger id="edit-gender">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GENDERS.map((g) => (
                    <SelectItem key={g.value} value={g.value}>
                      {g.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-height">Height (cm)</Label>
              <Input
                id="edit-height"
                type="number"
                min={100}
                max={250}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-weight">Weight (kg)</Label>
              <Input
                id="edit-weight"
                type="number"
                min={30}
                max={300}
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-target-weight">Target Weight (kg)</Label>
            <Input
              id="edit-target-weight"
              type="number"
              min={30}
              max={300}
              step="0.1"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
              placeholder="Optional"
            />
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
