import React from "react";
import Link from "next/link";
import { InteractiveLivingRoomHero } from "@/components/organisms/InteractiveLivingRoomHero";
import { ValueProps } from "@/components/organisms/ValueProps";
import { CategoryShowcase } from "@/components/organisms/CategoryShowcase";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { catalogService } from "@/services/catalog/catalogService";
import { ArrowLeft, Sparkles, Sliders } from "lucide-react";

export const dynamic = "force-static";

export default async function InteractiveLivingRoomSalonPreviewPage() {
  const products = await catalogService.getAllProducts();

  return (
    <div className="flex flex-col relative">
      {/* Offline Proposal Indicator Ribbon */}
      <div className="bg-[#2a0814] text-white text-xs py-2.5 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-3 border-b border-[#4a1525] z-50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-rose-300 shrink-0" />
          <span className="font-light tracking-wide">
            <strong>Offline Proposal</strong>: The Living Atelier — Model in Living Room with Interactive Collection Swapping
          </span>
        </div>

        <div className="flex items-center gap-5 text-[11px] uppercase tracking-widest">
          <Link
            href="/preview/hero-scrollytelling"
            className="text-rose-200/80 hover:text-white flex items-center gap-1"
          >
            <Sliders className="w-3 h-3" />
            <span>Scrollytelling Version</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white font-medium underline underline-offset-4"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back to Live Site</span>
          </Link>
        </div>
      </div>

      {/* Interactive Living Room Atelier Hero */}
      <InteractiveLivingRoomHero />

      {/* Remaining Storefront */}
      <ValueProps />
      <CategoryShowcase />
      <ProductGrid
        products={products}
        title="Signature Pieces"
        subtitle="Distinctive silhouettes and hand-finished details."
        showFilters={true}
      />
    </div>
  );
}
