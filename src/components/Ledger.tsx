"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePlayer } from "@/context/PlayerContext";
import type { Track, Voice } from "@/lib/types";
import { classNames } from "@/lib/utils";

export function Ledger({ tracks, voices }: { tracks: Track[]; voices: Voice[] }) {
  const { current, status, play } = usePlayer();
  const [query, setQuery] = useState("");
  const [voice, setVoice] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tracks.filter((t) => {
      if (voice && t.singerSlug !== voice) return false;
      if (!q) return true;
      return (
        t.title.toLowerCase().includes(q) ||
        t.singer.toLowerCase().includes(q) ||
        (t.poet?.toLowerCase().includes(q) ?? false) ||
        (t.year ? String(t.year).includes(q) : false)
      );
    });
  }, [tracks, query, voice]);

  return (
    <div>
      {/* ————— Find ————— */}
      <div className="border-b border-ink pb-6 pt-8 sm:pb-8">
        <label htmlFor="find" className="kicker mb-3 block">
          Find a ghazal
        </label>
        <input
          id="find"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Title, voice, poet or year"
          className="field"
        />

        <div className="-mx-1 mt-5 flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => setVoice("")}
            className={classNames("chip", !voice && "chip-on")}
          >
            All {tracks.length}
          </button>
          {voices.map((v) => (
            <button
              key={v.slug}
              type="button"
              onClick={() => setVoice(voice === v.slug ? "" : v.slug)}
              className={classNames("chip", voice === v.slug && "chip-on")}
            >
              {v.name}
              <span className="ml-1.5 text-faint">{v.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ————— The ledger ————— */}
      <p className="kicker border-b border-rule py-3">
        {rows.length === tracks.length
          ? `${tracks.length} ghazals`
          : `${rows.length} of ${tracks.length}`}
      </p>

      <ul>
        {rows.map((track, i) => {
          const isCurrent = current?.id === track.id;
          return (
            <li key={track.id}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => play(track, rows)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    play(track, rows);
                  }
                }}
                className={classNames("group row cursor-pointer px-1 sm:px-2", isCurrent && "bg-parch/60")}
              >
                <span className="row-index">{String(i + 1).padStart(3, "0")}</span>

                <span className="flex h-4 items-center">
                  {isCurrent ? (
                    <span className={classNames("bars", status !== "playing" && "bars-still")} aria-label="Now playing">
                      <span />
                      <span />
                      <span />
                    </span>
                  ) : (
                    <svg viewBox="0 0 16 16" aria-hidden className="h-2.5 w-2.5 text-faint transition-colors group-hover:text-accent" fill="currentColor">
                      <path d="M3 1.6 14 8 3 14.4z" />
                    </svg>
                  )}
                </span>

                <span className="min-w-0">
                  <span className={classNames("row-title block truncate", isCurrent && "text-accent")}>
                    {track.title}
                  </span>
                  <span className="row-meta mt-0.5 block sm:hidden">
                    {track.singer}
                    {track.year ? ` · ${track.year}` : ""}
                  </span>
                </span>

                <span className="row-meta hidden truncate sm:block">{track.singer}</span>
                <span className="row-year hidden sm:block">{track.year ?? ""}</span>

                <Link
                  href={`/song/${track.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="justify-self-end font-mono text-[13px] leading-none text-faint transition-colors hover:text-accent"
                  aria-label={`Open ${track.title}`}
                >
                  ↗
                </Link>
              </div>
            </li>
          );
        })}
      </ul>

      {rows.length === 0 && (
        <p className="py-16 text-center font-display text-xl text-graphite">
          Nothing answers to that. Try another word.
        </p>
      )}
    </div>
  );
}
