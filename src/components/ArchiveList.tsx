"use client";

import Link from "next/link";
import type { Ghazal } from "@/lib/types";
import { albumOf, poetOf, singerOf } from "@/lib/catalog";
import { useExtras } from "@/context/ExtrasContext";
import { padCatalog } from "@/lib/utils";
import { PlayButton } from "./PlayButton";

export function ArchiveList({
  items,
  start = 0,
  showEra = true,
  includeExtras = false,
  extraSingerId,
}: {
  items: Ghazal[];
  start?: number;
  showEra?: boolean;
  includeExtras?: boolean;
  extraSingerId?: string;
}) {
  const { extras } = useExtras();
  const extraItems = includeExtras
    ? extras.filter((g) => (extraSingerId ? g.singer_id === extraSingerId : true))
    : [];
  const rows = [...extraItems, ...items];

  return (
    <div className="border-y border-burgundy/20">
      {rows.map((g, i) => {
        const singer = singerOf(g);
        const poet = poetOf(g);
        const album = albumOf(g);
        return (
          <div
            key={g.id}
            className="archive-row grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-burgundy/10 px-2 py-3 sm:grid-cols-[3rem_1fr_auto] sm:gap-5 sm:px-3"
          >
            <span className="font-mono text-xs text-burgundy/70">{padCatalog(start + i)}</span>
            <div className="min-w-0">
              {g.id.startsWith("local-") ? (
                <p className="font-display text-xl leading-tight sm:text-2xl">{g.title}</p>
              ) : (
              <Link href={`/ghazals/${g.slug}`} className="font-display text-xl leading-tight hover:text-burgundy sm:text-2xl">
                {g.title}
              </Link>
              )}
              <p className="mt-1 truncate font-mono text-[10px] tracking-[0.14em] text-ink-fade">
                {singer ? (
                  <Link href={`/singers/${singer.slug}`} className="hover:text-burgundy">
                    {singer.name}
                  </Link>
                ) : (
                  "—"
                )}
                <span className="mx-2 text-gold/70">·</span>
                {poet ? (
                  <Link href={`/poets/${poet.slug}`} className="hover:text-burgundy">
                    {poet.name}
                  </Link>
                ) : (
                  "Poet unrecorded"
                )}
                {showEra && g.era ? (
                  <>
                    <span className="mx-2 hidden text-gold/70 sm:inline">·</span>
                    <Link href={`/eras/${g.era}`} className="hidden hover:text-burgundy sm:inline">
                      {g.era}
                    </Link>
                  </>
                ) : null}
                {album ? (
                  <>
                    <span className="mx-2 hidden text-gold/70 md:inline">·</span>
                    <span className="hidden md:inline">{album.title}</span>
                  </>
                ) : null}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden font-mono text-[10px] tracking-[0.16em] text-ink-ghost sm:inline">
                {g.duration ?? "—:—"}
              </span>
              <PlayButton ghazal={g} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
