"use client";

import { useState } from "react";
import { Check, Info, Lock, Shield, X } from "lucide-react";
import { useConsent } from "./ConsentProvider";
import { ConsentCategories } from "@/lib/consent-types";

export default function CookieSettingsModal() {
  const { isModalOpen, closeSettings, consent, saveCustom, acceptAll, rejectNonEssential } = useConsent();

  const [categories, setCategories] = useState<ConsentCategories>({
    essential: true,
    analytics: consent?.categories.analytics ?? false,
    advertising: consent?.categories.advertising ?? false,
    personalization: consent?.categories.personalization ?? false,
  });

  if (!isModalOpen) return null;

  function toggle(key: keyof Omit<ConsentCategories, "essential">) {
    setCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function handleSave() {
    saveCustom(categories);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/15 bg-[#0a0a0a] p-6 shadow-2xl sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-textGold" />
              <h2 id="cookie-modal-title" className="text-lg font-light text-white sm:text-xl">
                Cookie & Privacy Settings
              </h2>
            </div>
            <p className="text-xs text-white/55">
              Customize how Afsha Creative Solution collects and processes information on this device.
            </p>
          </div>
          <button
            type="button"
            onClick={closeSettings}
            className="rounded-full p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
            aria-label="Close settings"
          >
            <X size={18} />
          </button>
        </div>

        {/* Categories */}
        <div className="divide-y divide-white/10 py-5 space-y-4">
          {/* Essential */}
          <div className="pt-4 first:pt-0">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  Essential Cookies
                </span>
                <span className="ml-2 inline-flex items-center gap-1 rounded bg-white/10 px-2 py-0.5 text-[9px] font-medium text-white/60">
                  <Lock size={10} /> Always Active
                </span>
              </div>
              <div className="h-6 w-11 rounded-full bg-textGold/30 p-1 cursor-not-allowed opacity-75">
                <div className="h-4 w-4 rounded-full bg-textGold translate-x-5 transition-transform" />
              </div>
            </div>
            <p className="mt-2 text-xs leading-5 text-white/55">
              Necessary for the technical operation, secure session authentication, and reliable navigation of our website. These cannot be disabled.
            </p>
          </div>

          {/* Analytics */}
          <div className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  Analytics & Performance
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={categories.analytics}
                onClick={() => toggle("analytics")}
                className={`relative h-6 w-11 rounded-full p-1 transition-colors duration-200 ${
                  categories.analytics ? "bg-textGold" : "bg-white/15"
                }`}
              >
                <div
                  className={`h-4 w-4 rounded-full bg-black shadow transition-transform duration-200 ${
                    categories.analytics ? "translate-x-5 bg-black" : "translate-x-0 bg-white"
                  }`}
                />
              </button>
            </div>
            <p className="mt-2 text-xs leading-5 text-white/55">
              Helps us understand how visitors discover and engage with our gates, railings, and services through Google Analytics 4 and anonymized first-party session tracking.
            </p>
          </div>

          {/* Advertising */}
          <div className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  Advertising & Conversions
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={categories.advertising}
                onClick={() => toggle("advertising")}
                className={`relative h-6 w-11 rounded-full p-1 transition-colors duration-200 ${
                  categories.advertising ? "bg-textGold" : "bg-white/15"
                }`}
              >
                <div
                  className={`h-4 w-4 rounded-full shadow transition-transform duration-200 ${
                    categories.advertising ? "translate-x-5 bg-black" : "translate-x-0 bg-white"
                  }`}
                />
              </button>
            </div>
            <p className="mt-2 text-xs leading-5 text-white/55">
              Enables Google Ads conversion tracking and Meta Pixel remarketing, allowing us to display relevant architectural metalwork advertisements to interested homeowners and architects.
            </p>
          </div>

          {/* Personalization */}
          <div className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  Personalization
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={categories.personalization}
                onClick={() => toggle("personalization")}
                className={`relative h-6 w-11 rounded-full p-1 transition-colors duration-200 ${
                  categories.personalization ? "bg-textGold" : "bg-white/15"
                }`}
              >
                <div
                  className={`h-4 w-4 rounded-full shadow transition-transform duration-200 ${
                    categories.personalization ? "translate-x-5 bg-black" : "translate-x-0 bg-white"
                  }`}
                />
              </button>
            </div>
            <p className="mt-2 text-xs leading-5 text-white/55">
              Stores custom design preferences and preferred metalwork categories for a smoother browsing experience.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={rejectNonEssential}
            className="text-xs text-white/50 underline-offset-4 hover:text-white hover:underline text-left sm:text-center"
          >
            Reject All Optional
          </button>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-textGold bg-textGold/15 px-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-textGold transition hover:bg-textGold hover:text-black"
            >
              Save Preferences
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="inline-flex min-h-10 items-center justify-center rounded-full bg-textGold px-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-white"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
