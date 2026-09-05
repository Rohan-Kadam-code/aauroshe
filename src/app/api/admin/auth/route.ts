import { NextResponse } from "next/server";
import { verifyAdminCredentials, ADMIN_COOKIE_NAME } from "@/lib/security/adminAuth";
import { z } from "zod";

const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = loginSchema.parse(body);

    const isMatch = verifyAdminCredentials(validated.password);

    if (!isMatch) {
      // Simulate small delay to defend against brute-force timing
      await new Promise((r) => setTimeout(r, 400));
      return NextResponse.json(
        { success: false, error: "Invalid administrative credentials." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Admin session authenticated successfully.",
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: "aauroshe_secure_admin_session_token_2026",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Authentication error." },
      { status: 400 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Admin session ended.",
  });

  response.cookies.delete(ADMIN_COOKIE_NAME);
  return response;
}
