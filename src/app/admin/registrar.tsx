"use client";

import { useEffect, useState } from "react";
import { classNames } from "@/lib/utils";
import { getSingers } from "@/lib/catalog";

type Entry = {
  id: string;
  title: string;
  singer: string;
  poet?: string;
  year?: string;
  source?: string;
  note?: string;
  addedAt: string;
};

const KEY = "ghazal-nama:proposals";

export function Registrar() {
  const singers = getSingers();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [form, setForm] = useState({ title: "", singer: singers[0]?.id ?? "", poet: "", year: "", source: "", note: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setEntries(JSON.parse(raw) as Entry[]);
    } catch {
      /* nothing stored yet */
    }
  }, []);

  const persist = (next: Entry[]) => {
    setEntries(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    const entry: Entry = {
      id: `proposal-${Date.now()}`,
      title: form.title.trim(),
      singer: form.singer,
      poet: form.poet.trim() || undefined,
      year: form.year.trim() || undefined,
      source: form.source.trim() || undefined,
      note: form.note.trim() || undefined,
      addedAt: new Date().toISOString(),
    };
    persist([entry, ...entries]);
    setForm({ ...form, title: "", poet: "", year: "", source: "", note: "" });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2600);
  };

  const field = "w-full border border-bone/12 bg-night-100 px-4 py-3 text-bone outline-none transition-colors focus:border-ember/50";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={submit} className="panel space-y-4 p-6">
        <label className="block">
          <span className="kicker mb-2 block">Title</span>
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Ranjish Hi Sahi"
            className={classNames(field, "font-display text-xl")}
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="kicker mb-2 block">Voice</span>
            <select
              value={form.singer}
              onChange={(e) => setForm({ ...form, singer: e.target.value })}
              className={classNames(field, "font-mono text-xs uppercase tracking-wideish")}
            >
              {singers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
              <option value="unknown">Unknown</option>
            </select>
          </label>
          <label className="block">
            <span className="kicker mb-2 block">Poet</span>
            <input
              value={form.poet}
              onChange={(e) => setForm({ ...form, poet: e.target.value })}
              placeholder="Ahmad Faraz"
              className={field}
            />
          </label>
          <label className="block">
            <span className="kicker mb-2 block">Year</span>
            <input
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              placeholder="1978"
              className={field}
            />
          </label>
          <label className="block">
            <span className="kicker mb-2 block">Source</span>
            <input
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
              placeholder="EMI Pakistan, Greatest Ghazals"
              className={field}
            />
          </label>
        </div>

        <label className="block">
          <span className="kicker mb-2 block">Note</span>
          <textarea
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            rows={3}
            placeholder="What makes this the recording worth keeping?"
            className={classNames(field, "resize-none")}
          />
        </label>

        <div className="flex items-center gap-4 pt-2">
          <button type="submit" className="btn btn-ember">
            Add to the ledger
          </button>
          {saved && (
            <span className="font-mono text-[10px] uppercase tracking-wideish text-jade">
              kept in this browser
            </span>
          )}
        </div>
      </form>

      <div>
        <p className="kicker mb-4">Proposed ({entries.length})</p>
        {entries.length === 0 ? (
          <p className="panel p-6 lede text-lg">
            Nothing proposed yet. The archive already holds two hundred.
          </p>
        ) : (
          <ul className="space-y-3">
            {entries.map((entry) => (
              <li key={entry.id} className="panel p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="display text-xl text-bone">{entry.title}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
                      {entry.singer.replace(/-/g, " ")}
                      {entry.poet ? ` · ${entry.poet}` : ""}
                      {entry.year ? ` · ${entry.year}` : ""}
                    </p>
                    {entry.source && (
                      <p className="mt-2 text-sm text-bone-mute">Source: {entry.source}</p>
                    )}
                    {entry.note && <p className="mt-2 text-sm text-bone-mute">{entry.note}</p>}
                  </div>
                  <button
                    type="button"
                    aria-label="Remove"
                    className="icon-btn shrink-0"
                    onClick={() => persist(entries.filter((e) => e.id !== entry.id))}
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                      <path d="M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4 6.4 19 5 17.6 10.6 12 5 6.4 6.4 5Z" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
