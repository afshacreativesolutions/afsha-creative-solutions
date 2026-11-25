// scripts/seed-crm.mjs
// Seeds demonstration leads, customers, and analytics data for Afsha Creative Solution

import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.");
  process.exit(1);
}

const supabase = createClient(url, key);

function hashIp(ip) {
  return crypto.createHash("sha256").update(`${ip}-afsha-salt-2026`).digest("hex").slice(0, 32);
}

async function seed() {
  console.log("Seeding demonstration CRM and intelligence data...\n");

  // 1. Seed Demo Customers
  const demoCustomers = [
    {
      name: "Vikram Singhal",
      phone: "+91 98370 12345",
      email: "vikram.singhal@example.com",
      city: "Moradabad",
      state: "Uttar Pradesh",
      lifecycle_stage: "customer",
      total_quotes_requested: 2,
      total_orders_completed: 1,
      total_revenue: 145000,
      first_touch_source: "google_search",
      last_touch_source: "quote_form",
    },
    {
      name: "Dr. Ananya Mehrotra",
      phone: "+91 94120 54321",
      email: "dr.ananya@example.com",
      city: "Civil Lines, Moradabad",
      state: "Uttar Pradesh",
      lifecycle_stage: "prospect",
      total_quotes_requested: 1,
      total_orders_completed: 0,
      total_revenue: 0,
      first_touch_source: "instagram_ad",
      last_touch_source: "quote_form",
    },
    {
      name: "Mohit Agarwal",
      phone: "+91 98971 98765",
      email: "mohit.agarwal@example.com",
      city: "Delhi Road, Moradabad",
      state: "Uttar Pradesh",
      lifecycle_stage: "lead",
      total_quotes_requested: 1,
      total_orders_completed: 0,
      total_revenue: 0,
      first_touch_source: "direct_visit",
      last_touch_source: "contact_page",
    },
  ];

  const createdCustomers = [];
  for (const c of demoCustomers) {
    const { data: existing } = await supabase
      .from("customers")
      .select("id, name, phone")
      .eq("phone", c.phone)
      .maybeSingle();

    if (existing) {
      createdCustomers.push(existing);
      console.log(`✓ Existing customer found: ${existing.name} (${existing.phone})`);
    } else {
      const { data: inserted, error: insertErr } = await supabase
        .from("customers")
        .insert(c)
        .select("id, name, phone")
        .single();

      if (insertErr) {
        console.warn("Customer insert error:", insertErr.message);
      } else if (inserted) {
        createdCustomers.push(inserted);
        console.log(`✓ Inserted customer: ${inserted.name} (${inserted.phone})`);
      }
    }
  }

  // 2. Seed Demo Leads
  if (createdCustomers.length >= 3) {
    const demoLeads = [
      {
        reference_number: `AF-${Date.now().toString(36).toUpperCase()}-GATE`,
        customer_id: createdCustomers[0].id,
        title: "Quote Request: Main Entrance Steel Gate",
        category_slug: "gates",
        status: "won",
        priority: "high",
        source: "quote_form",
        dimensions: "14 ft width x 8 ft height",
        material_preference: "ss-304",
        estimated_value: 145000,
        message: "Need heavy-duty Grade 304 stainless steel sliding entrance gate with bespoke champagne gold vertical balusters for a new bungalow in Moradabad.",
        internal_notes: "Contract finalized. Fabrication commenced at Harthala workshop. Estimated delivery in 3 weeks.",
        follow_up_date: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      },
      {
        reference_number: `AF-${Date.now().toString(36).toUpperCase()}-RAIL`,
        customer_id: createdCustomers[1].id,
        title: "Quote Request: Balcony Architectural Railings",
        category_slug: "balcony-railings",
        status: "quote_sent",
        priority: "medium",
        source: "quote_form",
        dimensions: "38 running ft across front facade",
        material_preference: "wrought-iron",
        estimated_value: 68000,
        message: "Looking for classical wrought iron railings with rust-proof zinc primer and matte black epoxy coating for our second floor terrace in Civil Lines.",
        internal_notes: "Site measurement completed. Quotation sheet sent via WhatsApp. Awaiting client review.",
        follow_up_date: new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0],
      },
      {
        reference_number: `AF-${Date.now().toString(36).toUpperCase()}-SPRL`,
        customer_id: createdCustomers[2].id,
        title: "Quote Request: Spiral Staircase Balustrade",
        category_slug: "spiral-railings",
        status: "new",
        priority: "urgent",
        source: "contact_page",
        dimensions: "2 floors (approx 22 steps curved)",
        material_preference: "mild-steel",
        estimated_value: 95000,
        message: "Need a custom handrail for an internal circular spiral staircase with brass accents. Architect requires 3D lookbook drawings.",
        internal_notes: "New inquiry from contact page. Assigned to design team for initial CAD sketch.",
      },
    ];

    for (const lead of demoLeads) {
      const { data: existingLead } = await supabase
        .from("leads")
        .select("id, reference_number")
        .eq("title", lead.title)
        .maybeSingle();

      if (!existingLead) {
        const { data: insertedLead, error: leadErr } = await supabase
          .from("leads")
          .insert(lead)
          .select("reference_number, title")
          .single();

        if (leadErr) {
          console.warn("Lead seed error:", leadErr.message);
        } else if (insertedLead) {
          console.log(`✓ Lead created: [${insertedLead.reference_number}] ${insertedLead.title}`);
        }
      } else {
        console.log(`✓ Existing lead: [${existingLead.reference_number}]`);
      }
    }
  }

  // 3. Seed Demo Consent Records
  const consentRecords = [
    {
      visitor_id: crypto.randomUUID(),
      consent_id: crypto.randomUUID(),
      essential: true,
      analytics: true,
      advertising: true,
      personalization: true,
      action: "accept_all",
      ip_hash: hashIp("103.21.244.1"),
    },
    {
      visitor_id: crypto.randomUUID(),
      consent_id: crypto.randomUUID(),
      essential: true,
      analytics: false,
      advertising: false,
      personalization: false,
      action: "reject_optional",
      ip_hash: hashIp("103.21.244.2"),
    },
    {
      visitor_id: crypto.randomUUID(),
      consent_id: crypto.randomUUID(),
      essential: true,
      analytics: true,
      advertising: false,
      personalization: true,
      action: "custom_save",
      ip_hash: hashIp("103.21.244.3"),
    },
  ];

  await supabase.from("consent_records").insert(consentRecords);
  console.log(`✓ Seeded ${consentRecords.length} sample consent audit logs.`);

  console.log("\n=================================================");
  console.log("  CRM & Intelligence Seeding Completed Successfully!");
  console.log("=================================================");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
