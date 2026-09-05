"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BRAND } from "@/core/constants/brand";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Search, Menu, X, User, Sparkles } from "lucide-react";
import { SearchBar } from "@/components/molecules/SearchBar";

export const Navbar: React.FC = () => {
  const { totals, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Privilege Announcement Bar */}
      <div className="bg-neutral-950 text-amber-200/90 text-[11px] tracking-[0.2em] py-2 text-center uppercase font-light border-b border-amber-500/20 px-4 flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
        <span>Complimentary White Glove Delivery on all orders above ₹15,000</span>
        <span className="hidden sm:inline opacity-40">|</span>
        <span className="hidden sm:inline text-white/80">Code: AAUROSHE10 for 10% Welcome Privilege</span>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-all duration-300 border-b border-neutral-200/80 ${
          isScrolled ? "shadow-sm py-2" : "py-3 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row: Left Utilities, Center Brand Logo, Right Actions */}
          <div className="flex items-center justify-between relative">
            {/* Left: Mobile Menu & Desktop Search */}
            <div className="flex items-center gap-4 flex-1">
              {/* Mobile Menu Trigger */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-1.5 text-neutral-800 hover:text-neutral-950"
                  aria-label="Toggle Navigation Menu"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-neutral-900" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-1.5 text-neutral-800 hover:text-neutral-950"
                  aria-label="Search Catalog"
                >
                  <Search className="w-5 h-5 text-neutral-900" />
                </button>
              </div>

              {/* Desktop Search Bar */}
              <div className="hidden md:block w-64 lg:w-72">
                <SearchBar isCompact />
              </div>
            </div>

            {/* Center: Grand AAUROSHE Brand Monogram */}
            <div className="text-center shrink-0 px-4">
              <Link href="/" className="inline-block group text-center">
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-[0.3em] font-normal text-neutral-950 block leading-none group-hover:text-amber-800 transition-colors">
                  {BRAND.name}
                </span>
                <span className="text-[9px] uppercase tracking-[0.45em] text-amber-800/80 block mt-1 font-medium">
                  Haute Maison
                </span>
              </Link>
            </div>

            {/* Right: Currency, Admin Portal, Shopping Bag */}
            <div className="flex items-center justify-end gap-3 sm:gap-5 flex-1">
              <span className="hidden sm:inline-block text-[11px] font-medium text-neutral-500 tracking-widest uppercase">
                INR (₹)
              </span>

              {/* Admin Portal Link */}
              <Link
                href="/admin"
                className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-700 hover:text-neutral-950 font-medium tracking-wider px-2 py-1 border border-neutral-200/80 hover:border-neutral-900 transition-colors"
                title="Admin Management Console"
              >
                <User className="w-3.5 h-3.5 text-amber-800" />
                <span className="text-[10px] uppercase tracking-widest">Admin</span>
              </Link>

              {/* Shopping Bag Trigger */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2 text-neutral-900 hover:text-amber-700 transition-colors cursor-pointer flex items-center gap-2"
                aria-label="View Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totals.itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-600 text-white text-[10px] font-semibold rounded-full flex items-center justify-center animate-scale-in">
                    {totals.itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Bottom Row: Centered Category Navigation (Desktop) */}
          <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-10 pt-3.5 mt-2 border-t border-neutral-100">
            {BRAND.navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs uppercase tracking-[0.2em] text-neutral-700 hover:text-amber-800 transition-colors font-medium relative group py-1"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-amber-600 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Expandable Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden px-4 pt-3 pb-2 border-t border-neutral-100 bg-white">
            <SearchBar onSearch={() => setIsSearchOpen(false)} />
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-full bg-white border-b border-neutral-200 shadow-xl px-6 py-6 animate-slide-down">
            <nav className="flex flex-col gap-4">
              {BRAND.navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest text-neutral-800 hover:text-amber-700 font-medium py-2 border-b border-neutral-100"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-amber-800 font-medium py-2 flex items-center justify-between"
              >
                <span>Admin Management Console</span>
                <User className="w-4 h-4" />
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
