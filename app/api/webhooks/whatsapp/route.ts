import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

/**
 * Meta WhatsApp Cloud API Webhook Handler
 * GET: Webhook verification challenge
 * POST: Delivery status updates and inbound customer messages
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;

  if (mode === "subscribe" && token === verifyToken) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Forbidden verification token" }, { status: 403 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createSupabaseServiceClient();

    if (!supabase) {
      return NextResponse.json({ status: "skipped_no_db" });
    }

    const entries = body?.entry || [];
    for (const entry of entries) {
      const changes = entry?.changes || [];
      for (const change of changes) {
        const val = change?.value;
        if (!val) continue;

        // 1. Process delivery statuses (sent, delivered, read, failed)
        if (val.statuses && Array.isArray(val.statuses)) {
          for (const st of val.statuses) {
            const providerMessageId = st.id;
            const status = st.status; // 'sent' | 'delivered' | 'read' | 'failed'
            const recipient = st.recipient_id;
            const error = st.errors?.[0]?.message || null;

            await supabase
              .from("message_logs")
              .update({
                status: status === "read" ? "read" : status === "delivered" ? "delivered" : status === "failed" ? "failed" : "sent",
                error_message: error,
                updated_at: new Date().toISOString(),
              })
              .eq("provider_message_id", providerMessageId);
          }
        }

        // 2. Process inbound customer messages
        if (val.messages && Array.isArray(val.messages)) {
          for (const msg of val.messages) {
            const from = msg.from; // Phone number
            const text = msg.text?.body || msg.type || "Inbound message";
            const msgId = msg.id;

            // Match customer if exists
            const { data: customer } = await supabase
              .from("customers")
              .select("id")
              .eq("phone", from)
              .maybeSingle();

            await supabase.from("message_logs").insert({
              channel: "whatsapp",
              provider: "meta_whatsapp",
              provider_message_id: msgId,
              recipient: from,
              customer_id: customer?.id || null,
              direction: "inbound",
              message_type: "notification",
              status: "delivered",
              metadata: { text, raw: msg },
            });
          }
        }
      }
    }

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.error("WhatsApp webhook processing error:", err);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
