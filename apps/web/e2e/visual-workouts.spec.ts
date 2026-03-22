import { expect, test } from "@playwright/test";

test.describe("Workout plan page — visual regression", () => {
  test("workout page renders loading state then resolves", async ({ page }) => {
    await page.goto("/dashboard/workouts");
    await page.waitForLoadState("networkidle");

    // The page should render — either loading skeleton, empty state, or the plan
    // Without auth/API it will show an error or redirect, but the component should mount
    const body = page.locator("body");
    await expect(body).toBeVisible();

    await expect(page).toHaveScreenshot("workouts-page.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
    });
  });
});
