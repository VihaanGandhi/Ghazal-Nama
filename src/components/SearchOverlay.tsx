"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { searchCatalog } from "@/lib/catalog";
import { recordings } from "@/data/recordings";
import { classNames } from "@/lib/utils";

type Hit = { kind: string; href: string; title: string; meta: string; playable?: boolean };

export function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (event.key === "Escape") close();
    }
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-search-open]")) {
        event.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, [close]);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 40);
  }, [open]);

  const hits = useMemo<Hit[]>(() => {
    const result = searchCatalog(query);
    const out: Hit[] = [];
    result.ghazals.slice(0, 7).forEach((g) =>
      out.push({
        kind: "recording",
        href: `/ghazals/${g.slug}`,
        title: g.title,
        meta: recordings[g.id] ? "in the listening room" : "catalogued",
        playable: Boolean(recordings[g.id]),
      })
    );
    result.singers.slice(0, 3).forEach((s) =>
      out.push({ kind: "voice", href: `/singers/${s.slug}`, title: s.name, meta: s.honorific ?? "" })
    );
    result.poets.slice(0, 3).forEach((p) =>
      out.push({ kind: "poet", href: `/poets/${p.slug}`, title: p.name, meta: p.years ?? "" })
    );
    result.albums.slice(0, 3).forEach((a) =>
      out.push({ kind: "album", href: `/albums/${a.slug}`, title: a.title, meta: a.year ? String(a.year) : "" })
    );
    return out;
  }, [query]);

  useEffect(() => setCursor(0), [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]">
      <button
        type="button"
        aria-label="Close search"
        className="absolute inset-0 cursor-default bg-night/85 backdrop-blur-md"
        onClick={close}
      />
      <div className="panel-raised relative w-full max-w-2xl overflow-hidden shadow-lift">
        <div className="flex items-center gap-3 border-b border-bone/10 px-5 py-4">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-ember" fill="currentColor" aria-hidden>
            <path d="M10.5 3a7.5 7.5 0 1 1-4.6 13.4l-3 3-1.4-1.4 3-3A7.5 7.5 0 0 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setCursor((c) => Math.min(c + 1, hits.length - 1));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setCursor((c) => Math.max(c - 1, 0));
              }
              if (e.key === "Enter" && hits[cursor]) {
                router.push(hits[cursor].href);
                close();
              }
            }}
            placeholder="Search a ghazal, a voice, a poet…"
            className="w-full bg-transparent font-display text-2xl text-bone outline-none placeholder:text-bone-faint"
          />
          <kbd className="border border-bone/15 px-2 py-1 font-mono text-[9px] text-bone-faint">esc</kbd>
        </div>

        <div className="max-h-[54vh] overflow-y-auto py-2">
          {hits.length === 0 ? (
            <p className="px-5 py-8 text-center lede text-lg">
              {query
                ? "Nothing in the archive answers to that."
                : "Try “Ranjish”, “Faiz”, “Begum Akhtar” or “1970s”."}
            </p>
          ) : (
            <ul>
              {hits.map((hit, i) => (
                <li key={`${hit.kind}-${hit.href}-${i}`}>
                  <Link
                    href={hit.href}
                    onClick={close}
                    onMouseEnter={() => setCursor(i)}
                    className={classNames(
                      "flex items-center justify-between gap-4 px-5 py-2.5 transition-colors",
                      i === cursor ? "bg-ember/10" : "hover:bg-bone/5"
                    )}
                  >
                    <span className="flex min-w-0 items-baseline gap-3">
                      <span className="w-16 shrink-0 font-mono text-[9px] uppercase tracking-wideish text-bone-faint">
                        {hit.kind}
                      </span>
                      <span className="truncate font-display text-lg text-bone">{hit.title}</span>
                    </span>
                    <span
                      className={classNames(
                        "shrink-0 font-mono text-[10px] uppercase tracking-wideish",
                        hit.playable ? "text-ember" : "text-bone-faint"
                      )}
                    >
                      {hit.meta}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
