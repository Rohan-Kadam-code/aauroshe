import React from "react";

export const ValueProps: React.FC = () => {
  const pillars = [
    {
      num: "01",
      title: "Material Purity",
      description: "Pure perfume extraits and certified 925 & 18K metals clearly stated.",
    },
    {
      num: "02",
      title: "Artisanal Craftsmanship",
      description: "Hand-finished in strictly limited batches by master craftspeople.",
    },
    {
      num: "03",
      title: "Transparent Value",
      description: "Direct atelier pricing with straightforward terms and zero surprises.",
    },
    {
      num: "04",
      title: "Private Concierge",
      description: "Personal styling care and complimentary insured delivery across India.",
    },
  ];

  return (
    <section className="border-y border-[#ede6e7] bg-[#faf8f6] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimal Kicker & Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#7e3045] font-semibold block mb-1">
            Transparency
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1e1417]">
            Considered Luxury.
          </h2>
        </div>

        {/* 01 to 04 Numbered Grid (Vylore Minimalist Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {pillars.map((p) => (
            <div key={p.num} className="border-t border-[#ede6e7] pt-6 flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl text-[#4a1525] font-light tracking-wide block">
                {p.num}
              </span>
              <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-[#1e1417] mt-3">
                {p.title}
              </h3>
              <p className="text-xs text-neutral-500 mt-2 font-light leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
