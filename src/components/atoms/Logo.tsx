import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "dark" | "light" | "gold";
  showTagline?: boolean;
  className?: string;
  href?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  variant = "dark",
  className,
  href = "/",
}) => {
  const sizeConfig = {
    sm: "h-8 sm:h-9 w-auto",
    md: "h-12 sm:h-14 w-auto",
    lg: "h-16 sm:h-20 w-auto",
    xl: "h-24 sm:h-28 w-auto",
  };

  const logoImg = (
    <div className={cn("inline-flex items-center justify-center select-none group", className)}>
      <Image
        src="/logo.png"
        alt="AaurOSHe - As Rare As You"
        width={380}
        height={115}
        priority
        className={cn(
          "object-contain transition-transform duration-300 group-hover:scale-[1.02]",
          sizeConfig[size],
          variant === "light" ? "brightness-0 invert" : ""
        )}
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block focus:outline-none">
        {logoImg}
      </Link>
    );
  }

  return logoImg;
};
