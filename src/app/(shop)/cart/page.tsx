"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";
import { calculateCart } from "@/lib/pricing";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();

  const totals = calculateCart({
    items: items.map((i) => ({ pricePaise: i.pricePaise, quantity: i.quantity })),
    paymentMethod: "COD",
  });

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EAE5DC]">
          <ShoppingBag className="h-10 w-10 text-[#6B665E]" />
        </div>
        <h1 className="mt-6 font-serif text-3xl font-bold text-[#1A1A1A]">Your cart is empty</h1>
        <p className="mt-2 text-sm text-[#6B665E] max-w-md mx-auto">
          You haven&apos;t added any art prints or custom posters to your order yet.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/shop"
            className="rounded bg-[#1A1A1A] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E]"
          >
            Explore Catalog
          </Link>
          <Link
            href="/custom"
            className="rounded border border-[#1A1A1A] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#F6F3EE]"
          >
            Design Custom Poster
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="border-b border-[#DDD7CC] pb-6">
        <h1 className="font-serif text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
          Shopping Cart ({items.reduce((s, i) => s + i.quantity, 0)} items)
        </h1>
        <p className="mt-1 text-sm text-[#6B665E]">
          Review your items before proceeding to Cash on Delivery checkout.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free Shipping Alert Bar */}
          <div className="rounded border border-[#DDD7CC] bg-[#EFECE5] p-3.5 flex items-center justify-between text-xs text-[#1A1A1A]">
            <span className="text-emerald-800 font-semibold flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-[#C8501E]" /> 100% Free Express Courier Delivery on All Orders
            </span>
            <span className="text-[#6B665E] hidden sm:inline">No minimum order required</span>
          </div>

          <div className="divide-y divide-[#DDD7CC] rounded border border-[#DDD7CC] bg-white">
            {items.map((item) => (
              <div
                key={`${item.variantId}_${item.customDesignId || "std"}`}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-24 w-18 shrink-0 overflow-hidden rounded border border-[#DDD7CC] bg-[#ECE7DE]">
                    <Image
                      src={item.customThumbnail || item.imageUrl}
                      alt={item.productTitle}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div>
                    <Link
                      href={item.customDesignId ? "/custom" : `/product/${item.productSlug}`}
                      className="font-serif text-base font-semibold text-[#1A1A1A] hover:text-[#C8501E]"
                    >
                      {item.productTitle}
                    </Link>
                    <p className="mt-1 text-xs text-[#6B665E]">
                      Size: <span className="font-medium text-[#1A1A1A]">{item.size}</span> (
                      {item.size === "A4" ? "210×297mm" : "297×420mm"}) • Finish: Gloss • 300 GSM Archival
                      {item.customDesignId && " • Custom Memory Print"}
                    </p>
                    <p className="mt-1 text-xs text-[#6B665E]">
                      Unit Price: <span className="font-medium">{formatINR(item.pricePaise)}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:gap-8 border-t sm:border-0 pt-3 sm:pt-0 border-[#DDD7CC]">
                  {/* Quantity Stepper */}
                  <div className="flex items-center rounded border border-[#DDD7CC]">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1, item.customDesignId)}
                      className="px-2.5 py-1 text-sm text-[#6B665E] hover:text-[#1A1A1A]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-semibold text-[#1A1A1A]">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1, item.customDesignId)}
                      className="px-2.5 py-1 text-sm text-[#6B665E] hover:text-[#1A1A1A]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right">
                    <span className="font-serif text-base font-bold text-[#1A1A1A]">
                      {formatINR(item.pricePaise * item.quantity)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeItem(item.variantId, item.customDesignId)}
                    className="p-1.5 text-[#6B665E] hover:text-rose-600 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <Link
              href="/shop"
              className="text-xs font-semibold uppercase tracking-wider text-[#6B665E] hover:text-[#1A1A1A]"
            >
              ← Continue Shopping
            </Link>
            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-[#6B665E] hover:text-rose-600 underline"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="rounded border border-[#DDD7CC] bg-white p-6 shadow-xs space-y-5">
            <h2 className="font-serif text-xl font-bold text-[#1A1A1A] border-b border-[#DDD7CC] pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[#6B665E]">
                <span>Items Subtotal</span>
                <span className="text-[#1A1A1A] font-medium">{formatINR(totals.subtotalPaise)}</span>
              </div>

              <div className="flex justify-between text-[#6B665E]">
                <span>Delivery Charges</span>
                <span className="text-emerald-700 font-semibold">FREE</span>
              </div>

              <div className="flex justify-between text-[#6B665E]">
                <span>Payment Method</span>
                <span className="text-[#1A1A1A] font-medium">Cash on Delivery (COD)</span>
              </div>
            </div>

            <div className="border-t border-[#DDD7CC] pt-4">
              <div className="flex justify-between items-baseline">
                <span className="font-serif text-lg font-bold text-[#1A1A1A]">Total Payable</span>
                <span className="font-serif text-2xl font-bold text-[#C8501E]">
                  {formatINR(totals.totalPaise)}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-[#6B665E]">Includes GST & protective tube packaging</p>
            </div>

            <Link
              href="/checkout"
              className="flex w-full items-center justify-center gap-2 rounded bg-[#1A1A1A] py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#C8501E]"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="space-y-2 border-t border-[#DDD7CC] pt-4 text-xs text-[#6B665E]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Pay securely in cash or UPI when package arrives</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-[#1A1A1A]" />
                <span>Shipped in 2mm crush-proof kraft tubes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
