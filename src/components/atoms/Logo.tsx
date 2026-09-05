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
    sm: "h-7 sm:h-8 w-auto",
    md: "h-10 sm:h-12 w-auto",
    lg: "h-14 sm:h-16 w-auto",
    xl: "h-20 sm:h-24 w-auto",
  };

  const logoSrc = variant === "light" ? "/logo-white.png" : "/logo-transparent.png";

  const logoImg = (
    <div className={cn("inline-flex items-center justify-center select-none group", className)}>
      <Image
        src={logoSrc}
        alt="AaurOSHe - As Rare As You"
        width={361}
        height={83}
        priority
        className={cn(
          "object-contain transition-transform duration-300 group-hover:scale-[1.02]",
          sizeConfig[size]
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
