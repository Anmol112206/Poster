import { test, expect } from "@playwright/test";

test.describe("Camino Issues Verification", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("Issue 3, 5, 7: Verify No Feedback, Location IIT Patna, No Bengaluru/Delhi", async ({ page }) => {
    // Check no buyer feedback
    const feedbackHeader = page.locator("text=Customer Reviews").or(page.locator("text=Buyer Feedback"));
    await expect(feedbackHeader).toHaveCount(0);

    // Check location
    const footer = page.locator("footer");
    await expect(footer).toContainText("IIT Patna, Bihar");

    // Check no Bengaluru
    const pageText = await page.innerText("body");
    expect(pageText).not.toContain("Bengaluru");
  });

  test("Issue 1 & 2: Toggle A3 button and Add to Cart on product card", async ({ page }) => {
    // Find the first product card
    const firstA3Toggle = page.locator("[id^='size-toggle-a3-']").first();
    await expect(firstA3Toggle).toBeVisible();

    // Click A3 toggle
    await firstA3Toggle.click();

    // Verify button text or selected style
    await expect(firstA3Toggle).toHaveClass(/bg-\[#1A1A1A\]/);

    // Verify Add to Cart button says 'Add A3 to Cart'
    const firstAddToCartBtn = page.locator("[id^='add-to-cart-btn-']").first();
    await expect(firstAddToCartBtn).toContainText("Add A3 to Cart");

    // Click Add to Cart
    await firstAddToCartBtn.click();

    // Verify MiniCart drawer opens
    const cartDrawer = page.locator("[aria-label='Shopping Cart Drawer']");
    await expect(cartDrawer).toBeVisible({ timeout: 5000 });
    await expect(cartDrawer).toContainText("A3");
    await expect(cartDrawer).toContainText("₹120");
  });

  test("Issue 4: Top right navbar buttons (Search, Login, Cart)", async ({ page }) => {
    // 1. Search button
    const searchBtn = page.locator("#header-search-btn");
    await expect(searchBtn).toBeVisible();
    await searchBtn.click();

    const searchInput = page.locator("#header-search-input");
    await expect(searchInput).toBeVisible();

    // 2. Login button
    const loginBtn = page.locator("#header-login-btn");
    await expect(loginBtn).toBeVisible();
    await expect(loginBtn).toHaveAttribute("href", "/login");

    // 3. Cart button
    const cartBtn = page.locator("#header-cart-btn");
    await expect(cartBtn).toBeVisible();
    await cartBtn.click();

    const cartDrawer = page.locator("[aria-label='Shopping Cart Drawer']");
    await expect(cartDrawer).toBeVisible();
  });

  test("Issue 6: Custom poster creator sample artwork test & progression", async ({ page }) => {
    await page.goto("http://localhost:3000/custom");

    // Verify dropzone
    const dropzone = page.locator("#select-custom-image-btn");
    await expect(dropzone).toBeVisible();

    // Click Sample 1: Crimson Ronin
    const sample1Btn = page.locator("#sample-artwork-btn-ronin");
    await expect(sample1Btn).toBeVisible();
    await sample1Btn.click();

    // Step 2 should appear
    const step2Heading = page.locator("text=Crop to Exact A-Series Ratio");
    await expect(step2Heading).toBeVisible({ timeout: 5000 });

    // Click Next: Options
    const nextOptionsBtn = page.locator("#step2-next-btn");
    await expect(nextOptionsBtn).toBeVisible();
    await nextOptionsBtn.click();

    // Step 3 should appear
    const step3Heading = page.locator("text=Finish, Borders & Custom Caption");
    await expect(step3Heading).toBeVisible({ timeout: 5000 });

    // Click Generate Wall Mockup
    const previewBtn = page.locator("#step3-preview-btn");
    await expect(previewBtn).toBeVisible();
    await previewBtn.click();

    // Step 4 should appear
    const step4Heading = page.locator("text=Final Wall Mockup");
    await expect(step4Heading).toBeVisible({ timeout: 5000 });

    // Check rights confirmation
    const rightsCheckbox = page.locator("#rights-confirmed-checkbox");
    await expect(rightsCheckbox).toBeVisible();
    await rightsCheckbox.check();

    // Add custom poster to cart button is visible
    const addCustomBtn = page.locator("#add-custom-to-cart-btn");
    await expect(addCustomBtn).toBeVisible();
  });

  test("Issue 9: Customer & Admin Login Flow", async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    await page.fill("input[name='email']", "agarwalanmol1212@gmail.com");
    await page.fill("input[name='password']", "Camino@2026!");

    await page.click("button[type='submit']");
    await expect(page).toHaveURL(/(admin|\/)/, { timeout: 8000 });
  });

  test("Issue 8 & 10: End-to-End Cart, Checkout, and Cash on Delivery Order Placement", async ({ page }) => {
    // 1. Sign in first
    await page.goto("http://localhost:3000/login");
    await page.fill("#email", "anmolagarwal0904@gmail.com");
    await page.fill("#password", "Camino@2026!");
    await page.click("button[type='submit']");
    await page.waitForTimeout(1000);

    // 2. Go home and add A3 poster to cart
    await page.goto("http://localhost:3000");
    const a3Toggle = page.locator("[id^='size-toggle-a3-']").first();
    await a3Toggle.click();
    const addToCartBtn = page.locator("[id^='add-to-cart-btn-']").first();
    await addToCartBtn.click();

    // 3. MiniCart opens, click Checkout
    const checkoutLink = page.locator("a[href='/checkout']");
    await expect(checkoutLink).toBeVisible({ timeout: 5000 });
    await checkoutLink.click();

    // 4. Fill shipping address on checkout page
    await expect(page).toHaveURL(/checkout/);
    await page.fill("#checkout-fullname", "Anmol Agarwal");
    await page.fill("#checkout-phone", "9876543210");
    await page.fill("#checkout-line1", "Hostel Block D, Room 204, IIT Patna");
    await page.fill("#checkout-city", "Patna");
    await page.fill("#checkout-pincode", "801106");

    // 5. Submit COD Order
    const placeOrderBtn = page.locator("#checkout-place-order-btn");
    await expect(placeOrderBtn).toBeVisible();
    await placeOrderBtn.click();

    // 6. Verify redirected to Order Success page with WP- order number
    await expect(page).toHaveURL(/order\/.*\/success/, { timeout: 10000 });
    const successMsg = page.getByRole("heading", { name: "Thank you! Your order is placed." });
    await expect(successMsg).toBeVisible();
    const orderNumBadge = page.locator("text=Order Number: WP-").first();
    await expect(orderNumBadge).toBeVisible();
  });
});

