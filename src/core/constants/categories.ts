export interface CategoryDefinition {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  featured: boolean;
  itemCount: number;
}

/**
 * 10 Official Brand Categories as specified in Client Quotation V1.0:
 * Perfumes, jewellery, handbags, nail paints, clothes, sunglasses, belts, skincare, makeup, pouches
 */
export const CATEGORIES: readonly CategoryDefinition[] = [
  {
    id: "cat_perfumes",
    slug: "perfumes",
    name: "Haute Parfumerie",
    tagline: "Rare Extraits & Artisanal Fragrances",
    description: "Hand-poured perfumes distilled with rare botanical essences and oud accords.",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop",
    featured: true,
    itemCount: 8,
  },
  {
    id: "cat_jewellery",
    slug: "jewellery",
    name: "Fine Jewellery",
    tagline: "18K Gold, Diamonds & Gemstones",
    description: "Handcrafted heirloom jewellery set with ethically sourced diamonds and pearls.",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
    featured: true,
    itemCount: 12,
  },
  {
    id: "cat_handbags",
    slug: "handbags",
    name: "Couture Handbags",
    tagline: "Full-Grain Italian Calfskin",
    description: "Architectural silhouettes crafted in supple leather with custom gilded brass hardware.",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    featured: true,
    itemCount: 10,
  },
  {
    id: "cat_clothes",
    slug: "clothes",
    name: "Designer Apparel",
    tagline: "Pure Silk, Cashmere & Tailored Cuts",
    description: "Flowing silk ensembles, structured blazers, and bespoke evening wear.",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    featured: true,
    itemCount: 14,
  },
  {
    id: "cat_skincare",
    slug: "skincare",
    name: "Botanical Skincare",
    tagline: "Active Phyto-Complexes & Youth Elixirs",
    description: "Clinical grade natural serums, revitalizing gold masks, and velvet moisturizers.",
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
    featured: true,
    itemCount: 9,
  },
  {
    id: "cat_makeup",
    slug: "makeup",
    name: "Prestige Cosmetics",
    tagline: "Luminous Finishes & Rich Pigments",
    description: "Velvet matte lipsticks, weightless foundation concentrates, and radiant bronzers.",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
    featured: false,
    itemCount: 11,
  },
  {
    id: "cat_sunglasses",
    slug: "sunglasses",
    name: "Luxury Eyewear",
    tagline: "Hand-Polished Japanese Acetate",
    description: "Modern UV400 lenses housed in handcrafted acetate and titanium frames.",
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
    featured: false,
    itemCount: 7,
  },
  {
    id: "cat_belts",
    slug: "belts",
    name: "Artisan Belts",
    tagline: "Sculptural Buckles & Saddle Leathers",
    description: "Reversible calfskin waist belts embellished with iconic monogram buckles.",
    imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop",
    featured: false,
    itemCount: 6,
  },
  {
    id: "cat_nail_paints",
    slug: "nail-paints",
    name: "Lacquer Nail Paints",
    tagline: "High-Gloss Chip-Resistant Enamels",
    description: "Toxin-free, long-wearing nail lacquers with mirror-like shine and jewel pigments.",
    imageUrl: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=800&auto=format&fit=crop",
    featured: false,
    itemCount: 8,
  },
  {
    id: "cat_pouches",
    slug: "pouches",
    name: "Travel Pouches & Clutches",
    tagline: "Quilted Velvet & Saffiano Leather",
    description: "Versatile vanity cases, evening clutches, and organized travel cases.",
    imageUrl: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=800&auto=format&fit=crop",
    featured: false,
    itemCount: 5,
  },
] as const;
