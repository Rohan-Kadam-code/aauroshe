"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { CartItem, CartTotals } from "@/core/entities/cart";
import { CartCalculator } from "@/services/cart/cartService";
import { Product } from "@/core/entities/product";

interface CartContextValue {
  items: CartItem[];
  totals: CartTotals;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number, variantId?: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_STORAGE_KEY = "aauroshe_cart_v1";
const COUPON_STORAGE_KEY = "aauroshe_coupon_v1";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Hydrate cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      const storedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
      if (storedCoupon) {
        setCouponCode(storedCoupon);
      }
    } catch (e) {
      console.error("Failed to restore cart state:", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      if (couponCode) {
        localStorage.setItem(COUPON_STORAGE_KEY, couponCode);
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.error("Failed to persist cart state:", e);
    }
  }, [items, couponCode, isHydrated]);

  const totals = useMemo(() => {
    return CartCalculator.calculateTotals(items, couponCode);
  }, [items, couponCode]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addItem = (product: Product, quantity = 1, variantId?: string) => {
    const selectedVariant = variantId
      ? product.variants.find((v) => v.id === variantId)
      : product.variants[0];

    const price = selectedVariant ? selectedVariant.price : product.price;
    const maxStock = selectedVariant ? selectedVariant.stockCount : 10;

    const newItem: Omit<CartItem, "id"> = {
      productId: product.id,
      productSlug: product.slug,
      variantId: selectedVariant?.id,
      title: product.title,
      categoryName: product.categoryName,
      variantName: selectedVariant?.name,
      price,
      quantity,
      thumbnail: product.thumbnail,
      maxStock,
    };

    setItems((prev) => CartCalculator.addItem(prev, newItem));
    setIsOpen(true);
  };

  const updateQuantity = (lineId: string, quantity: number) => {
    setItems((prev) => CartCalculator.updateQuantity(prev, lineId, quantity));
  };

  const removeItem = (lineId: string) => {
    setItems((prev) => CartCalculator.removeItem(prev, lineId));
  };

  const applyCoupon = (code: string) => {
    setCouponCode(code.trim().toUpperCase());
  };

  const removeCoupon = () => {
    setCouponCode(undefined);
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode(undefined);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totals,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        updateQuantity,
        removeItem,
        applyCoupon,
        removeCoupon,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
