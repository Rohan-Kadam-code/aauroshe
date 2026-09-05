import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CategoryDefinition } from "@/core/constants/categories";
import { ArrowUpRight } from "lucide-react";

export interface CategoryCardProps {
  category: CategoryDefinition;
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, className }) => {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className={`group relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-neutral-800 block cursor-pointer ${className || ""}`}
    >
      {/* Background Image */}
      <Image
        src={category.imageUrl}
        alt={category.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover object-center opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end text-white">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300/90 font-medium">
            {category.tagline}
          </span>
          <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
            <ArrowUpRight className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-serif font-normal text-white mt-1 group-hover:text-amber-200 transition-colors">
          {category.name}
        </h3>

        <p className="text-xs text-neutral-300 line-clamp-2 mt-1.5 font-light opacity-80 group-hover:opacity-100 transition-opacity">
          {category.description}
        </p>
      </div>
    </Link>
  );
};
