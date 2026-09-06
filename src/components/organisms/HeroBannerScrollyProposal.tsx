"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ArrowUpRight } from "lucide-react";
import { formatINR } from "@/lib/utils";

export interface Chapter {
  id: string;
  num: string;
  category: string;
  headline: string;
  subheadline: string;
  museImage: string;
  product: {
    title: string;
    subtitle: string;
    categoryName: string;
    price: number;
    originalPrice?: number;
    image: string;
    slug: string;
    details: string;
  };
}

const CHAPTERS: Chapter[] = [
  {
    id: "parfumerie",
    num: "01",
    category: "Haute Parfumerie",
    headline: "The Scent of Elegance",
    subheadline: "Hand-poured extraits distilled from rare Grasse botanicals and Mysore sandalwood.",
    museImage: "/images/hero-bg.jpg",
    product: {
      title: "Paris Extrait de Parfum",
      subtitle: "50ml Pure Parfum Extrait",
      categoryName: "Fragrances",
      price: 6400,
      originalPrice: 7800,
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop",
      slug: "paris-extrait-de-parfum",
      details: "Top: Bergamot & Pink Pepper • Heart: Damask Rose & Iris • Base: Amber, Mysore Sandalwood",
    },
  },
  {
    id: "jewellery",
    num: "02",
    category: "Fine Jewellery",
    headline: "Sculpted in 18K & Silver",
    subheadline: "Heirloom metalwork hand-finished with architectural proportion and timeless grace.",
    museImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1920&auto=format&fit=crop",
    product: {
      title: "Aura Sculpted 18K Vermeil Cuff",
      subtitle: "Solid 925 Sterling Silver with 18K Gold Finish",
      categoryName: "Fine Jewellery",
      price: 12500,
      originalPrice: 14800,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
      slug: "aura-sculpted-18k-cuff",
      details: "Weight: 22g • Finish: Hand-polished Mirror Lustre • Hallmark: 925 Certified",
    },
  },
  {
    id: "leather",
    num: "03",
    category: "Couture Leatherware",
    headline: "Tuscan Grain & Precision",
    subheadline: "Hand-buffed vegetable-tanned leather accented with signature sculpted brass hardware.",
    museImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1920&auto=format&fit=crop",
    product: {
      title: "Serpentine Structured Handbag",
      subtitle: "Full-Grain Italian Calfskin",
      categoryName: "Handbags & Belts",
      price: 24500,
      originalPrice: 28000,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
      slug: "serpentine-structured-handbag",
      details: "Lining: Pure Suede • Hardware: Custom Brushed Gold • Interior: Dual Gusset Compartments",
    },
  },
  {
    id: "couture",
    num: "04",
    category: "Haute Silks & Couture",
    headline: "Fluid Silhouettes",
    subheadline: "Bespoke evening drapes and pure mulberry silks cut for fluid, architectural movement.",
    museImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop",
    product: {
      title: "Nocturne Draped Silk Evening Cape",
      subtitle: "100% Mulberry Crepe de Chine",
      categoryName: "Apparel & Couture",
      price: 32000,
      originalPrice: 38000,
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
      slug: "nocturne-silk-cape",
      details: "Fabric: 28 Momme Silk • Cut: Bespoke Bias Drape • Origin: Handcrafted in New Delhi",
    },
  },
];

export const HeroBannerScrollyProposal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalHeight));

      const step = Math.min(
        CHAPTERS.length - 1,
        Math.floor(progress * CHAPTERS.length)
      );
      setActiveIndex(step);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChapter = (index: number) => {
    if (!containerRef.current) return;
    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerRef.current.offsetTop + (index / (CHAPTERS.length - 1)) * totalHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const currentChapter = CHAPTERS[activeIndex];

  return (
    <section ref={containerRef} className="relative h-[320vh] bg-[#1a060d]">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Layer 1: Cross-fading Landscape Muse Images */}
        <div className="absolute inset-0 z-0">
          {CHAPTERS.map((ch, idx) => (
            <div
              key={ch.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
              }`}
            >
              <Image
                src={ch.museImage}
                alt={ch.headline}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
              {/* Dual Vignette to protect text readability on left and bottom */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#19060d]/92 via-[#19060d]/65 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#19060d] via-transparent to-[#19060d]/50" />
            </div>
          ))}
        </div>

        {/* Layer 2: Main Editorial Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-16 w-full flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Dynamic Muse Headline & Category Story (7 Cols) */}
            <div className="lg:col-span-7 text-left text-white">
              {/* Kicker */}
              <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.35em] text-rose-200/90 font-light mb-4">
                <Sparkles className="w-3 h-3 text-rose-300" />
                <span>{currentChapter.category}</span>
                <span className="opacity-40">/</span>
                <span className="font-serif italic text-white/70">Collection {currentChapter.num}</span>
              </div>

              {/* Transitioning Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal tracking-tight text-white leading-[1.05] transition-all duration-500">
                {currentChapter.headline}
              </h1>

              {/* Transitioning Subheadline */}
              <p className="mt-4 sm:mt-5 text-sm sm:text-base text-white/80 font-light leading-relaxed tracking-wide max-w-lg transition-all duration-500">
                {currentChapter.subheadline}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Link
                  href={`/shop?category=${currentChapter.id}`}
                  className="inline-flex items-center justify-center bg-[#4a1525] hover:bg-[#380d1a] text-white text-xs uppercase tracking-[0.25em] px-8 py-3.5 border border-[#6b2539] transition-all duration-300 shadow-md"
                >
                  Explore Collection
                </Link>

                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/80 hover:text-white transition-colors group py-2"
                >
                  <span>Complete Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right: Floating Luxury Spotlight Card (5 Cols) */}
            <div className="lg:col-span-5 flex justify-end">
              <div className="w-full max-w-sm bg-white/95 backdrop-blur-md border border-[#ede6e7] p-5 shadow-2xl transition-all duration-700 ease-out transform hover:-translate-y-1">
                {/* Spotlight Badge */}
                <div className="flex items-center justify-between pb-3 border-b border-[#ede6e7] text-[10px] uppercase tracking-widest text-[#7e3045] font-medium">
                  <span>Spotlight Creation</span>
                  <span className="font-mono text-neutral-400">{currentChapter.num} / 04</span>
                </div>

                {/* Product Thumbnail */}
                <Link href={`/product/${currentChapter.product.slug}`} className="relative aspect-[4/3] block overflow-hidden bg-[#faf8f6] mt-3 group">
                  <Image
                    src={currentChapter.product.image}
                    alt={currentChapter.product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#1e1417]" />
                  </div>
                </Link>

                {/* Product Details */}
                <div className="mt-3.5">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#7e3045] font-semibold block">
                    {currentChapter.product.categoryName}
                  </span>
                  <Link href={`/product/${currentChapter.product.slug}`} className="block mt-1 font-serif text-base text-[#1e1417] hover:text-[#4a1525] transition-colors font-medium">
                    {currentChapter.product.title}
                  </Link>
                  <p className="mt-1 text-[11px] text-neutral-500 font-light leading-relaxed line-clamp-2">
                    {currentChapter.product.details}
                  </p>

                  <div className="mt-3 pt-3 border-t border-[#ede6e7] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-serif font-semibold text-[#1e1417]">
                        {formatINR(currentChapter.product.price)}
                      </span>
                      {currentChapter.product.originalPrice && (
                        <span className="text-[10px] text-neutral-400 line-through ml-2 font-light">
                          {formatINR(currentChapter.product.originalPrice)}
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/product/${currentChapter.product.slug}`}
                      className="text-[10px] uppercase tracking-widest text-[#4a1525] font-semibold hover:underline underline-offset-4"
                    >
                      View Piece →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 3: Minimalist Bottom Scrolly Timeline Tabs */}
        <div className="relative z-10 w-full bg-gradient-to-t from-[#19060d] via-[#19060d]/80 to-transparent pt-4 pb-6 px-6 sm:px-12">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/15 pt-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-light hidden sm:inline-block">
              Scroll To Journey Through Maisons
            </span>

            {/* Clickable Timeline Tabs */}
            <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto w-full sm:w-auto justify-center">
              {CHAPTERS.map((ch, idx) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => scrollToChapter(idx)}
                  className={`flex items-center gap-2 py-1 text-left transition-all duration-300 cursor-pointer ${
                    idx === activeIndex ? "text-white opacity-100" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  <span className={`font-serif text-xs ${idx === activeIndex ? "text-rose-200 font-medium" : ""}`}>
                    {ch.num}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] whitespace-nowrap">
                    {ch.category}
                  </span>
                  {idx === activeIndex && (
                    <span className="w-4 h-[1.5px] bg-[#be6b82] inline-block ml-1" />
                  )}
                </button>
              ))}
            </div>

            {/* Scroll Progress Bar */}
            <div className="w-24 sm:w-32 bg-white/15 h-[2px] rounded-full overflow-hidden hidden md:block">
              <div
                className="bg-[#be6b82] h-full transition-all duration-300"
                style={{ width: `${((activeIndex + 1) / CHAPTERS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
