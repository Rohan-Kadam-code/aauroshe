"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BRAND } from "@/core/constants/brand";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Search, Menu, X, User, Sparkles } from "lucide-react";
import { SearchBar } from "@/components/molecules/SearchBar";
import { Logo } from "@/components/atoms/Logo";

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
      <div className="bg-[#4a1525] text-white/90 text-[11px] tracking-[0.25em] py-2 text-center uppercase font-light border-b border-[#380d1a] px-4 flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-amber-200/80 shrink-0" />
        <span>Complimentary Insured Delivery Across India</span>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-all duration-300 border-b border-[#ede6e7] ${
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
                  className="p-1.5 text-neutral-800 hover:text-[#4a1525]"
                  aria-label="Toggle Navigation Menu"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-neutral-900" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-1.5 text-neutral-800 hover:text-[#4a1525]"
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

            {/* Center: Official AaurOSHe Brand Logo */}
            <div className="text-center shrink-0 px-2 sm:px-4 py-1">
              <Logo size="lg" variant="dark" showTagline={true} />
            </div>

            {/* Right: Currency, Account, Shopping Bag */}
            <div className="flex items-center justify-end gap-3 sm:gap-5 flex-1">
              <span className="hidden sm:inline-block text-[11px] font-medium text-neutral-500 tracking-widest uppercase">
                INR (₹)
              </span>

              {/* Customer Account Trigger */}
              <Link
                href="/account"
                className="hidden sm:flex items-center text-neutral-700 hover:text-[#4a1525] p-1.5 transition-colors"
                aria-label="My Account"
                title="Account"
              >
                <User className="w-4 h-4 text-neutral-850" />
              </Link>

              {/* Shopping Bag Trigger */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2 text-neutral-900 hover:text-[#4a1525] transition-colors cursor-pointer flex items-center gap-2"
                aria-label="View Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totals.itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#4a1525] text-white text-[10px] font-semibold rounded-full flex items-center justify-center animate-scale-in">
                    {totals.itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Bottom Row: Centered Category Navigation (Desktop) */}
          <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-10 pt-3.5 mt-2 border-t border-[#f4e8eb]">
            {BRAND.navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs uppercase tracking-[0.2em] text-neutral-700 hover:text-[#4a1525] transition-colors font-medium relative group py-1"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#4a1525] group-hover:w-full transition-all duration-300" />
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
          <div className="md:hidden fixed inset-x-0 top-full bg-white border-b border-[#ede6e7] shadow-xl px-6 py-6 animate-slide-down">
            <nav className="flex flex-col gap-4">
              {BRAND.navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest text-neutral-800 hover:text-[#4a1525] font-medium py-2 border-b border-neutral-100"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
