import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type SectionHeadingProps = {
  eyebrow?: string;
  title: string | React.ReactNode;
  description?: string;
  align?: "left" | "center";
  link?: { label: string; href: string };
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  link,
  className = "",
}: SectionHeadingProps) {
  if (align === "center") {
    return (
      <div className={`mx-auto mb-8 max-w-3xl text-center sm:mb-12 ${className}`}>
        {eyebrow && (
          <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-textGold">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-light tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <div className="mx-auto mt-3 h-px w-12 bg-textGold/40" />
        {description && (
          <p className="mt-4 text-sm leading-7 text-white/60 sm:text-base">
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`mb-6 flex flex-col gap-4 sm:mb-10 sm:gap-6 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-textGold">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-light tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-sm leading-7 text-white/60 sm:text-base">
            {description}
          </p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className="inline-flex min-h-11 items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/65 transition-colors hover:text-textGold"
        >
          {link.label} <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}
