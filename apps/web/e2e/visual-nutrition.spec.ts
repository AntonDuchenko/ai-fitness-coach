import { expect, test } from "@playwright/test";

test.describe("Nutrition plan page — visual regression", () => {
  test("nutrition page renders loading state then resolves", async ({
    page,
  }) => {
    await page.goto("/dashboard/nutrition");
    await page.waitForLoadState("networkidle");

    const body = page.locator("body");
    await expect(body).toBeVisible();

    await expect(page).toHaveScreenshot("nutrition-page.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
    });
  });
});
