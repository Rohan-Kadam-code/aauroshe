import { Product, ProductFilterParams } from "@/core/entities/product";
import { CATEGORIES, CategoryDefinition } from "@/core/constants/categories";
import { MOCK_PRODUCTS } from "./mockCatalogData";

export interface ICatalogService {
  getAllProducts(params?: ProductFilterParams): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getFeaturedProducts(limit?: number): Promise<Product[]>;
  getNewArrivals(limit?: number): Promise<Product[]>;
  getProductsByCategory(categorySlug: string): Promise<Product[]>;
  getCategories(): Promise<readonly CategoryDefinition[]>;
  getCategoryBySlug(slug: string): Promise<CategoryDefinition | null>;
  searchProducts(query: string): Promise<Product[]>;
}

/**
 * CatalogService - Decoupled, Pure, and Resilient
 * Blast Radius: Isolated to Catalog Domain.
 */
export class CatalogService implements ICatalogService {
  private products: Product[] = MOCK_PRODUCTS;
  private categories: readonly CategoryDefinition[] = CATEGORIES;

  async getAllProducts(params?: ProductFilterParams): Promise<Product[]> {
    let result = [...this.products];

    if (!params) return result;

    if (params.category && params.category !== "all") {
      result = result.filter(
        (p) =>
          p.categorySlug.toLowerCase() === params.category?.toLowerCase() ||
          p.categoryId.toLowerCase() === params.category?.toLowerCase()
      );
    }

    if (params.search && params.search.trim().length > 0) {
      const q = params.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q)
      );
    }

    if (params.badge) {
      result = result.filter((p) => p.badge === params.badge);
    }

    if (params.minPrice !== undefined) {
      result = result.filter((p) => p.price >= (params.minPrice ?? 0));
    }

    if (params.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= (params.maxPrice ?? Infinity));
    }

    if (params.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    if (params.sort) {
      switch (params.sort) {
        case "price-asc":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          result.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          result.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case "featured":
        default:
          result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
          break;
      }
    }

    return result;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const product = this.products.find((p) => p.slug === slug);
    return product ? { ...product } : null;
  }

  async getFeaturedProducts(limit = 6): Promise<Product[]> {
    return this.products.filter((p) => p.isFeatured).slice(0, limit);
  }

  async getNewArrivals(limit = 6): Promise<Product[]> {
    return this.products.filter((p) => p.isNewArrival).slice(0, limit);
  }

  async getProductsByCategory(categorySlug: string): Promise<Product[]> {
    return this.products.filter(
      (p) => p.categorySlug.toLowerCase() === categorySlug.toLowerCase()
    );
  }

  async getCategories(): Promise<readonly CategoryDefinition[]> {
    return this.categories;
  }

  async getCategoryBySlug(slug: string): Promise<CategoryDefinition | null> {
    const cat = this.categories.find((c) => c.slug === slug);
    return cat ? { ...cat } : null;
  }

  async searchProducts(query: string): Promise<Product[]> {
    return this.getAllProducts({ search: query });
  }
}

export const catalogService = new CatalogService();
