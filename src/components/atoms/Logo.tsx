import React from "react";
import Link from "next/link";
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
  showTagline = true,
  className,
  href = "/",
}) => {
  const sizeConfig = {
    sm: { width: 140, height: 42, textClass: "text-lg" },
    md: { width: 190, height: 56, textClass: "text-2xl" },
    lg: { width: 240, height: 72, textClass: "text-3xl" },
    xl: { width: 300, height: 90, textClass: "text-4xl" },
  };

  const currentSize = sizeConfig[size];

  const colors = {
    dark: {
      primary: "#0A0A0B",
      accent: "#1A1A1D",
      tagline: "#121214",
      line: "#0A0A0B",
    },
    light: {
      primary: "#FFFFFF",
      accent: "#F3E5AB",
      tagline: "#EFE9DB",
      line: "#FFFFFF",
    },
    gold: {
      primary: "#D4AF37",
      accent: "#E5C158",
      tagline: "#C59B27",
      line: "#D4AF37",
    },
  };

  const theme = colors[variant];

  const logoContent = (
    <div className={cn("inline-flex flex-col items-center select-none group", className)}>
      <svg
        viewBox="0 0 380 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: `${currentSize.width}px`, height: "auto" }}
        className="transition-transform duration-300 group-hover:scale-[1.02]"
        aria-label="AaurOSHe - As Rare As You"
      >
        {/* Main Wordmark: Aaur */}
        <text
          x="12"
          y="72"
          fontFamily="'Didot', 'Bodoni MT', 'Cormorant Garamond', 'Cinzel', serif"
          fontSize="68"
          fontWeight="400"
          letterSpacing="1"
          fill={theme.primary}
        >
          Aaur
        </text>

        {/* Circular Emblem 'O' with Panther Silhouette */}
        <g transform="translate(196, 52)">
          {/* Outer ring of 'O' */}
          <circle
            cx="0"
            cy="0"
            r="23"
            stroke={theme.primary}
            strokeWidth="7"
            fill="none"
          />
          {/* Inner subtle rim */}
          <circle
            cx="0"
            cy="0"
            r="16.5"
            stroke={theme.primary}
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />

          {/* Graceful Crouching Panther / Jaguar Silhouette */}
          <path
            d="M -12,9 
               C -11,8 -9,7 -8,6 
               C -7,5 -6,4 -5,4 
               C -4,4 -3,5 -2,5 
               C -1,5 1,4 3,3 
               C 5,2 7,0 9,-2 
               C 10,-3 11,-4 12,-3 
               C 13,-2 13,0 12,2 
               C 11,4 9,6 7,8 
               C 5,9 2,10 -1,10 
               C -4,10 -8,10 -12,9 Z"
            fill={theme.primary}
          />
          {/* Panther Head and Arch */}
          <path
            d="M -10,6 
               C -12,4 -13,0 -11,-3 
               C -10,-5 -8,-6 -6,-6 
               C -5,-6 -4,-7 -3,-8 
               C -1,-9 2,-8 4,-6 
               C 6,-4 7,-1 7,2 
               C 5,0 3,-2 0,-2 
               C -3,-2 -6,0 -8,3 
               C -9,4 -10,5 -10,6 Z"
            fill={theme.primary}
          />
          {/* Panther Ear & Muzzle Accent */}
          <path
            d="M -2,-8 C -1,-10 1,-10 2,-8 C 1,-7 0,-7 -2,-8 Z"
            fill={theme.primary}
          />
          {/* Panther Tail curving gracefully */}
          <path
            d="M 7,8 C 10,8 14,7 15,4 C 16,1 15,-2 13,-4 C 12,-3 12,-2 13,0 C 14,2 13,4 10,5 C 8,6 7,6 7,8 Z"
            fill={theme.primary}
          />
        </g>

        {/* Wordmark Suffix: SHe */}
        <text
          x="226"
          y="72"
          fontFamily="'Didot', 'Bodoni MT', 'Cormorant Garamond', 'Cinzel', serif"
          fontSize="68"
          fontWeight="400"
          letterSpacing="1"
          fill={theme.primary}
        >
          SHe
        </text>

        {showTagline && (
          <>
            {/* Horizontal accent line underneath running from left margin */}
            <line
              x1="12"
              y1="94"
              x2="245"
              y2="94"
              stroke={theme.line}
              strokeWidth="1.75"
              strokeLinecap="square"
            />

            {/* Tagline: As Rare As You */}
            <text
              x="252"
              y="97"
              fontFamily="'Montserrat', 'Helvetica Neue', Arial, sans-serif"
              fontSize="16.5"
              fontWeight="300"
              letterSpacing="0.8"
              fill={theme.tagline}
            >
              As Rare As You
            </text>
          </>
        )}
      </svg>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block focus:outline-none">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};
