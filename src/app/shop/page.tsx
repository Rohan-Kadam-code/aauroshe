import React from "react";
import { catalogService } from "@/services/catalog/catalogService";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { CATEGORIES } from "@/core/constants/categories";

interface ShopPageProps {
  searchParams: Promise<{ category?: string; search?: string; sort?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedParams = await searchParams;
  const initialCategory = resolvedParams?.category || "all";
  const searchQuery = resolvedParams?.search || "";

  const allProducts = await catalogService.getAllProducts({
    category: initialCategory !== "all" ? initialCategory : undefined,
    search: searchQuery || undefined,
  });

  const activeCategoryObj = CATEGORIES.find((c) => c.slug === initialCategory);

  return (
    <div className="bg-neutral-50 min-h-screen py-10">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-neutral-900 text-white p-8 sm:p-12 border border-neutral-800 relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-300 font-medium block mb-2">
              {activeCategoryObj ? activeCategoryObj.tagline : "Haute Maison Catalogue"}
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-normal">
              {activeCategoryObj ? activeCategoryObj.name : "All Creations"}
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-neutral-300 max-w-2xl font-light leading-relaxed">
              {activeCategoryObj
                ? activeCategoryObj.description
                : "Explore our complete repertoire of high perfumery, fine jewellery, couture leathercraft, and designer evening wear."}
            </p>
          </div>
        </div>
      </div>

      <ProductGrid
        products={allProducts}
        initialCategory={initialCategory}
        showFilters={true}
        title="Explore Catalogue"
        subtitle="Select from our 10 luxury maisons"
      />
    </div>
  );
}
