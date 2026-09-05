"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/core/entities/product";
import { Badge } from "@/components/atoms/Badge";
import { PriceTag } from "@/components/atoms/PriceTag";
import { RatingStars } from "@/components/atoms/RatingStars";
import { Button } from "@/components/atoms/Button";
import { QuantitySelector } from "@/components/molecules/QuantitySelector";
import { ProductCard } from "@/components/molecules/ProductCard";
import { useCart } from "@/context/CartContext";
import {
  ShieldCheck,
  Truck,
  Sparkles,
  ShoppingBag,
  Check,
  ChevronRight,
  Heart,
  Share2,
} from "lucide-react";

export interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0] || product.thumbnail);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id || ""
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const currentPrice = activeVariant ? activeVariant.price : product.price;
  const originalPrice = activeVariant?.originalPrice || product.originalPrice;

  const handleAddToCart = () => {
    addItem(product, quantity, activeVariant?.id);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8 uppercase tracking-widest font-light">
          <Link href="/" className="hover:text-neutral-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <Link
            href={`/shop?category=${product.categorySlug}`}
            className="hover:text-neutral-900 transition-colors"
          >
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-neutral-900 font-medium truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Gallery Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex sm:flex-col gap-3 shrink-0 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-24 bg-neutral-100 border overflow-hidden transition-all ${
                      selectedImage === img
                        ? "border-neutral-900 ring-1 ring-neutral-900"
                        : "border-neutral-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Featured Image */}
            <div className="relative aspect-[4/5] flex-1 bg-neutral-100 border border-neutral-200/80 overflow-hidden">
              <Image
                src={selectedImage}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />

              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge type={product.badge} />
                </div>
              )}
            </div>
          </div>

          {/* Details & Actions Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category */}
              <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-semibold block">
                {product.categoryName}
              </span>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-neutral-900 font-normal mt-2 leading-tight">
                {product.title}
              </h1>

              {/* Subtitle */}
              <p className="text-sm text-neutral-500 font-light mt-1">
                {product.subtitle}
              </p>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-4">
                <RatingStars
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  size="md"
                />
                <span className="text-xs text-neutral-300">|</span>
                <span className="text-xs text-emerald-700 font-medium">In Stock & Verified</span>
              </div>

              {/* Price */}
              <div className="mt-6 py-4 border-y border-neutral-100">
                <PriceTag
                  price={currentPrice}
                  originalPrice={originalPrice}
                  size="xl"
                />
                <p className="text-[11px] text-neutral-400 mt-1 font-light">
                  Inclusive of all luxury taxes & duties. Complimentary insured shipping.
                </p>
              </div>

              {/* Description */}
              <div className="mt-6">
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  {product.longDescription || product.description}
                </p>
              </div>

              {/* Variants Selector */}
              {product.variants.length > 1 && (
                <div className="mt-8">
                  <span className="text-xs uppercase tracking-widest text-neutral-700 font-medium block mb-3">
                    Select Edition / Size:
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`px-4 py-2.5 text-xs font-medium tracking-wider uppercase border transition-all cursor-pointer ${
                          selectedVariantId === v.id
                            ? "bg-neutral-900 text-amber-300 border-neutral-900 shadow-sm"
                            : "bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400"
                        }`}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Fragrance Notes / Materials */}
              {product.fragranceNotes && (
                <div className="mt-8 p-4 bg-amber-50/50 border border-amber-200/60">
                  <h4 className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-3">
                    Olfactory Pyramid Notes
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <strong className="block text-neutral-900 text-[11px] uppercase tracking-wider">Top</strong>
                      <span className="text-neutral-600 font-light">{product.fragranceNotes.top.join(", ")}</span>
                    </div>
                    <div>
                      <strong className="block text-neutral-900 text-[11px] uppercase tracking-wider">Heart</strong>
                      <span className="text-neutral-600 font-light">{product.fragranceNotes.heart.join(", ")}</span>
                    </div>
                    <div>
                      <strong className="block text-neutral-900 text-[11px] uppercase tracking-wider">Base</strong>
                      <span className="text-neutral-600 font-light">{product.fragranceNotes.base.join(", ")}</span>
                    </div>
                  </div>
                </div>
              )}

              {product.materials && (
                <div className="mt-6 p-4 bg-neutral-50 border border-neutral-200/60">
                  <h4 className="text-xs uppercase tracking-widest text-neutral-900 font-semibold mb-2">
                    Materials & Provenance
                  </h4>
                  <ul className="text-xs text-neutral-600 space-y-1 font-light list-disc list-inside">
                    {product.materials.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity & Add to Cart Controls */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <QuantitySelector
                  quantity={quantity}
                  max={activeVariant?.stockCount || 10}
                  onChange={setQuantity}
                  size="md"
                />

                <Button
                  onClick={handleAddToCart}
                  variant="gold"
                  size="lg"
                  className="flex-1"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-950" />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </Button>
              </div>

              {/* Reassurances */}
              <div className="mt-8 pt-6 border-t border-neutral-100 space-y-2 text-xs text-neutral-500 font-light">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Complimentary White Glove Delivery on all prepaid orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>100% Certified Authentic with serial tamper-proof seal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Includes luxury signature gift packaging & monogrammed box</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Creations */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-neutral-200">
            <h3 className="text-2xl font-serif text-neutral-900 mb-8 text-center">
              Complementary Creations from {product.categoryName}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
