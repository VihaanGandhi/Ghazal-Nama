"use client";

import Link from "next/link";
import { usePlayer } from "@/context/PlayerContext";
import { singerOf } from "@/lib/catalog";
import { ghazalListenUrl } from "@/lib/spotify";
import { CoverArt } from "./CoverArt";
import { SpotifyMark } from "./SpotifyButton";

export function MiniPlayer() {
  const { current, setCurrent } = usePlayer();
  const ghazal = current;
  const singer = ghazal ? singerOf(ghazal) : undefined;

  if (!ghazal) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-burgundy/25 bg-[#2a1c16]/95 text-ivory backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/70 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <p className="font-mono text-[10px] tracking-[0.28em] text-gold-pale">
              GHAZAL NAMA RADIO · AWAITING SELECTION
            </p>
          </div>
          <p className="hidden font-display italic text-ivory/60 sm:block">
            Choose a ghazal. The night will keep it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gold/25 bg-[#2a1c16]/96 text-ivory backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-3 py-2.5 sm:gap-4 sm:px-4">
        <div className="hidden h-12 w-12 shrink-0 overflow-hidden sm:block">
          <CoverArt ghazal={ghazal} className="h-12 w-12" />
        </div>
        <div className="min-w-0 flex-1">
          <Link href={`/ghazals/${ghazal.slug}`} className="block truncate font-display text-lg leading-tight">
            {ghazal.title}
          </Link>
          <p className="truncate font-mono text-[10px] tracking-[0.18em] text-gold-mute">
            {singer?.name ?? "Archive"}
            {ghazal.duration ? `  ·  ${ghazal.duration}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={ghazalListenUrl(ghazal, singer?.name)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 border border-gold/40 px-3 font-mono text-[10px] tracking-[0.2em] text-gold-pale hover:bg-gold/10"
          >
            <SpotifyMark className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">SPOTIFY</span>
          </a>
          <button
            type="button"
            onClick={() => setCurrent(ghazal)}
            className="inline-flex h-10 w-10 items-center justify-center border border-ivory/30 hover:bg-ivory/10"
            aria-label="Selected"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 translate-x-[1px]" fill="currentColor">
              <path d="M8 5.5v13l11-6.5L8 5.5Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
