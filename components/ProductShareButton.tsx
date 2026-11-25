"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { absoluteUrl } from "@/lib/site-config";

type ProductShareButtonProps = {
  title: string;
  text?: string;
  sharePath: string;
  className?: string;
};

export default function ProductShareButton({
  title,
  text,
  sharePath,
  className = "",
}: ProductShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl = absoluteUrl(sharePath);

  async function handleShare() {
    // 1. If Web Share API is natively supported (mobile devices, modern Safari/Chrome)
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: text || `Explore this design by Afsha Creative Solution`,
          url: fullUrl,
        });
        return;
      } catch (err) {
        // User aborted or dismissed sheet; ignore
        if ((err as Error)?.name === "AbortError") return;
      }
    }

    // 2. Fallback: Copy official production link to clipboard
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Prompt manual copy if clipboard API blocked
      window.prompt("Copy link:", fullUrl);
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={`Share ${title}`}
      className={`inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition hover:border-textGold hover:bg-white/10 hover:text-textGold ${className}`}
    >
      {copied ? (
        <>
          <Check size={14} className="text-emerald-400" />
          <span className="text-emerald-300">Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 size={14} />
          <span>Share Design</span>
        </>
      )}
    </button>
  );
}
