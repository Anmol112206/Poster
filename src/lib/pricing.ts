/**
 * Pure price calculation functions for Camino Wall Posters.
 * All amounts are stored and calculated in integer PAISE (₹1 = 100 paise).
 */

export interface PricingCartItem {
  pricePaise: number;
  quantity: number;
}

export interface CartCalculationInput {
  items: PricingCartItem[];
  paymentMethod?: "COD";
}

export interface CartTotals {
  subtotalPaise: number;
  shippingPaise: number;
  codFeePaise: number;
  discountPaise: number;
  totalPaise: number;
  freeShippingThresholdPaise: number;
  freeShippingRemainingPaise: number;
}

export const FREE_SHIPPING_THRESHOLD_PAISE = 69900; // ₹699
export const FLAT_SHIPPING_PAISE = 4900; // ₹49
export const COD_FEE_PAISE = 0; // ₹0 (Free COD for college startup demo)

/**
 * Pure function to calculate subtotal, shipping, and total for a given cart.
 */
export function calculateCart({
  items,
  paymentMethod = "COD",
}: CartCalculationInput): CartTotals {
  const subtotalPaise = items.reduce((sum, item) => {
    return sum + Math.max(0, item.pricePaise) * Math.max(0, item.quantity);
  }, 0);

  // Free shipping above ₹699 (69900 paise)
  const shippingPaise = subtotalPaise >= FREE_SHIPPING_THRESHOLD_PAISE || subtotalPaise === 0
    ? 0
    : FLAT_SHIPPING_PAISE;

  const codFeePaise = paymentMethod === "COD" ? COD_FEE_PAISE : 0;
  const discountPaise = 0;

  const totalPaise = Math.max(0, subtotalPaise + shippingPaise + codFeePaise - discountPaise);
  const freeShippingRemainingPaise = Math.max(0, FREE_SHIPPING_THRESHOLD_PAISE - subtotalPaise);

  return {
    subtotalPaise,
    shippingPaise,
    codFeePaise,
    discountPaise,
    totalPaise,
    freeShippingThresholdPaise: FREE_SHIPPING_THRESHOLD_PAISE,
    freeShippingRemainingPaise,
  };
}
