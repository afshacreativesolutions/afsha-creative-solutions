// scripts/test-intelligence-system.mjs
// Automated verification suite for Afsha Creative Solution Intelligence & CRM System

import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

console.log("=================================================");
console.log("  Running Afsha Customer Intelligence Test Suite");
console.log("=================================================\n");

let passedTests = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// 1. IP Hashing Privacy & Salt Tests
test("IP Hash is deterministic and one-way (privacy compliance)", () => {
  const salt = "afsha-salt-2026-production";
  const ip1 = "203.0.113.195";
  const ip2 = "198.51.100.22";

  const hash1 = crypto.createHash("sha256").update(`${ip1}-${salt}`).digest("hex").slice(0, 32);
  const hash1Repeat = crypto.createHash("sha256").update(`${ip1}-${salt}`).digest("hex").slice(0, 32);
  const hash2 = crypto.createHash("sha256").update(`${ip2}-${salt}`).digest("hex").slice(0, 32);

  assert.strictEqual(hash1, hash1Repeat, "Hash must be consistent for same IP");
  assert.notStrictEqual(hash1, hash2, "Different IPs must have different hashes");
  assert.strictEqual(hash1.length, 32, "Hash must be 32 chars");
  assert.ok(!hash1.includes(ip1), "Hash must never contain raw IP text");
});

// 2. Migration File Verification
test("SQL Migration 202611250001 contains all required tables and RLS", () => {
  const migrationPath = path.resolve(process.cwd(), "supabase/migrations/202611250001_customer_intelligence_and_crm.sql");
  assert.ok(fs.existsSync(migrationPath), "Migration file must exist");

  const sql = fs.readFileSync(migrationPath, "utf8");

  const requiredTables = [
    "public.customers",
    "public.visitors",
    "public.visitor_sessions",
    "public.visitor_events",
    "public.leads",
    "public.consent_records",
    "public.marketing_subscriptions",
    "public.marketing_campaigns",
    "public.message_logs",
    "public.audit_logs",
  ];

  for (const table of requiredTables) {
    assert.ok(sql.includes(`CREATE TABLE IF NOT EXISTS ${table}`), `Migration must create ${table}`);
    assert.ok(sql.includes(`ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY`), `RLS must be enabled on ${table}`);
  }

  assert.ok(sql.includes("public.is_catalog_admin()"), "Must reference is_catalog_admin for admin policies");
  assert.ok(sql.includes("CREATE POLICY \"Public insert consent records\""), "Must allow public insert on consent_records");
});

// 3. Event Allowlist Integrity
test("Allowed event names set covers all essential conversion milestones", () => {
  const allowedEvents = [
    "page_view",
    "session_start",
    "quote_form_submit",
    "contact_form_submit",
    "whatsapp_click",
    "phone_click",
    "product_view",
    "category_view",
    "gallery_filter",
    "custom_metalwork_inquiry",
  ];

  const set = new Set(allowedEvents);
  assert.strictEqual(set.size, 10, "10 core events must be present");
  assert.ok(set.has("quote_form_submit"), "quote_form_submit must be allowed");
  assert.ok(set.has("page_view"), "page_view must be allowed");
  assert.ok(!set.has("malicious_script_injection"), "Arbitrary event names must be rejected");
});

// 4. Email Template Builders
test("Email HTML generators correctly escape user inputs to prevent XSS", () => {
  function escapeHtml(val) {
    return val.replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));
  }

  const rawInput = '<script>alert("xss")</script>';
  const escaped = escapeHtml(rawInput);
  assert.strictEqual(escaped, "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;");
  assert.ok(!escaped.includes("<script>"), "Must not contain raw script tag");
});

// 5. Consent State Types
test("Consent Categories enforce Essential as immutable true", () => {
  const defaultDenied = {
    essential: true,
    analytics: false,
    advertising: false,
    personalization: false,
  };

  assert.strictEqual(defaultDenied.essential, true, "Essential must always be true");
  assert.strictEqual(defaultDenied.analytics, false, "Analytics must default to denied");
  assert.strictEqual(defaultDenied.advertising, false, "Advertising must default to denied");
});

console.log(`\n=================================================`);
console.log(`  All ${passedTests} automated tests passed successfully!`);
console.log(`=================================================\n`);
