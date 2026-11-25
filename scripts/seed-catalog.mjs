import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local before seeding.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
const imageSource = await readFile(path.join(root, "utils", "images.ts"), "utf8");
const imports = new Map([...imageSource.matchAll(/^\s*import\s+(\w+)\s+from\s+["']\.\.\/assets\/([^"']+)["']/gm)]
  .map(([, name, relativePath]) => [name, relativePath]));
const imageSection = imageSource.slice(imageSource.indexOf("export const images = {"));
const collections = new Map();
for (const [, collectionName, body] of imageSection.matchAll(/^    (\w+): \{\r?\n([\s\S]*?)^    \},/gm)) {
  const names = [...body.matchAll(/^\s+(\w+),?\s*$/gm)].map((match) => match[1]);
  if (collectionName !== "logo") collections.set(collectionName, names);
}

const categoryRows = [
  { name: "Gates", slug: "gates", sort_order: 1 },
  { name: "Stair railings", slug: "stair-railings", sort_order: 2 },
  { name: "Balcony railings", slug: "balcony-railings", sort_order: 3 },
  { name: "Spiral railings", slug: "spiral-railings", sort_order: 4 },
];
const { data: categories, error: categoryError } = await supabase.from("categories").upsert(categoryRows, { onConflict: "slug" }).select("id,slug");
if (categoryError) throw categoryError;
const categoryIds = new Map(categories.map((category) => [category.slug, category.id]));

const productRows = [
  { slug: "modern-stainless-steel-gate", name: "Modern stainless steel gate", category: "gates", gallery: "steel_gate", primary: "ssGate13", material: "Stainless steel", applications: ["Residential entrance"], customization: ["Made-to-measure sizing", "Design and finish selected per project"] },
  { slug: "handcrafted-iron-entry-gate", name: "Handcrafted iron entry gate", category: "gates", gallery: "iron_gates", primary: "ironGate3", material: "Iron", applications: ["Residential entrance"], customization: ["Made-to-measure sizing", "Design and finish selected per project"] },
  { slug: "contemporary-stair-railing", name: "Contemporary stair railing", category: "stair-railings", gallery: "steel_stair_railing", primary: "ssStairRailling8", material: "Stainless steel", applications: ["Interior staircases"], customization: ["Made-to-measure sizing", "Design and finish selected per project"] },
  { slug: "classic-iron-stair-balustrade", name: "Classic iron stair balustrade", category: "stair-railings", gallery: "iron_stair_railing", primary: "ironStairRailling4", material: "Iron", applications: ["Interior staircases"], customization: ["Made-to-measure sizing", "Design and finish selected per project"] },
  { slug: "minimal-balcony-railing", name: "Minimal balcony railing", category: "balcony-railings", gallery: "steel_balcony_railing", primary: "ssBalconyRailling4", material: "Stainless steel", applications: ["Balconies"], customization: ["Made-to-measure sizing", "Design and finish selected per project"] },
  { slug: "decorative-iron-balcony-rail", name: "Decorative iron balcony rail", category: "balcony-railings", gallery: "iron_balcony_railing", primary: "ironbrail3", material: "Iron", applications: ["Balconies"], customization: ["Made-to-measure sizing", "Design and finish selected per project"] },
  { slug: "sculptural-spiral-railing", name: "Sculptural spiral railing", category: "spiral-railings", gallery: "steel_spiral_railing", primary: "ssSpiralRailling3", material: "Stainless steel", applications: ["Spiral staircases"], customization: ["Made-to-measure sizing", "Design and finish selected per project"] },
  { slug: "bespoke-spiral-staircase-rail", name: "Bespoke spiral staircase rail", category: "spiral-railings", gallery: "steel_spiral_railing", primary: "ssSpiralRailling1", material: "Stainless steel", applications: ["Spiral staircases"], customization: ["Made-to-measure sizing", "Design and finish selected per project"] },
];

for (const product of productRows) {
  const imageNames = collections.get(product.gallery);
  if (!imageNames?.length || !imageNames.includes(product.primary)) throw new Error(`Missing image mapping for ${product.slug}.`);
  const productData = {
    name: product.name,
    slug: product.slug,
    category_id: categoryIds.get(product.category),
    short_description: `A made-to-measure ${product.material.toLowerCase()} design, finished to suit your project.`,
    description: `${product.name} is made to order for the intended space. Share your measurements and preferred look with the Afsha Creative Solution team to discuss a suitable design.`,
    materials: [product.material],
    applications: product.applications,
    customization_options: product.customization,
    finish_options: [],
    specifications: {},
    is_published: false,
    is_featured: false,
    sort_order: productRows.indexOf(product),
  };
  const { data: savedProduct, error: productError } = await supabase.from("products").upsert(productData, { onConflict: "slug" }).select("id").single();
  if (productError) throw productError;

  const orderedNames = [product.primary, ...imageNames.filter((name) => name !== product.primary)];
  const records = [];
  for (const [index, imageName] of orderedNames.entries()) {
    const relativePath = imports.get(imageName);
    if (!relativePath) throw new Error(`No source file registered for ${imageName}.`);
    const filePath = path.join(root, "assets", relativePath);
    const file = await readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();
    const contentType = extension === ".jpg" || extension === ".jpeg" ? "image/jpeg" : extension === ".png" ? "image/png" : extension === ".avif" ? "image/avif" : extension === ".webp" ? "image/webp" : null;
    if (!contentType) throw new Error(`Unsupported product image format: ${relativePath}`);
    const storagePath = `${product.slug}/${path.basename(filePath)}`;
    const { error: uploadError } = await supabase.storage.from("product-images").upload(storagePath, file, { contentType, upsert: true, cacheControl: "31536000" });
    if (uploadError) throw uploadError;
    records.push({
      product_id: savedProduct.id,
      storage_path: storagePath,
      alt_text: `${product.name} design ${index + 1}`,
      sort_order: index,
      is_primary: index === 0,
    });
  }

  const { error: deleteImagesError } = await supabase.from("product_images").delete().eq("product_id", savedProduct.id);
  if (deleteImagesError) throw deleteImagesError;
  const { error: insertImagesError } = await supabase.from("product_images").insert(records);
  if (insertImagesError) throw insertImagesError;
  console.log(`Seeded ${product.name}: ${records.length} images (draft)`);
}

console.log(`Seed complete: ${productRows.length} draft products across ${categoryRows.length} categories.`);
