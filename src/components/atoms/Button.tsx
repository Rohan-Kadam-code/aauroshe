"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "wine" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium tracking-widest uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4a1525] disabled:pointer-events-none disabled:opacity-40 select-none cursor-pointer active:scale-[0.98]";

    const variants = {
      primary:
        "bg-[#4a1525] text-white hover:bg-[#380d1a] border border-[#4a1525] hover:border-[#380d1a] shadow-sm",
      wine:
        "bg-[#4a1525] text-white hover:bg-[#380d1a] border border-[#4a1525] hover:border-[#380d1a] shadow-sm",
      secondary:
        "bg-[#faf5f6] text-[#4a1525] hover:bg-[#f4e8eb] border border-[#e8d0d6]",
      gold:
        "bg-gradient-to-r from-[#5c2030] via-[#4a1525] to-[#5c2030] text-white hover:brightness-110 border border-[#7e3045]/60 shadow-sm",
      outline:
        "bg-transparent text-[#1e1417] border border-[#1e1417]/25 hover:border-[#4a1525] hover:bg-[#4a1525] hover:text-white",
      ghost:
        "bg-transparent text-neutral-700 hover:text-[#4a1525] hover:bg-[#faf5f6]",
      danger: "bg-red-700 text-white hover:bg-red-800 border border-red-800",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 gap-1.5 tracking-wider",
      md: "text-xs px-6 py-3 gap-2 tracking-widest",
      lg: "text-sm px-8 py-4 gap-2.5 tracking-widest",
      icon: "p-2.5 aspect-square",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
