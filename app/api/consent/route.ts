import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import crypto from "crypto";

function hashIp(ip: string): string {
  const salt = process.env.COOKIE_SECRET || "afsha-salt-2026";
  return crypto.createHash("sha256").update(`${ip}-${salt}`).digest("hex").slice(0, 32);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { visitorId, consentId, categories, action } = body || {};

    if (!visitorId || !consentId || !categories || !action) {
      return NextResponse.json({ error: "Missing required consent parameters" }, { status: 400 });
    }

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "";
    const ipHash = hashIp(ip);

    const supabase = createSupabaseServiceClient();
    if (supabase) {
      await supabase.from("consent_records").insert({
        visitor_id: visitorId,
        consent_id: consentId,
        essential: true,
        analytics: Boolean(categories.analytics),
        advertising: Boolean(categories.advertising),
        personalization: Boolean(categories.personalization),
        ip_hash: ipHash,
        user_agent: userAgent.slice(0, 500),
        action,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Consent API error:", err);
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}
