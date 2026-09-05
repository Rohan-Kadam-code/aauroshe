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
    <section className="py-20 bg-neutral-950 text-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-neutral-900/80 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-medium">
            Private Atelier Invitations
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-serif font-normal text-white">
          Join the AAUROSHE Circle
        </h2>

        <p className="mt-3 text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto font-light leading-relaxed">
          Receive exclusive invitations to private seasonal salons, limited flacon releases, and early previews of bespoke jewelry collections.
        </p>

        {submitted ? (
          <div className="mt-8 inline-flex items-center gap-2 bg-neutral-900 border border-amber-500/50 px-6 py-3 text-amber-300 text-xs uppercase tracking-widest">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Welcome to the Circle. Please verify your invitation in your inbox.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 bg-neutral-900 border border-neutral-800 px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500/80"
            />
            <Button type="submit" variant="gold" size="md">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};
