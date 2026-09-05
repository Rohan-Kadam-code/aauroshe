/**
 * Brand Constants for AAUROSHE
 * Central immutable definitions for brand identity, navigation, and luxury attributes
 */

export const BRAND = {
  name: "AAUROSHE",
  legalName: "Aauroshe Luxury Private Limited",
  tagline: "Artisanal Luxury & Timeless Elegance",
  establishedYear: 2026,
  currency: "INR",
  currencySymbol: "₹",
  contact: {
    email: "concierge@aauroshe.com",
    phone: "+91 98765 43210",
    address: "AAUROSHE Atelier, Luxury Boulevard, New Delhi, India",
    workingHours: "Monday – Saturday: 10:00 AM – 8:00 PM IST",
  },
  social: {
    instagram: "https://instagram.com/aauroshe.luxury",
    facebook: "https://facebook.com/aauroshe.luxury",
    pinterest: "https://pinterest.com/aauroshe",
  },
  navigation: [
    { name: "Home", href: "/" },
    { name: "Shop All", href: "/shop" },
    { name: "Perfumes", href: "/shop?category=perfumes" },
    { name: "Jewellery", href: "/shop?category=jewellery" },
    { name: "Handbags", href: "/shop?category=handbags" },
    { name: "Apparel", href: "/shop?category=clothes" },
    { name: "Beauty", href: "/shop?category=skincare" },
  ],
  policies: [
    { name: "Shipping & Delivery", href: "/policies/shipping" },
    { name: "Returns & Exchanges", href: "/policies/returns" },
    { name: "Terms of Service", href: "/policies/terms" },
    { name: "Privacy Policy", href: "/policies/privacy" },
    { name: "Authenticity Guarantee", href: "/policies/authenticity" },
  ],
  valueProps: [
    {
      title: "Complimentary White Glove Delivery",
      description: "Insured express shipping across all domestic and international orders.",
      icon: "Truck",
    },
    {
      title: "Artisanal Craftsmanship",
      description: "Handcrafted by master artisans with globally sourced premium materials.",
      icon: "Sparkles",
    },
    {
      title: "100% Certified Authenticity",
      description: "Each creation arrives with an authenticated certificate and serial seal.",
      icon: "ShieldCheck",
    },
    {
      title: "Private Luxury Concierge",
      description: "Dedicated styling consultants available for custom requests and gifting.",
      icon: "Headphones",
    },
  ],
} as const;
