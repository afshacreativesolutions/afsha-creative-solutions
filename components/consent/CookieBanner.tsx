"use client";

import Link from "next/link";
import { ShieldCheck, Sliders, X } from "lucide-react";
import { useConsent } from "./ConsentProvider";

export default function CookieBanner() {
  const { isBannerVisible, acceptAll, rejectNonEssential, openSettings } = useConsent();

  if (!isBannerVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-6 transition-all duration-300"
    >
      <div className="mx-auto max-w-5xl rounded-2xl border border-textGold/30 bg-[#0d0d0d]/95 p-5 shadow-2xl backdrop-blur-md sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-textGold" />
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-textGold">
                Privacy & Cookie Preferences
              </h2>
            </div>
            <p className="max-w-3xl text-xs leading-relaxed text-white/70">
              Afsha Creative Solution uses essential cookies to ensure secure operation and, with your consent, analytics and advertising cookies to measure website traffic and showcase our custom architectural metalwork effectively. Review our{" "}
              <Link href="/faq" className="text-textGold underline underline-offset-2 hover:text-white">
                Privacy FAQs
              </Link>{" "}
              or tailor your preferences at any time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={acceptAll}
              className="inline-flex min-h-10 items-center justify-center rounded-full bg-textGold px-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-white"
            >
              Accept All
            </button>
            <button
              type="button"
              onClick={rejectNonEssential}
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/20 bg-white/5 px-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition hover:border-white/40 hover:bg-white/10"
            >
              Reject Optional
            </button>
            <button
              type="button"
              onClick={openSettings}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-textGold/40 px-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-textGold transition hover:border-textGold hover:bg-textGold/10"
            >
              <Sliders size={13} />
              Customize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
