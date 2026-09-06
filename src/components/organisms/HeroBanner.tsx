import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative min-h-[75vh] sm:min-h-[82vh] flex items-center overflow-hidden bg-[#1a060d] text-white">
      {/* Background Bespoke Luxury Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="AAUROSHE Haute Parfumerie & Fine Artefacts"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right sm:object-center opacity-70 animate-subtle-zoom"
        />
        {/* Editorial Vignette Gradient to ensure perfect text contrast on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#19060d]/90 via-[#19060d]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#19060d] via-transparent to-[#19060d]/60" />
      </div>

      {/* Hero Content - Clean, Uncluttered, High-Fashion Editorial */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28 w-full">
        <div className="max-w-xl text-left">
          {/* Typographic Kicker (No SaaS pill container, no emojis) */}
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-rose-200/90 font-light block mb-3 sm:mb-4">
            Haute Parfumerie & Maisons
          </span>

          {/* Minimalist Hero Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal tracking-tight text-white leading-[1.06]">
            As Rare <span className="italic font-light text-rose-200/95">As You.</span>
          </h1>

          {/* Minimal 1-Line Description */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-white/80 font-light leading-relaxed tracking-wide max-w-md">
            Hand-poured extraits, fine jewellery, and considered lifestyle creations.
          </p>

          {/* Refined CTAs - Single Primary Wine Button + Graceful Inline Text Link */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-5 sm:gap-7">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center bg-[#4a1525] hover:bg-[#380d1a] text-white text-xs uppercase tracking-[0.25em] px-8 py-3.5 border border-[#6b2539] transition-all duration-300 shadow-md"
            >
              Explore Catalogue
            </Link>

            <Link
              href="/shop?category=perfumes"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/85 hover:text-white transition-colors group py-2"
            >
              <span>The Parfumerie</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
