import { NextResponse } from "next/server";
import { paymentService } from "@/services/payment/paymentService";
import { z } from "zod";

const createOrderSchema = z.object({
  amountInINR: z.number().positive(),
  orderNumber: z.string().min(1),
  customerEmail: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = createOrderSchema.parse(body);

    const paymentOrder = await paymentService.createPaymentOrder(validated);

    return NextResponse.json({
      success: true,
      data: paymentOrder,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.errors || err.message || "Failed to create payment order",
      },
      { status: 400 }
    );
  }
}
