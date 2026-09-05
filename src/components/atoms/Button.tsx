"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "danger";
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
      "inline-flex items-center justify-center font-medium tracking-wider uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 disabled:pointer-events-none disabled:opacity-40 select-none cursor-pointer active:scale-[0.98]";

    const variants = {
      primary:
        "bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 shadow-sm",
      secondary:
        "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-neutral-200",
      gold: "bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-neutral-950 font-semibold hover:brightness-105 border border-amber-400/50 shadow-md shadow-amber-900/10",
      outline:
        "bg-transparent text-neutral-900 border border-neutral-900/30 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white",
      ghost:
        "bg-transparent text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/70",
      danger: "bg-red-600 text-white hover:bg-red-700 border border-red-700",
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
