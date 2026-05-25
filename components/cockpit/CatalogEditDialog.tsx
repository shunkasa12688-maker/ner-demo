"use client";

import { useState } from "react";
import { X } from "@phosphor-icons/react";
import type { CatalogEntry } from "@/lib/types";

export function CatalogEditDialog({
  entry,
  onClose,
  onSave,
}: {
  entry: CatalogEntry;
  onClose: () => void;
  onSave: (delta: Partial<Omit<CatalogEntry, "kind">>) => Promise<void> | void;
}) {
  const [title, setTitle] = useState(entry.title);
  const [blurb, setBlurb] = useState(entry.blurb);
  const [whyDefault, setWhyDefault] = useState(entry.whyDefault);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await onSave({ title, blurb, whyDefault });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-surface w-full max-w-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between border-b border-bi-border p-4">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-bi-text-dim">
              Editing catalog entry
            </div>
            <div className="text-base font-semibold">{entry.title}</div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-bi-text-dim transition hover:bg-bi-surface-hi hover:text-bi-text"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <Field label="Title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-bi-border bg-bi-surface-hi px-3 py-2 text-sm text-bi-text outline-none focus:border-bi-accent"
            />
          </Field>
          <Field label="Blurb (shown on catalog card)">
            <textarea
              value={blurb}
              onChange={(e) => setBlurb(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-md border border-bi-border bg-bi-surface-hi px-3 py-2 text-sm text-bi-text outline-none focus:border-bi-accent"
            />
          </Field>
          <Field label='"Why" (shown in reasoning trace + fan page caption)'>
            <textarea
              value={whyDefault}
              onChange={(e) => setWhyDefault(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-md border border-bi-border bg-bi-surface-hi px-3 py-2 text-sm text-bi-text outline-none focus:border-bi-accent"
            />
            <div className="mt-1 text-[10px] text-bi-text-dim">
              Use <code className="font-mono">&#123;town&#125;</code> for the
              event-invite entry to substitute the segment&apos;s cluster town
              at runtime.
            </div>
          </Field>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-bi-border p-4">
          <button
            onClick={onClose}
            disabled={saving}
            className="rounded-md border border-bi-border bg-bi-surface-hi px-3 py-1.5 text-sm text-bi-text-dim transition hover:text-bi-text"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-md bg-ner-red px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-ner-red-soft disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-[11px] uppercase tracking-widest text-bi-text-dim">
        {label}
      </div>
      {children}
    </label>
  );
}
