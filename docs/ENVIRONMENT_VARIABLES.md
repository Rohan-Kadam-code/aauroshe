# Environment Variables & Configuration Dictionary

This document provides the definitive dictionary of all environment variables for the **AAUROSHE Platform**, including their security sensitivity, default values, and validation constraints.

---

## Variable Dictionary

| Variable Name | Environment Target | Security Level | Required? | Default / Example Value | Description & Constraints |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `NODE_ENV` | All | Public | No | `development` | Node runtime stage: `development`, `test`, `production` |
| `NEXT_PUBLIC_APP_NAME` | Client & Server | Public | No | `AAUROSHE` | Brand name displayed across navigation, meta tags, and emails |
| `NEXT_PUBLIC_APP_TAGLINE`| Client & Server | Public | No | `Artisanal Luxury & Timeless Elegance` | Brand subtitle and header tagline |
| `NEXT_PUBLIC_APP_URL` | Client & Server | Public | No | `https://aauroshe.com` | Canonical base URL used for sitemaps and OpenGraph tags |
| `NEXT_PUBLIC_CURRENCY` | Client & Server | Public | No | `INR` | Standard ISO currency code |
| `NEXT_PUBLIC_CURRENCY_SYMBOL` | Client & Server | Public | No | `₹` | Currency display glyph |
| `DATABASE_URL` | Server Only | **HIGH SECRET** | Yes (Prod) | `postgresql://user:pass@host:5432/aauroshe` | PostgreSQL database connection string with SSL |
| `RAZORPAY_KEY_ID` | Client & Server | Public Key | Yes (Prod) | `rzp_test_...` | Public Razorpay key used in checkout frontend |
| `RAZORPAY_KEY_SECRET` | Server Only | **HIGH SECRET** | Yes (Prod) | `secret_...` | Razorpay webhook & cryptographic signature secret |
| `NEXTAUTH_SECRET` | Server Only | **HIGH SECRET** | Yes (Prod) | `32_char_random_secret` | JWT encryption and session cookie signing key |
| `RESEND_API_KEY` | Server Only | **HIGH SECRET** | No | `re_...` | API key for transactional emails (Order confirmation, invoice) |

---

## Validation & Fallbacks

All environment variables are parsed and strictly validated at runtime through `src/core/validators/env.schema.ts`. If an invalid or missing variable is detected during development, a non-blocking fallback is applied with a warning log to maintain developer velocity without failing silently in production.
