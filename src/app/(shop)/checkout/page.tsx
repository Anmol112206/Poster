"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Loader2,
  Building2,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";
import { calculateCart } from "@/lib/pricing";
import { indianStates, AddressInput } from "@/lib/validators/order";
import { placeOrder } from "@/actions/order";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { items, clearCart } = useCart();

  const [address, setAddress] = useState<AddressInput>({
    fullName: session?.user?.name || "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "Bihar",
    pincode: "",
    isDefault: true,
  });

  const [saveAddress, setSaveAddress] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const totals = calculateCart({
    items: items.map((i) => ({ pricePaise: i.pricePaise, quantity: i.quantity })),
    paymentMethod: "COD",
  });

  // If cart is empty, redirect back
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-[#DDD7CC]" />
        <h2 className="mt-4 font-serif text-2xl font-bold text-[#1A1A1A]">No items to checkout</h2>
        <p className="mt-2 text-sm text-[#6B665E]">Your cart is currently empty.</p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded bg-[#1A1A1A] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E]"
        >
          Browse Posters
        </Link>
      </div>
    );
  }

  // If user is not logged in, prompt to log in first
  if (status === "unauthenticated") {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <div className="rounded border border-[#DDD7CC] bg-white p-8 shadow-xs">
          <Lock className="mx-auto h-10 w-10 text-[#C8501E]" />
          <h2 className="mt-4 font-serif text-2xl font-bold text-[#1A1A1A]">Sign in to Checkout</h2>
          <p className="mt-2 text-sm text-[#6B665E]">
            Please sign in to your Camino account to confirm your delivery address and place your order.
          </p>
          <div className="mt-6 space-y-3">
            <Link
              href="/login?callbackUrl=/checkout"
              className="block w-full rounded bg-[#1A1A1A] py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E]"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="block w-full rounded border border-[#DDD7CC] py-3 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#F6F3EE]"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validate phone
    if (!/^[6-9]\d{9}$/.test(address.phone)) {
      setErrorMsg("Please enter a valid 10-digit Indian phone number.");
      toast.error("Valid 10-digit mobile number required.");
      return;
    }

    // Validate pincode
    if (!/^\d{6}$/.test(address.pincode)) {
      setErrorMsg("Please enter a valid 6-digit PIN code.");
      toast.error("Valid 6-digit PIN code required.");
      return;
    }

    setSubmitting(true);

    const res = await placeOrder({
      address,
      saveAddress,
      paymentMethod: "COD",
      items: items.map((i) => ({
        variantId: i.variantId,
        productId: i.productId,
        productTitle: i.productTitle,
        productSlug: i.productSlug,
        size: i.size,
        finish: i.finish,
        paper: i.paper,
        quantity: i.quantity,
        customDesignId: i.customDesignId,
        imageUrl: i.imageUrl,
        customThumbnail: i.customThumbnail,
      })),
    });

    setSubmitting(false);

    if (res.success) {
      clearCart();
      toast.success("Order placed successfully!");
      router.push(`/order/${res.data.orderId}/success?num=${res.data.orderNumber}`);
    } else {
      setErrorMsg(res.error.message);
      toast.error(res.error.message);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="border-b border-[#DDD7CC] pb-4">
        <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">
          Complete Your Order
        </h1>
        <p className="mt-1 text-sm text-[#6B665E]">
          100% Free Express Delivery on All Orders • Cash on Delivery available across India
        </p>
      </div>

      {errorMsg && (
        <div className="mt-6 rounded border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Column: Delivery Address Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded border border-[#DDD7CC] bg-white p-6 shadow-xs">
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] border-b border-[#DDD7CC] pb-3">
              1. Delivery Address
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B665E]">
                  Full Name
                </label>
                <input
                  id="checkout-fullname"
                  name="fullName"
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="mt-1 w-full rounded border border-[#DDD7CC] bg-white px-3.5 py-2 text-sm text-[#1A1A1A] outline-none focus:border-[#C8501E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B665E]">
                  Mobile Number (For Courier Updates)
                </label>
                <div className="mt-1 flex items-center rounded border border-[#DDD7CC] bg-white px-3">
                  <span className="text-sm font-medium text-[#6B665E]">+91</span>
                  <input
                    id="checkout-phone"
                    name="phone"
                    type="tel"
                    maxLength={10}
                    required
                    value={address.phone}
                    onChange={(e) =>
                      setAddress({ ...address, phone: e.target.value.replace(/\D/g, "") })
                    }
                    placeholder="9876543210"
                    className="w-full bg-transparent px-2 py-2 text-sm text-[#1A1A1A] outline-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B665E]">
                  House / Flat / Building / Street
                </label>
                <input
                  id="checkout-line1"
                  name="line1"
                  type="text"
                  required
                  value={address.line1}
                  onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                  placeholder="Flat 302, Royal Residency, 12th Main Road"
                  className="mt-1 w-full rounded border border-[#DDD7CC] bg-white px-3.5 py-2 text-sm text-[#1A1A1A] outline-none focus:border-[#C8501E]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B665E]">
                  Area / Landmark (Optional)
                </label>
                <input
                  id="checkout-line2"
                  name="line2"
                  type="text"
                  value={address.line2 || ""}
                  onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                  placeholder="Near Metro Station or College Gate"
                  className="mt-1 w-full rounded border border-[#DDD7CC] bg-white px-3.5 py-2 text-sm text-[#1A1A1A] outline-none focus:border-[#C8501E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B665E]">
                  City
                </label>
                <input
                  id="checkout-city"
                  name="city"
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  placeholder="Patna"
                  className="mt-1 w-full rounded border border-[#DDD7CC] bg-white px-3.5 py-2 text-sm text-[#1A1A1A] outline-none focus:border-[#C8501E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B665E]">
                  State
                </label>
                <select
                  id="checkout-state"
                  name="state"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="mt-1 w-full rounded border border-[#DDD7CC] bg-white px-3 py-2 text-sm text-[#1A1A1A] outline-none focus:border-[#C8501E]"
                >
                  {indianStates.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B665E]">
                  PIN Code (6 digits)
                </label>
                <input
                  id="checkout-pincode"
                  name="pincode"
                  type="text"
                  maxLength={6}
                  required
                  value={address.pincode}
                  onChange={(e) =>
                    setAddress({ ...address, pincode: e.target.value.replace(/\D/g, "") })
                  }
                  placeholder="801106"
                  className="mt-1 w-full rounded border border-[#DDD7CC] bg-white px-3.5 py-2 text-sm text-[#1A1A1A] outline-none focus:border-[#C8501E]"
                />
              </div>

              <div className="flex items-center sm:col-span-2 pt-2">
                <label className="flex items-center gap-2 text-xs text-[#1A1A1A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={saveAddress}
                    onChange={(e) => setSaveAddress(e.target.checked)}
                    className="rounded text-[#C8501E]"
                  />
                  <span>Save this address to my account for future orders</span>
                </label>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="rounded border border-[#DDD7CC] bg-white p-6 shadow-xs">
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] border-b border-[#DDD7CC] pb-3">
              2. Payment Method
            </h2>

            <div className="mt-4 rounded border-2 border-[#1A1A1A] bg-[#F6F3EE] p-4 flex items-start gap-3">
              <input
                type="radio"
                name="payment"
                checked
                readOnly
                className="mt-1 text-[#C8501E]"
              />
              <div>
                <span className="font-serif text-sm font-bold text-[#1A1A1A]">
                  Cash on Delivery (COD)
                </span>
                <p className="mt-0.5 text-xs text-[#6B665E]">
                  Pay in cash or via UPI QR code directly to the courier agent when your package arrives.
                </p>
                <span className="mt-2 inline-block rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.5">
                  ✓ Free COD • No convenience fee
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Review & Submit */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded border border-[#DDD7CC] bg-white p-6 shadow-xs space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] border-b border-[#DDD7CC] pb-3">
              3. Review Order ({items.length} items)
            </h2>

            {/* Item Mini Snapshots */}
            <div className="max-h-60 overflow-y-auto divide-y divide-[#DDD7CC] pr-1 space-y-3">
              {items.map((item) => (
                <div
                  key={`${item.variantId}_${item.customDesignId || "std"}`}
                  className="flex items-center gap-3 pt-3 first:pt-0"
                >
                  <div className="relative h-14 w-11 shrink-0 rounded border border-[#DDD7CC] bg-[#ECE7DE] overflow-hidden">
                    <Image
                      src={item.customThumbnail || item.imageUrl}
                      alt={item.productTitle}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 text-xs">
                    <p className="font-semibold text-[#1A1A1A] line-clamp-1">{item.productTitle}</p>
                    <p className="text-[#6B665E]">
                      {item.size} • Gloss Finish • Qty {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#1A1A1A]">
                    {formatINR(item.pricePaise * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="border-t border-[#DDD7CC] pt-4 space-y-2.5 text-xs">
              <div className="flex justify-between text-[#6B665E]">
                <span>Items Subtotal</span>
                <span className="text-[#1A1A1A] font-semibold">{formatINR(totals.subtotalPaise)}</span>
              </div>
              <div className="flex justify-between text-[#6B665E]">
                <span>Shipping Fee</span>
                <span className="text-emerald-700 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-[#6B665E]">
                <span>COD Handling Fee</span>
                <span className="text-emerald-700 font-semibold">FREE</span>
              </div>
              <div className="border-t border-[#DDD7CC] pt-3 flex justify-between items-baseline text-sm">
                <span className="font-serif font-bold text-[#1A1A1A]">Total Payable at Delivery</span>
                <span className="font-serif text-2xl font-bold text-[#C8501E]">
                  {formatINR(totals.totalPaise)}
                </span>
              </div>
            </div>

            <button
              id="checkout-place-order-btn"
              type="submit"
              disabled={submitting}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded bg-[#1A1A1A] py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#C8501E] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Placing Order...
                </>
              ) : (
                <>
                  Place Cash on Delivery Order
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="text-[11px] text-[#6B665E] space-y-1.5 pt-2 text-center">
              <p>🔒 By clicking Place Order, you confirm acceptance of our delivery terms.</p>
              <p>Shipped in 2mm protective tubes to prevent any creasing.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
