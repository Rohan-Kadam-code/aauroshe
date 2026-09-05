import React from "react";
import { cn, formatINR } from "@/lib/utils";

export interface PriceTagProps {
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const PriceTag: React.FC<PriceTagProps> = ({
  price,
  originalPrice,
  size = "md",
  className,
}) => {
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base font-medium",
    xl: "text-xl font-semibold",
  };

  return (
    <div className={cn("inline-flex items-baseline gap-2", className)}>
      <span className={cn("font-medium text-neutral-900 tracking-tight", sizeClasses[size])}>
        {formatINR(price)}
      </span>

      {hasDiscount && (
        <>
          <span className="text-xs text-neutral-400 line-through">
            {formatINR(originalPrice)}
          </span>
          <span className="text-[11px] text-amber-700 font-medium tracking-wide">
            ({discountPercent}% off)
          </span>
        </>
      )}
    </div>
  );
};
