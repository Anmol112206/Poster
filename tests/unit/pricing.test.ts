import { describe, it, expect } from "vitest";
import { calculateCart, FREE_SHIPPING_THRESHOLD_PAISE, FLAT_SHIPPING_PAISE } from "@/lib/pricing";

describe("Pricing and Cart Engine", () => {
  it("always provides free shipping for single item in paise", () => {
    const result = calculateCart({
      items: [{ pricePaise: 7000, quantity: 2 }], // 2 x ₹70 = ₹140
      paymentMethod: "COD",
    });

    expect(result.subtotalPaise).toBe(14000);
    expect(result.shippingPaise).toBe(0); // Always free delivery
    expect(result.totalPaise).toBe(14000);
  });

  it("always provides free shipping regardless of order amount", () => {
    const result = calculateCart({
      items: [{ pricePaise: 7000, quantity: 1 }], // 1 x A4 = ₹70
      paymentMethod: "COD",
    });

    expect(result.subtotalPaise).toBe(7000);
    expect(result.shippingPaise).toBe(0);
    expect(result.freeShippingRemainingPaise).toBe(0);
    expect(result.totalPaise).toBe(7000);
  });

  it("handles empty cart safely", () => {
    const result = calculateCart({
      items: [],
      paymentMethod: "COD",
    });

    expect(result.subtotalPaise).toBe(0);
    expect(result.shippingPaise).toBe(0);
    expect(result.totalPaise).toBe(0);
  });
});
