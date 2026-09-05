import { NextResponse } from "next/server";
import { paymentService } from "@/services/payment/paymentService";
import { z } from "zod";

const verifyPayloadSchema = z.object({
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = verifyPayloadSchema.parse(body);

    const isValid = paymentService.verifyPaymentSignature(validated);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified and order confirmed",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Verification failed" },
      { status: 400 }
    );
  }
}
