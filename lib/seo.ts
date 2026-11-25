export const SITE_NAME = "Afsha Creative Solution";
export const SITE_DESCRIPTION =
  "Premium custom metal gates, architectural railings, and decorative metalwork by Afsha Creative Solutions in Moradabad, India.";
export const DEFAULT_SITE_URL = "https://afshacreative.in";

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
}

export function absoluteUrl(path = "/") {
  const base = getSiteUrl();
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const DEFAULT_KEYWORDS = [
  "custom metal gates in Moradabad",
  "iron gates manufacturers in Moradabad",
  "steel gates manufacturers",
  "modern main gate designs",
  "custom metal fabrication",
  "architectural metalwork",
  "iron railing manufacturers",
  "stainless steel railings",
  "balcony railing designs",
  "decorative metal grills",
  "metal gate fabrication",
  "custom metal products",
];

export function buildTitle(title?: string | null) {
  if (!title) return `${SITE_NAME} | Custom Metal Gates & Railings in Moradabad`;
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}