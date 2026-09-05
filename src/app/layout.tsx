import type { Metadata } from "next";
import "./globals.css";
import { BRAND } from "@/core/constants/brand";
import { StorefrontLayout } from "@/components/templates/StorefrontLayout";

export const metadata: Metadata = {
  title: `${BRAND.name} | ${BRAND.tagline}`,
  description:
    "Artisanal luxury e-commerce maison offering bespoke perfumes, 18K fine jewellery, couture leather handbags, and designer apparel.",
  keywords: [
    "AAUROSHE",
    "Luxury E-Commerce",
    "Haute Parfumerie",
    "Fine Jewellery",
    "Couture Handbags",
    "Artisanal Perfume",
    "Luxury Fashion India",
  ],
  authors: [{ name: BRAND.name }],
  metadataBase: new URL("https://aauroshe.com"),
  openGraph: {
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description:
      "Discover the ten luxury maisons of AAUROSHE. Exceptional craftsmanship and timeless elegance.",
    url: "https://aauroshe.com",
    siteName: BRAND.name,
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Montserrat:wght@200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <StorefrontLayout>{children}</StorefrontLayout>
      </body>
    </html>
  );
}
