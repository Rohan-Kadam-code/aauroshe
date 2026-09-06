# Proposal: Interactive Scrollytelling Hero (Editorial Muse & Dynamic Collection Reveal)

**Status:** Offline Design Proposal (Preserved for Client Review & Future Release)  
**Preview Route:** `/preview/hero-scrollytelling`  
**Production Status:** Main storefront (`src/app/page.tsx` with static `HeroBanner.tsx`) remains active, untouched, and in production.

---

## 1. Concept Overview

This alternative proposal reimagines the hero section into an interactive **Living Lookbook**:
- **Landscape Editorial Backdrop:** Features the brand's muse styled in luxurious settings.
- **Scroll-Driven Transitions:** As the customer scrolls down, the viewport pins (`sticky top-0 h-screen`) while smoothly transitioning between the brand's 4 core lifestyle worlds.
- **Floating Luxury Spotlight Cards:** Each transition dynamically reveals a high-fashion spotlight card featuring the specific creation the muse is wearing, including category, title, material/olfactory notes, pricing in INR, and a direct link.
- **Dual User Navigation:** Customers can either scroll naturally or click the timeline tabs (`01 Parfumerie`, `02 Fine Jewellery`, `03 Leather Goods`, `04 Haute Apparel`) at the bottom.

---

## 2. The 4 Editorial Chapters

```
[01 Haute Parfumerie]  ──►  [02 Fine Jewellery]  ──►  [03 Leatherware]  ──►  [04 Haute Silks]
   • Paris Extrait             • Aura Vermeil Cuff       • Serpentine Handbag     • Nocturne Cape
   • Flacon on Velvet          • Sculptural 18K/925      • Tuscan Grain & Brass   • 28 Momme Silk
```

### Chapter 01: Haute Parfumerie
- **Landscape Visual:** Muse in evening wine velvet holding the signature crystal flacon in warm ambient candlelight.
- **Spotlight Creation:** *Paris Extrait de Parfum* (50ml pure parfum extrait, ₹6,400).
- **Olfactory Notes:** Bergamot, Damask Rose, Iris & Mysore Sandalwood.

### Chapter 02: Fine Jewellery
- **Landscape Visual:** Close-up on the muse wearing sculptural 18K vermeil cuffs and heirloom solitaire rings.
- **Spotlight Creation:** *Aura Sculpted 18K Vermeil Cuff* (Solid 925 Sterling Silver, ₹12,500).
- **Artisanal Notes:** Hand-polished mirror lustre, certified 925 hallmarks.

### Chapter 03: Couture Leatherware & Belts
- **Landscape Visual:** Muse styled in tailored outerwear, showcasing a full-grain Italian leather handbag and sculpted belt buckle.
- **Spotlight Creation:** *Serpentine Structured Handbag* (Full-grain Tuscan calfskin, ₹24,500).
- **Artisanal Notes:** Pure suede lining, custom brushed gold brass hardware.

### Chapter 04: Haute Silks & Couture
- **Landscape Visual:** Full-length fluid editorial silhouette of the muse in flowing midnight silk.
- **Spotlight Creation:** *Nocturne Draped Silk Evening Cape* (100% Mulberry Crepe de Chine, ₹32,000).
- **Artisanal Notes:** Hand-finished bias drape, handcrafted in New Delhi.

---

## 3. How to Test Offline

1. Start the local server:
   ```bash
   npm run dev
   ```
2. Open the dedicated isolated preview route in your browser:
   ```
   http://localhost:3000/preview/hero-scrollytelling
   ```
3. Test interactions:
   - Scroll gently to watch the chapters crossfade and the spotlight cards update.
   - Click the bottom timeline tabs (`01` to `04`) to jump directly.
   - Continue scrolling past the 4th chapter to verify seamless exit into the rest of the storefront.

---

## 4. How to Activate in the Future

When the client approves making this the primary hero on the homepage:
1. Open `src/app/page.tsx`.
2. Replace:
   ```tsx
   import { HeroBanner } from "@/components/organisms/HeroBanner";
   ```
   with:
   ```tsx
   import { HeroBannerScrollyProposal as HeroBanner } from "@/components/organisms/HeroBannerScrollyProposal";
   ```
3. The component is fully drop-in compatible with the existing layout and theme.
