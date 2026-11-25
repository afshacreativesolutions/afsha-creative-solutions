import type { MetadataRoute } from "next";
import { absoluteUrl, PRODUCTION_SITE_URL } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api", "/api/*"],
      },
      {
        userAgent: [
          "Googlebot",
          "bingbot",
          "facebookexternalhit",
          "WhatsApp",
          "Twitterbot",
          "LinkedInBot",
        ],
        allow: ["/", "/products/*", "/opengraph-image", "/*"],
        disallow: ["/admin", "/admin/*", "/api", "/api/*"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: PRODUCTION_SITE_URL,
  };
}
