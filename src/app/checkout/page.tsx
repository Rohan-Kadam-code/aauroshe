"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";
import { paymentService } from "@/services/payment/paymentService";
import {
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, totals, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "Lady Eleanor Vance",
    email: "eleanor.vance@luxury.com",
    phone: "+91 98765 43210",
    addressLine1: "Suite 404, The Imperial Residences",
    addressLine2: "Luxury Boulevard, South Extension",
    city: "New Delhi",
    state: "Delhi",
    postalCode: "110049",
    country: "India",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<"RAZORPAY" | "CARD" | "UPI">("RAZORPAY");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const orderNumber = `AUR-${Date.now().toString().slice(-6)}`;
      const paymentOrder = await paymentService.createPaymentOrder({
        amountInINR: totals.total,
        orderNumber,
        customerEmail: formData.email,
      });

      // Simulate payment authorization & verification
      const verifySuccess = paymentService.verifyPaymentSignature({
        razorpayOrderId: paymentOrder.gatewayOrderId,
        razorpayPaymentId: `pay_${Date.now()}`,
        razorpaySignature: "mock_sig_verified_aauroshe",
      });

      if (verifySuccess) {
        setOrderCompleted({
          orderNumber,
          date: new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          total: totals.total,
          items: [...items],
          shippingAddress: formData,
        });
        clearCart();
      }
    } catch (err) {
      console.error("Order processing error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderCompleted) {
    return (
      <div className="bg-neutral-50 min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-neutral-200/80 p-8 sm:p-12 shadow-sm text-center">
            <div className="w-16 h-16 bg-amber-50 border border-amber-300/50 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-700">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-[0.3em] text-amber-800 font-semibold block">
              Payment Confirmed & Secured
            </span>

            <h1 className="text-3xl font-serif font-normal text-neutral-900 mt-2">
              Thank You for Your Patronage
            </h1>

            <p className="text-xs sm:text-sm text-neutral-500 font-light mt-2">
              Your order <strong className="text-neutral-900 font-mono">#{orderCompleted.orderNumber}</strong> has been received at our atelier. A formal receipt and certificate of authenticity have been sent to {orderCompleted.shippingAddress.email}.
            </p>

            {/* Order Details Card */}
            <div className="mt-8 border border-neutral-100 bg-neutral-50/50 p-6 text-left space-y-4">
              <div className="flex justify-between text-xs border-b border-neutral-200 pb-3">
                <span className="text-neutral-500">Estimated Delivery</span>
                <span className="font-medium text-neutral-900">3–5 Business Days (Insured White Glove)</span>
              </div>

              <div className="flex justify-between text-xs border-b border-neutral-200 pb-3">
                <span className="text-neutral-500">Shipping Destination</span>
                <span className="font-medium text-neutral-900 text-right">
                  {orderCompleted.shippingAddress.fullName}, {orderCompleted.shippingAddress.city}
                </span>
              </div>

              <div className="flex justify-between text-sm font-semibold pt-1">
                <span>Amount Settled</span>
                <span className="font-serif">{formatINR(orderCompleted.total)}</span>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <Link href="/shop">
                <Button variant="gold" size="md">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-neutral-50 min-h-screen py-20 text-center">
        <div className="max-w-md mx-auto px-4">
          <h2 className="text-2xl font-serif text-neutral-900">Your shopping bag is empty</h2>
          <p className="text-xs text-neutral-500 mt-2">
            Please add items from our catalogue before proceeding to checkout.
          </p>
          <Link href="/shop" className="mt-6 inline-block">
            <Button variant="gold" size="md">
              Discover Catalogue
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Boutique</span>
          </Link>
          <h1 className="text-3xl font-serif font-normal text-neutral-900 mt-3">
            Secure Luxury Checkout
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Shipping and Payment Form (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Section 1: Customer & Delivery Address */}
            <div className="bg-white p-6 sm:p-8 border border-neutral-200/80 shadow-sm">
              <h2 className="text-sm font-serif uppercase tracking-widest text-neutral-900 font-semibold mb-6 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-sans">
                  1
                </span>
                <span>Delivery & Client Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-neutral-600 uppercase tracking-wider mb-1 text-[11px] font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 p-3 text-xs focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 uppercase tracking-wider mb-1 text-[11px] font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 p-3 text-xs focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 uppercase tracking-wider mb-1 text-[11px] font-medium">
                    Telephone (SMS Delivery Updates)
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 p-3 text-xs focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-600 uppercase tracking-wider mb-1 text-[11px] font-medium">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    required
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 p-3 text-xs focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-600 uppercase tracking-wider mb-1 text-[11px] font-medium">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 p-3 text-xs focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 uppercase tracking-wider mb-1 text-[11px] font-medium">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 p-3 text-xs focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 uppercase tracking-wider mb-1 text-[11px] font-medium">
                    State / Region
                  </label>
                  <input
                    type="text"
                    required
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 p-3 text-xs focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 uppercase tracking-wider mb-1 text-[11px] font-medium">
                    Postal PIN Code
                  </label>
                  <input
                    type="text"
                    required
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full bg-neutral-50 border border-neutral-200 p-3 text-xs focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 uppercase tracking-wider mb-1 text-[11px] font-medium">
                    Country
                  </label>
                  <input
                    type="text"
                    disabled
                    value="India"
                    className="w-full bg-neutral-100 border border-neutral-200 p-3 text-xs text-neutral-600 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Payment Instrument */}
            <div className="bg-white p-6 sm:p-8 border border-neutral-200/80 shadow-sm">
              <h2 className="text-sm font-serif uppercase tracking-widest text-neutral-900 font-semibold mb-6 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-sans">
                  2
                </span>
                <span>Payment Method</span>
              </h2>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 border border-neutral-900 bg-amber-50/30 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "RAZORPAY"}
                      onChange={() => setPaymentMethod("RAZORPAY")}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <span className="text-xs font-semibold text-neutral-900 block">
                        Razorpay Gateway (Cards, UPI, Netbanking, EMIs)
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        Official Payment Gateway Integration per Quotation Module 5
                      </span>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-amber-800" />
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary Column (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 border border-neutral-200/80 shadow-sm sticky top-28 space-y-6">
              <h2 className="text-sm font-serif uppercase tracking-widest text-neutral-900 font-semibold pb-4 border-b border-neutral-100">
                Order Summary ({totals.itemCount} items)
              </h2>

              {/* Items List Mini */}
              <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 text-xs items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-10 h-12 bg-neutral-100 shrink-0 border border-neutral-200">
                        <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="truncate">
                        <p className="font-serif font-medium text-neutral-900 truncate">{item.title}</p>
                        <p className="text-[10px] text-neutral-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium text-neutral-900 shrink-0">
                      {formatINR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs text-neutral-600 pt-4 border-t border-neutral-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-neutral-900">{formatINR(totals.subtotal)}</span>
                </div>

                {totals.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Privilege Discount ({totals.appliedCoupon})</span>
                    <span>-{formatINR(totals.discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Insured Delivery</span>
                  <span>{totals.shipping === 0 ? "Complimentary" : formatINR(totals.shipping)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated GST (18%)</span>
                  <span>{formatINR(totals.tax)}</span>
                </div>

                <div className="flex justify-between text-base font-semibold text-neutral-950 pt-3 border-t border-neutral-200">
                  <span>Grand Total</span>
                  <span className="font-serif text-lg">{formatINR(totals.total)}</span>
                </div>
              </div>

              <Button
                type="submit"
                variant="gold"
                size="lg"
                isLoading={isProcessing}
                className="w-full"
              >
                <span>Authorize & Place Order</span>
              </Button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 uppercase tracking-widest pt-2">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Encrypted 256-Bit SSL Checkout</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
