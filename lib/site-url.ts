import "server-only";
import { headers } from "next/headers";

export async function getPublicSiteOrigin() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const deploymentHost = process.env.VERCEL_URL;
  const canonicalUrl = configuredUrl || (deploymentHost ? `https://${deploymentHost}` : undefined);

  if (canonicalUrl) return new URL(canonicalUrl).origin;

  const requestHeaders = await headers();
  const host = (requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host"))?.split(",")[0]?.trim();
  if (!host) return "";

  const forwardedProtocol = requestHeaders.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol = forwardedProtocol || (/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host) ? "http" : "https");
  return new URL(`${protocol}://${host}`).origin;
}
