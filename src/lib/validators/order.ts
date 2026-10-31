import { z } from "zod";
import { indianPhoneRegex } from "./auth";

export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Chandigarh",
] as const;

export const addressSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters"),
  phone: z.string().trim().regex(indianPhoneRegex, "Enter a valid 10-digit Indian phone number"),
  line1: z.string().trim().min(5, "Flat / House / Building details required"),
  line2: z.string().trim().optional(),
  city: z.string().trim().min(2, "City is required"),
  state: z.string().trim().min(2, "State is required"),
  pincode: z.string().trim().regex(/^\d{6}$/, "Enter a valid 6-digit PIN code"),
  isDefault: z.boolean().optional().default(false),
});

export const checkoutItemSchema = z.object({
  variantId: z.string(),
  productId: z.string(),
  productTitle: z.string(),
  productSlug: z.string().optional(),
  size: z.enum(["A4", "A3"]),
  finish: z.enum(["GLOSS", "MATTE"]),
  paper: z.string(),
  quantity: z.number().int().min(1).max(10),
  customDesignId: z.string().optional(),
  imageUrl: z.string(),
  customThumbnail: z.string().optional(),
});

export const placeOrderSchema = z.object({
  addressId: z.string().optional(),
  address: addressSchema.optional(),
  saveAddress: z.boolean().optional().default(false),
  paymentMethod: z.literal("COD").default("COD"),
  items: z.array(checkoutItemSchema).min(1, "Your cart is empty"),
});

export type AddressInput = z.infer<typeof addressSchema>;
export type CheckoutItemInput = z.infer<typeof checkoutItemSchema>;
export type PlaceOrderInput = z.infer<typeof placeOrderSchema>;
