import { ImageResponse } from "next/og";
import { getPublicBlogPost } from "@/lib/catalog";
import { getStaticBlogPost } from "@/lib/blog-data";
import { SITE_NAME } from "@/lib/site-config";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogOpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const post = (await getPublicBlogPost(slug)) || getStaticBlogPost(slug);

  const title = post?.title || "Architectural Metalwork Guide";
  const category = post?.focus_keyword || "Architectural Metalwork Guide";
  const words = post?.content ? post.content.split(/\s+/).length : 600;
  const readTime = `${Math.max(1, Math.ceil(words / 200))} min read`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          backgroundColor: "#080808",
          backgroundImage: "radial-gradient(circle at 90% 15%, rgba(214, 163, 111, 0.16) 0%, transparent 60%)",
          color: "#FFFFFF",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          border: "12px solid #141414",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "8px",
                border: "2px solid #D6A36F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: "bold",
                color: "#D6A36F",
                backgroundColor: "rgba(214, 163, 111, 0.1)",
              }}
            >
              A
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  letterSpacing: "0.22em",
                  color: "#D6A36F",
                  textTransform: "uppercase",
                }}
              >
                AFSHA
              </span>
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.28em",
                  color: "#A7A7A7",
                  textTransform: "uppercase",
                }}
              >
                INSIGHTS & GUIDES
              </span>
            </div>
          </div>

          <div
            style={{
              padding: "8px 18px",
              borderRadius: "9999px",
              border: "1px solid rgba(214, 163, 111, 0.4)",
              color: "#D6A36F",
              fontSize: "12px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {readTime}
          </div>
        </div>

        {/* Center Article Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "940px" }}>
          <span
            style={{
              fontSize: "13px",
              color: "#D6A36F",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            {category} · Expert Guide
          </span>
          <h1
            style={{
              fontSize: "46px",
              fontWeight: 300,
              lineHeight: 1.18,
              color: "#F5F5F5",
              margin: 0,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.5,
              color: "#A7A7A7",
              margin: 0,
            }}
          >
            Expert advice on custom steel gates, iron railings, rust-proofing, and architectural fabrication from Moradabad.
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "24px",
          }}
        >
          <span style={{ fontSize: "15px", color: "#888888", letterSpacing: "0.08em" }}>
            www.afshacreative.in/blog/{slug}
          </span>
          <span style={{ fontSize: "14px", color: "#D6A36F", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Read Full Guide
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
