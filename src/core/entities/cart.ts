import { Product, ProductVariant } from "./product";

export interface CartItem {
  id: string; // Unique cart line ID
  productId: string;
  productSlug: string;
  variantId?: string;
  title: string;
  categoryName: string;
  variantName?: string;
  price: number;
  quantity: number;
  thumbnail: string;
  maxStock: number;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
  appliedCoupon?: string;
}

export interface CartState {
  items: CartItem[];
  totals: CartTotals;
  isOpen: boolean;
}
