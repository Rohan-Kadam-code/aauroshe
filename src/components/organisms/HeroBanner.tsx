import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Sparkles, ArrowRight } from "lucide-react";

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-neutral-950 text-white">
      {/* Background Luxury Editorial Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1920&auto=format&fit=crop"
          alt="AAUROSHE Haute Couture & Parfumerie"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45 scale-105 animate-subtle-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-neutral-950/70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Sub-header badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/40 bg-amber-950/40 backdrop-blur-md mb-6 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-amber-300 font-medium">
            Autumn / Winter Haute Collection 2026
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight text-white leading-[1.1] max-w-4xl">
          Where Artisanal Mastery Meets <span className="italic font-light text-amber-200">Timeless Elegance</span>
        </h1>

        {/* Hero Description */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl font-light leading-relaxed">
          Discover a curated universe of rare perfumes, 18K fine jewellery, handcrafted Italian leather bags, and bespoke evening couture.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link href="/shop">
            <Button variant="gold" size="lg" className="group">
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link href="/shop?category=perfumes">
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-neutral-950">
              <span>Discover Parfumerie</span>
            </Button>
          </Link>
        </div>

        {/* Stats Strip */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 text-center w-full max-w-3xl">
          <div>
            <span className="block font-serif text-2xl sm:text-3xl text-amber-300">100%</span>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400 mt-1 block">
              Certified Artisanal
            </span>
          </div>
          <div>
            <span className="block font-serif text-2xl sm:text-3xl text-amber-300">10</span>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400 mt-1 block">
              Luxury Maisons
            </span>
          </div>
          <div>
            <span className="block font-serif text-2xl sm:text-3xl text-amber-300">24K</span>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400 mt-1 block">
              Gold & Rare Ouds
            </span>
          </div>
          <div>
            <span className="block font-serif text-2xl sm:text-3xl text-amber-300">Express</span>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400 mt-1 block">
              Insured Delivery
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
