import React from "react";
import Link from "next/link";
import { CATEGORIES } from "@/core/constants/categories";
import { CategoryCard } from "@/components/molecules/CategoryCard";
import { ArrowRight } from "lucide-react";

export const CategoryShowcase: React.FC = () => {
  return (
    <section className="py-20 bg-neutral-50 border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-semibold block mb-2">
              The Ten Maisons
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-neutral-900 tracking-tight">
              Curated Luxury Categories
            </h2>
          </div>

          <Link
            href="/shop"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-900 hover:text-amber-700 font-medium group transition-colors"
          >
            <span>View Complete Catalogue</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid (Covering all 10 quotation categories) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};
