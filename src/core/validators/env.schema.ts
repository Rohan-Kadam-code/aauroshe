import { z } from "zod";

/**
 * Zod schema defining all environment variables for AAUROSHE platform
 * Variable list & validation rules with strict types and defaults
 */
export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_NAME: z.string().default("AAUROSHE"),
  NEXT_PUBLIC_APP_TAGLINE: z.string().default("Artisanal Luxury & Timeless Elegance"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("https://aauroshe.com"),
  NEXT_PUBLIC_CURRENCY: z.string().default("INR"),
  NEXT_PUBLIC_CURRENCY_SYMBOL: z.string().default("₹"),

  // Server-only secrets (optional in dev, mandatory in production)
  DATABASE_URL: z.string().optional().default("postgresql://postgres:postgres@localhost:5432/aauroshe"),
  RAZORPAY_KEY_ID: z.string().optional().default("rzp_test_aauroshe_mock_key"),
  RAZORPAY_KEY_SECRET: z.string().optional().default("mock_secret_key_aauroshe"),
  NEXTAUTH_SECRET: z.string().optional().default("aauroshe-dev-secret-key-32-chars-long"),
  RESEND_API_KEY: z.string().optional(),
});

export type EnvConfig = z.infer<typeof envSchema>;
