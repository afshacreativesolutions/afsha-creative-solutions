"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle, CheckCircle2 } from "lucide-react";
import { getOrCreateSessionId, getOrCreateVisitorId } from "@/lib/consent-store";
import { getAttributionFromUrl, trackEvent } from "@/lib/tracker";

type CategoryOption = { slug: string; name: string };

const fallbackCategories: CategoryOption[] = [
  { slug: "gates", name: "Gates" },
  { slug: "stair-railings", name: "Stair railings" },
  { slug: "balcony-railings", name: "Balcony railings" },
  { slug: "spiral-railings", name: "Spiral railings" },
];

const fieldClass =
  "mt-2 min-h-[52px] w-full rounded border border-white/15 bg-[#131313] px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-textGold/70 focus:ring-1 focus:ring-textGold/30";
const labelClass =
  "block text-[9px] font-medium uppercase tracking-[0.22em] text-white/50";

export default function EnquiryForm({ categories }: { categories: CategoryOption[] }) {
  const [status, setStatus] = useState<{ kind: "success" | "error"; message: string } | null>(null);
  const [sending, setSending] = useState(false);
  const [marketingEmail, setMarketingEmail] = useState(false);
  const [marketingWhatsApp, setMarketingWhatsApp] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setSending(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());

    const visitorId = getOrCreateVisitorId();
    const sessionId = getOrCreateSessionId();
    const attribution = getAttributionFromUrl();

    const payload = {
      ...formValues,
      source: "contact_page",
      visitorId,
      sessionId,
      marketingEmail,
      marketingWhatsApp,
      ...attribution,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "We could not send your enquiry. Please try again.");
      }

      trackEvent("contact_form_submit", {
        category: formValues.category,
      });

      form.reset();
      setStatus({
        kind: "success",
        message: "Thank you. Your enquiry has been received. Our team will review your specifications and be in touch promptly.",
      });
    } catch (error) {
      setStatus({
        kind: "error",
        message: error instanceof Error ? error.message : "We could not send your enquiry. Please try again.",
      });
    } finally {
      setSending(false);
    }
  }

  const options = categories.length ? categories : fallbackCategories;

  return (
    <form onSubmit={submit} className="rounded-lg border border-white/10 bg-[#080808] p-5 sm:p-8 lg:p-10">
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        <label className={labelClass}>
          Full name *
          <input className={fieldClass} name="name" autoComplete="name" placeholder="e.g. Rajesh Kumar" minLength={2} maxLength={100} required />
        </label>
        <label className={labelClass}>
          Phone number (WhatsApp) *
          <input className={fieldClass} name="phone" type="tel" autoComplete="tel" placeholder="+91 XXXXX XXXXX" minLength={7} maxLength={25} required />
        </label>
      </div>

      <label className={`${labelClass} mt-5 block sm:mt-6`}>
        Email address
        <input className={fieldClass} name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} />
      </label>

      <label className={`${labelClass} mt-5 block sm:mt-6`}>
        Product interest *
        <select className={`${fieldClass} appearance-none cursor-pointer`} name="category" defaultValue="" required>
          <option value="" disabled>Select a category...</option>
          {options.map((category) => (
            <option key={category.slug} value={category.slug} className="bg-[#151515] text-white">
              {category.name}
            </option>
          ))}
          <option value="other" className="bg-[#151515] text-white">Other / custom work</option>
        </select>
      </label>

      <label className={`${labelClass} mt-5 block sm:mt-6`}>
        Your message *
        <textarea
          className="mt-2 min-h-32 w-full resize-y rounded border border-white/15 bg-[#131313] px-4 py-4 text-sm leading-6 text-white outline-none transition placeholder:text-white/30 focus:border-textGold/70 focus:ring-1 focus:ring-textGold/30 sm:min-h-[150px]"
          name="message"
          placeholder="Tell us about your project — location, scope, timeline, or design style..."
          minLength={5}
          maxLength={5000}
          required
        />
      </label>

      {/* Marketing Opt-in Checkboxes */}
      <div className="mt-5 rounded border border-white/10 bg-[#121212]/60 p-4 space-y-2.5">
        <p className="text-[9px] uppercase tracking-[0.18em] text-white/50">
          Stay Updated (Optional)
        </p>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={marketingWhatsApp}
            onChange={(e) => setMarketingWhatsApp(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-black text-textGold"
          />
          <span className="text-xs text-white/70">
            Receive project progress and new metalwork photo collections via WhatsApp.
          </span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={marketingEmail}
            onChange={(e) => setMarketingEmail(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-black text-textGold"
          />
          <span className="text-xs text-white/70">
            Subscribe to architectural metalwork lookbooks and design inspirations by email.
          </span>
        </label>
      </div>

      {/* Honeypot */}
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6 flex flex-col items-start gap-4 sm:mt-7 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex min-h-[54px] min-w-[260px] items-center justify-between gap-8 rounded-full border border-textGold/40 p-1.5 pl-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-textGold transition hover:border-textGold hover:bg-textGold/5 disabled:cursor-wait disabled:opacity-60"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-textGold/70">
            {sending ? <LoaderCircle size={16} className="animate-spin" /> : <ArrowRight size={16} />}
          </span>
          <span className="mr-4">{sending ? "Sending..." : "Send enquiry"}</span>
        </button>

        {status && (
          <p
            role="status"
            aria-live="polite"
            className={`max-w-xl text-sm leading-6 ${status.kind === "success" ? "text-emerald-300" : "text-red-300"}`}
          >
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
