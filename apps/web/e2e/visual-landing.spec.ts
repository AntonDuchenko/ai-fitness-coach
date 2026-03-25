import { expect, test } from "@playwright/test";

async function triggerAllAnimations(page: import("@playwright/test").Page) {
  await page.evaluate(async () => {
    const main = document.querySelector("main");
    if (!main) return;
    const step = 400;
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    for (let y = 0; y < main.scrollHeight; y += step) {
      main.scrollTo(0, y);
      await delay(150);
    }
    main.scrollTo(0, main.scrollHeight);
    await delay(600);
    main.scrollTo(0, 0);
    await delay(400);
  });
}

async function unlockFullPageCapture(page: import("@playwright/test").Page) {
  await page.evaluate(() => {
    document.documentElement.style.cssText =
      "height:auto!important;overflow:visible!important";
    document.body.style.cssText =
      "height:auto!important;overflow:visible!important";
    const main = document.querySelector("main") as HTMLElement;
    if (main)
      main.style.cssText =
        "height:auto!important;overflow:visible!important";
  });
  await page.waitForTimeout(200);
}

test.describe("Landing Page Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await triggerAllAnimations(page);
    await unlockFullPageCapture(page);
  });

  test("full page screenshot", async ({ page }) => {
    await expect(page).toHaveScreenshot("landing-full.png", {
      fullPage: true,
    });
  });

  test("hero section", async ({ page }) => {
    const hero = page.locator("section").first();
    await expect(hero).toBeVisible();
    await expect(hero).toHaveScreenshot("landing-hero.png");
  });

  test("pricing section", async ({ page }) => {
    const pricing = page.locator("#pricing");
    await expect(pricing).toBeVisible();
    await expect(pricing).toHaveScreenshot("landing-pricing.png");
  });
});
