import { test, expect } from "@playwright/test";

test.describe("Cammino Issues Verification Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("Issue 1: Always Free Delivery on entire website", async ({ page }) => {
    // 1. Check footer mentions Free delivery
    const footer = page.locator("footer");
    await expect(footer).toContainText("100% Free Pan-India");

    // 2. Add an item (A4 for ₹49) to cart from shop page
    await page.goto("http://localhost:3000/shop");
    const addToCartBtn = page.locator("[id^='add-to-cart-btn-']").first();
    await addToCartBtn.click();

    // 3. MiniCart shows 100% Free Delivery
    const cartDrawer = page.locator("[aria-label='Shopping Cart Drawer']");
    await expect(cartDrawer).toBeVisible({ timeout: 5000 });
    await expect(cartDrawer).toContainText("100% Free Delivery on All Orders across India");
    await expect(cartDrawer).toContainText("Free express courier delivery");

    // 4. View Cart page
    await page.goto("http://localhost:3000/cart");
    await expect(page.locator("text=100% Free Express Courier Delivery on All Orders")).toBeVisible();
    await expect(page.locator("text=FREE").first()).toBeVisible();
    // Progress bar threshold should not exist
    await expect(page.locator("text=more of posters to unlock Free Delivery")).toHaveCount(0);

    // 5. Check shipping policy page
    await page.goto("http://localhost:3000/shipping");
    await expect(page.locator("text=100% Free Express Courier Delivery on ALL orders")).toBeVisible();
    const shippingBody = await page.innerText("body");
    expect(shippingBody).not.toContain("₹49");
    expect(shippingBody).not.toContain("₹699");
  });

  test("Issue 2: Navbar top-right has NO search bar (only Login & Cart)", async ({ page }) => {
    // 1. Search button must not exist
    const searchBtn = page.locator("#header-search-btn");
    await expect(searchBtn).toHaveCount(0);

    const searchInput = page.locator("#header-search-input");
    await expect(searchInput).toHaveCount(0);

    // 2. Login button is visible
    const loginBtn = page.locator("#header-login-btn");
    await expect(loginBtn).toBeVisible();
    await expect(loginBtn).toHaveAttribute("href", "/login");

    // 3. Cart button is visible
    const cartBtn = page.locator("#header-cart-btn");
    await expect(cartBtn).toBeVisible();
  });

  test("Issue 3: No OTP validation and no test hints on Signup or Checkout", async ({ page }) => {
    // 1. Go to signup page
    await page.goto("http://localhost:3000/signup");

    // 2. Check no OTP inputs or send OTP buttons
    await expect(page.locator("#otp")).toHaveCount(0);
    await expect(page.locator("button:has-text('Send OTP')")).toHaveCount(0);
    await expect(page.locator("button:has-text('Verify')")).toHaveCount(0);

    // 3. Check no test hints
    const pageText = await page.innerText("body");
    expect(pageText).not.toContain("Test Hint");
    expect(pageText).not.toContain("demo");

    // 4. Verify fields exist: Name, Email, Phone, Password, Confirm Password, Create Account
    await expect(page.locator("#name")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#phone")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.locator("#confirmPassword")).toBeVisible();
    await expect(page.locator("#signup-submit-btn")).toBeVisible();

    // 5. Check Checkout page doesn't mention Delivery OTP
    await page.goto("http://localhost:3000/checkout");
    const checkoutBody = await page.innerText("body");
    expect(checkoutBody).not.toContain("Delivery OTP");
  });

  test("Issue 4: Only Gloss finish available (No Matte finish)", async ({ page }) => {
    // 1. Check product detail view
    await page.goto("http://localhost:3000/product/sports-cr7-aerial-elevation-flight-1");
    await expect(page.locator("text=Premium Vibrant Gloss Finish")).toBeVisible();
    await expect(page.locator("text=Velvet Matte")).toHaveCount(0);
    await expect(page.locator("button:has-text('Matte')")).toHaveCount(0);

    // 2. Check custom poster creator
    await page.goto("http://localhost:3000/custom");
    // Pick first template
    const sample1Btn = page.locator("#sample-artwork-btn-ronin");
    await sample1Btn.click();

    // Go to Step 2 -> Step 3
    await page.locator("#step2-next-btn").click();
    const step3Heading = page.locator("text=Finish, Borders & Custom Caption");
    await expect(step3Heading).toBeVisible({ timeout: 5000 });

    // Step 3 displays Premium Vibrant Gloss without Matte button
    await expect(page.locator("text=Premium Vibrant Gloss")).toBeVisible();
    await expect(page.locator("button:has-text('Velvet Matte')")).toHaveCount(0);

    // 3. Check FAQ page
    await page.goto("http://localhost:3000/faq");
    const faqBody = await page.innerText("body");
    expect(faqBody).not.toContain("Velvet Matte");
  });

  test("End-to-End Order Placement with Free Delivery and Gloss Finish", async ({ page }) => {
    // 1. Sign in
    await page.goto("http://localhost:3000/login");
    await page.fill("#email", "anmolagarwal0904@gmail.com");
    await page.fill("#password", "Cammino@2026!");
    await page.click("button[type='submit']");
    await page.waitForTimeout(1000);

    // 2. Go to shop and add A4 poster to cart
    await page.goto("http://localhost:3000/shop");
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

    // Verify shipping fee is FREE
    await expect(page.locator("text=Shipping Fee").locator("..")).toContainText("FREE");

    // 5. Submit COD Order
    const placeOrderBtn = page.locator("#checkout-place-order-btn");
    await expect(placeOrderBtn).toBeVisible();
    await placeOrderBtn.click();

    // 6. Verify redirected to Order Success page
    await expect(page).toHaveURL(/order\/.*\/success/, { timeout: 10000 });
    const successMsg = page.getByRole("heading", { name: "Thank you! Your order is placed." });
    await expect(successMsg).toBeVisible();
  });
});
