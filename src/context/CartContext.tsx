"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export interface CartItemType {
  id: string; // client id or DB id
  variantId: string;
  productId: string;
  productTitle: string;
  productSlug: string;
  imageUrl: string;
  size: "A4" | "A3";
  finish: "GLOSS" | "MATTE";
  paper: string;
  pricePaise: number;
  quantity: number;
  customDesignId?: string;
  customThumbnail?: string;
}

interface CartContextType {
  items: CartItemType[];
  itemCount: number;
  subtotalPaise: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItemType, "id">) => void;
  updateQuantity: (variantId: string, quantity: number, customDesignId?: string) => void;
  removeItem: (variantId: string, customDesignId?: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "camino_guest_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load guest cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load local cart:", e);
    }
    setMounted(true);
  }, []);

  // Save guest cart changes to localStorage
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error("Failed to persist cart:", e);
      }
    }
  }, [items, mounted]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalPaise = items.reduce((sum, item) => sum + item.pricePaise * item.quantity, 0);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addItem = (newItem: Omit<CartItemType, "id">) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.variantId === newItem.variantId && i.customDesignId === newItem.customDesignId
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const currentQty = updated[existingIndex].quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(currentQty + newItem.quantity, 10),
        };
        return updated;
      }

      return [
        ...prev,
        {
          ...newItem,
          id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        },
      ];
    });

    toast.success(`Added ${newItem.productTitle} (${newItem.size}) to cart`);
    setIsCartOpen(true);
  };

  const updateQuantity = (variantId: string, quantity: number, customDesignId?: string) => {
    if (quantity <= 0) {
      removeItem(variantId, customDesignId);
      return;
    }

    setItems((prev) =>
      prev.map((i) => {
        if (i.variantId === variantId && i.customDesignId === customDesignId) {
          return { ...i, quantity: Math.min(quantity, 10) };
        }
        return i;
      })
    );
  };

  const removeItem = (variantId: string, customDesignId?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.variantId === variantId && i.customDesignId === customDesignId))
    );
    toast.info("Item removed from cart");
  };

  const clearCart = () => {
    setItems([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotalPaise,
        isCartOpen,
        openCart,
        closeCart,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
