"use server";

import { revalidatePath } from "next/cache";
import { requireAdminAction } from "@/lib/admin-auth";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { LeadStatus, LifecycleStage } from "@/lib/crm-types";

export async function updateLeadStatus(
  leadId: string,
  newStatus: LeadStatus,
  internalNotes?: string,
  followUpDate?: string | null
) {
  const { user } = await requireAdminAction();
  const supabase = createSupabaseServiceClient();
  if (!supabase) throw new Error("Service client unavailable.");

  const updates: Record<string, unknown> = {
    status: newStatus,
    updated_at: new Date().toISOString(),
  };

  if (internalNotes !== undefined) updates.internal_notes = internalNotes;
  if (followUpDate !== undefined) updates.follow_up_date = followUpDate;

  const { error } = await supabase.from("leads").update(updates).eq("id", leadId);
  if (error) throw new Error(error.message);

  // Log audit trail
  await supabase.from("audit_logs").insert({
    user_id: user.id,
    action: "lead_status_updated",
    entity_type: "leads",
    entity_id: leadId,
    new_values: updates,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${leadId}`);
  return { success: true };
}

export async function updateCustomerStage(
  customerId: string,
  stage: LifecycleStage,
  notes?: string
) {
  const { user } = await requireAdminAction();
  const supabase = createSupabaseServiceClient();
  if (!supabase) throw new Error("Service client unavailable.");

  const updates: Record<string, unknown> = {
    lifecycle_stage: stage,
    updated_at: new Date().toISOString(),
  };
  if (notes !== undefined) updates.notes = notes;

  const { error } = await supabase.from("customers").update(updates).eq("id", customerId);
  if (error) throw new Error(error.message);

  await supabase.from("audit_logs").insert({
    user_id: user.id,
    action: "customer_stage_updated",
    entity_type: "customers",
    entity_id: customerId,
    new_values: updates,
  });

  revalidatePath("/admin/customers");
  revalidatePath(`/admin/customers/${customerId}`);
  return { success: true };
}
