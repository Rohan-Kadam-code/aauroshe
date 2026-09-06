"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Sparkles, Check } from "lucide-react";

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#260812] text-white relative overflow-hidden border-t border-[#3d0e1c]">
      {/* Subtle Background Glow in Wine */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#5c2030]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-rose-200/80 font-light block mb-2">
          Atelier Privileges
        </span>

        <h2 className="text-2xl sm:text-3xl font-serif font-normal text-white">
          The Circle.
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-md mx-auto font-light leading-relaxed">
          Quiet updates on rare extrait releases and private salon appointments. No noise.
        </p>

        {submitted ? (
          <div className="mt-6 inline-flex items-center gap-2 bg-[#380d1a] border border-[#5c2030] px-5 py-2.5 text-rose-200 text-xs tracking-widest uppercase">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Welcome. Your invitation is reserved.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 bg-white/5 border border-white/15 px-4 py-3 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-rose-300/60"
            />
            <Button type="submit" variant="wine" size="md" className="bg-[#4a1525] border-[#6b2539] hover:bg-[#5c2030]">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};
