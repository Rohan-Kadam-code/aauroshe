"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { CartItem } from "@/core/entities/cart";
import { formatINR } from "@/lib/utils";
import { QuantitySelector } from "./QuantitySelector";

export interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (lineId: string, quantity: number) => void;
  onRemove: (lineId: string) => void;
  onItemClick?: () => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  onItemClick,
}) => {
  return (
    <div className="flex gap-4 py-4 border-b border-neutral-100 last:border-0 items-start">
      {/* Product Image */}
      <Link
        href={`/product/${item.productSlug}`}
        onClick={onItemClick}
        className="relative w-20 h-24 bg-neutral-100 shrink-0 overflow-hidden border border-neutral-200/60 block group"
      >
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          sizes="80px"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Info & Actions */}
      <div className="flex-1 min-w-0 flex flex-col justify-between h-24">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium block truncate">
            {item.categoryName}
          </span>
          <Link
            href={`/product/${item.productSlug}`}
            onClick={onItemClick}
            className="text-xs font-serif font-medium text-neutral-900 hover:text-amber-800 transition-colors line-clamp-1 mt-0.5"
          >
            {item.title}
          </Link>
          {item.variantName && (
            <p className="text-[11px] text-neutral-500 mt-0.5">{item.variantName}</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <QuantitySelector
            quantity={item.quantity}
            max={item.maxStock}
            onChange={(qty) => onUpdateQuantity(item.id, qty)}
            size="sm"
          />

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-neutral-900">
              {formatINR(item.price * item.quantity)}
            </span>

            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="text-neutral-400 hover:text-red-600 transition-colors p-1"
              aria-label="Remove item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
