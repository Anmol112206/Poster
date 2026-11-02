"use client";

import { useState, useEffect } from "react";
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
  MapPin,
  Plus,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";
import { calculateCart } from "@/lib/pricing";
import { indianStates, AddressInput } from "@/lib/validators/order";
import { placeOrder } from "@/actions/order";
import { getUserAddressesAction, UserAddress } from "@/actions/address";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { items, clearCart } = useCart();

  const [savedAddresses, setSavedAddresses] = useState<UserAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | "new">("new");
  const [loadingAddresses, setLoadingAddresses] = useState(false);

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

  // Fetch saved addresses from Supabase on mount
  useEffect(() => {
    if (status !== "authenticated") return;
    let isCancelled = false;
    getUserAddressesAction()
      .then((res) => {
        if (!isCancelled && res.success && res.data.length > 0) {
          setSavedAddresses(res.data);
          const defaultAddr = res.data.find((a) => a.isDefault) || res.data[0];
          setSelectedAddressId(defaultAddr.id);
          setAddress({
            fullName: defaultAddr.fullName,
            phone: defaultAddr.phone,
            line1: defaultAddr.line1,
            line2: defaultAddr.line2 || "",
            city: defaultAddr.city,
            state: defaultAddr.state,
            pincode: defaultAddr.pincode,
            isDefault: defaultAddr.isDefault,
          });
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setLoadingAddresses(false);
        }
      });
    return () => {
      isCancelled = true;
    };
  }, [status]);

  const selectSavedAddress = (addr: UserAddress) => {
    setSelectedAddressId(addr.id);
    setAddress({
      fullName: addr.fullName,
      phone: addr.phone,
      line1: addr.line1,
      line2: addr.line2 || "",
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      isDefault: addr.isDefault,
    });
  };

  const handleSelectNewAddress = () => {
    setSelectedAddressId("new");
    setAddress({
      fullName: session?.user?.name || "",
      phone: "",
      line1: "",
      line2: "",
      city: "",
      state: "Bihar",
      pincode: "",
      isDefault: savedAddresses.length === 0,
    });
  };

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

  // Loading state while session resolves
  if (status === "loading") {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#C8501E]" />
        <p className="text-xs uppercase tracking-wider text-[#6B665E]">Verifying session...</p>
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
            Please sign in to your Cammino account to confirm your delivery address and place your order.
          </p>
          <div className="mt-6 space-y-3">
            <Link
              href="/login?callbackUrl=/checkout"
              className="block w-full rounded bg-[#1A1A1A] py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E]"
            >
              Sign In
            </Link>
            <Link
              href="/signup?callbackUrl=/checkout"
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
      saveAddress: selectedAddressId === "new" ? saveAddress : false,
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
        {/* Left Column: Delivery Address Selection / Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded border border-[#DDD7CC] bg-white p-6 shadow-xs">
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] border-b border-[#DDD7CC] pb-3">
              1. Delivery Address
            </h2>

            {/* Existing Saved Addresses Selection */}
            {savedAddresses.length > 0 && (
              <div className="mt-5 space-y-3 border-b border-[#DDD7CC] pb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#6B665E]">
                    Deliver to a Saved Address
                  </span>
                  <button
                    type="button"
                    onClick={handleSelectNewAddress}
                    className="text-xs font-semibold text-[#C8501E] hover:underline flex items-center gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" /> Use New Address
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {savedAddresses.map((addr) => {
                    const isSelected = selectedAddressId === addr.id;
                    return (
                      <div
                        key={addr.id}
                        onClick={() => selectSavedAddress(addr)}
                        className={`cursor-pointer rounded border p-4 transition-all relative ${
                          isSelected
                            ? "border-2 border-[#1A1A1A] bg-[#FAF8F5] shadow-xs"
                            : "border-[#DDD7CC] bg-white hover:border-[#1A1A1A]"
                        }`}
                      >
                        <div className="flex items-center justify-between pr-5">
                          <span className="font-bold text-xs text-[#1A1A1A]">
                            {addr.fullName}
                          </span>
                          {addr.isDefault && (
                            <span className="rounded bg-[#EFECE5] px-1.5 py-0.5 text-[9px] font-bold text-[#6B665E]">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 text-xs text-[#6B665E] line-clamp-2 leading-relaxed">
                          {addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}, {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                        <p className="mt-2 text-xs font-semibold text-[#1A1A1A]">
                          Ph: +91 {addr.phone}
                        </p>
                        {isSelected && (
                          <span className="absolute top-3 right-3 flex h-4 w-4 items-center justify-center rounded-full bg-[#1A1A1A] text-white text-[10px] font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Address Input Form (Used for New Address or Reviewing Selected) */}
            <div className="mt-5">
              {savedAddresses.length > 0 && selectedAddressId !== "new" && (
                <div className="mb-4 flex items-center justify-between text-xs bg-[#FAF8F5] p-3 rounded border border-[#DDD7CC]">
                  <span className="text-emerald-800 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Delivering to {address.fullName} ({address.pincode})
                  </span>
                  <button
                    type="button"
                    onClick={handleSelectNewAddress}
                    className="text-[#C8501E] font-semibold hover:underline"
                  >
                    Change to Different Address
                  </button>
                </div>
              )}

              {(selectedAddressId === "new" || savedAddresses.length === 0) && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] block">
                      Enter Shipping Address Details
                    </span>
                  </div>

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
                      className="mt-1 w-full rounded border border-[#DDD7CC] bg-white px-3.5 py-2 text-sm text-[#1A1A1A] outline-none focus:border-[#C8501E]"
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
                      PIN Code (6 Digits)
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

                  <div className="sm:col-span-2 pt-2">
                    <label className="flex items-center gap-2 text-xs text-[#1A1A1A] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={saveAddress}
                        onChange={(e) => setSaveAddress(e.target.checked)}
                        className="rounded text-[#C8501E]"
                      />
                      <span>Save this address to your account (only saved once if unique)</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Payment Method */}
          <div className="rounded border border-[#DDD7CC] bg-white p-6 shadow-xs">
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] border-b border-[#DDD7CC] pb-3">
              2. Payment Method
            </h2>

            <div className="mt-4">
              <div className="rounded border-2 border-[#1A1A1A] bg-[#FAF8F5] p-4 flex items-start gap-3">
                <input
                  type="radio"
                  id="payment-cod"
                  name="paymentMethod"
                  value="COD"
                  defaultChecked
                  className="mt-1"
                />
                <div>
                  <label htmlFor="payment-cod" className="text-sm font-bold text-[#1A1A1A] cursor-pointer">
                    Cash on Delivery (COD)
                  </label>
                  <p className="mt-1 text-xs text-[#6B665E] leading-relaxed">
                    Pay in cash or UPI directly to the delivery courier when your sealed package arrives at your door.
                  </p>
                  <span className="mt-2 inline-block rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                    Zero Extra COD Fee • 100% Free Shipping
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded border border-[#DDD7CC] bg-white p-6 shadow-xs">
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] border-b border-[#DDD7CC] pb-3">
              Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} Items)
            </h2>

            <ul className="mt-4 divide-y divide-[#DDD7CC] max-h-80 overflow-y-auto">
              {items.map((item) => (
                <li key={`${item.variantId}-${item.customDesignId || ""}`} className="py-3 flex gap-3">
                  <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded border border-[#DDD7CC] bg-[#ECE7DE]">
                    <Image
                      src={item.customThumbnail || item.imageUrl}
                      alt={item.productTitle}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1A1A1A] truncate">{item.productTitle}</p>
                    <p className="text-[11px] text-[#6B665E]">
                      {item.size} • 300 GSM Archival • Qty: {item.quantity}
                    </p>
                    <p className="text-xs font-bold text-[#1A1A1A] mt-1">
                      {formatINR(item.pricePaise * item.quantity)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <hr className="my-4 border-[#DDD7CC]" />

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#6B665E]">
                <span>Subtotal</span>
                <span>{formatINR(totals.subtotalPaise)}</span>
              </div>
              <div className="flex justify-between text-[#6B665E]">
                <span>Express Courier Shipping</span>
                <span className="font-semibold text-emerald-700">FREE</span>
              </div>
              <div className="flex justify-between text-[#6B665E]">
                <span>Cash on Delivery Handling</span>
                <span className="font-semibold text-emerald-700">FREE</span>
              </div>
              <hr className="border-[#DDD7CC]" />
              <div className="flex justify-between text-base font-serif font-bold text-[#1A1A1A] pt-1">
                <span>Total Amount</span>
                <span className="text-[#C8501E]">{formatINR(totals.totalPaise)}</span>
              </div>
              <p className="text-[11px] text-[#6B665E]">All taxes included. Pay upon physical delivery.</p>
            </div>

            <button
              id="checkout-place-order-btn"
              type="submit"
              disabled={submitting}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded bg-[#1A1A1A] py-4 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Confirming Order...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  <span>Place Cash on Delivery Order ({formatINR(totals.totalPaise)})</span>
                </>
              )}
            </button>
          </div>

          <div className="rounded border border-[#DDD7CC] bg-[#EFECE5] p-5 text-xs text-[#6B665E] space-y-2">
            <div className="flex items-center gap-2 text-[#1A1A1A] font-semibold">
              <Truck className="h-4 w-4 text-[#C8501E]" />
              <span>Safe & Secure Packaging</span>
            </div>
            <p>
              All prints are hand-inspected, wrapped in acid-free glassine paper, and shipped inside 2mm heavy-duty cylindrical mailing tubes.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
