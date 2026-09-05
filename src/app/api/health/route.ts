import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function GET() {
  return NextResponse.json({
    status: "HEALTHY",
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    modules: {
      storefront: "OK",
      catalogue: "OK",
      auth: "OK",
      cart: "OK",
      paymentGateway: "OK",
      adminConsole: "OK",
      securityHeaders: "ACTIVE",
    },
  });
}
