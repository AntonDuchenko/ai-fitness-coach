import { expect, test } from "@playwright/test";

test.describe("Progress page — visual regression", () => {
  test("progress page renders loading state then resolves", async ({
    page,
  }) => {
    await page.goto("/dashboard/progress");
    await page.waitForLoadState("networkidle");

    const body = page.locator("body");
    await expect(body).toBeVisible();

    await expect(page).toHaveScreenshot("progress-page.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
    });
  });
});
