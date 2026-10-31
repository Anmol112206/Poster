"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";

export default function MiniCart() {
  const { items, itemCount, subtotalPaise, isCartOpen, closeCart, updateQuantity, removeItem } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD_PAISE = 69900;
  const differencePaise = FREE_SHIPPING_THRESHOLD_PAISE - subtotalPaise;
  const freeShippingProgress = Math.min(100, Math.round((subtotalPaise / FREE_SHIPPING_THRESHOLD_PAISE) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1A1A1A]/40 backdrop-blur-xs transition-opacity duration-200"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-label="Shopping Cart Drawer"
        className="relative z-10 flex h-full w-full max-w-md flex-col bg-[#F6F3EE] shadow-2xl border-l border-[#DDD7CC]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#DDD7CC] px-6 py-4 bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[#C8501E]" />
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">Your Cart ({itemCount})</h2>
          </div>
          <button
            onClick={closeCart}
            className="rounded p-1 text-[#6B665E] hover:bg-[#F6F3EE] hover:text-[#1A1A1A]"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free shipping progress bar */}
        <div className="border-b border-[#DDD7CC] bg-[#EFECE5] px-6 py-3">
          <div className="flex justify-between text-xs font-medium text-[#1A1A1A]">
            {differencePaise > 0 ? (
              <span>
                Add <span className="font-semibold text-[#C8501E]">{formatINR(differencePaise)}</span> more for free delivery
              </span>
            ) : (
              <span className="text-emerald-700 font-semibold">🎉 You have unlocked Free Shipping!</span>
            )}
            <span>{freeShippingProgress}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#DDD7CC]">
            <div
              className="h-full bg-[#C8501E] transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-12 w-12 text-[#DDD7CC]" />
              <p className="mt-4 font-serif text-lg font-medium text-[#1A1A1A]">Your cart is empty</p>
              <p className="mt-1 text-sm text-[#6B665E]">Looks like you haven&apos;t added any wall posters yet.</p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="mt-6 inline-flex items-center justify-center rounded bg-[#1A1A1A] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E]"
              >
                Browse Shop
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.variantId}_${item.customDesignId || "std"}`}
                className="flex gap-4 rounded border border-[#DDD7CC] bg-white p-3.5"
              >
                <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded border border-[#DDD7CC] bg-[#ECE7DE]">
                  <Image
                    src={item.customThumbnail || item.imageUrl}
                    alt={item.productTitle}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex justify-between">
                      <h4 className="font-medium text-sm text-[#1A1A1A] line-clamp-1">{item.productTitle}</h4>
                      <button
                        onClick={() => removeItem(item.variantId, item.customDesignId)}
                        className="text-[#6B665E] hover:text-rose-600"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs text-[#6B665E]">
                      {item.size} • {item.finish} • 300 GSM
                      {item.customDesignId && " • Custom Print"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center rounded border border-[#DDD7CC]">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1, item.customDesignId)}
                        className="p-1 text-[#6B665E] hover:text-[#1A1A1A]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-medium text-[#1A1A1A]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1, item.customDesignId)}
                        className="p-1 text-[#6B665E] hover:text-[#1A1A1A]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <span className="text-sm font-semibold text-[#1A1A1A]">
                      {formatINR(item.pricePaise * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Checkout Actions */}
        {items.length > 0 && (
          <div className="border-t border-[#DDD7CC] bg-white p-6 space-y-4">
            <div className="flex justify-between text-base font-semibold text-[#1A1A1A]">
              <span>Subtotal</span>
              <span>{formatINR(subtotalPaise)}</span>
            </div>
            <p className="text-xs text-[#6B665E]">Taxes included. Shipping calculated at checkout.</p>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/cart"
                onClick={closeCart}
                className="flex items-center justify-center rounded border border-[#1A1A1A] py-3 text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#F6F3EE]"
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex items-center justify-center rounded bg-[#1A1A1A] py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#C8501E]"
              >
                Checkout <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
