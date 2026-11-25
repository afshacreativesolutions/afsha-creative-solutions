"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, Sparkles } from "lucide-react";
import BlogCard from "./BlogCard";
import type { StaticBlogPost } from "@/lib/blog-data";

export default function BlogIndexClient({
  posts,
}: {
  posts: StaticBlogPost[];
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { slug: "all", name: "All Articles" },
    { slug: "Gate Designs", name: "Gate Designs" },
    { slug: "Metal Railings", name: "Metal Railings" },
    { slug: "Architectural Metalwork", name: "Architectural Metalwork" },
    { slug: "Home Design", name: "Home Design" },
    { slug: "Material Fabrication", name: "Material Fabrication" },
    { slug: "Buying Guides", name: "Buying Guides" },
  ];

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "all" || post.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const featuredPost = filteredPosts[0] || posts[0];
  const gridPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : filteredPosts;

  return (
    <div>
      {/* Search and Category Filter Toolbar */}
      <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="scrollbar-none flex gap-2 overflow-x-auto pb-2 sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.16em] transition-colors ${
                  isActive
                    ? "border-textGold bg-textGold text-black font-semibold"
                    : "border-white/12 text-white/55 hover:border-white/30 hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        <div className="relative w-full max-w-xs">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides & articles..."
            className="w-full rounded-full border border-white/15 bg-[#121212] py-2 pl-9 pr-4 text-xs text-white placeholder:text-white/35 focus:border-textGold/70 focus:outline-none"
          />
        </div>
      </div>

      {/* Featured Article Spotlight (when not searching or on first page) */}
      {!searchQuery && activeCategory === "all" && featuredPost && (
        <div className="mb-12 overflow-hidden rounded-2xl border border-white/10 bg-[#090909] sm:mb-16">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="relative aspect-[16/10] overflow-hidden bg-[#111] lg:col-span-7 lg:aspect-[16/11]"
            >
              <Image
                src={featuredPost.staticImage || featuredPost.featured_image || "/videos/hero-poster.webp"}
                alt={featuredPost.image_alt || featuredPost.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-textGold backdrop-blur-sm">
                <Sparkles size={12} /> Featured Insight
              </span>
            </Link>

            <div className="flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-10">
              <div className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-white/40">
                <span className="text-textGold">{featuredPost.category}</span>
                <span>•</span>
                <span>{featuredPost.readTime}</span>
              </div>

              <h2 className="text-2xl font-light text-white hover:text-textGold transition-colors sm:text-3xl">
                <Link href={`/blog/${featuredPost.slug}`}>
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/60">
                {featuredPost.excerpt}
              </p>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-white/40">
                  By {featuredPost.author}
                </span>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-textGold hover:text-white transition"
                >
                  Read Full Guide <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {(searchQuery || activeCategory !== "all" ? filteredPosts : gridPosts).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="border border-white/10 py-20 text-center text-sm text-white/45">
          No articles found matching &quot;{searchQuery}&quot;. Try exploring other categories.
        </div>
      )}
    </div>
  );
}
