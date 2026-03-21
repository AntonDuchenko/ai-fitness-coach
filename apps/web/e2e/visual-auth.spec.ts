import { expect, test } from "@playwright/test";

test.describe("Auth pages — visual regression", () => {
  test("login page renders correctly", async ({ page }) => {
    await page.goto("/login");
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { name: /welcome back/i })).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign In", exact: true })).toBeVisible();

    await expect(page).toHaveScreenshot("login-page.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
    });
  });

  test("signup page renders correctly", async ({ page }) => {
    await page.goto("/signup");
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { name: /create an account/i })).toBeVisible();
    await expect(page.locator("#name")).toBeVisible();
    await expect(page.locator("#signup-email")).toBeVisible();
    await expect(page.locator("#signup-password")).toBeVisible();
    await expect(page.locator("#confirm-password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Create Account", exact: true })).toBeVisible();

    await expect(page).toHaveScreenshot("signup-page.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
    });
  });

  test("signup page — password strength indicator", async ({ page }) => {
    await page.goto("/signup");
    await page.waitForLoadState("networkidle");

    // Wait for React hydration — the page is statically pre-rendered,
    // so we need to wait until client JS is loaded and event handlers are attached.
    await page.waitForFunction(() => {
      const input = document.querySelector("#signup-password");
      return input && input.getAttribute("data-slot") === "input";
    });
    // Extra wait for React event handler attachment after hydration
    await page.waitForTimeout(500);

    const passwordInput = page.locator("#signup-password");
    await passwordInput.focus();
    await passwordInput.fill("Test1234");

    await expect(page.getByText("At least 8 characters")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("Contains uppercase letter")).toBeVisible();
    await expect(page.getByText("Contains a number")).toBeVisible();
    await expect(page.getByText("Contains special character")).toBeVisible();

    await expect(page).toHaveScreenshot("signup-password-strength.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
    });
  });

  test("login page — validation errors", async ({ page }) => {
    await page.goto("/login");
    await page.waitForLoadState("networkidle");

    // Wait for React hydration — type and clear to force React to attach handlers
    await page.waitForFunction(() => {
      const input = document.querySelector("#email");
      return input && input.getAttribute("data-slot") === "input";
    });
    await page.waitForTimeout(1000);

    // Type and clear to ensure React onChange is wired up
    const emailInput = page.locator("#email");
    await emailInput.fill("x");
    await emailInput.fill("");

    await page.getByRole("button", { name: "Sign In", exact: true }).click();

    await expect(page.getByText(/valid email/i)).toBeVisible({ timeout: 10000 });

    await expect(page).toHaveScreenshot("login-validation-errors.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
    });
  });

  test("login page — navigate to signup", async ({ page }) => {
    await page.goto("/login");
    await page.waitForLoadState("networkidle");

    await page.getByRole("link", { name: /sign up/i }).click();
    await page.waitForURL("/signup");

    await expect(page.getByRole("heading", { name: /create an account/i })).toBeVisible();
  });

  test("signup page — navigate to login", async ({ page }) => {
    await page.goto("/signup");
    await page.waitForLoadState("networkidle");

    await page.getByRole("link", { name: /sign in/i }).click();
    await page.waitForURL("/login");

    await expect(page.getByRole("heading", { name: /welcome back/i })).toBeVisible();
  });
});
