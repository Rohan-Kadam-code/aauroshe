"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuantitySelectorProps {
  quantity: number;
  max?: number;
  min?: number;
  onChange: (qty: number) => void;
  size?: "sm" | "md";
  className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  max = 99,
  min = 1,
  onChange,
  size = "md",
  className,
}) => {
  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const heightClass = size === "sm" ? "h-7 text-xs" : "h-9 text-sm";
  const buttonPad = size === "sm" ? "px-2" : "px-3";

  return (
    <div
      className={cn(
        "inline-flex items-center border border-neutral-300 bg-white select-none",
        heightClass,
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min}
        className={cn(
          "h-full flex items-center justify-center text-neutral-600 hover:text-neutral-950 disabled:opacity-30 disabled:cursor-not-allowed transition-colors",
          buttonPad
        )}
        aria-label="Decrease quantity"
      >
        <Minus className="w-3 h-3" />
      </button>

      <span className="min-w-[2rem] text-center font-medium text-neutral-900 tracking-tight">
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= max}
        className={cn(
          "h-full flex items-center justify-center text-neutral-600 hover:text-neutral-950 disabled:opacity-30 disabled:cursor-not-allowed transition-colors",
          buttonPad
        )}
        aria-label="Increase quantity"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
};
