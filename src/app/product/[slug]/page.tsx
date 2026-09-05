import React from "react";
import { notFound } from "next/navigation";
import { catalogService } from "@/services/catalog/catalogService";
import ProductDetailClient from "./ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await catalogService.getAllProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await catalogService.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await catalogService.getProductsByCategory(product.categorySlug);
  const filteredRelated = relatedProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={filteredRelated} />;
}
