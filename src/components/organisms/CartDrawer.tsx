"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { CartItemRow } from "@/components/molecules/CartItemRow";
import { Button } from "@/components/atoms/Button";
import { formatINR } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD } from "@/services/cart/cartService";
import { X, ShoppingBag, ShieldCheck, Tag, ArrowRight, Sparkles } from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    items,
    totals,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    if (couponInput.trim().toUpperCase() === "AAUROSHE10") {
      applyCoupon(couponInput);
      setCouponError("");
    } else {
      setCouponError("Invalid promotion code. Try AAUROSHE10");
    }
  };

  const amountNeededForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - (totals.subtotal - totals.discount)
  );
  const freeShippingProgress = Math.min(
    100,
    Math.round(((totals.subtotal - totals.discount) / FREE_SHIPPING_THRESHOLD) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#ede6e7] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#4a1525]" />
              <h2 className="text-sm font-serif uppercase tracking-widest text-[#1e1417] font-medium">
                Shopping Bag ({totals.itemCount})
              </h2>
            </div>

            <button
              type="button"
              onClick={closeCart}
              className="p-1.5 text-neutral-400 hover:text-[#4a1525] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#380d1a] text-white px-6 py-3 text-xs">
            {amountNeededForFreeShipping === 0 ? (
              <div className="flex items-center gap-2 text-rose-200 font-medium">
                <Sparkles className="w-4 h-4 text-rose-300 shrink-0" />
                <span>You qualify for Complimentary Delivery!</span>
              </div>
            ) : (
              <div>
                <p className="text-neutral-200">
                  Add <strong className="text-rose-200 font-semibold">{formatINR(amountNeededForFreeShipping)}</strong> more to enjoy Complimentary Insured Delivery.
                </p>
                <div className="w-full bg-[#23060f] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-[#be6b82] h-full transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-2">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4 text-neutral-400">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-lg text-neutral-900">Your bag is empty</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                  Explore our luxury fragrance, jewellery, and apparel collections to select your creation.
                </p>
                <Button
                  onClick={closeCart}
                  variant="gold"
                  size="sm"
                  className="mt-6"
                >
                  Explore Creations
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                  onItemClick={closeCart}
                />
              ))
            )}
          </div>

          {/* Footer & Checkout Breakdown */}
          {items.length > 0 && (
            <div className="border-t border-neutral-100 px-6 py-5 bg-neutral-50/70 space-y-4">
              {/* Promo Code Input */}
              <div>
                {totals.appliedCoupon ? (
                  <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-2">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code <strong>{totals.appliedCoupon}</strong> Applied</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-emerald-700 hover:text-red-600 font-semibold underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Privilege Code (AAUROSHE10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-white border border-neutral-200 px-3 py-2 text-xs focus:outline-none focus:border-neutral-900 uppercase tracking-wider"
                    />
                    <Button type="submit" variant="secondary" size="sm">
                      Apply
                    </Button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 mt-1">{couponError}</p>
                )}
              </div>

              {/* Totals Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-600 pt-2 border-t border-neutral-200/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-neutral-900">{formatINR(totals.subtotal)}</span>
                </div>

                {totals.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Privilege Discount (10%)</span>
                    <span>-{formatINR(totals.discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Insured Delivery</span>
                  <span>{totals.shipping === 0 ? <strong className="text-[#4a1525] font-semibold uppercase">Complimentary</strong> : formatINR(totals.shipping)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated GST (18%)</span>
                  <span>{formatINR(totals.tax)}</span>
                </div>

                <div className="flex justify-between text-sm font-semibold text-[#1e1417] pt-2 border-t border-[#ede6e7]">
                  <span>Estimated Total</span>
                  <span className="text-base font-serif">{formatINR(totals.total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link href="/checkout" onClick={closeCart} className="block">
                <Button variant="wine" size="lg" className="w-full justify-between group bg-[#4a1525] border-[#5c2030] hover:bg-[#380d1a]">
                  <span>Proceed to Checkout</span>
                  <span className="flex items-center gap-1 font-serif text-sm">
                    {formatINR(totals.total)}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform ml-1" />
                  </span>
                </Button>
              </Link>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 uppercase tracking-widest pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7e3045]" />
                <span>Verified Encrypted Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
