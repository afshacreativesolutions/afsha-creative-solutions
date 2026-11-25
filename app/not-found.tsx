import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | Afsha Creative Solution",
  description: "The page you requested could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center bg-background px-4 text-center text-white">
      <p className="text-[10px] uppercase tracking-[0.24em] text-textGold">404</p>
      <h1 className="mt-4 text-4xl font-light tracking-tight sm:text-6xl">Page not found</h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-white/55">The page you requested may have moved or no longer exists.</p>
      <Link href="/" className="mt-8 inline-flex items-center gap-2 border-b border-textGold/60 pb-2 text-[10px] uppercase tracking-[0.18em] text-textGold">Return home</Link>
    </main>
  );
}