import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Hammer, Layers, Shield, Sparkles, Wrench } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { images } from "@/utils/images";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Metal Fabrication Services in Moradabad | Afsha Creative Solutions",
  description:
    "Expert architectural metal fabrication services in Moradabad: custom main gates, handcrafted iron gates, stainless steel railings, balcony balustrades, and decorative metal grills.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    title: "Metal Fabrication Services in Moradabad | Afsha Creative Solutions",
    description:
      "Precision custom metal gates, iron gates, steel railings, and bespoke architectural metal fabrication in Moradabad, India.",
    url: "/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Metal Fabrication Services in Moradabad | Afsha Creative Solutions",
    description:
      "Precision custom metal gates, iron gates, steel railings, and bespoke architectural metal fabrication in Moradabad, India.",
  },
};

export default function ServicesPage() {
  const services = [
    {
      id: "custom-gate-fabrication",
      title: "Custom Metal Gate Fabrication",
      eyebrow: "Vehicular & Estate Entrances",
      description:
        "End-to-end design, fabrication, and structural engineering of boundary entrance gates. We construct single-leaf swing, bi-parting double swing, and cantilever sliding gates tailored for residential compounds and commercial properties.",
      image: images.steel_gate.ssGate13,
      productLink: "/products?category=gates",
      productLabel: "Explore Gate Collection",
      highlights: [
        "Heavy-duty ball-bearing pivot hinges",
        "Sliding ground track & cantilever options",
        "Motorization-ready structural framing",
        "Custom locking hardware integration",
      ],
    },
    {
      id: "iron-gate-manufacturing",
      title: "Iron Gate Manufacturing",
      eyebrow: "Hand-Forged Wrought Iron",
      description:
        "Artisan wrought iron manufacturing bringing classical heritage character to modern estates. Skilled blacksmithing produces forged scrolls, tapered pickets, cast finials, and heavy privacy plates with high tensile resistance.",
      image: images.iron_gates.ironGate3,
      productLink: "/products?category=gates&material=iron",
      productLabel: "View Iron Gates",
      highlights: [
        "Traditional hand-hammered scrollwork",
        "Solid mild steel bar stock construction",
        "Multi-stage anti-corrosive zinc primer",
        "Heavy physical barrier protection",
      ],
    },
    {
      id: "steel-gate-fabrication",
      title: "Steel Gate Fabrication",
      eyebrow: "Grade 304 / 316 Stainless Steel",
      description:
        "Modern architectural stainless steel gates fabricated with aerospace-grade precision. Ideal for contemporary residences requiring sharp geometric lines, weather-proof durability, and minimal lifetime maintenance.",
      image: images.steel_gate.ssGate1,
      productLink: "/products?category=gates&material=stainless-steel",
      productLabel: "Explore Steel Gates",
      highlights: [
        "Certified AISI 304 and 316 alloy options",
        "Satin hairline or mirror finish polish",
        "Seamless TIG argon welded corners",
        "Weatherproof against intense humidity",
      ],
    },
    {
      id: "architectural-metal-railings",
      title: "Architectural Metal Railings",
      eyebrow: "Staircase & Interior Balustrades",
      description:
        "Made-to-measure interior and exterior staircase balustrades. Every railing is contoured to the unique rise, run, and rake angle of your stairs, ensuring flawless continuity from ground foyer to upper landings.",
      image: images.steel_stair_railing.ssStairRailling8,
      productLink: "/products?category=stair-railings",
      productLabel: "View Staircase Railings",
      highlights: [
        "Core-drilled concrete expansion anchors",
        "Smooth continuous ergonomic handrails",
        "Seamless transitional stair landings",
        "Available with wooden cap or brass trim",
      ],
    },
    {
      id: "balcony-railing-designs",
      title: "Balcony Railing Designs",
      eyebrow: "Terrace & Veranda Balustrades",
      description:
        "High-safety exterior balcony railings designed to elevate your building façade while ensuring strict adherence to building safety codes. Engineered to resist gale wind pressure, heavy rain, and seasonal thermal expansion.",
      image: images.iron_balcony_railing.ironbrail3,
      productLink: "/products?category=balcony-railings",
      productLabel: "Explore Balcony Railings",
      highlights: [
        "Child-safe maximum 4-inch picket clearance",
        "Water-shedding base escutcheons",
        "Horizontal, vertical, and panel layouts",
        "High-grade outdoor polyurethane paint",
      ],
    },
    {
      id: "decorative-metal-grills",
      title: "Decorative Metal Grills",
      eyebrow: "Window Security & Interior Jaali",
      description:
        "Artistic architectural screens and window safety grills that balance natural daylight, breeze circulation, and physical deterrence. Fabricated via precision laser cutting or handcrafted forged iron bars.",
      image: images.iron_stair_railing.ironStairRailling4,
      productLink: "/custom-metalwork#grills",
      productLabel: "Request Grill Design",
      highlights: [
        "Parametric, geometric, and floral patterns",
        "Concealed anchor lugs for clean mounting",
        "High-security anti-pry structural framing",
        "Interior room divider partitions",
      ],
    },
    {
      id: "made-to-measure-metalwork",
      title: "Made-to-Measure Metalwork",
      eyebrow: "Bespoke Architectural Fabrication",
      description:
        "Specialized structural and ornamental metal fabrication for custom architectural projects. From curved spiral staircase balustrades to bespoke cantilever brackets and decorative canopies.",
      image: images.steel_spiral_railing.ssSpiralRailling3,
      productLink: "/custom-metalwork",
      productLabel: "Start Bespoke Project",
      highlights: [
        "Precision roll-bending of tubes and flats",
        "Fabrication from architect CAD drawings",
        "On-site dimensional survey in Moradabad",
        "Complete fitting and finishing coordination",
      ],
    },
  ];

  const fabricationPhases = [
    {
      phase: "01",
      title: "Site Survey & Measurement",
      desc: "Accurate physical survey of pillar spacing, floor levels, rake angles, and structural anchor substrates.",
    },
    {
      phase: "02",
      title: "Material Sourcing & Grade Testing",
      desc: "Certified AISI-304 stainless steel and heavy-gauge solid iron bars inspected for thickness and surface purity.",
    },
    {
      phase: "03",
      title: "Precision Welding & Cold Cutting",
      desc: "Mitered joins and high-penetration argon TIG/MIG welding to guarantee lifelong structural integrity.",
    },
    {
      phase: "04",
      title: "Surface Preparation & Anti-Rust",
      desc: "Abrasive weld blending, zinc-rich rust-preventive priming, and multi-coat polyurethane or powder bake.",
    },
    {
      phase: "05",
      title: "Fitting & Final Quality Audit",
      desc: "Core-drilled installation, balance adjustment, hardware lubrication, and protective cleanup.",
    },
  ];

  return (
    <main className="bg-background text-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Architectural Metal Fabrication Services",
          provider: {
            "@type": "LocalBusiness",
            name: "Afsha Creative Solutions",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Harthala, Lodhipur",
              addressLocality: "Moradabad",
              addressRegion: "Uttar Pradesh",
              postalCode: "244001",
              addressCountry: "IN",
            },
          },
          serviceType: [
            "Custom Metal Gate Fabrication",
            "Iron Gate Manufacturing",
            "Steel Gate Fabrication",
            "Architectural Metal Railings",
            "Balcony Railing Designs",
            "Decorative Metal Grills",
            "Made-to-Measure Metalwork",
          ],
          url: absoluteUrl("/services"),
        }}
      />

      <PageHero
        eyebrow="Specialized Fabrication Services"
        title={
          <>
            Architectural <span className="text-textGold font-heading">Metal Services</span>
          </>
        }
        description="Afsha Creative Solutions provides complete design, manufacturing, and installation services for custom metal gates, iron balustrades, stainless steel railings, and bespoke architectural metalwork in Moradabad, Uttar Pradesh."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
        primaryCta={{ label: "Request Service Quote", href: "/custom-metalwork" }}
        secondaryCta={{ label: "Explore Services", href: "#services-list" }}
        badges={[
          "7 Core Fabrication Services",
          "Workshop in Moradabad",
          "Made-to-Measure Execution",
          "Residential & Commercial",
        ]}
      />

      {/* Services List Section */}
      <section id="services-list" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="What We Deliver"
          title="Fabrication Services Built for Indian Architecture"
          description="Explore our seven specialized metalwork service divisions. Every service includes on-site measurement, precision workshop manufacturing, and professional fitting."
        />

        <div className="space-y-12 sm:space-y-16">
          {services.map((service, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={service.id}
                className={`grid gap-8 rounded-2xl border border-white/10 bg-[#080808] p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-14 ${
                  isReversed ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Image column */}
                <div className={`relative aspect-[16/11] overflow-hidden rounded-xl bg-[#111] ${isReversed ? "lg:col-start-2" : ""}`}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-textGold backdrop-blur-sm">
                    SERVICE {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content column */}
                <div className={isReversed ? "lg:col-start-1" : ""}>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-textGold">
                    {service.eyebrow}
                  </p>
                  <h3 className="mt-2 text-2xl font-light text-white sm:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/60 sm:text-base">
                    {service.description}
                  </p>

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="mb-3 text-[9px] uppercase tracking-[0.2em] text-white/40">
                      Technical Specifications & Capabilities
                    </p>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {service.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-xs text-white/70">
                          <Check size={14} className="mt-0.5 shrink-0 text-textGold" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/5 pt-6">
                    <Link
                      href={service.productLink}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-textGold bg-textGold/10 px-5 text-[10px] font-medium uppercase tracking-[0.16em] text-textGold transition hover:bg-textGold hover:text-black"
                    >
                      {service.productLabel} <ArrowRight size={14} />
                    </Link>
                    <Link
                      href={`/custom-metalwork?service=${service.id}`}
                      className="inline-flex min-h-11 items-center text-[10px] uppercase tracking-[0.18em] text-white/50 transition hover:text-white"
                    >
                      Request Service Quote
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Engineering & Fabrication Process Overview */}
      <section className="border-y border-white/10 bg-[#050505] px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            align="center"
            eyebrow="Behind the Scenes"
            title="Our Quality Fabrication Workflow"
            description="How we maintain consistent structural strength, flawless finish, and long-term durability across every project."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 sm:gap-6">
            {fabricationPhases.map((phase) => (
              <div
                key={phase.phase}
                className="rounded-xl border border-white/10 bg-[#090909] p-5 sm:p-6"
              >
                <span className="text-[10px] font-semibold tracking-[0.24em] text-textGold">
                  PHASE {phase.phase}
                </span>
                <h4 className="mt-4 text-base font-light text-white">
                  {phase.title}
                </h4>
                <p className="mt-2 text-xs leading-5 text-white/50">
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Location Notice */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-6 rounded-2xl border border-textGold/20 bg-textGold/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <p className="text-[9px] uppercase tracking-[0.24em] text-textGold">
              Moradabad Workshop
            </p>
            <h3 className="mt-1 text-xl font-light text-white sm:text-2xl">
              Visit Our Fabrication Facility in Moradabad
            </h3>
            <p className="mt-2 max-w-2xl text-xs leading-6 text-white/60 sm:text-sm">
              Located near KK Farm House on Bishanpur Road, Harthala, Lodhipur. Drop in to view material samples, discuss drawings with our metalworkers, or inspect works in progress.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-textGold bg-textGold px-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-white"
          >
            Schedule Workshop Visit <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <CTASection
        eyebrow="Custom Metal Fabrication Services"
        title="Ready to commission custom metalwork?"
        description="Share your requirements with our fabrication team to receive expert design recommendations and a prompt, transparent estimate."
      />
    </main>
  );
}
