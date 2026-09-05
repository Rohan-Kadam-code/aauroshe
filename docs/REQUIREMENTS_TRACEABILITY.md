# Requirements Traceability Matrix (RTM)

**Project:** AAUROSHE Luxury E-Commerce Platform  
**Quotation Reference:** `Aauroshe_Ecommerce_Quotation_V1.0.xlsx`  
**Standard:** Atomic Architecture & Low Blast Radius Isolation  

---

## 1. Traceability Mapping

| Module # | Quotation Scope Requirement | Source Code Component(s) | Decoupled Service / Entity | Gate Verification / Tests |
| :--- | :--- | :--- | :--- | :--- |
| **#1 Storefront** | Home, shop, category, product, cart, checkout pages with mobile-first responsive luxury UI | `src/app/page.tsx`<br>`src/app/shop/page.tsx`<br>`src/app/product/[slug]/page.tsx`<br>`src/app/checkout/page.tsx` | `src/components/templates/StorefrontLayout.tsx`<br>`src/components/organisms/` | Visual regression, viewport responsiveness, build check |
| **#2 Catalogue** | Categories, subcategories, products, variants, prices, images, stock across 10 luxury categories | `src/core/constants/categories.ts`<br>`src/core/entities/product.ts`<br>`src/services/catalog/mockCatalogData.ts` | `src/services/catalog/catalogService.ts`<br>`src/app/api/catalog/route.ts` | Dynamic category filtering, search keyword tests, sorting accuracy |
| **#3 Authentication** | Registration, login, session security, role-based admin access | `src/core/entities/user.ts`<br>`src/middleware.ts` | `src/lib/security/headers.ts`<br>`src/app/admin/page.tsx` | Role-based route guard & token validation |
| **#4 Cart & Checkout** | Cart drawer, address form, promo code engine, live subtotal/tax/shipping calculations | `src/components/organisms/CartDrawer.tsx`<br>`src/app/checkout/page.tsx` | `src/services/cart/cartService.ts`<br>`src/context/CartContext.tsx` | Free shipping thresholds, 10% coupon discount math, quantity bounds |
| **#5 Payment** | Razorpay payment initiation, order creation, HMAC-SHA256 signature verification | `src/services/payment/paymentService.ts`<br>`src/app/api/payment/create-order/route.ts`<br>`src/app/api/payment/verify/route.ts` | `src/core/entities/order.ts`<br>`src/lib/env.ts` | Cryptographic signature validation, mock and live payment payload tests |
| **#6 Admin Console** | Admin-controlled catalogue, category overview, release gate inspection | `src/app/admin/page.tsx` | `src/services/catalog/catalogService.ts` | Admin CRUD simulation & Gate Release verification dashboard |
| **#7 Deployment & QA** | Production build, environment configuration, gate release dump pipeline | `scripts/build-gate-release.mjs`<br>`scripts/audit-blast-radius.mjs`<br>`release/` | Next.js App Router compiler, Docker/Vercel/Railway configs | Clean typecheck, production build pass, blast radius zero cycles |
| **#8 SEO & Analytics** | Metadata, OpenGraph cards, Google font preconnects, semantic HTML5 | `src/app/layout.tsx`<br>`src/app/sitemap.ts` | `src/core/constants/brand.ts` | Meta title/description audit, OpenGraph tag validation |
| **Cyber Security** | Security headers (CSP, HSTS, X-Frame-Options), Zod validation, secret isolation | `src/lib/security/headers.ts`<br>`src/middleware.ts`<br>`src/core/validators/env.schema.ts` | `src/lib/env.ts` | OWASP security header inspection, secret leakage prevention |

---

## 2. Blast Radius & Complexity Classification

| Layer | Complexity Rating | Blast Radius Impact | Coupling Rules |
| :--- | :--- | :--- | :--- |
| **Atoms** | Low | Very Low | Must have ZERO imports from Molecules, Organisms, Templates, or Pages. |
| **Molecules** | Low-Medium | Low | May only import Atoms or Pure Utilities. No Organism imports. |
| **Organisms** | Medium | Low-Medium | May import Atoms, Molecules, Context, or Core Constants. |
| **Services** | Medium-High | Isolated | Pure domain functions. Zero React/DOM dependencies. 100% unit testable. |
| **APIs** | Medium | Isolated | Protected by Zod payload validation and security middleware. |
