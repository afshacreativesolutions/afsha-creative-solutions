import type { Metadata } from "next";
import ProductsCatalog from "./products-catalog";
import { getPublicCategories, getPublicProducts } from "@/lib/catalog";
import { getSupabaseConfig } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Metalwork Products | Afsha Creative Solution",
  description:
    "Explore custom steel and iron gates, stair railings, balcony railings, and architectural metalwork handcrafted by Afsha Creative Solution.",
  alternates: { canonical: "/products" },
};

type ProductsPageProps = {
  searchParams: Promise<{ category?: string; material?: string }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const filters = await searchParams;
  const [products, categories] = await Promise.all([getPublicProducts(), getPublicCategories()]);
  const catalogProducts = products.map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category?.name ?? "Metalwork",
    categorySlug: product.category?.slug ?? "",
    materials: product.materials,
    finish: product.finish_options[0] ?? product.materials[0] ?? "Made to measure",
    shortDescription: product.short_description,
    imageUrl: (product.images.find((image) => image.is_primary) ?? product.images[0])?.url ?? "",
    number: String(product.sort_order + 1).padStart(2, "0"),
  }));

  return (
    <ProductsCatalog
      products={catalogProducts}
      categories={categories.map(({ id, name, slug }) => ({ id, name, slug }))}
      initialCategory={filters.category ?? "all"}
      initialMaterial={filters.material ?? "all"}
      isConfigured={Boolean(getSupabaseConfig())}
      key={`${filters.category ?? "all"}-${filters.material ?? "all"}`}
    />
  );
}
