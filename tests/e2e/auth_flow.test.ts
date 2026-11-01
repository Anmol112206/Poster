import { test, expect } from "@playwright/test";

test.describe("Authentication Live Flow (Signup & Login)", () => {
  const timestamp = Date.now();
  const newEmail = `user_${timestamp}@example.com`;
  const newPassword = "Password@2026";
  const newPhone = `9${Math.floor(100000000 + Math.random() * 900000000)}`;
  const newName = "Rahul Sharma";

  test("1. User Signup Flow through UI", async ({ page }) => {
    await page.goto("http://localhost:3000/signup");

    // Check heading
    await expect(page.locator("h2")).toContainText("Create an account");

    // Fill the signup form
    await page.fill("#name", newName);
    await page.fill("#email", newEmail);
    await page.fill("#phone", newPhone);
    await page.fill("#password", newPassword);
    await page.fill("#confirmPassword", newPassword);

    // Submit form
    await page.click("#signup-submit-btn");

    // Expect redirect to account/orders or login
    await expect(page).toHaveURL(/\/(account\/orders|login)/, { timeout: 20000 });
  });

  test("2. Seeded Customer Login Flow through UI", async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    await expect(page.locator("h2")).toContainText("Sign in to your account");

    // Fill valid credentials
    await page.fill("#email", "anmolagarwal0904@gmail.com");
    await page.fill("#password", "Cammino@2026!");

    await page.click("button[type='submit']");

    // Redirected to orders/account
    await expect(page).toHaveURL(/account\/orders/, { timeout: 15000 });
    await expect(page.locator("body")).toContainText("My Orders");
  });

  test("3. Invalid Login Rejection through UI", async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    await page.fill("#email", "anmolagarwal0904@gmail.com");
    await page.fill("#password", "WrongPassword123!");

    await page.click("button[type='submit']");

    // Expect error message visible on page (banner or toast)
    await expect(page.locator("text=Incorrect email or password").first()).toBeVisible({ timeout: 10000 });
  });

  test("4. Admin Login and Access to Admin Dashboard", async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("http://localhost:3000/login?callbackUrl=/admin/products");

    await page.fill("#email", "agarwalanmol1212@gmail.com");
    await page.fill("#password", "Cammino@2026!");

    await page.click("button[type='submit']");

    // Redirected to admin/products
    await expect(page).toHaveURL(/admin\/products/, { timeout: 15000 });
    await expect(page.locator("body")).toContainText("Catalog Management");
  });
});
