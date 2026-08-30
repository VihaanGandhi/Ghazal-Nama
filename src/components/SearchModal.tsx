"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { searchCatalog } from "@/lib/catalog";
import { singerOf, poetOf } from "@/lib/catalog";

export function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchCatalog(q), [q]);

  useEffect(() => {
    if (open) {
      setTimeout(() => input.current?.focus(), 40);
    } else {
      setQ("");
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]">
      <button
        type="button"
        className="absolute inset-0 bg-[#0a0a0f]/70 backdrop-blur-[2px]"
        aria-label="Close search"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl border border-[#2a2a35] bg-[#121218] shadow-2xl">
        <div className="flex items-center gap-3 border-b border-[#2a2a35] px-4 py-3">
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#b08d3e]">SEARCH</span>
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ghazal, singer, poet, album, era, mood…"
            className="w-full bg-transparent font-display text-xl italic text-[#e8e6e3] outline-none placeholder:text-[#a09a8e]/60"
          />
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-4">
          {!q.trim() ? (
            <p className="font-display italic text-[#a09a8e]">
              Try "Ranjish", "Faraz", "Mehfil", "1970s".
            </p>
          ) : (
            <div className="space-y-6">
              {results.ghazals.length > 0 && (
                <Group title="Ghazals">
                  {results.ghazals.slice(0, 10).map((g) => {
                    const singer = singerOf(g);
                    const poet = poetOf(g);
                    return (
                      <Link
                        key={g.id}
                        href={`/ghazals/${g.slug}`}
                        onClick={onClose}
                        className="block border-b border-[#2a2a35]/50 py-2.5 hover:bg-[#1a1a24]"
                      >
                        <p className="font-display text-xl leading-tight">{g.title}</p>
                        <p className="mt-0.5 font-mono text-[10px] tracking-[0.16em] text-[#a09a8e]">
                          {singer?.name}
                          {poet ? `  ·  ${poet.name}` : ""}
                        </p>
                      </Link>
                    );
                  })}
                </Group>
              )}
              {results.singers.length > 0 && (
                <Group title="Singers">
                  {results.singers.map((s) => (
                    <Link
                      key={s.id}
                      href={`/singers/${s.slug}`}
                      onClick={onClose}
                      className="block py-1.5 font-display text-lg hover:text-[#b08d3e]"
                    >
                      {s.name}
                    </Link>
                  ))}
                </Group>
              )}
              {results.poets.length > 0 && (
                <Group title="Poets">
                  {results.poets.map((p) => (
                    <Link
                      key={p.id}
                      href={`/poets/${p.slug}`}
                      onClick={onClose}
                      className="block py-1.5 font-display text-lg hover:text-[#b08d3e]"
                    >
                      {p.name}
                    </Link>
                  ))}
                </Group>
              )}
              {results.ghazals.length + results.singers.length + results.poets.length === 0 && (
                <p className="font-display italic text-[#a09a8e]">Nothing in the ledger for that query.</p>
              )}
            </div>
          )}
          <div className="mt-6 text-right">
            <Link
              href={`/search${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`}
              onClick={onClose}
              className="kicker hover:text-[#e8e6e3]"
            >
              Open full search →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <p className="kicker mb-2">{title}</p>
      {children}
    </section>
  );
}
