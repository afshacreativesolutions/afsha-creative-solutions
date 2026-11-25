import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { getPublicCategories, getPublicProducts } from "@/lib/catalog";
import { images } from "@/utils/images";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Architectural Metalwork Categories | Afsha Creative Solutions",
  description:
    "Explore our complete collection of custom metal gates, iron gates, stainless steel railings, balcony balustrades, staircase railings, and decorative metalwork crafted in Moradabad.",
  alternates: { canonical: "/categories" },
  openGraph: {
    type: "website",
    title: "Architectural Metalwork Categories | Afsha Creative Solutions",
    description:
      "Explore custom metal gates, railings, grills, and bespoke architectural metalwork in Moradabad, India.",
    url: "/categories",
  },
  twitter: {
    card: "summary_large_image",
    title: "Architectural Metalwork Categories | Afsha Creative Solutions",
    description:
      "Explore custom metal gates, railings, grills, and bespoke architectural metalwork in Moradabad, India.",
  },
};

export const revalidate = 300;

export default async function CategoriesPage() {
  const [categoriesFromDb, products] = await Promise.all([
    getPublicCategories(),
    getPublicProducts(),
  ]);

  // Product counts mapped by category slug
  const countMap = new Map<string, number>();
  for (const product of products) {
    if (product.category?.slug) {
      countMap.set(
        product.category.slug,
        (countMap.get(product.category.slug) || 0) + 1
      );
    }
  }

  // 8 Curated Categories aligned with master prompt and authentic portfolio
  const categoryCards = [
    {
      id: "main-gates",
      name: "Main Gates",
      slug: "gates",
      href: "/categories/gates",
      image: images.steel_gate.ssGate13,
      material: "Stainless Steel & Wrought Iron",
      description:
        "Commanding residential and estate entrance gates engineered for durability, private security, and striking curb appeal.",
      highlights: ["Sliding & swing mechanisms", "Motorization ready", "Made-to-measure sizing"],
      count: countMap.get("gates"),
      isFeatured: true,
    },
    {
      id: "iron-gates",
      name: "Handcrafted Iron Gates",
      slug: "iron-gates",
      href: "/products?category=gates&material=iron",
      image: images.iron_gates.ironGate3,
      material: "Hand-Forged Wrought Iron",
      description:
        "Traditional artisan wrought iron gates featuring ornamental scrollwork, heavy-gauge pickets, and multi-stage rust-inhibiting finishes.",
      highlights: ["Classical heritage motifs", "Solid bar construction", "Zinc epoxy primed"],
      count: countMap.get("gates"),
      isFeatured: false,
    },
    {
      id: "steel-gates",
      name: "Modern Steel Gates",
      slug: "steel-gates",
      href: "/products?category=gates&material=stainless-steel",
      image: images.steel_gate.ssGate1,
      material: "Grade 304 / 316 Stainless Steel",
      description:
        "Sleek minimalist steel gates with horizontal louvers, geometric accents, and weather-resistant satin or hairline finishes.",
      highlights: ["Rust-proof alloy", "Clean contemporary lines", "Low maintenance"],
      count: countMap.get("gates"),
      isFeatured: true,
    },
    {
      id: "metal-railings",
      name: "Architectural Metal Railings",
      slug: "railings",
      href: "/products?category=railings",
      image: images.steel_stair_railing.ssStairRailling8,
      material: "Stainless Steel & Brass Accents",
      description:
        "Precision-fabricated handrails and balustrades designed for commercial buildings, luxury villas, and contemporary homes.",
      highlights: ["Core-drilled anchoring", "Ergonomic handrail profiles", "High tensile stability"],
      count: countMap.get("stair-railings"),
      isFeatured: false,
    },
    {
      id: "balcony-railings",
      name: "Balcony Railings",
      slug: "balcony-railings",
      href: "/categories/balcony-railings",
      image: images.iron_balcony_railing.ironbrail3,
      material: "Wrought Iron & SS-304",
      description:
        "Safety-compliant outdoor balustrades built to withstand severe monsoons while framing terrace and balcony elevations.",
      highlights: ["Child-safe 4-inch bar spacing", "Weather-tested coatings", "Terrace perimeter defense"],
      count: countMap.get("balcony-railings"),
      isFeatured: true,
    },
    {
      id: "staircase-railings",
      name: "Staircase Railings",
      slug: "stair-railings",
      href: "/categories/stair-railings",
      image: images.steel_stair_railing.ssStairRailling13,
      material: "Steel, Iron & Wood-Top Profiles",
      description:
        "Custom-contoured interior staircase balustrades following straight runs, landings, and fluid helical curves.",
      highlights: ["Continuous smooth handrail", "Custom rake angle fitting", "Heavy-gauge newel posts"],
      count: countMap.get("stair-railings"),
      isFeatured: false,
    },
    {
      id: "decorative-metal-grills",
      name: "Decorative Metal Grills",
      slug: "decorative-grills",
      href: "/custom-metalwork#grills",
      image: images.iron_stair_railing.ironStairRailling4,
      material: "Laser-Cut Steel & Forged Iron",
      description:
        "Artistic window security screens, interior room partition dividers, and privacy jaali panels for modern spaces.",
      highlights: ["Parametric & botanical patterns", "Concealed mounting tabs", "Oven-cured powder coat"],
      count: undefined,
      isFeatured: false,
    },
    {
      id: "custom-metalwork",
      name: "Bespoke Custom Metalwork",
      slug: "custom-metalwork",
      href: "/custom-metalwork",
      image: images.steel_spiral_railing.ssSpiralRailling3,
      material: "Curved Spiral Stairs & Special Fabrication",
      description:
        "One-of-a-kind metal structures, spiral staircase fabrication, bespoke brackets, and architectural statement pieces.",
      highlights: ["Made to CAD specifications", "On-site dimension survey", "Master artisan execution"],
      count: undefined,
      isFeatured: true,
    },
  ];

  const featuredCategories = categoryCards.filter((c) => c.isFeatured);

  return (
    <main className="bg-background text-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Architectural Metalwork Categories",
          description:
            "Browse categories of custom metal gates, iron gates, steel railings, balcony balustrades, and bespoke fabrication by Afsha Creative Solutions in Moradabad.",
          url: absoluteUrl("/categories"),
        }}
      />

      <PageHero
        eyebrow="Product Discovery · Moradabad, India"
        title={
          <>
            Architectural <span className="text-textGold font-heading">Metalwork Categories</span>
          </>
        }
        description="Discover our collections of custom main gates, handcrafted wrought iron balustrades, stainless steel railings, and bespoke metal fabrication made to measure for Indian homes."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Categories", href: "/categories" },
        ]}
        primaryCta={{ label: "View All Products", href: "/products" }}
        secondaryCta={{ label: "Explore Below", href: "#categories-grid" }}
      />

      {/* Featured Collections Spotlight */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <SectionHeading
          eyebrow="Signature Categories"
          title="Featured Architectural Collections"
          description="The core fabrications that define residential and commercial properties across Uttar Pradesh and Delhi NCR."
          link={{ label: "Browse Catalog", href: "/products" }}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredCategories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group relative flex min-h-[380px] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] transition duration-300 hover:-translate-y-1 hover:border-textGold/40"
            >
              <div className="relative h-56 w-full overflow-hidden bg-[#111]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/20" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-textGold backdrop-blur-sm">
                  <Sparkles size={11} /> Featured
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <span className="text-[9px] uppercase tracking-[0.2em] text-textGold/80">
                  {cat.material}
                </span>
                <h3 className="mt-1 text-lg font-light text-white group-hover:text-textGold transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/55">
                  {cat.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-textGold">
                    Explore
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-textGold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Category Discovery Grid */}
      <section id="categories-grid" className="border-t border-white/10 bg-[#050505] px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Full Portfolio"
            title="Complete Category Collection"
            description="From robust boundary gates to intricate balustrades, every category is produced to order in our Moradabad facility."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryCards.map((category, index) => (
              <div
                key={category.id}
                className="group flex flex-col justify-between rounded-xl border border-white/10 bg-[#080808] p-6 transition duration-300 hover:border-textGold/35 hover:bg-[#0c0c0c]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.2em] text-white/35">
                      {String(index + 1).padStart(2, "0")} / CATEGORY
                    </span>
                    {typeof category.count === "number" && category.count > 0 && (
                      <span className="rounded-full border border-textGold/30 bg-textGold/10 px-2.5 py-0.5 text-[9px] uppercase tracking-[0.14em] text-textGold">
                        {category.count} {category.count === 1 ? "Design" : "Designs"} Available
                      </span>
                    )}
                  </div>

                  <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-lg bg-[#111]">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  <p className="mt-5 text-[9px] uppercase tracking-[0.2em] text-textGold">
                    {category.material}
                  </p>
                  <h3 className="mt-1 text-xl font-light text-white group-hover:text-textGold transition-colors">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">
                    {category.description}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-white/5 pt-3">
                    {category.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-white/50">
                        <span className="h-1 w-1 rounded-full bg-textGold/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <Link
                    href={category.href}
                    className="inline-flex min-h-11 w-full items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-all group-hover:border-textGold group-hover:bg-textGold group-hover:text-black"
                  >
                    <span>Explore Category</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Made to Measure Process Strip */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="rounded-2xl border border-white/10 bg-[#090909] p-6 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-textGold">
                Tailored Dimensions
              </p>
              <h2 className="text-2xl font-light text-white sm:text-3xl">
                Need a size or design not listed here?
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/60">
                Over 80% of our architectural metalwork is engineered from custom client drawings and site dimensions. Whether you have an architect’s blueprint or a sketch on paper, our craftsmen in Moradabad can fabricate it to the millimeter.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/custom-metalwork"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-textGold bg-textGold px-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-white"
              >
                Custom Metalwork Service <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 text-[10px] uppercase tracking-[0.18em] text-white transition hover:border-textGold hover:text-textGold"
              >
                Book Site Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Bespoke Metal Fabrication"
        title="Ready to fabricate your next gate or railing?"
        description="Connect with our fabrication team in Moradabad to discuss drawings, finish options, and made-to-measure quotations."
      />
    </main>
  );
}
