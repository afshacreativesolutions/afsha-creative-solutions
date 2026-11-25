import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GalleryLightbox, { type GalleryItem } from "@/components/GalleryLightbox";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { getPublicProducts } from "@/lib/catalog";
import { images } from "@/utils/images";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Architectural Metalwork Gallery | Afsha Creative Solutions",
  description:
    "Explore our portfolio of completed custom metal gates, wrought iron balcony railings, stainless steel balustrades, and bespoke architectural metalwork crafted in Moradabad.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    type: "website",
    title: "Architectural Metalwork Gallery | Afsha Creative Solutions",
    description:
      "A visual gallery of completed metal gates, iron balustrades, and modern staircase railings by Afsha Creative Solutions.",
    url: "/gallery",
  },
  twitter: {
    card: "summary_large_image",
    title: "Architectural Metalwork Gallery | Afsha Creative Solutions",
    description:
      "A visual gallery of completed metal gates, iron balustrades, and modern staircase railings by Afsha Creative Solutions.",
  },
};

export const revalidate = 300;

export default async function GalleryPage() {
  const products = await getPublicProducts();

  // Curated genuine project gallery using authentic business photographs
  const staticGalleryItems: GalleryItem[] = [
    {
      id: "project-ss-gate-13",
      title: "Vrindavan Estate Double Main Gate",
      category: "Main Gates",
      categorySlug: "gates",
      material: "304 Grade Stainless Steel & Matte Infill",
      description:
        "Custom motorized double-leaf main gate with horizontal privacy louvers and satin hairline texture, installed at a luxury residential property.",
      image: images.steel_gate.ssGate13,
      alt: "Modern stainless steel double main gate design in Moradabad",
    },
    {
      id: "project-iron-gate-3",
      title: "Jaipur Heritage Hand-Forged Iron Gate",
      category: "Main Gates",
      categorySlug: "gates",
      material: "Heavy-Gauge Wrought Iron & Zinc Primer",
      description:
        "Classical wrought iron entrance gate with hand-hammered scrolls, spear pickets, and anti-corrosive polyurethane coating.",
      image: images.iron_gates.ironGate3,
      alt: "Handcrafted wrought iron driveway gate with ornamental scrolls",
    },
    {
      id: "project-ss-stair-8",
      title: "Duplex Interior Floating Stair Railing",
      category: "Staircase Railings",
      categorySlug: "stair-railings",
      material: "Seamless Stainless Steel Tubing",
      description:
        "Minimalist architectural stair balustrade featuring concealed base anchoring and continuous smooth handrail contours.",
      image: images.steel_stair_railing.ssStairRailling8,
      alt: "Contemporary stainless steel staircase balustrade",
    },
    {
      id: "project-iron-balcony-3",
      title: "Ornate Terrace Balcony Balustrade",
      category: "Balcony Railings",
      categorySlug: "balcony-railings",
      material: "Solid Wrought Iron & Powder Coating",
      description:
        "Classical balcony safety railing engineered with 4-inch picket spacing, forged center medallions, and baked powder finish.",
      image: images.iron_balcony_railing.ironbrail3,
      alt: "Wrought iron balcony railing installed on luxury terrace",
    },
    {
      id: "project-spiral-3",
      title: "Sculptural Spiral Staircase Balustrade",
      category: "Spiral Railings",
      categorySlug: "spiral-railings",
      material: "Precision-Curved Stainless Steel",
      description:
        "Helical spiral staircase railing requiring master artisan roll-bending and invisible ground welds for a seamless curvature.",
      image: images.steel_spiral_railing.ssSpiralRailling3,
      alt: "Curved helical stainless steel spiral stair railing",
    },
    {
      id: "project-ss-balcony-4",
      title: "Minimalist Horizon Balcony Railing",
      category: "Balcony Railings",
      categorySlug: "balcony-railings",
      material: "Grade 304 Stainless Steel Bars",
      description:
        "Modern horizontal bar balustrade offering unobstructed landscape views while meeting national residential balcony safety codes.",
      image: images.steel_balcony_railing.ssBalconyRailling4,
      alt: "Modern horizontal bar stainless steel balcony railing",
    },
    {
      id: "project-iron-stair-4",
      title: "Artisan Royal Staircase Railing",
      category: "Staircase Railings",
      categorySlug: "stair-railings",
      material: "Forged Iron with Antique Highlights",
      description:
        "Intricate decorative stair railing with curved transitional ramp-ups and solid core-drilled concrete fastenings.",
      image: images.iron_stair_railing.ironStairRailling4,
      alt: "Artisan wrought iron interior staircase railing",
    },
    {
      id: "project-ss-gate-1",
      title: "Contemporary Minimalist Residence Gate",
      category: "Main Gates",
      categorySlug: "gates",
      material: "Architectural Stainless Steel",
      description:
        "Geometric sliding main gate fabricated with laser-straight alignment, built-in lock box, and heavy-duty bottom ground track.",
      image: images.steel_gate.ssGate1,
      alt: "Clean minimalist stainless steel sliding gate design",
    },
    {
      id: "project-spiral-1",
      title: "Exterior Helical Spiral Fire-Exit Rail",
      category: "Spiral Railings",
      categorySlug: "spiral-railings",
      material: "High-Tensile Stainless Steel 304",
      description:
        "Full-height curved safety railing for outdoor spiral access stairs, weather-tested against extreme temperature swings.",
      image: images.steel_spiral_railing.ssSpiralRailling1,
      alt: "Outdoor spiral staircase balustrade fabrication",
    },
    {
      id: "project-iron-gate-1",
      title: "Classical European Archway Entry Gate",
      category: "Main Gates",
      categorySlug: "gates",
      material: "Wrought Iron with Cast Pickets",
      description:
        "Arched double swing gate with decorative finials and forged lower privacy kickplates, fabricated for a private villa.",
      image: images.iron_gates.ironGate1,
      alt: "Arched wrought iron entrance gate with decorative pickets",
    },
    {
      id: "project-iron-balcony-1",
      title: "Bespoke French Balcony Juliet Railing",
      category: "Balcony Railings",
      categorySlug: "balcony-railings",
      material: "Forged Iron Flat Bar & Castings",
      description:
        "Compact Juliet balcony balustrade custom-fitted outside full-height bedroom French windows for safety and elevation depth.",
      image: images.iron_balcony_railing.ironbrail1,
      alt: "French Juliet balcony iron railing installation",
    },
    {
      id: "project-ss-stair-13",
      title: "Commercial Multi-Floor Stair Balustrade",
      category: "Staircase Railings",
      categorySlug: "stair-railings",
      material: "Heavy-Gauge Stainless Steel Tubing",
      description:
        "Continuous 3-floor staircase handrail system engineered for heavy public footfall with satin anti-glare finish.",
      image: images.steel_stair_railing.ssStairRailling13,
      alt: "Commercial stainless steel staircase handrail system",
    },
    {
      id: "project-steel-gate-4",
      title: "Modern Villa Slatted Security Gate",
      category: "Main Gates",
      categorySlug: "gates",
      material: "Stainless Steel with Dark Bronze Accent",
      description:
        "Wide-format entrance gate combining high-strength perimeter rectangular tubing with slatted central privacy louvers.",
      image: images.steel_gate.ssGate4,
      alt: "Wide modern stainless steel boundary gate design",
    },
    {
      id: "project-iron-stair-2",
      title: "Heritage Spiral Scroll Stair Balustrade",
      category: "Staircase Railings",
      categorySlug: "stair-railings",
      material: "Traditional Hand-Forged Mild Steel",
      description:
        "Hand-bent decorative scrollwork balustrade with custom volute starter newel and solid wood handrail cap mounting.",
      image: images.iron_stair_railing.ironStairRailling2,
      alt: "Heritage forged iron stair railing with volute starter",
    },
    {
      id: "project-ss-balcony-7",
      title: "Glass-Ready Stainless Steel Terrace Railing",
      category: "Balcony Railings",
      categorySlug: "balcony-railings",
      material: "Grade 304 Stainless Steel Post System",
      description:
        "Rigid upright posts and slotted bottom channel pre-engineered to secure 12mm toughened safety glass balcony panels.",
      image: images.steel_balcony_railing.ssBalconyRailling7,
      alt: "Stainless steel post system for glass terrace balustrades",
    },
    {
      id: "project-steel-gate-12",
      title: "Bungalow Sliding Entry Gate with Pedestrian Door",
      category: "Main Gates",
      categorySlug: "gates",
      material: "Stainless Steel & Reinforced Hinges",
      description:
        "Combined sliding vehicular gate featuring an integrated wicket pass door for convenient pedestrian access without opening the full leaf.",
      image: images.steel_gate.ssGate12,
      alt: "Sliding metal gate with integrated pedestrian wicket door",
    },
  ];

  // Also include products published via Supabase if any exist
  const supabaseGalleryItems: GalleryItem[] = products
    .filter((p) => p.images.length > 0)
    .map((product) => {
      const primaryImage = product.images.find((img) => img.is_primary) || product.images[0];
      const isGate =
        product.category?.slug.includes("gate") || product.name.toLowerCase().includes("gate");
      const categorySlug = isGate
        ? "gates"
        : product.category?.slug || "stair-railings";

      return {
        id: `supabase-${product.id}`,
        title: product.name,
        category: product.category?.name || "Architectural Metalwork",
        categorySlug,
        material: product.materials.join(", ") || "Made to Measure",
        description: product.short_description || product.description,
        image: primaryImage.url || images.steel_gate.ssGate13,
        alt: primaryImage.alt_text || product.name,
      };
    });

  // Combine static authentic items with dynamic products, avoiding duplicates
  const allGalleryItems = [
    ...staticGalleryItems,
    ...supabaseGalleryItems.filter(
      (dyn) => !staticGalleryItems.some((s) => s.title.toLowerCase() === dyn.title.toLowerCase())
    ),
  ];

  return (
    <main className="bg-background text-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: "Afsha Creative Solutions Metalwork Gallery",
          description:
            "Showcase of custom metal gates, wrought iron railings, and architectural fabrications in Moradabad, India.",
          url: absoluteUrl("/gallery"),
        }}
      />

      <PageHero
        eyebrow="Architectural Portfolio · Moradabad, India"
        title={
          <>
            Completed <span className="text-textGold font-heading">Metalwork Gallery</span>
          </>
        }
        description="A visual showcase of custom main gates, wrought iron balustrades, staircase railings, and bespoke architectural metalwork fabricated in our Moradabad workshop."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Gallery", href: "/gallery" },
        ]}
        badges={[
          "Authentic Workshop Photography",
          "Made to Measure Sizing",
          "High-Tensile Welding",
          "Durable Weatherproof Coating",
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="mb-8 max-w-2xl">
          <p className="text-[10px] uppercase tracking-[0.24em] text-textGold">
            Filter by Fabrication Type
          </p>
          <p className="mt-2 text-sm leading-6 text-white/60">
            Click any photograph to view full high-resolution details, material specifications, and request an exact quote for a similar design.
          </p>
        </div>

        {/* Interactive Lightbox Grid */}
        <GalleryLightbox items={allGalleryItems} />
      </section>

      <CTASection
        eyebrow="Request a Similar Design"
        title="Found a design that fits your property?"
        description="Every piece can be customized to your exact pillar-to-pillar opening, height preferences, and metal finish. Message our team on WhatsApp for quick guidance."
        primaryLabel="Inquire on WhatsApp"
        secondaryLabel="Submit Specifications"
        secondaryHref="/custom-metalwork"
      />
    </main>
  );
}
