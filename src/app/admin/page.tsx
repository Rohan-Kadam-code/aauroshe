"use client";

import React, { useState } from "react";
import { MOCK_PRODUCTS } from "@/services/catalog/mockCatalogData";
import { CATEGORIES } from "@/core/constants/categories";
import { formatINR } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";
import {
  Layers,
  Package,
  ShoppingBag,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function AdminConsolePage() {
  const [activeTab, setActiveTab] = useState<"CATALOGUE" | "CATEGORIES" | "ORDERS">("CATALOGUE");
  const [products] = useState(MOCK_PRODUCTS);

  // Mock initial orders for demonstration per Quotation Module 6
  const orders = [
    {
      id: "AUR-849201",
      customer: "Lady Eleanor Vance",
      email: "eleanor.vance@luxury.com",
      items: "Royal Oud Imperial Extrait (50ml)",
      total: 14500,
      status: "PAID",
      date: "Today, 4:15 PM",
    },
    {
      id: "AUR-783912",
      customer: "Aarav Mehra",
      email: "aarav.m@outlook.com",
      items: "The Monolith Structured Bag (Noir)",
      total: 49500,
      status: "SHIPPED",
      date: "Yesterday",
    },
    {
      id: "AUR-651294",
      customer: "Priya Singhania",
      email: "priya.s@atelier.in",
      items: "Aurora Diamond Choker (18K)",
      total: 88000,
      status: "PAID",
      date: "04 Sep 2026",
    },
  ];

  return (
    <div className="bg-neutral-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="bg-neutral-900 text-white p-6 sm:p-8 rounded-none mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-1">
              Store Management Console
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif text-white">
              AaurOSHe Boutique Studio
            </h1>
            <p className="text-xs text-neutral-400 font-light mt-1">
              Control catalogue items, categories, inventory stock, and customer orders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" className="border-neutral-700 text-white hover:bg-neutral-800">
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                <span>View Live Boutique</span>
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
            <span>10 Luxury Maisons ({CATEGORIES.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("ORDERS")}
            className={`px-6 py-3.5 text-xs uppercase tracking-widest font-medium border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === "ORDERS"
                ? "border-amber-600 text-neutral-950 font-semibold bg-amber-50/20"
                : "border-transparent text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Recent Orders ({orders.length})</span>
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

        {/* Tab 3: Customer Orders & Fulfillment */}
        {activeTab === "ORDERS" && (
          <div className="bg-white border border-neutral-200 shadow-sm">
            <div className="p-4 sm:p-6 border-b border-neutral-200">
              <h2 className="text-sm font-serif uppercase tracking-widest text-neutral-900 font-semibold">
                Customer Orders & Fulfillment
              </h2>
              <p className="text-xs text-neutral-500">
                Track client orders, Razorpay payment status, and shipping fulfillment.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 text-neutral-500 uppercase tracking-wider border-b border-neutral-200 text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Order #</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Creation Ordered</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-neutral-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-medium text-neutral-900">
                        #{ord.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-neutral-900">{ord.customer}</div>
                        <div className="text-[11px] text-neutral-400">{ord.email}</div>
                      </td>
                      <td className="py-3.5 px-4 text-neutral-700 font-serif">
                        {ord.items}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-neutral-900">
                        {formatINR(ord.total)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                          ord.status === "PAID"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}>
                          {ord.status === "PAID" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          <span>{ord.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-neutral-400">
                        {ord.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
