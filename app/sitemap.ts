import type { MetadataRoute } from "next";
import { getPublicBlogPosts, getPublicCategories, getPublicProducts } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site-config";

const staticRoutes = [
  "/",
  "/about",
  "/contact",
  "/products",
  "/categories",
  "/gallery",
  "/custom-metalwork",
  "/services",
  "/faq",
  "/blog",
  "/locations/metal-gate-manufacturers-moradabad",
  "/locations/iron-railing-manufacturers-moradabad",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, posts] = await Promise.all([
    getPublicProducts().catch(() => []),
    getPublicCategories().catch(() => []),
    getPublicBlogPosts().catch(() => []),
  ]);

  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1.0 : 0.7,
  }));

  // Categories
  for (const category of categories) {
    routes.push({
      url: absoluteUrl(`/categories/${category.slug}`),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Products & Primary Design Details
  for (const product of products) {
    const productLastMod = product.updated_at ? new Date(product.updated_at) : new Date();
    routes.push({
      url: absoluteUrl(`/products/${product.slug}`),
      lastModified: productLastMod,
      changeFrequency: "monthly",
      priority: 0.9,
    });

    // Primary or featured design page
    const primaryImage = product.images.find((img) => img.is_primary) ?? product.images[0];
    if (primaryImage) {
      routes.push({
        url: absoluteUrl(`/products/${product.slug}/design/${primaryImage.id}`),
        lastModified: productLastMod,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // Blog posts
  for (const post of posts) {
    routes.push({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return routes;
}
