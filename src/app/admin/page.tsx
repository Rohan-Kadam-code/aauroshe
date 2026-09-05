"use client";

import React, { useState } from "react";
import { MOCK_PRODUCTS } from "@/services/catalog/mockCatalogData";
import { CATEGORIES } from "@/core/constants/categories";
import { formatINR } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";
import {
  Layers,
  Package,
  FolderGit2,
  ShieldAlert,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function AdminConsolePage() {
  const [activeTab, setActiveTab] = useState<"CATALOGUE" | "CATEGORIES" | "GATE_RELEASES" | "SECURITY">("CATALOGUE");
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  return (
    <div className="bg-neutral-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="bg-neutral-900 text-white p-6 sm:p-8 rounded-none mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold">
                Administration Console
              </span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 border border-amber-500/30">
                Gate Release Verified
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-white mt-1">
              AAUROSHE Management Studio
            </h1>
            <p className="text-xs text-neutral-400 font-light mt-1">
              Admin-controlled catalogue, 10 categories, release dump gates, and security posture.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" className="border-neutral-700 text-white hover:bg-neutral-800">
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                <span>View Live Storefront</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-300 bg-white mb-6 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("CATALOGUE")}
            className={`px-6 py-3.5 text-xs uppercase tracking-widest font-medium border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === "CATALOGUE"
                ? "border-amber-600 text-neutral-950 font-semibold bg-amber-50/20"
                : "border-transparent text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Catalogue Products ({products.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("CATEGORIES")}
            className={`px-6 py-3.5 text-xs uppercase tracking-widest font-medium border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === "CATEGORIES"
                ? "border-amber-600 text-neutral-950 font-semibold bg-amber-50/20"
                : "border-transparent text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>10 Luxury Maisons</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("GATE_RELEASES")}
            className={`px-6 py-3.5 text-xs uppercase tracking-widest font-medium border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === "GATE_RELEASES"
                ? "border-amber-600 text-neutral-950 font-semibold bg-amber-50/20"
                : "border-transparent text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Gate Releases (/release)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("SECURITY")}
            className={`px-6 py-3.5 text-xs uppercase tracking-widest font-medium border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === "SECURITY"
                ? "border-amber-600 text-neutral-950 font-semibold bg-amber-50/20"
                : "border-transparent text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Blast Radius & Security</span>
          </button>
        </div>

        {/* Tab 1: Catalogue Products */}
        {activeTab === "CATALOGUE" && (
          <div className="bg-white border border-neutral-200 shadow-sm">
            <div className="p-4 sm:p-6 border-b border-neutral-200 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-serif uppercase tracking-widest text-neutral-900 font-semibold">
                  Product Inventory Management
                </h2>
                <p className="text-xs text-neutral-500">
                  Full control over titles, prices, stock levels, variants, and imagery.
                </p>
              </div>
              <Button variant="gold" size="sm">
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>Add Creation</span>
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 text-neutral-500 uppercase tracking-wider border-b border-neutral-200 text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Creation</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Base Price</th>
                    <th className="py-3 px-4">Variants</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-neutral-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-neutral-900 font-serif">{p.title}</div>
                        <div className="text-[11px] text-neutral-400 font-mono">{p.slug}</div>
                      </td>
                      <td className="py-3.5 px-4 text-neutral-600 font-medium">
                        {p.categoryName}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-neutral-900">
                        {formatINR(p.price)}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-500">
                        {p.variants.length} variant(s)
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Active In Stock
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button className="text-neutral-500 hover:text-neutral-900 p-1" title="Edit">
                          <Edit2 className="w-3.5 h-3.5 inline" />
                        </button>
                        <button className="text-neutral-400 hover:text-red-600 p-1" title="Delete">
                          <Trash2 className="w-3.5 h-3.5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: 10 Luxury Maisons */}
        {activeTab === "CATEGORIES" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="bg-white border border-neutral-200 p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-amber-800 font-semibold">
                    {cat.slug}
                  </span>
                  <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5">
                    {cat.itemCount} items
                  </span>
                </div>
                <h3 className="font-serif text-lg text-neutral-900">{cat.name}</h3>
                <p className="text-xs text-neutral-500 font-light">{cat.description}</p>
                <div className="pt-2 border-t border-neutral-100 flex justify-between items-center text-xs">
                  <span className="text-neutral-400">Owner: Admin Console</span>
                  <Link href={`/shop?category=${cat.slug}`} className="text-amber-700 hover:underline">
                    View in Boutique →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Gate Releases */}
        {activeTab === "GATE_RELEASES" && (
          <div className="bg-white border border-neutral-200 p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-base font-serif uppercase tracking-widest text-neutral-900 font-semibold">
                Release Gate Snapshots & Dumps
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Release artifacts dumped to <code className="bg-neutral-100 px-1 py-0.5 font-mono">/release</code> directory for verification and deployment gatekeeping.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border border-emerald-200 bg-emerald-50/50 p-5 flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <strong className="text-xs font-semibold text-neutral-900">
                      Gate-01: Foundation & Luxury Storefront Setup
                    </strong>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 uppercase tracking-wider font-semibold">
                      Passed & Packaged
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600">
                    Includes Atomic UI Library, Decoupled Services, 10 Maisons Catalogue, Razorpay payment abstraction, and Security Headers.
                  </p>
                  <p className="text-[11px] text-neutral-400 font-mono">
                    Dump location: release/gate-releases/Gate-01-Foundation-Storefront/
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-neutral-500 block">v1.0.0</span>
                  <span className="text-[10px] text-emerald-700 font-medium">Blast Radius: Low (Zero Cycles)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Security & Blast Radius */}
        {activeTab === "SECURITY" && (
          <div className="bg-white border border-neutral-200 p-6 sm:p-8 space-y-6">
            <h2 className="text-base font-serif uppercase tracking-widest text-neutral-900 font-semibold">
              Security Governance & Blast Radius Diagnostics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-4 border border-neutral-200 bg-neutral-50/50 space-y-2">
                <strong className="text-neutral-900 block text-sm font-serif">Security Hardening Status</strong>
                <ul className="space-y-1.5 text-neutral-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>OWASP Security Headers (HSTS, CSP, X-Frame-Options)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Strict Zod Schema Validation for Environment & Payloads</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>HMAC-SHA256 Razorpay Webhook Signature Verification</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 border border-neutral-200 bg-neutral-50/50 space-y-2">
                <strong className="text-neutral-900 block text-sm font-serif">Blast Radius Protection</strong>
                <p className="text-neutral-600">
                  All services (Cart, Catalog, Payment, Auth, Order) are written as pure, decoupled domain modules. Updating one function cannot cause cascading failures in unrelated features.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
