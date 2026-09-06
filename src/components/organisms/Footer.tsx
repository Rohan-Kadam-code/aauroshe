import React from "react";
import Link from "next/link";
import { BRAND } from "@/core/constants/brand";
import { CATEGORIES } from "@/core/constants/categories";
import { Logo } from "@/components/atoms/Logo";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#19060d] text-neutral-300 text-xs border-t border-[#2e0b17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo variant="light" size="md" showTagline={true} />

            <p className="mt-4 text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              An Indian Haute Maison dedicated to preserving rare artisanal traditions, distilling precious botanicals, and crafting eternal luxury artifacts.
            </p>

            <div className="mt-6 text-xs text-neutral-400 space-y-1 font-light">
              <p>Atelier: {BRAND.contact.address}</p>
              <p>Email: {BRAND.contact.email}</p>
              <p>Concierge: {BRAND.contact.phone}</p>
            </div>
          </div>

          {/* Ten Maisons Column */}
          <div>
            <h4 className="text-white text-[11px] uppercase tracking-[0.2em] font-medium mb-4">
              The Maisons
            </h4>
            <ul className="space-y-2 font-light">
              {CATEGORIES.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/shop?category=${c.slug}`}
                    className="hover:text-rose-200 transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Categories Column */}
          <div>
            <h4 className="text-white text-[11px] uppercase tracking-[0.2em] font-medium mb-4">
              Collections
            </h4>
            <ul className="space-y-2 font-light">
              {CATEGORIES.slice(5).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/shop?category=${c.slug}`}
                    className="hover:text-rose-200 transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Client Care & Policies */}
          <div>
            <h4 className="text-white text-[11px] uppercase tracking-[0.2em] font-medium mb-4">
              Client Care
            </h4>
            <ul className="space-y-2 font-light">
              {BRAND.policies.map((p) => (
                <li key={p.name}>
                  <Link href={p.href} className="hover:text-rose-200 transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Strip - Pure Luxury Client Guarantees (No Dev Jargon) */}
        <div className="mt-16 pt-8 border-t border-[#2e0b17] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400 font-light">
          <p>© {new Date().getFullYear()} {BRAND.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest text-neutral-400">
            <span>Authenticity Guaranteed</span>
            <span>Insured Express Delivery</span>
            <span>Private Concierge</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
