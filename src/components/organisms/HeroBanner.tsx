import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Sparkles, ArrowRight } from "lucide-react";

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative min-h-[82vh] flex items-center justify-center overflow-hidden bg-[#1a080f] text-white">
      {/* Background Luxury Editorial Image with Wine Tint Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1920&auto=format&fit=crop"
          alt="AAUROSHE Haute Parfumerie & Lifestyle"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40 scale-105 animate-subtle-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e0711] via-[#2d0b19]/60 to-[#1e0711]/80" />
      </div>

      {/* Hero Content - Minimalist Editorial */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Sub-header kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-6 animate-fade-in">
          <Sparkles className="w-3 h-3 text-amber-200/80" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/90 font-light">
            Haute Parfumerie & Fine Artefacts
          </span>
        </div>

        {/* Minimal Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight text-white leading-[1.08] max-w-3xl">
          As Rare <span className="italic font-light text-rose-100/90">As You.</span>
        </h1>

        {/* Minimal 1-Line Description */}
        <p className="mt-5 text-sm sm:text-base text-white/80 max-w-xl font-light leading-relaxed tracking-wide">
          Hand-poured extraits, 18K fine jewellery, and considered lifestyle pieces.
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-col sm:flex-row items-center gap-4">
          <Link href="/shop">
            <Button variant="wine" size="lg" className="bg-[#4a1525] border-[#5c2030] hover:bg-[#380d1a] group">
              <span>Explore Catalogue</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link href="/shop?category=perfumes">
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-[#1e0711]">
              <span>The Parfumerie</span>
            </Button>
          </Link>
        </div>

        {/* Minimalist Hairline Strip */}
        <div className="mt-16 pt-6 border-t border-white/15 flex items-center justify-center gap-6 sm:gap-12 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/60 font-light">
          <span>Pure Extraits</span>
          <span className="opacity-30">/</span>
          <span>18K & 925 Fine Metals</span>
          <span className="opacity-30">/</span>
          <span>Pan-India Concierge</span>
        </div>
      </div>
    </section>
  );
};
