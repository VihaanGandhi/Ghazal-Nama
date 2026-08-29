"use client";

import { usePlayer } from "@/context/PlayerContext";
import type { Ghazal } from "@/lib/types";
import { ghazalListenUrl } from "@/lib/spotify";
import { singerOf } from "@/lib/catalog";

export function PlayButton({
  ghazal,
  className = "h-9 w-9",
  openSpotify = false,
}: {
  ghazal: Ghazal;
  className?: string;
  openSpotify?: boolean;
}) {
  const { setCurrent } = usePlayer();
  const singer = singerOf(ghazal);

  return (
    <button
      type="button"
      aria-label={`Play ${ghazal.title}`}
      onClick={() => {
        setCurrent(ghazal);
        if (openSpotify) {
          window.open(ghazalListenUrl(ghazal, singer?.name), "_blank", "noreferrer");
        }
      }}
      className={`inline-flex items-center justify-center rounded-full border border-burgundy/50 text-burgundy transition hover:bg-burgundy hover:text-ivory ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 translate-x-[1px]" fill="currentColor">
        <path d="M8 5.5v13l11-6.5L8 5.5Z" />
      </svg>
    </button>
  );
}
