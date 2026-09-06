"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";
import { Sparkles, Check, ShoppingBag, ArrowRight, RefreshCw } from "lucide-react";
import { Product } from "@/core/entities/product";

export type HotspotCategory = "perfume" | "jewellery" | "handbag" | "belt" | "apparel";

interface CategorySlot {
  id: HotspotCategory;
  name: string;
  pinLabel: string;
  coords: { top: string; left: string };
  defaultItemIndex: number;
  items: {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    price: number;
    originalPrice?: number;
    categoryName: string;
    thumbnail: string;
    notesOrMaterial: string;
  }[];
}

const ATELIER_COLLECTION_SLOTS: CategorySlot[] = [
  {
    id: "perfume",
    name: "Haute Parfumerie",
    pinLabel: "Extrait de Parfum",
    coords: { top: "50%", left: "56%" },
    defaultItemIndex: 0,
    items: [
      {
        id: "prod_perfume_paris",
        slug: "paris",
        title: "Paris Extrait",
        subtitle: "Delicate White Rose & Bergamot",
        price: 3800,
        originalPrice: 4200,
        categoryName: "Haute Parfumerie",
        thumbnail: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop",
        notesOrMaterial: "White Rose Petals • Crisp Pear • Mysore Sandalwood",
      },
      {
        id: "prod_perfume_for_her",
        slug: "for-her",
        title: "For Her Extrait",
        subtitle: "Warm Cashmere & Jasmine",
        price: 3800,
        originalPrice: 4200,
        categoryName: "Haute Parfumerie",
        thumbnail: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop",
        notesOrMaterial: "French Peony • Amber • Soft Velvet Musk",
      },
      {
        id: "prod_perfume_spice",
        slug: "spice",
        title: "Spice Extrait",
        subtitle: "Cardamom & Smoky Woods",
        price: 3800,
        originalPrice: 4500,
        categoryName: "Haute Parfumerie",
        thumbnail: "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?q=80&w=800&auto=format&fit=crop",
        notesOrMaterial: "Ceylon Cardamom • Ginger Zest • Earthy Vetiver",
      },
    ],
  },
  {
    id: "jewellery",
    name: "Fine Jewellery",
    pinLabel: "18K Gold & Gems",
    coords: { top: "41%", left: "50%" },
    defaultItemIndex: 0,
    items: [
      {
        id: "prod_jewel_01",
        slug: "aurora-diamond-choker-18k",
        title: "Aurora Diamond Choker",
        subtitle: "18K Solid Yellow Gold & VVS Diamonds",
        price: 88000,
        originalPrice: 95000,
        categoryName: "Fine Jewellery",
        thumbnail: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
        notesOrMaterial: "Solid 18K Gold • 2.4ct Conflict-Free Diamonds • Certified",
      },
      {
        id: "prod_jewel_02",
        slug: "celeste-baroque-pearl-drop-earrings",
        title: "Céleste Baroque Pearl Drops",
        subtitle: "AAA Freshwater Pearls & Vermeil",
        price: 32000,
        originalPrice: 36000,
        categoryName: "Fine Jewellery",
        thumbnail: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
        notesOrMaterial: "Selected Baroque Pearls • 18K Gold Vermeil Studs",
      },
      {
        id: "prod_jewel_03",
        slug: "aura-sculpted-18k-cuff",
        title: "Aura Sculpted 18K Vermeil Cuff",
        subtitle: "Solid 925 Sterling Silver with 18K Vermeil",
        price: 18500,
        originalPrice: 22000,
        categoryName: "Fine Jewellery",
        thumbnail: "https://images.unsplash.com/photo-1611591475874-98448f86f874?q=80&w=800&auto=format&fit=crop",
        notesOrMaterial: "Weight: 24g • High Mirror Polish • 925 Hallmark",
      },
    ],
  },
  {
    id: "handbag",
    name: "Couture Handbags",
    pinLabel: "Tuscan Leather Bag",
    coords: { top: "70%", left: "69%" },
    defaultItemIndex: 0,
    items: [
      {
        id: "prod_bag_01",
        slug: "monolith-top-handle-noir",
        title: "The Monolith Structured Bag",
        subtitle: "Full-Grain Italian Box Leather",
        price: 49500,
        originalPrice: 55000,
        categoryName: "Couture Handbags",
        thumbnail: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
        notesOrMaterial: "Hand-buffed Box Leather • Gilded Brass Hardware • Lambskin Suede Lining",
      },
      {
        id: "prod_bag_02",
        slug: "palazzo-suede-tote",
        title: "Palazzo Suede Slouch Tote",
        subtitle: "Cognac Nubuck & Calfskin",
        price: 42000,
        originalPrice: 48000,
        categoryName: "Couture Handbags",
        thumbnail: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
        notesOrMaterial: "Velvety Cognac Suede • Dual Reinforced Handles • Magnet Closure",
      },
    ],
  },
  {
    id: "belt",
    name: "Artisan Belts",
    pinLabel: "Gilded Clasp Belt",
    coords: { top: "69%", left: "52%" },
    defaultItemIndex: 0,
    items: [
      {
        id: "prod_belt_01",
        slug: "aauroshe-emblem-reversible-belt",
        title: "Emblem Reversible Waist Belt",
        subtitle: "French Box Leather & Gilded Clasp",
        price: 16500,
        originalPrice: 19000,
        categoryName: "Artisan Belts",
        thumbnail: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop",
        notesOrMaterial: "Reversible Noir & Saddle Cognac • 30mm Width • Sculpted Monogram Buckle",
      },
      {
        id: "prod_belt_02",
        slug: "braided-tuscan-calfskin-belt",
        title: "Braided Tuscan Leather Belt",
        subtitle: "Hand-Woven Full-Grain Calfskin",
        price: 14000,
        originalPrice: 16000,
        categoryName: "Artisan Belts",
        thumbnail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
        notesOrMaterial: "Vegetable Tanned Leather • Brushed Antique Brass Buckle",
      },
    ],
  },
  {
    id: "apparel",
    name: "Designer Apparel",
    pinLabel: "Tailored Silk Set",
    coords: { top: "52%", left: "45%" },
    defaultItemIndex: 0,
    items: [
      {
        id: "prod_app_01",
        slug: "seraphina-silk-bias-cut-gown",
        title: "Seraphina Silk Crepe Ensemble",
        subtitle: "100% Mulberry Crepe de Chine",
        price: 36000,
        originalPrice: 42000,
        categoryName: "Designer Apparel",
        thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
        notesOrMaterial: "28 Momme Silk • Fluid Hourglass Cut • Midnight Navy Lustre",
      },
      {
        id: "prod_app_02",
        slug: "nocturne-silk-blazer-cape",
        title: "Nocturne Evening Silk Cape",
        subtitle: "Bespoke Draped Eveningwear",
        price: 42000,
        originalPrice: 48000,
        categoryName: "Designer Apparel",
        thumbnail: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
        notesOrMaterial: "Hand-pleated Silk Charmeuse • Gold Button Accents",
      },
    ],
  },
];

export const InteractiveLivingRoomHero: React.FC = () => {
  const { addItem, openCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<HotspotCategory>("perfume");
  const [selectedItemIndices, setSelectedItemIndices] = useState<Record<HotspotCategory, number>>({
    perfume: 0,
    jewellery: 0,
    handbag: 0,
    belt: 0,
    apparel: 0,
  });
  const [addedAllStatus, setAddedAllStatus] = useState(false);
  const [addedSingleStatus, setAddedSingleStatus] = useState(false);

  // Get active category object
  const activeSlot = useMemo(
    () => ATELIER_COLLECTION_SLOTS.find((s) => s.id === activeCategory) || ATELIER_COLLECTION_SLOTS[0],
    [activeCategory]
  );

  // Active selected item in current slot
  const currentItem = useMemo(() => {
    const itemIndex = selectedItemIndices[activeSlot.id] ?? 0;
    return activeSlot.items[itemIndex] || activeSlot.items[0];
  }, [activeSlot, selectedItemIndices]);

  // Total Ensemble Price calculation
  const ensembleTotal = useMemo(() => {
    return ATELIER_COLLECTION_SLOTS.reduce((sum, slot) => {
      const idx = selectedItemIndices[slot.id] ?? 0;
      const item = slot.items[idx] || slot.items[0];
      return sum + item.price;
    }, 0);
  }, [selectedItemIndices]);

  // Update item selection in a slot
  const handleSelectSlotItem = (categoryId: HotspotCategory, index: number) => {
    setSelectedItemIndices((prev) => ({
      ...prev,
      [categoryId]: index,
    }));
  };

  // Add single active item to cart
  const handleAddSingleItem = () => {
    const productMock: Product = {
      id: currentItem.id,
      slug: currentItem.slug,
      title: currentItem.title,
      subtitle: currentItem.subtitle,
      description: currentItem.notesOrMaterial,
      longDescription: currentItem.notesOrMaterial,
      categoryId: `cat_${activeSlot.id}`,
      categorySlug: activeSlot.id,
      categoryName: currentItem.categoryName,
      price: currentItem.price,
      originalPrice: currentItem.originalPrice,
      thumbnail: currentItem.thumbnail,
      images: [currentItem.thumbnail],
      rating: 5.0,
      reviewCount: 30,
      isFeatured: true,
      isNewArrival: false,
      inStock: true,
      variants: [
        {
          id: `var_${currentItem.id}`,
          sku: `SKU-${currentItem.id.toUpperCase()}`,
          name: currentItem.subtitle || "Standard Edition",
          price: currentItem.price,
          stockCount: 10,
          inStock: true,
          attributes: {},
        },
      ],
      createdAt: new Date().toISOString(),
    };

    addItem(productMock, 1);
    setAddedSingleStatus(true);
    setTimeout(() => {
      setAddedSingleStatus(false);
      openCart();
    }, 800);
  };

  // Add complete ensemble to cart
  const handleAddCompleteEnsemble = () => {
    ATELIER_COLLECTION_SLOTS.forEach((slot) => {
      const idx = selectedItemIndices[slot.id] ?? 0;
      const item = slot.items[idx] || slot.items[0];
      const productMock: Product = {
        id: item.id,
        slug: item.slug,
        title: item.title,
        subtitle: item.subtitle,
        description: item.notesOrMaterial,
        longDescription: item.notesOrMaterial,
        categoryId: `cat_${slot.id}`,
        categorySlug: slot.id,
        categoryName: item.categoryName,
        price: item.price,
        originalPrice: item.originalPrice,
        thumbnail: item.thumbnail,
        images: [item.thumbnail],
        rating: 5.0,
        reviewCount: 40,
        isFeatured: true,
        isNewArrival: false,
        inStock: true,
        variants: [
          {
            id: `var_${item.id}`,
            sku: `SKU-${item.id.toUpperCase()}`,
            name: item.subtitle || "Standard Edition",
            price: item.price,
            stockCount: 10,
            inStock: true,
            attributes: {},
          },
        ],
        createdAt: new Date().toISOString(),
      };
      addItem(productMock, 1);
    });

    setAddedAllStatus(true);
    setTimeout(() => {
      setAddedAllStatus(false);
      openCart();
    }, 800);
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen bg-[#14050a] text-white overflow-hidden flex flex-col justify-between">
      {/* Editorial Landscape Canvas Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/celebrity-living-room.jpg"
          alt="AaurOSHe Celebrity Atelier — Salon Living Room Editorial"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center sm:object-right-top opacity-85"
        />
        {/* Soft Vignette Shadows */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#14050a]/90 via-[#14050a]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14050a] via-transparent to-[#14050a]/60 pointer-events-none" />

        {/* Pulsing Interactive Hotspots Over Muse and Living Room Items */}
        {ATELIER_COLLECTION_SLOTS.map((slot) => {
          const isSelected = slot.id === activeCategory;
          return (
            <div
              key={slot.id}
              style={{ top: slot.coords.top, left: slot.coords.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
              onClick={() => setActiveCategory(slot.id)}
            >
              {/* Pulsing halo */}
              <div
                className={`w-9 h-9 rounded-full absolute -top-1.5 -left-1.5 transition-all duration-700 ${
                  isSelected
                    ? "bg-[#be6b82]/40 scale-125 animate-ping"
                    : "bg-white/20 scale-100 group-hover:scale-125 group-hover:bg-[#be6b82]/30"
                }`}
              />

              {/* Pin Core */}
              <button
                type="button"
                className={`relative w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border ${
                  isSelected
                    ? "bg-[#4a1525] border-rose-300 text-white scale-110"
                    : "bg-white/90 border-[#ede6e7] text-[#14050a] group-hover:bg-[#4a1525] group-hover:text-white"
                }`}
                aria-label={`Select ${slot.name}`}
              >
                <Sparkles className="w-2.5 h-2.5" />
              </button>

              {/* Floating Pin Label Tooltip */}
              <div
                className={`absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 backdrop-blur-md text-[10px] uppercase tracking-widest transition-all duration-300 shadow-lg pointer-events-none ${
                  isSelected
                    ? "bg-[#4a1525] text-white border border-[#6b2539] opacity-100 translate-x-0"
                    : "bg-[#14050a]/80 text-white/90 border border-white/20 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {slot.pinLabel}
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Editorial Masthead Title */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 pt-24 sm:pt-28 w-full">
        <div className="max-w-md text-left">
          <span className="text-[10px] uppercase tracking-[0.35em] text-rose-200/90 font-light block mb-2">
            The Living Atelier
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-[1.08]">
            Curate Her <span className="italic font-light text-rose-200">Ensemble.</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-white/75 font-light leading-relaxed">
            Touch any collection piece on the muse to personalize her look and discover the artisan craft.
          </p>
        </div>
      </div>

      {/* Floating Interactive Wardrobe Customizer (Bottom / Side) */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 pb-12 pt-6 w-full flex flex-col lg:flex-row items-end justify-between gap-8">
        {/* Category Pills Navigation Strip */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-[#19060d]/80 backdrop-blur-md p-2 border border-white/15">
          {ATELIER_COLLECTION_SLOTS.map((slot) => {
            const isSelected = slot.id === activeCategory;
            const currentItemTitle = slot.items[selectedItemIndices[slot.id] || 0]?.title;

            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => setActiveCategory(slot.id)}
                className={`px-3 py-2 text-left transition-all duration-300 border ${
                  isSelected
                    ? "bg-[#4a1525] border-rose-300/60 text-white shadow-md"
                    : "bg-white/5 border-transparent text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="text-[9px] uppercase tracking-[0.2em] block font-light opacity-75">
                  {slot.name}
                </span>
                <span className="text-xs font-serif font-medium truncate block max-w-[120px] text-white">
                  {currentItemTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Piece Customizer & Ensemble Card */}
        <div className="w-full max-w-md bg-white/95 backdrop-blur-md text-[#1e1417] p-6 shadow-2xl border border-[#ede6e7]">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#ede6e7]">
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#7e3045] font-semibold block">
                Active Piece • {activeSlot.name}
              </span>
              <h3 className="font-serif text-lg text-[#1e1417] mt-0.5">
                {currentItem.title}
              </h3>
            </div>

            <span className="text-sm font-serif font-semibold text-[#1e1417]">
              {formatINR(currentItem.price)}
            </span>
          </div>

          {/* Item Options Carousel / Switcher (User updates item in this collection) */}
          <div className="mt-4">
            <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium flex items-center gap-1.5 mb-2.5">
              <RefreshCw className="w-3 h-3 text-[#7e3045]" />
              <span>Switch Piece in this Category:</span>
            </span>

            <div className="grid grid-cols-3 gap-2">
              {activeSlot.items.map((item, idx) => {
                const isItemActive = (selectedItemIndices[activeSlot.id] || 0) === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectSlotItem(activeSlot.id, idx)}
                    className={`relative aspect-[4/3] overflow-hidden border p-1 transition-all duration-300 text-left group ${
                      isItemActive
                        ? "border-[#4a1525] ring-1 ring-[#4a1525] shadow-sm"
                        : "border-[#ede6e7] opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="120px"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-[#1e1417]/80 text-white text-[8px] tracking-wider p-1 truncate text-center">
                      {item.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description & Materials */}
          <p className="mt-3.5 text-[11px] text-neutral-500 font-light leading-relaxed">
            {currentItem.notesOrMaterial}
          </p>

          {/* Action CTAs */}
          <div className="mt-5 pt-4 border-t border-[#ede6e7] flex flex-col gap-2.5">
            {/* Quick Add Selected Piece */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleAddSingleItem}
                className="flex-1 bg-[#4a1525] hover:bg-[#380d1a] text-white py-3 px-4 text-xs font-medium uppercase tracking-widest transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                {addedSingleStatus ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add Piece ({formatINR(currentItem.price)})</span>
                  </>
                )}
              </button>

              <Link
                href={`/product/${currentItem.slug}`}
                className="p-3 border border-[#ede6e7] text-neutral-800 hover:text-[#4a1525] hover:border-[#4a1525] transition-colors"
                title="View Product Page"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Complete Look Summary & Bundle CTA */}
            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-light">Complete Ensemble:</span>
              <button
                type="button"
                onClick={handleAddCompleteEnsemble}
                className="text-xs uppercase tracking-widest text-[#4a1525] hover:text-[#380d1a] font-semibold underline underline-offset-4 cursor-pointer"
              >
                {addedAllStatus ? "All 5 Pieces Added!" : `Reserve Full Look (${formatINR(ensembleTotal)}) →`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
