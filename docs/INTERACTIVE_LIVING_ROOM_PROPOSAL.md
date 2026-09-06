# Concept Proposal: The Living Atelier — Interactive Celebrity Ensemble Experience

**Status:** Offline Design Proposal (Preserved for Client Pitch & Review)  
**Preview Route:** `/preview/interactive-salon`  
**Production Status:** Main storefront (`/` with static `HeroBanner.tsx`) remains active, untouched, and in production.

---

## 1. Executive Summary & Creative Vision

The **Living Atelier** transforms the standard e-commerce hero into an interactive cinematic editorial:
- **The Scene:** A chic, smiling celebrity muse relaxing in a sunlit Parisian penthouse salon with French arched windows, gilded mirrors, a wine-burgundy velvet sofa, and a white marble table with a glass of wine.
- **The Story in Motion:** She is actively applying AaurOSHe *Extrait de Parfum* to her wrist, while adorned in the complete AaurOSHe luxury lifestyle collection:
  1. **Haute Parfumerie:** In her hand, spritzing amber extrait.
  2. **Fine Jewellery:** 18K solid gold & vermeil cuffs on her wrists and delicate diamond choker around her neck.
  3. **Couture Handbag:** The *Monolith Structured Bag* resting on the velvet armchair beside her.
  4. **Artisan Belt:** Hand-buffed French box leather belt with sculpted gilded clasp cinching her waist.
  5. **Designer Apparel:** Fluid midnight silk crepe tailored trousers and shirt.
- **Interactive Collection Customizer ("Swap The Piece"):**
  - Pulsing luxury halo hotspots hover over each collection item on the muse.
  - Clicking any hotspot or category tab opens the **Ensemble Customizer**.
  - Customers can **cycle and update** the specific item in that category (e.g. switch the perfume from *Paris* to *For Her* or *Spice*; switch the bag from *The Monolith* to *Palazzo Suede Tote*; switch the belt to *Braided Tuscan Leather*).
  - The live price updates dynamically, enabling the customer to either:
    - **Add Selected Piece to Bag (₹XX,XXX)**
    - **Reserve Complete Ensemble (5 Pieces, ₹XX,XXX)** directly into their cart!

---

## 2. Interactive Hotspot & Collection Matrix

| Slot | Category | Pin Coordinates | Initial Featured Piece | Alternative Swappable Pieces |
| :--- | :--- | :--- | :--- | :--- |
| **01** | **Haute Parfumerie** | `top: 50%, left: 56%` | *Paris Extrait de Parfum* (₹3,800) | • *For Her Extrait* (₹3,800)<br>• *Spice Extrait* (₹3,800) |
| **02** | **Fine Jewellery** | `top: 41%, left: 50%` | *Aurora Diamond Choker 18K* (₹88,000) | • *Céleste Baroque Pearl Drops* (₹32,000)<br>• *Aura Sculpted 18K Cuff* (₹18,500) |
| **03** | **Couture Handbags** | `top: 70%, left: 69%` | *The Monolith Structured Bag* (₹49,500) | • *Palazzo Suede Slouch Tote* (₹42,000) |
| **04** | **Artisan Belts** | `top: 69%, left: 52%` | *Emblem Reversible Waist Belt* (₹16,500) | • *Braided Tuscan Leather Belt* (₹14,000) |
| **05** | **Designer Apparel** | `top: 52%, left: 45%` | *Seraphina Silk Crepe Ensemble* (₹36,000) | • *Nocturne Evening Silk Cape* (₹42,000) |

---

## 3. How to Test Offline

1. Ensure the local dev server is running (`npm run dev`).
2. Navigate to:
   ```
   http://localhost:3000/preview/interactive-salon
   ```
3. Test the interactive styling flow:
   - Click the pulsing halo pins directly on the model (e.g., her perfume bottle, the handbag on the sofa, her belt).
   - In the bottom right card, click any of the 3 thumbnail boxes under **"Switch Piece in this Category"** to update that item.
   - Notice the live price changes.
   - Click **"Add Piece"** to verify that it seamlessly adds to the shopping cart.
   - Click **"Reserve Full Look"** to add all 5 curated pieces simultaneously.

---

## 4. Activation in Production

When the client approves making this the primary hero experience on the live homepage:
1. Open `src/app/page.tsx`.
2. Replace:
   ```tsx
   import { HeroBanner } from "@/components/organisms/HeroBanner";
   ```
   with:
   ```tsx
   import { InteractiveLivingRoomHero as HeroBanner } from "@/components/organisms/InteractiveLivingRoomHero";
   ```
3. Zero database schema migrations required; 100% compatible with existing Next.js App Router and CartContext.
