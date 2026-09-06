import React from "react";
import Link from "next/link";
import { HeroBannerScrollyProposal } from "@/components/organisms/HeroBannerScrollyProposal";
import { ValueProps } from "@/components/organisms/ValueProps";
import { CategoryShowcase } from "@/components/organisms/CategoryShowcase";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { catalogService } from "@/services/catalog/catalogService";
import { ArrowLeft, Sparkles } from "lucide-react";

export const dynamic = "force-static";

export default async function ScrollytellingProposalPreviewPage() {
  const products = await catalogService.getAllProducts();

  return (
    <div className="flex flex-col relative">
      {/* Offline Proposal Indicator Ribbon */}
      <div className="bg-[#380d1a] text-white text-xs py-2.5 px-4 flex items-center justify-between border-b border-[#5c2030] z-50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-rose-300 shrink-0" />
          <span className="font-light tracking-wider">
            <strong>Alternative Proposal Preview</strong>: Scroll-driven Collection Transitions with Muse & Floating Spotlight Cards
          </span>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-rose-200 hover:text-white underline underline-offset-4"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Back to Live Storefront</span>
        </Link>
      </div>

      {/* Alternative Interactive Hero Proposal */}
      <HeroBannerScrollyProposal />

      {/* Remaining Storefront Sections to verify smooth exit scrolling */}
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
