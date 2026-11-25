import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { DEFAULT_KEYWORDS } from "@/lib/seo";
import mainGate from "../../assets/steel gate/SS-MG_01.jpg";
import stairRailing from "../../assets/steel stair railing/SS-SCR_01.jpg";

export const metadata: Metadata = {
  title: "About Afsha Creative Solution | Made-to-Measure Metalwork in Moradabad",
  description: "Meet Afsha Creative Solution, creating made-to-measure iron and steel gates, architectural railings, and custom metalwork in Moradabad, India.",
  keywords: DEFAULT_KEYWORDS,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Afsha Creative Solution | Made-to-Measure Metalwork in Moradabad",
    description: "Thoughtful custom gates and architectural metalwork, made to measure in Moradabad, India.",
  },
};

const values = [
  { number: "01", title: "Made for your space", description: "Each project begins with your dimensions, layout, and the way you plan to use it." },
  { number: "02", title: "Designed together", description: "We talk through style, material, and finish so the details feel right for your home or project." },
  { number: "03", title: "Crafted in Moradabad", description: "Our work brings traditional metalworking care to gates, railings, and architectural metalwork." },
];

const process = [
  { number: "01", title: "Tell us about your project", description: "Share the space, your ideas, and what the metalwork needs to do." },
  { number: "02", title: "Plan the details", description: "Discuss measurements, materials, design references, and finish preferences." },
  { number: "03", title: "Made to measure", description: "We shape and fabricate your piece around the agreed project details." },
  { number: "04", title: "Bring it together", description: "We coordinate finishing and installation based on your project requirements." },
];

export default function AboutPage() {
  return (
    <main className="bg-background text-white">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />

      <section className="mx-auto max-w-7xl px-4 pb-10 pt-5 sm:px-6 sm:pb-20 sm:pt-10">
        <div className="mb-6 flex items-center gap-3 text-[9px] uppercase tracking-[0.24em] text-textGold sm:mb-10">
          <span className="w-8 border-t border-textGold/70" /> Made to measure · Moradabad, India
        </div>
        <div className="grid gap-7 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-light leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Metalwork shaped <span className="text-textGold">for your space.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 sm:mt-7 sm:text-base sm:leading-8">
              Afsha Creative Solution creates custom gates, railings, and architectural metalwork for homes and commercial spaces. Based in Moradabad, we bring your ideas into the details—measured, designed, and made around your project.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:mt-9 sm:flex-row sm:items-center sm:gap-3">
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-textGold/50 bg-textGold/10 px-6 text-[9px] font-semibold uppercase tracking-[0.18em] text-textGold transition-colors hover:bg-textGold hover:text-black">
                Start a project <ArrowUpRight size={15} />
              </Link>
              <Link href="/products" className="inline-flex min-h-12 items-center justify-center gap-2 px-4 text-[9px] font-medium uppercase tracking-[0.18em] text-white/65 transition-colors hover:text-textGold">
                Explore our work <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl pb-8 pr-6 sm:pb-10 sm:pr-10">
            <div className="absolute right-0 top-6 h-[78%] w-[80%] rounded-xl border border-textGold/25 sm:top-8" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-[#111]">
              <Image src={mainGate} alt="Custom steel entrance gate design" fill priority sizes="(max-width: 1024px) 90vw, 44vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <p className="text-[9px] uppercase tracking-[0.2em] text-textGold">Built around your brief</p>
                <p className="mt-2 text-lg font-light sm:text-xl">Thoughtful design. Everyday strength.</p>
              </div>
            </div>
            <div className="absolute -bottom-1 right-0 w-[39%] overflow-hidden rounded-lg border-4 border-background shadow-xl sm:-bottom-2 sm:right-1 sm:w-[34%]">
              <div className="relative aspect-[4/5]">
                <Image src={stairRailing} alt="Made-to-measure staircase railing" fill sizes="(max-width: 640px) 38vw, 180px" className="object-cover" />
              </div>
            </div>
            <div className="absolute bottom-1 left-0 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/80 px-3 py-2 text-[8px] uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm sm:bottom-2 sm:px-4 sm:text-[9px]">
              <MapPin size={12} className="text-textGold" /> Moradabad, India
            </div>
          </div>
        </div>
        <a href="#our-approach" className="mt-10 hidden w-fit items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-textGold sm:mt-14 sm:flex">
          Discover our approach <ArrowDown size={13} />
        </a>
      </section>

      <section id="our-approach" className="border-y border-white/10 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
          <div className="grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:items-end md:gap-12">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-textGold">The way we work</p>
              <h2 className="text-3xl font-light tracking-tight sm:text-5xl">Considered from the first conversation.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
              Good metalwork belongs in its setting. We take time to understand the space, how it will be used, and the finish you have in mind—then carry those choices through the making of the piece.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:mt-11 md:grid-cols-3 sm:gap-4">
            {values.map((value) => (
              <article key={value.number} className="rounded-xl border border-white/10 bg-[#090909] p-4 transition-colors hover:border-textGold/30 sm:min-h-52 sm:p-6">
                <span className="text-[10px] tracking-[0.2em] text-textGold">{value.number} / OUR APPROACH</span>
                <h3 className="mt-5 text-lg font-light sm:mt-6 sm:text-xl">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/50">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-textGold">From idea to installation</p>
            <h2 className="text-3xl font-light tracking-tight sm:text-5xl">A clear path to your custom piece.</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/55">We keep the conversation personal and the choices clear at every stage.</p>
          </div>
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {process.map((step) => (
              <li key={step.number} className="grid gap-2 py-5 sm:grid-cols-[72px_0.75fr_1.25fr] sm:items-start sm:gap-4 sm:py-6">
                <span className="text-[10px] tracking-[0.2em] text-textGold">{step.number} / 04</span>
                <h3 className="text-base font-light text-white sm:text-lg">{step.title}</h3>
                <p className="text-sm leading-6 text-white/50">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 sm:pb-20">
        <div className="relative overflow-hidden rounded-xl border border-textGold/20 bg-[radial-gradient(ellipse_at_80%_0%,rgba(205,162,116,0.12),transparent_45%),linear-gradient(120deg,#11100e,#080808_70%)] px-4 py-6 sm:px-9 sm:py-11 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <p className="text-[9px] uppercase tracking-[0.22em] text-textGold">Made to measure · Moradabad, India</p>
            <h2 className="mt-3 text-2xl font-light leading-tight sm:text-4xl">Let&apos;s make something for your space.</h2>
            <p className="mt-3 text-sm leading-6 text-white/55">Tell us what you are planning. We&apos;ll help you work through the design, materials, and next steps.</p>
          </div>
          <Link href="/contact" className="mt-6 inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full border border-textGold/50 px-6 text-[9px] font-semibold uppercase tracking-[0.18em] text-textGold transition-colors hover:bg-textGold hover:text-black lg:mt-0">
            Talk about your project <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
