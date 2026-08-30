"use client";

import Link from "next/link";
import { usePlayer } from "@/context/PlayerContext";
import { getGhazalById, poetOf, singerOf } from "@/lib/catalog";
import { recordings } from "@/data/recordings";
import type { Ghazal } from "@/lib/types";
import { classNames } from "@/lib/utils";
import { PlayChip } from "./PlayChip";

function NowBars() {
  return (
    <span className="flex h-3 items-end gap-[2px] text-ember">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="eq-bar"
          style={{ animationDelay: `${i * 0.15}s`, height: `${7 + i * 2}px` }}
        />
      ))}
    </span>
  );
}

/**
 * The ledger: every recording as a row, playable in place.
 * Server components hand over ids; the rows resolve themselves here.
 */
export function TrackList({
  ids,
  showPoet = true,
  showYear = true,
  className = "",
}: {
  ids: string[];
  showPoet?: boolean;
  showYear?: boolean;
  className?: string;
}) {
  const { current, status } = usePlayer();
  const items = ids
    .map((id) => getGhazalById(id))
    .filter((g): g is Ghazal => Boolean(g));

  if (!items.length) {
    return (
      <p className="panel p-8 text-center lede text-lg">
        Nothing catalogued here yet.
      </p>
    );
  }

  return (
    <div className={classNames("panel overflow-hidden", className)}>
      <div className="hidden grid-cols-[3rem_3rem_1fr_1fr_6rem_4rem] items-center gap-4 border-b border-bone/10 bg-night-100/60 px-5 py-3 lg:grid">
        <span className="kicker-dim">#</span>
        <span />
        <span className="kicker-dim">Recording</span>
        {showPoet && <span className="kicker-dim">Poet</span>}
        <span className="kicker-dim">Voice</span>
        {showYear && <span className="kicker-dim text-right">Year</span>}
      </div>

      <ul>
        {items.map((ghazal, i) => {
          const singer = singerOf(ghazal);
          const poet = poetOf(ghazal);
          const isCurrent = current?.id === ghazal.id;
          const isPlaying = isCurrent && status === "playing";
          const playable = Boolean(recordings[ghazal.id]);

          return (
            <li key={ghazal.id}>
              <div
                className={classNames(
                  "ledger-row grid grid-cols-[2.25rem_1fr] items-center gap-3 px-4 py-3.5 sm:px-5 lg:grid-cols-[3rem_3rem_1fr_1fr_6rem_4rem] lg:gap-4",
                  isCurrent && "bg-ember/8"
                )}
              >
                <span className="ledger-index hidden font-mono text-[11px] tabular-nums text-bone-faint transition-colors lg:block">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="order-1 flex items-center justify-center lg:order-none">
                  <PlayChip ghazalId={ghazal.id} queueIds={ids} size="sm" />
                </div>

                <div className="order-2 min-w-0 lg:order-none">
                  <Link
                    href={`/ghazals/${ghazal.slug}`}
                    className="flex min-w-0 items-center gap-2"
                  >
                    <span
                      className={classNames(
                        "truncate font-display text-lg leading-tight transition-colors",
                        isCurrent ? "text-ember-soft" : "text-bone hover:text-ember-soft"
                      )}
                    >
                      {ghazal.title}
                    </span>
                    {isPlaying && <NowBars />}
                    {!playable && (
                      <span className="hidden shrink-0 font-mono text-[9px] uppercase tracking-wideish text-bone-faint sm:inline">
                        not in room
                      </span>
                    )}
                  </Link>
                  <p className="truncate font-mono text-[10px] uppercase tracking-wideish text-bone-faint lg:hidden">
                    {singer?.name}
                    {ghazal.year ? ` · ${ghazal.year}` : ""}
                  </p>
                </div>

                {showPoet && (
                  <div className="hidden min-w-0 lg:block">
                    {poet ? (
                      <Link
                        href={`/poets/${poet.slug}`}
                        className="truncate text-sm text-bone-mute transition-colors hover:text-ember-soft"
                      >
                        {poet.name}
                      </Link>
                    ) : (
                      <span className="text-sm text-bone-ghost">—</span>
                    )}
                  </div>
                )}

                <div className="hidden min-w-0 lg:block">
                  {singer ? (
                    <Link
                      href={`/singers/${singer.slug}`}
                      className="truncate text-sm text-bone-mute transition-colors hover:text-ember-soft"
                    >
                      {singer.name}
                    </Link>
                  ) : (
                    <span className="text-sm text-bone-ghost">—</span>
                  )}
                </div>

                {showYear && (
                  <div className="hidden text-right font-mono text-[11px] tabular-nums text-bone-faint lg:block">
                    {ghazal.year ?? ghazal.era ?? "—"}
                  </div>
                )}

                <div className="hidden text-right font-mono text-[11px] tabular-nums text-bone-faint lg:block">
                  {ghazal.duration ?? "—"}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
