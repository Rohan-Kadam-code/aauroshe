"use client";

import React from "react";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/organisms/Navbar";
import { CartDrawer } from "@/components/organisms/CartDrawer";
import { Footer } from "@/components/organisms/Footer";

export interface StorefrontLayoutProps {
  children: React.ReactNode;
}

export const StorefrontLayout: React.FC<StorefrontLayoutProps> = ({ children }) => {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-amber-200 selection:text-amber-950 font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <CartDrawer />
        <Footer />
      </div>
    </CartProvider>
  );
};
