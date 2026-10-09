import type { PrismaService } from "../../prisma/prisma.service";
import { UsersService } from "./users.service";

const service = new UsersService({} as PrismaService);

function dailyTargets(p: {
  gender: string;
  weight: number;
  height: number;
  age: number;
  days: number;
  goal: string;
}) {
  const bmr = service.calculateBMR(p.gender, p.weight, p.height, p.age);
  const tdee = service.calculateTDEE(bmr, p.days);
  const calories = service.getGoalCalories(tdee, p.goal);
  return {
    bmr,
    tdee,
    calories,
    ...service.calculateMacros(p.weight, calories),
  };
}

describe("UsersService calorie math", () => {
  it("computes Mifflin-St Jeor BMR", () => {
    expect(service.calculateBMR("male", 80, 180, 30)).toBe(1780);
    expect(service.calculateBMR("female", 60, 165, 30)).toBeCloseTo(1320.25);
  });

  it.each([
    [0, 1.2],
    [2, 1.375],
    [4, 1.55],
    [6, 1.725],
    [7, 1.9],
  ])("activity multiplier for %i days is %d", (days, mult) => {
    expect(service.getActivityMultiplier(days)).toBe(mult);
  });

  it("applies goal adjustments", () => {
    expect(service.getGoalCalories(2500, "weight_loss")).toBe(2000);
    expect(service.getGoalCalories(2500, "muscle_gain")).toBe(2900);
    expect(service.getGoalCalories(2500, "health")).toBe(2500);
  });

  it("macros add up to target calories for a typical user", () => {
    const t = dailyTargets({
      gender: "male",
      weight: 80,
      height: 180,
      age: 30,
      days: 4,
      goal: "muscle_gain",
    });
    const kcal = t.protein * 4 + t.fat * 9 + t.carbs * 4;
    expect(Math.abs(kcal - t.calories)).toBeLessThan(10);
  });

  // Known product issues — these document current behaviour and will start
  // failing (prompting removal of `.failing`) once the formula is fixed.
  it.failing("never produces negative carbs (heavy user on a cut)", () => {
    const t = dailyTargets({
      gender: "female",
      weight: 120,
      height: 160,
      age: 50,
      days: 1,
      goal: "weight_loss",
    });
    expect(t.carbs).toBeGreaterThanOrEqual(0);
  });

  it.failing("never targets fewer than 1200 kcal", () => {
    const t = dailyTargets({
      gender: "female",
      weight: 45,
      height: 150,
      age: 60,
      days: 0,
      goal: "weight_loss",
    });
    expect(t.calories).toBeGreaterThanOrEqual(1200);
  });
});
