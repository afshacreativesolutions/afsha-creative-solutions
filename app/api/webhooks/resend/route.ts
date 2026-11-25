import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

/**
 * Resend Email Delivery & Tracking Webhook
 * Handles: email.sent, email.delivered, email.opened, email.clicked, email.bounced
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const type = body?.type; // e.g. "email.delivered"
    const data = body?.data;
    const emailId = data?.email_id;

    if (!emailId || !type) {
      return NextResponse.json({ status: "ignored" });
    }

    const supabase = createSupabaseServiceClient();
    if (!supabase) {
      return NextResponse.json({ status: "skipped_no_db" });
    }

    let statusUpdate = "";
    if (type === "email.delivered") statusUpdate = "delivered";
    else if (type === "email.opened") statusUpdate = "opened";
    else if (type === "email.clicked") statusUpdate = "clicked";
    else if (type === "email.bounced") statusUpdate = "bounced";

    if (statusUpdate) {
      await supabase
        .from("message_logs")
        .update({
          status: statusUpdate,
          updated_at: new Date().toISOString(),
        })
        .eq("provider_message_id", emailId);
    }

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.error("Resend webhook error:", err);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
