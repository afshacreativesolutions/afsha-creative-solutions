import "server-only";

import { unstable_cache } from "next/cache";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { BlogPostRecord, CategoryRecord, ProductRecord } from "@/lib/catalog-types";
import { STATIC_BLOG_POSTS, getStaticBlogPost } from "@/lib/blog-data";

export const DEFAULT_CATEGORIES: CategoryRecord[] = [
  { id: "cat-gates", name: "Main Gates", slug: "gates", description: "Custom stainless steel and handcrafted wrought iron entrance gates tailored for residential and commercial security.", sort_order: 1, is_active: true },
  { id: "cat-stair", name: "Staircase Railings", slug: "stair-railings", description: "Bespoke architectural balustrades for interior and exterior stairs crafted in steel, iron, and brass finishes.", sort_order: 2, is_active: true },
  { id: "cat-balcony", name: "Balcony Railings", slug: "balcony-railings", description: "Engineered weather-resistant terrace and balcony railings combining safety compliance with luxury curb appeal.", sort_order: 3, is_active: true },
  { id: "cat-spiral", name: "Spiral Railings", slug: "spiral-railings", description: "Sculptural curved and spiral balustrades demanding precision bending and artisan metalcraft.", sort_order: 4, is_active: true },
  { id: "cat-grills", name: "Decorative Grills", slug: "decorative-grills", description: "Artistic window safety grills, laser-cut panels, and architectural partition screens.", sort_order: 5, is_active: true },
  { id: "cat-custom", name: "Custom Metalwork", slug: "custom-metalwork", description: "Made-to-order metal gates, railings, structural metal features, and bespoke architectural metal fabrication.", sort_order: 6, is_active: true },
];

const productSelection = "*, category:categories(id,name,slug,description,sort_order,is_active), images:product_images(id,product_id,storage_path,alt_text,sort_order,is_primary,created_at)";

function normalizeProduct(row: Record<string, unknown>): ProductRecord {
  const images = (Array.isArray(row.images) ? row.images : []) as ProductRecord["images"];
  return {
    ...row,
    category: (Array.isArray(row.category) ? row.category[0] : row.category) as CategoryRecord | undefined,
    images: images.sort((a, b) => a.sort_order - b.sort_order),
  } as ProductRecord;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function withSignedImages(supabase: any, products: ProductRecord[]): Promise<ProductRecord[]> {
  if (!supabase) return products;
  const paths = [...new Set(products.flatMap((product) => product.images.map((image) => image.storage_path)))];
  if (!paths.length) return products;
  // WhatsApp quote messages include these URLs, so give recipients time to open
  // the image after it has been shared.
  const { data, error } = await supabase.storage.from("product-images").createSignedUrls(paths, 7 * 24 * 60 * 60);
  if (error) {
    console.error("Could not create signed product image URLs:", error.message);
    return products;
  }
  const urls = new Map<string, string>((data ?? []).map((item: { path: string; signedUrl: string }) => [item.path, item.signedUrl]));
  return products.map((product) => ({
    ...product,
    images: product.images.map((image) => ({ ...image, url: urls.get(image.storage_path) || "" })),
  }));
}

export const getPublicCategories = unstable_cache(
  async (): Promise<CategoryRecord[]> => {
    try {
      const supabase = createSupabasePublicClient();
      if (!supabase) return DEFAULT_CATEGORIES;
      const { data, error } = await supabase
        .from("categories")
        .select("id,name,slug,description,sort_order,is_active")
        .eq("is_active", true)
        .order("sort_order");
      if (error || !data || data.length === 0) {
        return DEFAULT_CATEGORIES;
      }
      return data as CategoryRecord[];
    } catch {
      return DEFAULT_CATEGORIES;
    }
  },
  ["public-categories"],
  { revalidate: 300, tags: ["categories"] }
);

export const getPublicProducts = unstable_cache(
  async (): Promise<ProductRecord[]> => {
    const supabase = createSupabasePublicClient();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from("products")
      .select(productSelection)
      .eq("is_published", true)
      .order("sort_order")
      .order("name");
    if (error) {
      console.error("Could not load products:", error.message);
      return [];
    }
    return withSignedImages(supabase, (data ?? []).map((row) => normalizeProduct(row as Record<string, unknown>)));
  },
  ["public-products"],
  { revalidate: 300, tags: ["products"] }
);

export const getPublicProduct = unstable_cache(
  async (slug: string): Promise<ProductRecord | null> => {
    const supabase = createSupabasePublicClient();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from("products")
      .select(productSelection)
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error || !data) return null;
    const [product] = await withSignedImages(supabase, [normalizeProduct(data as Record<string, unknown>)]);
    return product;
  },
  ["public-product-detail"],
  { revalidate: 300, tags: ["products"] }
);

export async function getAdminProducts(): Promise<ProductRecord[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("products")
    .select(productSelection)
    .order("updated_at", { ascending: false });
  if (error) throw new Error(error.message);
  return withSignedImages(supabase, (data ?? []).map((row) => normalizeProduct(row as Record<string, unknown>)));
}

export async function getAdminCategories(): Promise<CategoryRecord[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("categories")
    .select("id,name,slug,description,sort_order,is_active")
    .order("sort_order");
  if (error) throw new Error(error.message);
  return data as CategoryRecord[];
}

export async function getAdminProduct(id: string): Promise<ProductRecord | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("products")
    .select(productSelection)
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  const [product] = await withSignedImages(supabase, [normalizeProduct(data as Record<string, unknown>)]);
  return product;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function withSignedBlogImage(supabase: any, post: BlogPostRecord): Promise<BlogPostRecord> {
  const image = post.featured_image;
  if (!image || image.startsWith("http") || image.startsWith("/")) return post;
  const { data, error } = await supabase.storage.from("blog-images").createSignedUrl(image, 7 * 24 * 60 * 60);
  if (error || !data?.signedUrl) return post;
  return { ...post, featured_image: data.signedUrl };
}

export const getPublicBlogPosts = unstable_cache(
  async (): Promise<BlogPostRecord[]> => {
    try {
      const supabase = createSupabasePublicClient();
      if (!supabase) return STATIC_BLOG_POSTS;
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false, nullsFirst: false });
      if (error || !data || data.length === 0) {
        return STATIC_BLOG_POSTS;
      }
      const posts = (data ?? []) as BlogPostRecord[];
      return Promise.all(posts.map((post) => withSignedBlogImage(supabase, post)));
    } catch {
      return STATIC_BLOG_POSTS;
    }
  },
  ["public-blog-posts"],
  { revalidate: 300, tags: ["blog_posts"] }
);

export const getPublicBlogPost = unstable_cache(
  async (slug: string): Promise<BlogPostRecord | null> => {
    try {
      const supabase = createSupabasePublicClient();
      if (!supabase) return getStaticBlogPost(slug);
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (error || !data) return getStaticBlogPost(slug);
      return withSignedBlogImage(supabase, data as BlogPostRecord);
    } catch {
      return getStaticBlogPost(slug);
    }
  },
  ["public-blog-post-detail"],
  { revalidate: 300, tags: ["blog_posts"] }
);

export async function getAdminBlogPosts(): Promise<BlogPostRecord[]> {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) {
      console.warn("Could not load blog posts for admin:", error.message);
      return [];
    }
    const posts = (data ?? []) as BlogPostRecord[];
    return Promise.all(posts.map((post) => withSignedBlogImage(supabase, post)));
  } catch (err) {
    console.warn("Error in getAdminBlogPosts:", err);
    return [];
  }
}

export async function checkBlogTableStatus(): Promise<{ exists: boolean; error?: string }> {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return { exists: false, error: "Supabase connection not configured." };
    const { error } = await supabase.from("blog_posts").select("id").limit(1);
    if (error) {
      return { exists: false, error: error.message };
    }
    return { exists: true };
  } catch (err) {
    return { exists: false, error: err instanceof Error ? err.message : "Unknown database error" };
  }
}

export async function getAdminBlogPost(id: string): Promise<BlogPostRecord | null> {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error || !data) return null;
    return withSignedBlogImage(supabase, data as BlogPostRecord);
  } catch {
    return null;
  }
}

