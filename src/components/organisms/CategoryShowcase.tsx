import React from "react";
import Link from "next/link";
import { CATEGORIES } from "@/core/constants/categories";
import { CategoryCard } from "@/components/molecules/CategoryCard";
import { ArrowRight } from "lucide-react";

export const CategoryShowcase: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#ede6e7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Minimalist */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#ede6e7]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7e3045] font-semibold block mb-1">
              The Maisons
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1e1417]">
              Curated Categories
            </h2>
          </div>

          <Link
            href="/shop"
            className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#1e1417] hover:text-[#4a1525] font-medium group transition-colors"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
