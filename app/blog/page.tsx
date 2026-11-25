import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import BlogIndexClient from "@/components/BlogIndexClient";
import { getPublicBlogPosts } from "@/lib/catalog";
import { STATIC_BLOG_POSTS, type StaticBlogPost } from "@/lib/blog-data";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Architectural Metalwork Blog & Guides | Afsha Creative Solutions",
  description:
    "Expert guides, design comparisons, and buying tips on modern main gates, stainless steel railings, wrought iron balustrades, and custom metal fabrication in India.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Architectural Metalwork Blog & Guides | Afsha Creative Solutions",
    description:
      "Expert guides on modern main gates, stainless steel railings, wrought iron balustrades, and custom metal fabrication.",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Architectural Metalwork Blog & Guides | Afsha Creative Solutions",
    description:
      "Expert guides on modern main gates, stainless steel railings, wrought iron balustrades, and custom metal fabrication.",
  },
};

export const revalidate = 300;

export default async function BlogPage() {
  const postsFromDb = await getPublicBlogPosts();

  // Merge database posts with rich static posts so all 6 core educational topics are always present
  const mergedPosts: StaticBlogPost[] = STATIC_BLOG_POSTS.map((staticPost) => {
    const dbMatch = postsFromDb.find((p) => p.slug === staticPost.slug);
    if (!dbMatch) return staticPost;
    return {
      ...staticPost,
      title: dbMatch.title || staticPost.title,
      excerpt: dbMatch.excerpt || staticPost.excerpt,
      content: dbMatch.content || staticPost.content,
      featured_image: dbMatch.featured_image || staticPost.featured_image,
      published_at: dbMatch.published_at || staticPost.published_at,
    };
  });

  // Any additional published DB posts not in static list
  for (const dbPost of postsFromDb) {
    if (!mergedPosts.some((p) => p.slug === dbPost.slug)) {
      mergedPosts.push({
        ...dbPost,
        category: "Architectural Metalwork",
        readTime: "5 min read",
        author: "Afsha Creative Solutions",
      });
    }
  }

  return (
    <main className="bg-background text-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Afsha Creative Solutions Architectural Metalwork Blog",
          description:
            "Educational articles and buying guides on custom metal gates, iron balustrades, and stainless steel fabrication in India.",
          url: absoluteUrl("/blog"),
        }}
      />

      <PageHero
        eyebrow="Architectural Knowledge · Moradabad, India"
        title={
          <>
            Metalwork Insights & <span className="text-textGold font-heading">Design Guides</span>
          </>
        }
        description="Comprehensive educational articles on selecting modern main gates, comparing wrought iron vs stainless steel, planning balcony railings, and understanding custom metal fabrication."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
        badges={[
          "Material Comparison Guides",
          "Safety & Building Codes",
          "Gate Automation Advice",
          "Direct Workshop Insights",
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
        <BlogIndexClient posts={mergedPosts} />
      </section>

      <CTASection
        eyebrow="Custom Project Consultation"
        title="Inspired by a design in our articles?"
        description="Our fabrication team in Moradabad can bring any gate, balustrade, or grill concept into reality with precision-engineered metalwork."
        primaryLabel="Discuss On WhatsApp"
        secondaryLabel="Request Custom Quote"
        secondaryHref="/custom-metalwork"
      />
    </main>
  );
}
