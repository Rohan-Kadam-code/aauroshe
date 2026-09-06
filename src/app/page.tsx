import { HeroBanner } from "@/components/organisms/HeroBanner";
import { ValueProps } from "@/components/organisms/ValueProps";
import { CategoryShowcase } from "@/components/organisms/CategoryShowcase";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { NewsletterSection } from "@/components/organisms/NewsletterSection";
import { catalogService } from "@/services/catalog/catalogService";

export const dynamic = "force-static";

export default async function HomePage() {
  const products = await catalogService.getAllProducts();

  return (
    <div className="flex flex-col">
      <HeroBanner />
      <ValueProps />
      <CategoryShowcase />
      <ProductGrid
        products={products}
        title="Signature Pieces"
        subtitle="Distinctive silhouettes and hand-finished details."
        showFilters={true}
      />
      <NewsletterSection />
    </div>
  );
}
