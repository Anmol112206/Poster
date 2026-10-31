import { describe, it, expect } from "vitest";
import { calculateCart, FREE_SHIPPING_THRESHOLD_PAISE, FLAT_SHIPPING_PAISE } from "@/lib/pricing";

describe("Pricing and Cart Engine", () => {
  it("calculates correct subtotal for single item in paise", () => {
    const result = calculateCart({
      items: [{ pricePaise: 7000, quantity: 2 }], // 2 x ₹70 = ₹140
      paymentMethod: "COD",
    });

    expect(result.subtotalPaise).toBe(14000);
    expect(result.shippingPaise).toBe(FLAT_SHIPPING_PAISE); // Below ₹699 -> ₹49 shipping
    expect(result.totalPaise).toBe(14000 + FLAT_SHIPPING_PAISE);
  });

  it("applies free shipping when subtotal reaches or exceeds ₹699 (69900 paise)", () => {
    // 6 x A3 (₹120) = 72000 paise (> 69900)
    const result = calculateCart({
      items: [{ pricePaise: 12000, quantity: 6 }],
      paymentMethod: "COD",
    });

    expect(result.subtotalPaise).toBe(72000);
    expect(result.shippingPaise).toBe(0);
    expect(result.freeShippingRemainingPaise).toBe(0);
    expect(result.totalPaise).toBe(72000);
  });

  it("charges flat shipping when subtotal is below ₹699", () => {
    const result = calculateCart({
      items: [{ pricePaise: 12000, quantity: 5 }], // 5 x 120 = 60000 paise (< 69900)
      paymentMethod: "COD",
    });

    expect(result.subtotalPaise).toBe(60000);
    expect(result.shippingPaise).toBe(4900);
    expect(result.freeShippingRemainingPaise).toBe(9900); // 69900 - 60000 = 9900 (₹99)
    expect(result.totalPaise).toBe(64900);
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
