import {
  absoluteUrl,
  canonicalUrl,
  getSiteUrl,
  PRODUCTION_SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  BUSINESS_WHATSAPP_NUMBER,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_EMAIL,
  BUSINESS_ADDRESS,
  buildWhatsAppQuoteUrl,
} from "./site-config";

export {
  absoluteUrl,
  canonicalUrl,
  getSiteUrl,
  PRODUCTION_SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  BUSINESS_WHATSAPP_NUMBER,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_EMAIL,
  BUSINESS_ADDRESS,
  buildWhatsAppQuoteUrl,
};

export const DEFAULT_SITE_URL = PRODUCTION_SITE_URL;

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
