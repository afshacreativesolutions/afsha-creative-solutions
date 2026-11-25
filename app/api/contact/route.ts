import { NextRequest, NextResponse } from "next/server";
import { getPublicCategories } from "@/lib/catalog";
import { getPublicSiteOrigin } from "@/lib/site-url";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import {
  sendEmail,
  buildAdminNotificationHtml,
  buildCustomerConfirmationHtml,
} from "@/lib/email";
import { sendWhatsAppMessage } from "@/lib/whatsapp";
import crypto from "crypto";

const fallbackCategorySlugs = new Set([
  "gates", "stair-railings", "balcony-railings", "spiral-railings", "decorative-grills", "custom-metalwork"
]);

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function hashIp(ip: string): string {
  const salt = process.env.COOKIE_SECRET || "afsha-salt-2026";
  return crypto.createHash("sha256").update(`${ip}-${salt}`).digest("hex").slice(0, 32);
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please check your inputs and try again." }, { status: 400 });
  }

  // Honeypot check
  if (clean(body.website, 200)) {
    return NextResponse.json({ success: true, reference: "AF-RECEIVED" });
  }

  const name = clean(body.name, 100);
  const phone = clean(body.phone, 25);
  const email = clean(body.email, 254);
  const category = clean(body.category, 100);
  const message = clean(body.message, 5000);
  const dimensions = clean(body.dimensions, 200);
  const material = clean(body.material, 100);
  const source = clean(body.source, 50) || "quote_form";
  const visitorId = clean(body.visitorId, 64) || null;
  const sessionId = clean(body.sessionId, 64) || null;
  const marketingEmail = Boolean(body.marketingEmail);
  const marketingWhatsApp = Boolean(body.marketingWhatsApp);

  const phoneValid = phone.length >= 7;
  const emailValid = email ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) : false;

  if (name.length < 2 || !phoneValid || message.length < 5 || !category) {
    return NextResponse.json(
      { error: "Please complete your name, valid phone number, product category, and project message." },
      { status: 400 }
    );
  }

  const categories = await getPublicCategories().catch(() => []);
  const categoryName =
    category === "other"
      ? "Other Architectural Metalwork"
      : categories.find((item) => item.slug === category)?.name ?? category;

  const enquiryReference = `AF-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 4).toUpperCase()}`;
  const siteUrl = (await getPublicSiteOrigin()) || "https://afshacreative.in";
  const whatsappUrl = new URL("https://wa.me/919634776691");
  whatsappUrl.searchParams.set(
    "text",
    `Hello Afsha Creative Solution, I just submitted enquiry ${enquiryReference} regarding ${categoryName} and would like to discuss my project.`
  );

  const submittedAt = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
  const ipHash = hashIp(ip);

  // 1. CRM Ingestion via Privileged Supabase Service Client
  let customerId: string | undefined;
  let leadId: string | undefined;

  const supabase = createSupabaseServiceClient();

  if (supabase) {
    try {
      // 1.1 Match or Create Customer
      const { data: existingCustomer } = await supabase
        .from("customers")
        .select("id, total_quotes_requested, email")
        .eq("phone", phone)
        .maybeSingle();

      if (existingCustomer) {
        customerId = existingCustomer.id;
        await supabase
          .from("customers")
          .update({
            name,
            email: email || existingCustomer.email,
            total_quotes_requested: (existingCustomer.total_quotes_requested || 1) + 1,
            last_touch_source: source,
          })
          .eq("id", customerId as string);
      } else {
        const { data: newCustomer, error: custErr } = await supabase
          .from("customers")
          .insert({
            name,
            phone,
            email: email || null,
            lifecycle_stage: "lead",
            total_quotes_requested: 1,
            first_touch_source: source,
            last_touch_source: source,
          })
          .select("id")
          .single();

        if (!custErr && newCustomer) {
          customerId = newCustomer.id;
        }
      }

      // Link visitor to customer
      if (visitorId && customerId) {
        await supabase
          .from("visitors")
          .update({ customer_id: customerId })
          .eq("visitor_id", visitorId);
      }

      // 1.2 Create Lead Record
      if (customerId) {
        const { data: newLead, error: leadErr } = await supabase
          .from("leads")
          .insert({
            reference_number: enquiryReference,
            customer_id: customerId,
            visitor_id: visitorId,
            session_id: sessionId,
            title: `Quote Request: ${categoryName}`,
            category_slug: category,
            status: "new",
            priority: "medium",
            source,
            dimensions: dimensions || null,
            material_preference: material || null,
            message,
            attribution: {
              ip_hash: ipHash,
              submitted_at: submittedAt,
            },
          })
          .select("id")
          .single();

        if (!leadErr && newLead) {
          leadId = newLead.id;
        }

        // 1.3 Marketing Subscriptions
        if (marketingEmail && email) {
          await supabase.from("marketing_subscriptions").upsert(
            {
              customer_id: customerId,
              channel: "email",
              destination: email,
              status: "subscribed",
              opt_in_source: source,
              opt_in_ip_hash: ipHash,
            },
            { onConflict: "channel,destination" }
          );
        }

        if (marketingWhatsApp && phone) {
          await supabase.from("marketing_subscriptions").upsert(
            {
              customer_id: customerId,
              channel: "whatsapp",
              destination: phone,
              status: "subscribed",
              opt_in_source: source,
              opt_in_ip_hash: ipHash,
            },
            { onConflict: "channel,destination" }
          );
        }

        // 1.4 Audit Log
        await supabase.from("audit_logs").insert({
          action: "lead_created",
          entity_type: "leads",
          entity_id: leadId || enquiryReference,
          new_values: { reference_number: enquiryReference, customer_name: name, category: categoryName },
          ip_hash: ipHash,
        });
      }
    } catch (dbErr) {
      console.error("Database CRM ingestion error:", dbErr);
    }
  }

  // 2. Communications Dispatch
  const adminEmailTo = process.env.CONTACT_TO_EMAIL || "afshacreativesolutions@gmail.com";

  // Send admin notification
  const adminHtml = buildAdminNotificationHtml({
    customerName: name,
    phone,
    email: email || undefined,
    referenceNumber: enquiryReference,
    categoryName,
    message,
    dimensions: dimensions || undefined,
    material: material || undefined,
    source,
    submittedAt,
  });

  const adminEmailPromise = sendEmail({
    to: adminEmailTo,
    replyTo: email || undefined,
    subject: `[New Lead ${enquiryReference}] ${name} — ${categoryName}`,
    html: adminHtml,
    leadId,
    customerId,
    messageType: "notification",
  });

  // Send customer confirmation if email provided
  let customerEmailPromise: Promise<unknown> = Promise.resolve();
  if (email && emailValid) {
    const customerHtml = buildCustomerConfirmationHtml({
      customerName: name,
      referenceNumber: enquiryReference,
      categoryName,
      siteUrl,
      whatsappUrl: whatsappUrl.toString(),
    });

    customerEmailPromise = sendEmail({
      to: email,
      subject: `Your Metalwork Enquiry [${enquiryReference}] — Afsha Creative Solution`,
      html: customerHtml,
      leadId,
      customerId,
      messageType: "transactional",
    });
  }

  // Optional WhatsApp alert
  const whatsAppInternalAlert = process.env.INTERNAL_NOTIFICATION_PHONE
    ? sendWhatsAppMessage({
        toPhone: process.env.INTERNAL_NOTIFICATION_PHONE,
        textMessage: `🔔 *New Metalwork Lead*\nRef: ${enquiryReference}\nName: ${name}\nPhone: ${phone}\nCategory: ${categoryName}\nMessage: ${message.slice(0, 200)}`,
        leadId,
        customerId,
        messageType: "notification",
      })
    : Promise.resolve();

  await Promise.allSettled([adminEmailPromise, customerEmailPromise, whatsAppInternalAlert]);

  return NextResponse.json({
    success: true,
    reference: enquiryReference,
    whatsappUrl: whatsappUrl.toString(),
  });
}
