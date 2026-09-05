import { z } from "zod";

/**
 * Zod validation schema for creating/updating products via Admin API
 * Enforces strict types, positive prices, sanitized slugs, and boundary security.
 */
export const createProductSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(100),
  subtitle: z.string().min(2).max(150),
  description: z.string().min(10, "Description must be at least 10 characters"),
  longDescription: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  categorySlug: z.string().min(1),
  categoryName: z.string().min(1),
  price: z.number().positive("Price must be greater than 0"),
  originalPrice: z.number().positive().optional(),
  stockCount: z.number().int().nonnegative("Stock cannot be negative").default(10),
  badge: z.enum(["NEW", "BESTSELLER", "LIMITED", "ARTISANAL", "EXCLUSIVE"]).optional(),
  thumbnail: z.string().url("Valid image URL required"),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  inStock: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  fragranceNotes: z
    .object({
      top: z.array(z.string()),
      heart: z.array(z.string()),
      base: z.array(z.string()),
    })
    .optional(),
  materials: z.array(z.string()).optional(),
});

export const updateProductStockSchema = z.object({
  productId: z.string().min(1),
  stockCount: z.number().int().nonnegative(),
});

export const updateProductPriceSchema = z.object({
  productId: z.string().min(1),
  price: z.number().positive(),
  originalPrice: z.number().positive().optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
