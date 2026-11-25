"use client";

import { useState } from "react";
import { Check, LoaderCircle, Save } from "lucide-react";
import { updateLeadStatus } from "../actions";
import { LeadStatus } from "@/lib/crm-types";

type Props = {
  leadId: string;
  initialStatus: LeadStatus;
  initialNotes: string;
  initialFollowUpDate: string;
};

const statusOptions: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "New (Unprocessed)" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified Requirement" },
  { value: "quote_sent", label: "Quote Estimate Sent" },
  { value: "negotiation", label: "Negotiating / Reviewing" },
  { value: "won", label: "Won (Contract Signed)" },
  { value: "lost", label: "Lost / Abandoned" },
  { value: "spam", label: "Spam / Irrelevant" },
];

export default function LeadStatusUpdater({
  leadId,
  initialStatus,
  initialNotes,
  initialFollowUpDate,
}: Props) {
  const [status, setStatus] = useState<LeadStatus>(initialStatus);
  const [notes, setNotes] = useState(initialNotes);
  const [followUpDate, setFollowUpDate] = useState(initialFollowUpDate);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError(null);

    try {
      await updateLeadStatus(leadId, status, notes, followUpDate || null);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update lead");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-6 space-y-5">
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-textGold">
        Pipeline Actions
      </h2>

      {/* Status Picker */}
      <div>
        <label className="block text-[10px] uppercase tracking-[0.14em] text-white/50 mb-1.5">
          Lead Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as LeadStatus)}
          className="w-full rounded border border-white/15 bg-[#141414] px-3 py-2 text-xs text-white outline-none focus:border-textGold"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Follow-up Date */}
      <div>
        <label className="block text-[10px] uppercase tracking-[0.14em] text-white/50 mb-1.5">
          Follow-up Date
        </label>
        <input
          type="date"
          value={followUpDate}
          onChange={(e) => setFollowUpDate(e.target.value)}
          className="w-full rounded border border-white/15 bg-[#141414] px-3 py-2 text-xs text-white outline-none focus:border-textGold"
        />
      </div>

      {/* Internal Workshop Notes */}
      <div>
        <label className="block text-[10px] uppercase tracking-[0.14em] text-white/50 mb-1.5">
          Internal Workshop Notes
        </label>
        <textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add pricing details, measurement notes, or customer requirements..."
          className="w-full resize-y rounded border border-white/15 bg-[#141414] p-3 text-xs text-white outline-none placeholder:text-white/30 focus:border-textGold"
        />
      </div>

      {error && (
        <p className="rounded bg-red-500/10 p-2 text-xs text-red-300">{error}</p>
      )}

      {saved && (
        <p className="flex items-center gap-1.5 rounded bg-emerald-500/10 p-2 text-xs text-emerald-300">
          <Check size={14} /> Changes saved successfully!
        </p>
      )}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full border border-textGold bg-textGold/20 px-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-textGold transition hover:bg-textGold hover:text-black disabled:cursor-wait"
      >
        {saving ? (
          <>
            <LoaderCircle size={14} className="animate-spin" /> Saving...
          </>
        ) : (
          <>
            <Save size={14} /> Update Lead
          </>
        )}
      </button>
    </div>
  );
}
