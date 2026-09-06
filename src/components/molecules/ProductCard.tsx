"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/core/entities/product";
import { Badge } from "@/components/atoms/Badge";
import { PriceTag } from "@/components/atoms/PriceTag";
import { RatingStars } from "@/components/atoms/RatingStars";
import { ShoppingBag, Eye, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addItem(product, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <div className={`group relative flex flex-col bg-white border border-[#ede6e7] hover:border-[#4a1525]/35 transition-all duration-500 overflow-hidden ${className || ""}`}>
      {/* Image Container with Luxury Overlay */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-[4/5] w-full bg-[#faf8f6] overflow-hidden block"
      >
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Status Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge type={product.badge} />
          </div>
        )}

        {/* Quick Action Overlay (Desktop) */}
        <div className="absolute inset-0 bg-[#23060f]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 z-10">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full bg-white/95 hover:bg-[#4a1525] text-[#1e1417] hover:text-white backdrop-blur-md py-3 px-4 text-xs font-medium uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#7e3045] font-semibold block">
            {product.categoryName}
          </span>

          {/* Title */}
          <Link
            href={`/product/${product.slug}`}
            className="block mt-1.5 text-sm font-serif font-medium text-[#1e1417] hover:text-[#4a1525] transition-colors line-clamp-1"
          >
            {product.title}
          </Link>

          {/* Subtitle */}
          <p className="mt-1 text-xs text-neutral-500 line-clamp-1 font-light">
            {product.subtitle}
          </p>
        </div>

        {/* Rating and Price */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <PriceTag
            price={product.price}
            originalPrice={product.originalPrice}
            size="sm"
          />

          <RatingStars
            rating={product.rating}
            reviewCount={product.reviewCount}
            showCount={false}
          />
        </div>
      </div>
    </div>
  );
};
