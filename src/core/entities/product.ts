export type ProductBadge = "NEW" | "BESTSELLER" | "LIMITED" | "ARTISANAL" | "EXCLUSIVE";

export interface ProductVariant {
  id: string;
  sku: string;
  name: string; // e.g., "100ml / Extrait", "Gold / Size M", "Ruby Velvet"
  price: number;
  originalPrice?: number;
  stockCount: number;
  inStock: boolean;
  attributes: Record<string, string>; // e.g. { size: "100ml", scent: "Oud Noir" }
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  categoryId: string;
  categorySlug: string;
  categoryName: string;
  price: number; // Base display price in INR
  originalPrice?: number; // For strikethrough comparison
  badge?: ProductBadge;
  images: string[];
  thumbnail: string;
  rating: number; // 0 to 5
  reviewCount: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  inStock: boolean;
  materials?: string[];
  fragranceNotes?: {
    top: string[];
    heart: string[];
    base: string[];
  };
  variants: ProductVariant[];
  createdAt: string;
}

export interface ProductFilterParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  badge?: string;
  sort?: "featured" | "price-asc" | "price-desc" | "rating" | "newest";
  inStockOnly?: boolean;
}
