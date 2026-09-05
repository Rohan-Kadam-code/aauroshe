import { cookies } from "next/headers";
import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "aauroshe_admin_session";
const DEFAULT_ADMIN_TOKEN = "aauroshe_secure_admin_session_token_2026";

/**
 * Constant-time comparison to prevent timing attacks during authentication
 */
export function verifyAdminCredentials(inputPassword: string): boolean {
  const masterPassword = process.env.ADMIN_PASSWORD || "AaurosheAdmin@2026";

  const bufferInput = Buffer.from(inputPassword);
  const bufferMaster = Buffer.from(masterPassword);

  if (bufferInput.length !== bufferMaster.length) {
    return false;
  }

  return crypto.timingSafeEqual(bufferInput, bufferMaster);
}

/**
 * Checks if incoming request has a valid admin session cookie
 */
export async function isAuthenticatedAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    return sessionToken === DEFAULT_ADMIN_TOKEN;
  } catch {
    return false;
  }
}
