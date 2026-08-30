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
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#282828] bg-[#181818]/98 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1db954]/70 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1db954]" />
            </span>
            <p className="font-mono text-[10px] tracking-[0.28em] text-[#b3b3b3]">
              GHAZAL NAMA RADIO · AWAITING SELECTION
            </p>
          </div>
          <p className="hidden font-display italic text-[#a0a0a0] sm:block">
            Choose a ghazal. The night will keep it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#282828] bg-[#181818]/98 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-3 py-2.5 sm:gap-4 sm:px-4">
        {/* Album art */}
        <div className="hidden h-14 w-14 shrink-0 overflow-hidden rounded-sm shadow-lg sm:block">
          <CoverArt ghazal={ghazal} className="h-14 w-14 rounded-sm" />
        </div>

        {/* Track info */}
        <div className="min-w-0 flex-1">
          <Link
            href={`/ghazals/${ghazal.slug}`}
            className="block truncate font-display text-base font-medium leading-tight text-[#e8e6e3] hover:underline"
          >
            {ghazal.title}
          </Link>
          <p className="truncate font-mono text-[10px] tracking-[0.12em] text-[#b3b3b3]">
            {singer?.name ?? "Archive"}
            {ghazal.duration ? `  ·  ${ghazal.duration}` : ""}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Spotify link */}
          <a
            href={ghazalListenUrl(ghazal, singer?.name)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-[#282828] px-3 font-mono text-[10px] tracking-[0.15em] text-[#b3b3b3] transition hover:border-[#1db954] hover:text-[#1db954]"
          >
            <SpotifyMark className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">SPOTIFY</span>
          </a>

          {/* Play controls */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center text-[#b3b3b3] hover:text-[#e8e6e3]"
              aria-label="Previous"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
                <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H2.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h.6z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setCurrent(ghazal)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e8e6e3] text-[#0a0a0f] transition hover:scale-105"
              aria-label="Play"
            >
              <svg viewBox="0 0 16 16" className="h-5 w-5 translate-x-[1px]" fill="currentColor">
                <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z" />
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center text-[#b3b3b3] hover:text-[#e8e6e3]"
              aria-label="Next"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
                <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-.6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
