import { CartItem, CartTotals } from "@/core/entities/cart";

export const FREE_SHIPPING_THRESHOLD = 15000;
export const STANDARD_SHIPPING_FEE = 750;
export const GST_RATE = 0.18; // 18% GST (India luxury goods)

/**
 * Pure functions for Cart state calculations
 * Zero external side effects, 100% testable, minimal blast radius
 */
export class CartCalculator {
  static calculateTotals(items: CartItem[], couponCode?: string): CartTotals {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);

    let discount = 0;
    if (couponCode?.toUpperCase() === "AAUROSHE10") {
      discount = Math.round(subtotal * 0.1); // 10% welcome privilege discount
    }

    const discountedSubtotal = Math.max(0, subtotal - discount);
    const shipping = subtotal === 0 || discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
    const tax = Math.round(discountedSubtotal * GST_RATE);
    const total = discountedSubtotal + shipping + tax;

    return {
      subtotal,
      discount,
      shipping,
      tax,
      total,
      itemCount,
      appliedCoupon: couponCode,
    };
  }

  static addItem(items: CartItem[], newItem: Omit<CartItem, "id">): CartItem[] {
    const lineId = `${newItem.productId}_${newItem.variantId || "default"}`;
    const existingIndex = items.findIndex((item) => item.id === lineId);

    if (existingIndex > -1) {
      return items.map((item, idx) => {
        if (idx === existingIndex) {
          const updatedQty = Math.min(item.quantity + newItem.quantity, item.maxStock);
          return { ...item, quantity: updatedQty };
        }
        return item;
      });
    }

    return [...items, { ...newItem, id: lineId }];
  }

  static updateQuantity(items: CartItem[], lineId: string, quantity: number): CartItem[] {
    if (quantity <= 0) {
      return items.filter((item) => item.id !== lineId);
    }
    return items.map((item) => {
      if (item.id === lineId) {
        return { ...item, quantity: Math.min(quantity, item.maxStock) };
      }
      return item;
    });
  }

  static removeItem(items: CartItem[], lineId: string): CartItem[] {
    return items.filter((item) => item.id !== lineId);
  }
}
