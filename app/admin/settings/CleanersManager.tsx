"use client";

import { useState } from "react";
import { Plus, X, Users, Check } from "lucide-react";

export function CleanersManager({ initial }: { initial: string[] }) {
  const [names, setNames] = useState<string[]>(initial);
  const [input, setInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function persist(next: string[]) {
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      const res = await fetch("/api/settings/cleaners", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ names: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed");
      setNames(data.cleaners);
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function add() {
    const name = input.trim();
    if (!name) return;
    setInput("");
    persist([...names, name]);
  }

  function remove(i: number) {
    persist(names.filter((_, idx) => idx !== i));
  }

  const capacity = Math.max(1, names.length);

  return (
    <div className="rounded-2xl bg-white ring-1 ring-line p-5 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-ink-950">
          <Users className="h-4 w-4 text-ink-700" /> Your cleaners
        </div>
        <span className="inline-flex items-center rounded-full bg-grass-500/15 text-grass-700 text-xs font-bold px-2.5 py-1">
          {capacity} per window
        </span>
      </div>

      <ul className="mt-4 space-y-2">
        {names.map((n, i) => (
          <li
            key={`${n}-${i}`}
            className="flex items-center justify-between rounded-xl bg-[var(--surface)] border border-line px-3.5 py-2.5"
          >
            <span className="text-sm font-medium text-ink-950">{n}</span>
            <button
              type="button"
              onClick={() => remove(i)}
              disabled={saving}
              aria-label={`Remove ${n}`}
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-ink-600 hover:bg-ink-100 hover:text-ink-950 cursor-pointer disabled:opacity-40 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </li>
        ))}
        {names.length === 0 && (
          <li className="text-sm text-ink-600 italic px-1">
            No cleaners yet — add at least one (a default of 2 is kept so bookings don&apos;t lock).
          </li>
        )}
      </ul>

      <div className="mt-4 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="Add a cleaner's name"
          className="flex-1 rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink-950 outline-none focus:border-ink-500 focus:ring-2 focus:ring-ink-500/15 transition-colors"
        />
        <button
          type="button"
          onClick={add}
          disabled={saving || !input.trim()}
          className="inline-flex items-center gap-1.5 rounded-xl bg-ink-950 hover:bg-ink-800 disabled:bg-ink-300 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2.5 cursor-pointer transition-colors"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      <div className="mt-3 h-5 text-xs">
        {error ? (
          <span className="text-red-600 font-medium">{error}</span>
        ) : saved ? (
          <span className="inline-flex items-center gap-1 text-grass-700 font-medium">
            <Check className="h-3.5 w-3.5" /> Saved
          </span>
        ) : saving ? (
          <span className="text-ink-600">Saving…</span>
        ) : null}
      </div>
    </div>
  );
}
