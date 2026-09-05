import React from "react";
import { Truck, Sparkles, ShieldCheck, Headphones } from "lucide-react";

export const ValueProps: React.FC = () => {
  const props = [
    {
      icon: Truck,
      title: "Complimentary Delivery",
      description: "Insured express shipping across India on orders above ₹15,000.",
    },
    {
      icon: Sparkles,
      title: "Master Craftsmanship",
      description: "Hand-poured extraits & master goldsmith heirloom creations.",
    },
    {
      icon: ShieldCheck,
      title: "100% Certified Authentic",
      description: "Arrives with verified authenticity seals and batch certificates.",
    },
    {
      icon: Headphones,
      title: "Luxury Concierge",
      description: "Dedicated stylists available for private gifting and bespoke inquiries.",
    },
  ];

  return (
    <section className="border-y border-neutral-200/80 bg-neutral-900 text-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {props.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-none bg-neutral-800 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 font-light leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
