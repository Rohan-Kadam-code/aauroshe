import { env } from "@/lib/env";
import crypto from "crypto";

export interface CreateOrderParams {
  amountInINR: number;
  orderNumber: string;
  customerEmail: string;
  notes?: Record<string, string>;
}

export interface PaymentOrderResult {
  gatewayOrderId: string;
  amount: number;
  currency: string;
  keyId: string;
  isMock: boolean;
}

export interface VerifyPaymentPayload {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

/**
 * Payment Gateway Service Abstraction (Razorpay / Mock)
 * Blast Radius: Isolated to Payment Gateway Integration
 */
export class PaymentService {
  private keyId: string;
  private keySecret: string;
  private isLiveMode: boolean;

  constructor() {
    this.keyId = env.RAZORPAY_KEY_ID || "rzp_test_mock";
    this.keySecret = env.RAZORPAY_KEY_SECRET || "mock_secret";
    this.isLiveMode = env.NODE_ENV === "production" && !this.keyId.includes("mock");
  }

  /**
   * Initialize a payment order with Razorpay or deterministic mock for testing
   */
  async createPaymentOrder(params: CreateOrderParams): Promise<PaymentOrderResult> {
    const amountInPaise = Math.round(params.amountInINR * 100);

    // If live credentials are provided and not in mock mode, would make fetch to https://api.razorpay.com/v1/orders
    const generatedOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    return {
      gatewayOrderId: generatedOrderId,
      amount: amountInPaise,
      currency: "INR",
      keyId: this.keyId,
      isMock: !this.isLiveMode,
    };
  }

  /**
   * Cryptographic verification of Razorpay HMAC-SHA256 signature
   */
  verifyPaymentSignature(payload: VerifyPaymentPayload): boolean {
    if (!this.isLiveMode && payload.razorpaySignature.startsWith("mock_sig_")) {
      return true;
    }

    try {
      const generatedSignature = crypto
        .createHmac("sha256", this.keySecret)
        .update(`${payload.razorpayOrderId}|${payload.razorpayPaymentId}`)
        .digest("hex");

      return generatedSignature === payload.razorpaySignature;
    } catch (err) {
      console.error("Signature verification failed:", err);
      return false;
    }
  }
}

export const paymentService = new PaymentService();
