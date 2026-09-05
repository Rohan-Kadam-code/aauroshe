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
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock,
  LogOut,
  X,
  Search,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminConsolePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"CATALOGUE" | "CATEGORIES" | "ORDERS">("CATALOGUE");
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Add Product Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    subtitle: "",
    description: "",
    categoryId: "cat_perfumes",
    price: 4500,
    stockCount: 20,
    badge: "NEW" as const,
    thumbnail: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop",
  });

  // Edit Stock State
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [stockInput, setStockInput] = useState<number>(0);

  // Orders
  const [orders, setOrders] = useState([
    {
      id: "AUR-849201",
      customer: "Lady Eleanor Vance",
      email: "eleanor.vance@luxury.com",
      items: "Paris (50ml Eau de Parfum)",
      total: 3800,
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
  ]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout error", e);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryObj = CATEGORIES.find((c) => c.id === newProduct.categoryId) || CATEGORIES[0];

    const productToAdd = {
      id: `prod_${Date.now()}`,
      slug: newProduct.title.toLowerCase().replace(/\s+/g, "-"),
      title: newProduct.title,
      subtitle: newProduct.subtitle,
      description: newProduct.description,
      longDescription: newProduct.description,
      categoryId: categoryObj.id,
      categorySlug: categoryObj.slug,
      categoryName: categoryObj.name,
      price: Number(newProduct.price),
      badge: newProduct.badge,
      thumbnail: newProduct.thumbnail,
      images: [newProduct.thumbnail],
      rating: 5.0,
      reviewCount: 0,
      isFeatured: false,
      isNewArrival: true,
      inStock: true,
      variants: [
        {
          id: `var_${Date.now()}`,
          sku: `AUR-${newProduct.title.toUpperCase().slice(0, 6)}-STD`,
          name: "Standard Edition",
          price: Number(newProduct.price),
          stockCount: Number(newProduct.stockCount),
          inStock: true,
          attributes: { size: "Standard" },
        },
      ],
      createdAt: new Date().toISOString(),
    };

    setProducts([productToAdd as any, ...products]);
    setIsAddModalOpen(false);
    setNewProduct({
      title: "",
      subtitle: "",
      description: "",
      categoryId: "cat_perfumes",
      price: 4500,
      stockCount: 20,
      badge: "NEW",
      thumbnail: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop",
    });
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to remove this creation from the boutique catalogue?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleSaveStock = (id: string) => {
    setProducts(
      products.map((p) => {
        if (p.id === id && p.variants[0]) {
          const updatedVariants = [...p.variants];
          updatedVariants[0] = {
            ...updatedVariants[0],
            stockCount: stockInput,
            inStock: stockInput > 0,
          };
          return {
            ...p,
            variants: updatedVariants,
            inStock: stockInput > 0,
          };
        }
        return p;
      })
    );
    setEditingStockId(null);
  };

  const handleToggleOrderStatus = (orderId: string) => {
    setOrders(
      orders.map((o) => {
        if (o.id === orderId) {
          const nextStatus = o.status === "PAID" ? "SHIPPED" : o.status === "SHIPPED" ? "DELIVERED" : "PAID";
          return { ...o, status: nextStatus };
        }
        return o;
      })
    );
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === "all" || p.categorySlug === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="bg-neutral-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="bg-neutral-900 text-white p-6 sm:p-8 rounded-none mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold">
                Store Management Studio
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 border border-emerald-500/30">
                Secure Session Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-white mt-1">
              AaurOSHe Boutique Control Center
            </h1>
            <p className="text-xs text-neutral-400 font-light mt-1">
              Administer product catalogue, price tiers, stock allocations, and client orders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" className="border-neutral-700 text-white hover:bg-neutral-800">
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                <span>View Storefront</span>
              </Button>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
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
            <span>Customer Orders ({orders.length})</span>
          </button>
        </div>

        {/* TAB 1: CATALOGUE MANAGEMENT */}
        {activeTab === "CATALOGUE" && (
          <div className="bg-white border border-neutral-200 shadow-sm">
            <div className="p-4 sm:p-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-serif uppercase tracking-widest text-neutral-900 font-semibold">
                  Product Inventory Management
                </h2>
                <p className="text-xs text-neutral-500">
                  Add new creations, adjust stock allocations, and update live prices.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button onClick={() => setIsAddModalOpen(true)} variant="gold" size="sm">
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  <span>Add Creation</span>
                </Button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 bg-neutral-50 border-b border-neutral-200 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search creation title or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-neutral-200 text-xs focus:outline-none focus:border-neutral-900"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-white border border-neutral-200 px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:border-neutral-900 cursor-pointer"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 text-neutral-500 uppercase tracking-wider border-b border-neutral-200 text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Creation</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Base Price</th>
                    <th className="py-3 px-4">Stock Allocation</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredProducts.map((p) => {
                    const currentStock = p.variants[0]?.stockCount ?? 10;
                    return (
                      <tr key={p.id} className="hover:bg-neutral-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-12 bg-neutral-100 shrink-0 border border-neutral-200 overflow-hidden">
                              <Image src={p.thumbnail} alt={p.title} fill className="object-cover" />
                            </div>
                            <div>
                              <div className="font-medium text-neutral-900 font-serif">{p.title}</div>
                              <div className="text-[11px] text-neutral-400 font-mono">{p.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-neutral-600 font-medium">
                          {p.categoryName}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-neutral-900">
                          {formatINR(p.price)}
                        </td>
                        <td className="py-3.5 px-4">
                          {editingStockId === p.id ? (
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                min={0}
                                value={stockInput}
                                onChange={(e) => setStockInput(Number(e.target.value))}
                                className="w-16 p-1 border border-neutral-300 text-xs text-center"
                              />
                              <button
                                onClick={() => handleSaveStock(p.id)}
                                className="p-1 bg-neutral-900 text-white hover:bg-neutral-800"
                                title="Save"
                              >
                                <Check className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => setEditingStockId(null)}
                                className="p-1 text-neutral-400 hover:text-neutral-700"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className={`font-mono ${currentStock < 5 ? "text-amber-700 font-bold" : "text-neutral-700"}`}>
                                {currentStock} units
                              </span>
                              <button
                                onClick={() => {
                                  setEditingStockId(p.id);
                                  setStockInput(currentStock);
                                }}
                                className="text-[10px] text-amber-800 hover:underline uppercase font-medium"
                              >
                                Edit
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          {currentStock > 0 ? (
                            <span className="inline-flex items-center px-2 py-0.5 text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Active In Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 text-[10px] bg-rose-50 text-rose-700 border border-rose-200">
                              Sold Out
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="text-neutral-400 hover:text-red-600 p-1 transition-colors"
                            title="Delete Creation"
                          >
                            <Trash2 className="w-4 h-4 inline" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: CATEGORIES MANAGEMENT */}
        {activeTab === "CATEGORIES" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="bg-white border border-neutral-200 p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-amber-800 font-semibold">
                    {cat.slug}
                  </span>
                  <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5">
                    {products.filter((p) => p.categorySlug === cat.slug).length} active products
                  </span>
                </div>
                <h3 className="font-serif text-lg text-neutral-900">{cat.name}</h3>
                <p className="text-xs text-neutral-500 font-light">{cat.description}</p>
                <div className="pt-2 border-t border-neutral-100 flex justify-between items-center text-xs">
                  <span className="text-neutral-400">{cat.tagline}</span>
                  <Link href={`/shop?category=${cat.slug}`} className="text-amber-700 hover:underline">
                    View in Boutique →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: CUSTOMER ORDERS */}
        {activeTab === "ORDERS" && (
          <div className="bg-white border border-neutral-200 shadow-sm">
            <div className="p-4 sm:p-6 border-b border-neutral-200">
              <h2 className="text-sm font-serif uppercase tracking-widest text-neutral-900 font-semibold">
                Customer Orders & Fulfillment
              </h2>
              <p className="text-xs text-neutral-500">
                Track client orders, Razorpay payment status, and update shipment progression.
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
                    <th className="py-3 px-4">Fulfillment Status</th>
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
                        <button
                          onClick={() => handleToggleOrderStatus(ord.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
                            ord.status === "PAID"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                              : ord.status === "SHIPPED"
                              ? "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                              : "bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100"
                          }`}
                          title="Click to advance status"
                        >
                          {ord.status === "PAID" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          <span>{ord.status}</span>
                        </button>
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

        {/* ADD PRODUCT MODAL */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <h3 className="text-sm font-serif uppercase tracking-widest text-neutral-900 font-semibold">
                  Add New Creation to Catalogue
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-neutral-400 hover:text-neutral-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block text-neutral-700 uppercase tracking-wider mb-1 font-medium text-[10px]">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                    placeholder="e.g., Céleste Extrait de Parfum"
                    className="w-full bg-neutral-50 border border-neutral-200 p-2.5 text-xs focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 uppercase tracking-wider mb-1 font-medium text-[10px]">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    required
                    value={newProduct.subtitle}
                    onChange={(e) => setNewProduct({ ...newProduct, subtitle: e.target.value })}
                    placeholder="e.g., 50ml Pure Extrait"
                    className="w-full bg-neutral-50 border border-neutral-200 p-2.5 text-xs focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-700 uppercase tracking-wider mb-1 font-medium text-[10px]">
                      Category
                    </label>
                    <select
                      value={newProduct.categoryId}
                      onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 p-2.5 text-xs focus:outline-none focus:border-neutral-900"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-neutral-700 uppercase tracking-wider mb-1 font-medium text-[10px]">
                      Badge
                    </label>
                    <select
                      value={newProduct.badge}
                      onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value as any })}
                      className="w-full bg-neutral-50 border border-neutral-200 p-2.5 text-xs focus:outline-none focus:border-neutral-900"
                    >
                      <option value="NEW">NEW</option>
                      <option value="BESTSELLER">BESTSELLER</option>
                      <option value="EXCLUSIVE">EXCLUSIVE</option>
                      <option value="LIMITED">LIMITED</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-700 uppercase tracking-wider mb-1 font-medium text-[10px]">
                      Price in INR (₹)
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                      className="w-full bg-neutral-50 border border-neutral-200 p-2.5 text-xs focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-700 uppercase tracking-wider mb-1 font-medium text-[10px]">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={newProduct.stockCount}
                      onChange={(e) => setNewProduct({ ...newProduct, stockCount: Number(e.target.value) })}
                      className="w-full bg-neutral-50 border border-neutral-200 p-2.5 text-xs focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-700 uppercase tracking-wider mb-1 font-medium text-[10px]">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Artisanal description of the creation..."
                    className="w-full bg-neutral-50 border border-neutral-200 p-2.5 text-xs focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="gold" size="sm">
                    Publish to Catalogue
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
