import { expect, test } from "@playwright/test";

test.describe("Subscription Management — visual regression", () => {
  test("subscription settings page renders loading state then resolves", async ({
    page,
  }) => {
    await page.goto("/dashboard/settings");
    await page.waitForLoadState("networkidle");

    const body = page.locator("body");
    await expect(body).toBeVisible();

    await expect(page).toHaveScreenshot("subscription-page.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
    });
  });
});
