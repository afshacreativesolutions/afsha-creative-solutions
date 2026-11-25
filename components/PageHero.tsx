import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import Breadcrumbs, { type BreadcrumbItem } from "./Breadcrumbs";

export type PageHeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  badges?: string[];
  className?: string;
};

export default function PageHero({
  eyebrow = "Made to Measure · Moradabad, India",
  title,
  description,
  breadcrumbs,
  primaryCta,
  secondaryCta,
  badges = ["Made to measure", "Artisan metalcraft", "Grade 304 & Wrought Iron", "Moradabad Workshop"],
  className = "",
}: PageHeroProps) {
  return (
    <section className={`relative overflow-hidden border-b border-white/10 bg-background px-4 pb-10 pt-4 sm:px-6 sm:pb-16 sm:pt-8 lg:pb-20 lg:pt-10 ${className}`}>
      {/* Decorative ambient gold rings */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-48 h-[34rem] w-[34rem] rounded-full border border-textGold/10 sm:right-[-6rem] sm:top-[-19rem]"
      >
        <div className="absolute inset-10 rounded-full border border-white/5" />
        <div className="absolute inset-24 rounded-full border border-white/5" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="-mx-4 mb-4 sm:-mx-6 sm:mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}

        <div className="mb-4 flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-textGold sm:mb-6 sm:gap-3 sm:text-[10px] sm:tracking-[0.28em]">
          <span className="h-px w-8 bg-textGold" />
          {eyebrow}
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <h1 className="text-[clamp(2.4rem,6.5vw,5.5rem)] font-light leading-[1.04] tracking-[-0.035em] text-white">
            {title}
          </h1>

          <div className="max-w-md lg:justify-self-end">
            <p className="text-sm leading-7 text-white/60 sm:text-base">
              {description}
            </p>

            {(primaryCta || secondaryCta) && (
              <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-textGold bg-textGold/10 px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-textGold transition hover:bg-textGold hover:text-black"
                  >
                    {primaryCta.label}
                    <ArrowRight size={14} />
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex min-h-11 items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/70 transition hover:text-textGold"
                  >
                    {secondaryCta.label}
                    <ArrowDown size={14} />
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {badges && badges.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/10 pt-5 text-[9px] uppercase tracking-[0.14em] text-white/45 sm:mt-12 sm:grid-cols-4 sm:gap-6 sm:pt-6 sm:text-[10px] sm:tracking-[0.2em]">
            {badges.map((badge, idx) => (
              <div key={badge} className="flex items-center gap-2 sm:block">
                <span className="block text-sm font-light tracking-normal text-textGold sm:mb-1.5 sm:text-xl">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-white/70">{badge}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
