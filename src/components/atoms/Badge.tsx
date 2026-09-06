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
    NEW: "bg-[#faf5f6] text-[#4a1525] border-[#e8d0d6] font-medium",
    BESTSELLER: "bg-[#4a1525] text-white border-[#5c2030] font-medium",
    LIMITED: "bg-[#380d1a] text-rose-100 border-[#5c2030] font-medium",
    ARTISANAL: "bg-white text-[#1e1417] border-[#ede6e7] font-medium",
    EXCLUSIVE: "bg-[#23060f] text-white border-[#7e3045] shadow-sm font-medium",
    DEFAULT: "bg-[#faf8f6] text-neutral-800 border-[#ede6e7]",
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
