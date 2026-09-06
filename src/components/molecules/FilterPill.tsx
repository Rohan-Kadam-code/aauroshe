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
          ? "bg-[#4a1525] text-white border-[#4a1525] shadow-sm"
          : "bg-[#faf8f6] text-neutral-750 border-[#ede6e7] hover:border-[#4a1525] hover:text-[#4a1525]",
        className
      )}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={cn(
            "text-[10px] px-1.5 py-0.5 rounded-full font-light",
            isActive ? "bg-[#380d1a] text-rose-100" : "bg-white text-neutral-500 border border-[#ede6e7]"
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
};
