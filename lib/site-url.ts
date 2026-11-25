import "server-only";

import { absoluteUrl, getSiteUrl, PRODUCTION_SITE_URL } from "./site-config";

/**
 * Backward-compatible helper for server-side origin resolution.
 * Always resolves to the official production origin (https://www.afshacreative.in),
 * completely preventing Vercel deployment URLs from leaking into customer-facing links.
 */
export async function getPublicSiteOrigin(): Promise<string> {
  return getSiteUrl();
}

export { absoluteUrl, PRODUCTION_SITE_URL };
