import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cache } from "react";
import { notFound } from "next/navigation";
import { getPublicProduct } from "@/lib/catalog";
import { getPublicSiteOrigin } from "@/lib/site-url";

type DesignPageProps = { params: Promise<{ slug: string; imageId: string }> };

const getDesign = cache(async (slug: string, imageId: string) => {
  const product = await getPublicProduct(slug);
  if (!product) return null;
  const image = product.images.find((item) => item.id === imageId);
  const imageUrl = image?.url;
  if (!image || !imageUrl) return null;
  const index = product.images.findIndex((item) => item.id === imageId);
  const prefix = product.slug.split("-").map((part) => part[0]).join("").slice(0, 5).toUpperCase();
  return { product, image, imageUrl, designId: `${prefix}-${String(index + 1).padStart(2, "0")}` };
});

export async function generateMetadata({ params }: DesignPageProps): Promise<Metadata> {
  const { slug, imageId } = await params;
  const design = await getDesign(slug, imageId);
  if (!design) return { title: "Design not found | Afsha Creative Solution" };

  const title = `${design.product.name} · Design ${design.designId}`;
  const description = `View design ${design.designId} from ${design.product.name}. Contact Afsha Creative Solution for a custom quote.`;
  const origin = await getPublicSiteOrigin();

  return {
    title,
    description,
    openGraph: {
      type: "website",
      siteName: "Afsha Creative Solution",
      title,
      description,
      url: `${origin}/products/${slug}/design/${imageId}`,
      images: [{ url: design.imageUrl, alt: `${design.product.name} ${design.designId}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [design.imageUrl] },
  };
}

export default async function DesignReferencePage({ params }: DesignPageProps) {
  const { slug, imageId } = await params;
  const design = await getDesign(slug, imageId);
  if (!design) notFound();

  return (
    <main className="mx-auto min-h-[70vh] w-full max-w-5xl px-4 py-8 text-white sm:px-6 sm:py-16">
      <Link href={`/products/${slug}`} className="inline-flex min-h-11 items-center text-xs uppercase tracking-[0.18em] text-textGold hover:text-white">
        {design.product.name}
      </Link>
      <p className="mb-5 mt-4 text-[10px] uppercase tracking-[0.2em] text-white/50">Design ID {design.designId}</p>
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#111] sm:rounded-xl">
        <Image src={design.imageUrl} alt={`${design.product.name} ${design.designId}`} fill unoptimized priority className="object-contain" />
      </div>
      <p className="mt-5 text-sm text-white/60">For a quote, message Afsha Creative Solution on WhatsApp and mention {design.designId}.</p>
    </main>
  );
}
