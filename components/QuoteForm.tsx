"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, MessageCircle } from "lucide-react";
import { getOrCreateSessionId, getOrCreateVisitorId } from "@/lib/consent-store";
import { getAttributionFromUrl, trackEvent } from "@/lib/tracker";

export type QuoteFormProps = {
  defaultCategory?: string;
  title?: string;
  subtitle?: string;
  className?: string;
};

const categoryOptions = [
  { value: "gates", label: "Main Gates (Steel / Iron)" },
  { value: "stair-railings", label: "Staircase Railings" },
  { value: "balcony-railings", label: "Balcony Railings" },
  { value: "spiral-railings", label: "Spiral Stair Railings" },
  { value: "decorative-grills", label: "Decorative Metal Grills" },
  { value: "custom-metalwork", label: "Custom Bespoke Metalwork" },
  { value: "other", label: "Other Architectural Fabrication" },
];

const materialOptions = [
  { value: "ss-304", label: "Stainless Steel (Grade 304 - Rust-Proof)" },
  { value: "wrought-iron", label: "Handcrafted Wrought Iron / Forged Steel" },
  { value: "mild-steel", label: "Mild Steel (Epoxy Primed & PU Coated)" },
  { value: "brass-accents", label: "Metal with Brass / Champagne Gold Accents" },
  { value: "need-advice", label: "Need Advice / Open to Recommendation" },
];

const fieldClass =
  "mt-2 min-h-[50px] w-full rounded-md border border-white/15 bg-[#121212] px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-textGold/80 focus:ring-1 focus:ring-textGold/30";
const labelClass =
  "block text-[9px] font-medium uppercase tracking-[0.2em] text-white/55";

export default function QuoteForm({
  defaultCategory = "gates",
  title = "Request a Made-to-Measure Quote",
  subtitle = "Share your project dimensions, material preferences, and design vision. Our workshop team in Moradabad will review and provide a detailed estimate.",
  className = "",
}: QuoteFormProps) {
  const [status, setStatus] = useState<{ kind: "success" | "error"; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    phone: string;
    category: string;
    dimensions?: string;
    material?: string;
    message: string;
  } | null>(null);

  const [marketingEmail, setMarketingEmail] = useState(false);
  const [marketingWhatsApp, setMarketingWhatsApp] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    // Honeypot check
    if (data.website) {
      setSubmitting(false);
      setStatus({ kind: "success", message: "Your quote request has been received." });
      return;
    }

    const visitorId = getOrCreateVisitorId();
    const sessionId = getOrCreateSessionId();
    const attribution = getAttributionFromUrl();

    const payload = {
      name: data.name?.trim(),
      phone: data.phone?.trim(),
      email: data.email?.trim() || "",
      category: data.category || defaultCategory,
      dimensions: data.dimensions?.trim() || "",
      material: data.material || "ss-304",
      message: data.message?.trim() || "",
      source: "quote_form",
      visitorId,
      sessionId,
      marketingEmail,
      marketingWhatsApp,
      ...attribution,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Could not submit your quote request. Please try again or message via WhatsApp.");
      }

      setSubmittedData({
        name: data.name,
        phone: data.phone,
        category: data.category,
        dimensions: data.dimensions,
        material: data.material,
        message: data.message,
      });

      // Track conversion event
      trackEvent("quote_form_submit", {
        category: data.category,
        material: data.material,
        hasEmail: Boolean(data.email),
      });

      form.reset();
      setStatus({
        kind: "success",
        message: "Thank you! Your quote request has been recorded. Our team will contact you shortly.",
      });
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Something went wrong. Please connect with us directly on WhatsApp.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const whatsappHref = submittedData
    ? `https://wa.me/919634776691?text=${encodeURIComponent(
        `Hello Afsha Creative Solution, I just submitted a quote request.\n\nName: ${submittedData.name}\nPhone: ${submittedData.phone}\nCategory: ${submittedData.category}\nDimensions: ${submittedData.dimensions || "To be measured"}\nMaterial: ${submittedData.material || "Flexible"}\nDetails: ${submittedData.message}`
      )}`
    : `https://wa.me/919634776691?text=${encodeURIComponent(
        "Hello Afsha Creative Solution, I would like to request a custom metalwork quote."
      )}`;

  return (
    <div className={`rounded-2xl border border-white/10 bg-[#080808] p-6 sm:p-10 lg:p-12 ${className}`}>
      <div className="mb-8">
        <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-textGold">
          Bespoke Estimation
        </p>
        <h2 className="text-2xl font-light text-white sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/55">
          {subtitle}
        </p>
      </div>

      {status?.kind === "success" ? (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center sm:p-8">
          <CheckCircle2 size={42} className="mx-auto text-emerald-400" />
          <h3 className="mt-4 text-xl font-light text-white">Quote Request Received!</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/70">
            {status.message}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-textGold bg-textGold px-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-white"
            >
              <MessageCircle size={16} /> Instant WhatsApp Follow-up
            </a>
            <button
              type="button"
              onClick={() => {
                setStatus(null);
                setSubmittedData(null);
              }}
              className="text-xs text-white/50 underline hover:text-white"
            >
              Submit another request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Your Name *
              <input
                className={fieldClass}
                name="name"
                autoComplete="name"
                placeholder="e.g. Vikram Sharma"
                minLength={2}
                maxLength={100}
                required
              />
            </label>

            <label className={labelClass}>
              Phone Number (WhatsApp) *
              <input
                className={fieldClass}
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                minLength={7}
                maxLength={25}
                required
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Email Address (Optional)
              <input
                className={fieldClass}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@domain.com"
                maxLength={254}
              />
            </label>

            <label className={labelClass}>
              Product Category *
              <select
                className={`${fieldClass} appearance-none cursor-pointer`}
                name="category"
                defaultValue={defaultCategory}
                required
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#151515] text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Approximate Dimensions (Optional)
              <input
                className={fieldClass}
                name="dimensions"
                placeholder="e.g. 14 ft width x 7 ft height / 45 running ft"
                maxLength={100}
              />
            </label>

            <label className={labelClass}>
              Preferred Material / Finish
              <select
                className={`${fieldClass} appearance-none cursor-pointer`}
                name="material"
                defaultValue="ss-304"
              >
                {materialOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#151515] text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className={labelClass}>
            Project Description & Design Preferences *
            <textarea
              className="mt-2 min-h-28 w-full resize-y rounded-md border border-white/15 bg-[#121212] px-4 py-3.5 text-sm leading-6 text-white outline-none transition placeholder:text-white/30 focus:border-textGold/80 focus:ring-1 focus:ring-textGold/30 sm:min-h-36"
              name="message"
              placeholder="Tell us about the installation space, aesthetic style (minimalist, modern, classical), security requirements, timeline, or any specific details..."
              minLength={5}
              maxLength={4000}
              required
            />
          </label>

          {/* Marketing Opt-in Checkboxes (DPDP & GDPR Compliant, Unchecked by Default) */}
          <div className="rounded-lg border border-white/10 bg-[#121212]/50 p-4 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/50">
              Communication Preferences (Optional)
            </p>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={marketingWhatsApp}
                onChange={(e) => setMarketingWhatsApp(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-black text-textGold focus:ring-0 focus:ring-offset-0"
              />
              <span className="text-xs text-white/70">
                Receive finished project lookbooks and material recommendations on WhatsApp.
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={marketingEmail}
                onChange={(e) => setMarketingEmail(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-black text-textGold focus:ring-0 focus:ring-offset-0"
              />
              <span className="text-xs text-white/70">
                Subscribe to architectural metalwork design guides and quarterly catalog releases by email.
              </span>
            </label>
          </div>

          {/* Spam Honeypot */}
          <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label>
              Do not fill this field
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          {status?.kind === "error" && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
              {status.message}
            </div>
          )}

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-textGold bg-textGold/15 px-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-textGold transition hover:bg-textGold hover:text-black disabled:cursor-wait disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <LoaderCircle size={16} className="animate-spin" />
                  Recording & Sending...
                </>
              ) : (
                <>
                  Submit Quote Request
                  <ArrowRight size={15} />
                </>
              )}
            </button>

            <div className="flex items-center gap-2 text-xs text-white/45">
              <span>Prefer instant reply?</span>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-textGold hover:underline"
              >
                <MessageCircle size={14} /> WhatsApp Now
              </a>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
