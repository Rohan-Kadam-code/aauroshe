import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SECURITY_HEADERS } from "@/lib/security/headers";
import { ADMIN_COOKIE_NAME } from "@/lib/security/adminAuth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check Admin Route Authentication Guard
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    if (!sessionCookie || sessionCookie !== "aauroshe_secure_admin_session_token_2026") {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Guard Admin APIs
  if (pathname.startsWith("/api/admin") && pathname !== "/api/admin/auth") {
    const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    if (!sessionCookie || sessionCookie !== "aauroshe_secure_admin_session_token_2026") {
      return NextResponse.json(
        { success: false, error: "Access denied. Valid administrator session required." },
        { status: 401 }
      );
    }
  }

  const response = NextResponse.next();

  // 3. Attach OWASP security headers
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, logo images
     */
    "/((?!_next/static|_next/image|favicon.ico|logo.*\\.png|.*\\.svg).*)",
  ],
};
