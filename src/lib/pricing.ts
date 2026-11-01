/**
 * Pure price calculation functions for Cammino Wall Posters.
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

export const FREE_SHIPPING_THRESHOLD_PAISE = 0; // Always Free Shipping across India
export const FLAT_SHIPPING_PAISE = 0; // Free delivery
export const COD_FEE_PAISE = 0; // Free COD

/**
 * Pure function to calculate subtotal, shipping, and total for a given cart.
 * Delivery is always 100% free across India.
 */
export function calculateCart({
  items,
  paymentMethod = "COD",
}: CartCalculationInput): CartTotals {
  const subtotalPaise = items.reduce((sum, item) => {
    return sum + Math.max(0, item.pricePaise) * Math.max(0, item.quantity);
  }, 0);

  // Free shipping on all orders
  const shippingPaise = 0;
  const codFeePaise = 0;
  const discountPaise = 0;

  const totalPaise = Math.max(0, subtotalPaise + shippingPaise + codFeePaise - discountPaise);

  return {
    subtotalPaise,
    shippingPaise: 0,
    codFeePaise: 0,
    discountPaise: 0,
    totalPaise,
    freeShippingThresholdPaise: 0,
    freeShippingRemainingPaise: 0,
  };
}
