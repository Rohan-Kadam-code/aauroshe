import React from "react";
import { cn } from "@/lib/utils";
import { ProductBadge } from "@/core/entities/product";

export interface BadgeProps {
  type?: ProductBadge | "DEFAULT";
  label?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type = "DEFAULT", label, className }) => {
  const displayLabel = label || type;

  const badgeStyles: Record<string, string> = {
    NEW: "bg-amber-100/90 text-amber-950 border-amber-300/60 font-medium",
    BESTSELLER: "bg-neutral-900 text-amber-400 border-neutral-700 font-semibold",
    LIMITED: "bg-rose-900/90 text-rose-100 border-rose-700 font-medium",
    ARTISANAL: "bg-stone-100 text-stone-800 border-stone-300 font-medium",
    EXCLUSIVE: "bg-neutral-950 text-white border-amber-500/50 shadow-sm font-semibold",
    DEFAULT: "bg-neutral-100 text-neutral-800 border-neutral-200",
  };

  const currentStyle = badgeStyles[type] || badgeStyles.DEFAULT;

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-[10px] uppercase tracking-widest border backdrop-blur-sm rounded-none",
        currentStyle,
        className
      )}
    >
      {displayLabel}
    </span>
  );
};
