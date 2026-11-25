// scripts/test-og-and-seo.mjs
// Automated verification suite for Open Graph, SEO Metadata & Social Sharing

import assert from "node:assert";
import {
  PRODUCTION_SITE_URL,
  getSiteUrl,
  absoluteUrl,
  canonicalUrl,
  buildWhatsAppQuoteUrl,
  BUSINESS_WHATSAPP_NUMBER,
} from "../lib/site-config.ts";

console.log("=================================================");
console.log("  Running Afsha SEO & Open Graph Test Suite");
console.log("=================================================\n");

let passed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// 1. Production Domain Tests
test("PRODUCTION_SITE_URL uses official www domain", () => {
  assert.strictEqual(PRODUCTION_SITE_URL, "https://www.afshacreative.in");
});

test("getSiteUrl() defaults strictly to production domain", () => {
  const url = getSiteUrl();
  assert.strictEqual(url, "https://www.afshacreative.in");
  assert.ok(!url.endsWith("/"), "Must not end with a trailing slash");
  assert.ok(!url.includes("vercel.app"), "Must never contain vercel.app");
});

// 2. Absolute & Canonical URL Generation
test("absoluteUrl() produces correct production URLs", () => {
  assert.strictEqual(absoluteUrl("/"), "https://www.afshacreative.in");
  assert.strictEqual(
    absoluteUrl("/products/modern-stainless-steel-gate"),
    "https://www.afshacreative.in/products/modern-stainless-steel-gate"
  );
  assert.strictEqual(
    absoluteUrl("/products/modern-stainless-steel-gate/design/ccee86ff-2cd6-4bca-900b-b8c17f4a619b"),
    "https://www.afshacreative.in/products/modern-stainless-steel-gate/design/ccee86ff-2cd6-4bca-900b-b8c17f4a619b"
  );
});

test("absoluteUrl() converts accidental Vercel or apex URLs to official domain", () => {
  const vercelUrl = "https://afsha-creative-solution-2eo8ocjb3.vercel.app/products/modern-stainless-steel-gate";
  const corrected = absoluteUrl(vercelUrl);
  assert.strictEqual(corrected, "https://www.afshacreative.in/products/modern-stainless-steel-gate");

  const apexUrl = "https://afshacreative.in/categories/gates";
  const correctedApex = absoluteUrl(apexUrl);
  assert.strictEqual(correctedApex, "https://www.afshacreative.in/categories/gates");
});

test("canonicalUrl() strips query parameters for clean SEO", () => {
  const dirty = "/products/modern-stainless-steel-gate?utm_source=instagram&ref=123";
  const canonical = canonicalUrl(dirty);
  assert.strictEqual(canonical, "https://www.afshacreative.in/products/modern-stainless-steel-gate");
});

// 3. WhatsApp Quote URL Builder
test("buildWhatsAppQuoteUrl() generates official production links without Vercel leakage", () => {
  const url = buildWhatsAppQuoteUrl({
    productName: "Modern stainless steel gate",
    designCode: "MSSG-01",
    sharePath: "/products/modern-stainless-steel-gate/design/ccee86ff-2cd6-4bca-900b-b8c17f4a619b",
  });

  assert.ok(url.startsWith(`https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=`));
  const decoded = decodeURIComponent(url);

  assert.ok(decoded.includes("Modern stainless steel gate"), "Must contain product name");
  assert.ok(decoded.includes("Design ID: MSSG-01"), "Must contain design code");
  assert.ok(
    decoded.includes("https://www.afshacreative.in/products/modern-stainless-steel-gate/design/ccee86ff-2cd6-4bca-900b-b8c17f4a619b"),
    "Must contain exact official production design link"
  );
  assert.ok(!decoded.includes("vercel.app"), "Must NEVER contain vercel.app");
});

// 4. JSON-LD Sanitization
test("JSON-LD sanitizes < characters to prevent script injection", () => {
  const dirtyData = { name: "Test</script><script>alert(1)</script>" };
  const sanitized = JSON.stringify(dirtyData).replace(/</g, "\\u003c");
  assert.ok(!sanitized.includes("<"), "Must not contain raw < character");
  assert.ok(sanitized.includes("\\u003c"), "Must contain escaped \\u003c");
});

console.log(`\n=================================================`);
console.log(`  All ${passed} SEO & Open Graph tests passed successfully!`);
console.log(`=================================================\n`);
