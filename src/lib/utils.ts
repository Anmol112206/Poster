import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats an amount in integer paise to an Indian Rupee string representation.
 * Example: 29900 -> "₹299" or 29950 -> "₹299.50"
 */
export function formatINR(paise: number): string {
  const rupees = paise / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: rupees % 1 === 0 ? 0 : 2,
  }).format(rupees);
}

/**
 * Converts Indian Rupee number to paise (integer).
 */
export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

/**
 * Calculates print DPI based on pixel dimensions and target paper size.
 * A4: 210 x 297 mm -> 8.27 x 11.69 inches
 * A3: 297 x 420 mm -> 11.69 x 16.54 inches
 */
export function calculateDPI(widthPx: number, heightPx: number, size: "A4" | "A3"): number {
  const heightInches = size === "A4" ? 11.69 : 16.54;
  return Math.round(Math.max(widthPx, heightPx) / heightInches);
}

export function getDPIQuality(dpi: number): {
  label: "Great" | "Okay" | "Low";
  color: string;
  isWarning: boolean;
} {
  if (dpi >= 200) {
    return { label: "Great", color: "text-emerald-700 bg-emerald-50 border-emerald-200", isWarning: false };
  }
  if (dpi >= 150) {
    return { label: "Okay", color: "text-amber-700 bg-amber-50 border-amber-200", isWarning: false };
  }
  return { label: "Low", color: "text-rose-700 bg-rose-50 border-rose-200", isWarning: true };
}
