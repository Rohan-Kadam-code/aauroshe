import React from "react";
import { cn } from "@/lib/utils";

export interface FilterPillProps {
  label: string;
  isActive: boolean;
  count?: number;
  onClick: () => void;
  className?: string;
}

export const FilterPill: React.FC<FilterPillProps> = ({
  label,
  isActive,
  count,
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer border select-none whitespace-nowrap",
        isActive
          ? "bg-neutral-900 text-amber-300 border-neutral-900 shadow-sm"
          : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400 hover:text-neutral-950",
        className
      )}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={cn(
            "text-[10px] px-1.5 py-0.2 rounded-full",
            isActive ? "bg-neutral-800 text-amber-200" : "bg-neutral-100 text-neutral-500"
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
};
