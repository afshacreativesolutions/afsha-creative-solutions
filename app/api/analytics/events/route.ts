import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { ALLOWED_EVENT_NAMES, AllowedEventName } from "@/lib/tracker";
import crypto from "crypto";

function hashIp(ip: string): string {
  const salt = process.env.COOKIE_SECRET || "afsha-salt-2026";
  return crypto.createHash("sha256").update(`${ip}-${salt}`).digest("hex").slice(0, 32);
}

function detectDevice(userAgent: string): { device: string; browser: string; os: string } {
  const ua = userAgent.toLowerCase();
  let device = "desktop";
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    device = "tablet";
  } else if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer/i.test(ua)) {
    device = "mobile";
  }

  let os = "other";
  if (/windows/i.test(ua)) os = "Windows";
  else if (/macintosh|mac os x/i.test(ua)) os = "macOS";
  else if (/android/i.test(ua)) os = "Android";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/linux/i.test(ua)) os = "Linux";

  let browser = "other";
  if (/edg/i.test(ua)) browser = "Edge";
  else if (/chrome|crios/i.test(ua)) browser = "Chrome";
  else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
  else if (/safari/i.test(ua)) browser = "Safari";

  return { device, browser, os };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      visitorId,
      sessionId,
      eventName,
      pageUrl,
      pageTitle,
      referrer,
      properties,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
    } = body || {};

    // Validate minimum required fields and event allowlist
    if (!visitorId || !eventName || !pageUrl) {
      return NextResponse.json({ error: "Invalid payload parameters" }, { status: 400 });
    }

    if (!ALLOWED_EVENT_NAMES.has(eventName as AllowedEventName)) {
      return NextResponse.json({ error: "Unsupported event name" }, { status: 400 });
    }

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "";
    const ipHash = hashIp(ip);
    const { device, browser, os } = detectDevice(userAgent);

    const supabase = createSupabaseServiceClient();
    if (!supabase) {
      return NextResponse.json({ success: true, recorded: false });
    }

    const now = new Date().toISOString();

    // 1. Upsert Visitor
    await supabase.from("visitors").upsert(
      {
        visitor_id: visitorId,
        last_seen_at: now,
        initial_referrer: referrer || null,
        initial_utm_source: utmSource || null,
        initial_utm_medium: utmMedium || null,
        initial_utm_campaign: utmCampaign || null,
        initial_utm_term: utmTerm || null,
        initial_utm_content: utmContent || null,
        device_category: device,
        browser,
        os,
        ip_hash: ipHash,
      },
      { onConflict: "visitor_id", ignoreDuplicates: false }
    );

    // 2. Upsert Session if sessionId is present
    if (sessionId) {
      const { data: existingSession } = await supabase
        .from("visitor_sessions")
        .select("session_id, page_views_count, events_count, started_at")
        .eq("session_id", sessionId)
        .maybeSingle();

      if (existingSession) {
        const isPageView = eventName === "page_view";
        const durationSeconds = Math.max(
          0,
          Math.floor((new Date().getTime() - new Date(existingSession.started_at).getTime()) / 1000)
        );

        await supabase
          .from("visitor_sessions")
          .update({
            last_activity_at: now,
            exit_page: pageUrl,
            page_views_count: existingSession.page_views_count + (isPageView ? 1 : 0),
            events_count: existingSession.events_count + 1,
            duration_seconds: durationSeconds,
            is_bounce: false,
          })
          .eq("session_id", sessionId);
      } else {
        await supabase.from("visitor_sessions").insert({
          session_id: sessionId,
          visitor_id: visitorId,
          started_at: now,
          last_activity_at: now,
          landing_page: pageUrl,
          exit_page: pageUrl,
          page_views_count: eventName === "page_view" ? 1 : 0,
          events_count: 1,
          duration_seconds: 0,
          referrer: referrer || null,
          utm_source: utmSource || null,
          utm_medium: utmMedium || null,
          utm_campaign: utmCampaign || null,
          utm_term: utmTerm || null,
          utm_content: utmContent || null,
          is_bounce: true,
        });
      }
    }

    // 3. Insert Visitor Event
    await supabase.from("visitor_events").insert({
      visitor_id: visitorId,
      session_id: sessionId || null,
      event_name: eventName,
      page_url: pageUrl,
      page_title: pageTitle || null,
      properties: properties && typeof properties === "object" ? properties : {},
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Visitor event error:", err);
    return NextResponse.json({ success: false, error: "Internal tracking error" }, { status: 500 });
  }
}
