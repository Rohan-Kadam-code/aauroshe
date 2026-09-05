"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/atoms/Logo";
import { Button } from "@/components/atoms/Button";
import { Lock, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Authentication failed.");
      }
    } catch {
      setError("Network error connecting to authentication server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 p-8 shadow-2xl space-y-6 text-white">
        <div className="text-center space-y-3">
          <Logo variant="light" size="md" showTagline={true} />
          <div className="pt-4 border-t border-neutral-800">
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-semibold block">
              Boutique Studio
            </span>
            <h1 className="text-lg font-serif text-white mt-1">
              Store Administrator Sign In
            </h1>
            <p className="text-xs text-neutral-400 font-light mt-1">
              Protected administrative area for catalogue and inventory control.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-neutral-400 uppercase tracking-widest text-[10px] font-medium mb-1.5">
              Admin Access Key / Password
            </label>
            <div className="relative flex items-center">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password..."
                className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-amber-500"
              />
              <Lock className="w-4 h-4 text-neutral-600 absolute right-3 pointer-events-none" />
            </div>
            <p className="text-[10px] text-neutral-500 mt-1">
              Demo access: <code className="text-neutral-400 font-mono">AaurosheAdmin@2026</code>
            </p>
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            isLoading={isLoading}
            className="w-full"
          >
            Authenticate Session
          </Button>
        </form>

        <div className="pt-4 border-t border-neutral-800 text-center text-[10px] text-neutral-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
          <span>Role-Guarded 256-Bit HttpOnly Encryption</span>
        </div>
      </div>
    </div>
  );
}
