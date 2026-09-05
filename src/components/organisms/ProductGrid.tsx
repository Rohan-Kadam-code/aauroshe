"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/core/entities/product";
import { CATEGORIES } from "@/core/constants/categories";
import { ProductCard } from "@/components/molecules/ProductCard";
import { FilterPill } from "@/components/molecules/FilterPill";
import { SlidersHorizontal, Sparkles } from "lucide-react";

export interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  initialCategory?: string;
  showFilters?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title = "Curated Masterpieces",
  subtitle = "Handcrafted with uncompromising devotion to beauty and luxury.",
  initialCategory = "all",
  showFilters = true,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSort, setSelectedSort] = useState<string>("featured");

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== "all") {
      list = list.filter(
        (p) =>
          p.categorySlug.toLowerCase() === selectedCategory.toLowerCase() ||
          p.categoryId.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    switch (selectedSort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "featured":
      default:
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return list;
  }, [products, selectedCategory, selectedSort]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-amber-800 font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exquisite Catalogue</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-neutral-900 tracking-tight">
            {title}
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base mt-2 font-light">
            {subtitle}
          </p>
        </div>

        {/* Filter Controls Strip */}
        {showFilters && (
          <div className="mb-10 space-y-4">
            {/* Category Filter Pills (Scrollable on Mobile) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <FilterPill
                label="All Categories"
                isActive={selectedCategory === "all"}
                onClick={() => setSelectedCategory("all")}
                count={products.length}
              />
              {CATEGORIES.map((cat) => {
                const count = products.filter((p) => p.categorySlug === cat.slug).length;
                return (
                  <FilterPill
                    key={cat.id}
                    label={cat.name}
                    isActive={selectedCategory === cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    count={count}
                  />
                );
              })}
            </div>

            {/* Sorting & Results Count Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-xs text-neutral-500">
              <span>
                Showing <strong className="text-neutral-900">{filteredProducts.length}</strong> creations
              </span>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
                <label htmlFor="sort-select" className="sr-only">Sort Creations</label>
                <select
                  id="sort-select"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="bg-transparent border border-neutral-200 text-neutral-800 text-xs py-1.5 px-2.5 focus:outline-none focus:border-neutral-900 cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-neutral-50 border border-neutral-200/60 p-8">
            <p className="text-neutral-600 font-serif text-lg">No creations match your active filters.</p>
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className="mt-4 text-xs uppercase tracking-widest text-amber-800 font-semibold underline underline-offset-4 cursor-pointer"
            >
              Reset Category Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
