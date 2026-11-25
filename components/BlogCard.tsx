import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { StaticBlogPost } from "@/lib/blog-data";

export default function BlogCard({ post }: { post: StaticBlogPost }) {
  const imageSrc = post.staticImage || post.featured_image || "/videos/hero-poster.webp";

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#080808] transition duration-300 hover:-translate-y-1 hover:border-textGold/40">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-[#111]">
        <Image
          src={imageSrc}
          alt={post.image_alt || post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-textGold backdrop-blur-sm">
          {post.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-white/40">
          <span>{post.published_at ? new Date(post.published_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "Guide"}</span>
          <span>{post.readTime}</span>
        </div>

        <h3 className="text-lg font-light leading-snug text-white transition-colors group-hover:text-textGold sm:text-xl">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/55">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto pt-6">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-textGold transition hover:text-white"
          >
            Read Article <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
