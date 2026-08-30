"use client";

import { usePlayer } from "@/context/PlayerContext";
import { recordings } from "@/data/recordings";
import { getGhazalById } from "@/lib/catalog";
import { classNames } from "@/lib/utils";

export function PlayChip({
  ghazalId,
  queueIds,
  className = "",
  size = "md",
}: {
  ghazalId: string;
  queueIds?: string[];
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const { play, current, status, toggle } = usePlayer();
  const ghazal = getGhazalById(ghazalId);
  if (!ghazal) return null;

  const playable = Boolean(recordings[ghazalId]);
  const isCurrent = current?.id === ghazalId;
  const isPlaying = isCurrent && status === "playing";
  const dims = size === "sm" ? "h-9 w-9" : size === "lg" ? "h-16 w-16" : "h-11 w-11";

  return (
    <button
      type="button"
      data-active={isCurrent}
      data-muted={!playable}
      aria-label={playable ? `Play ${ghazal.title}` : `No confirmed recording of ${ghazal.title}`}
      title={playable ? "Play in the listening room" : "No confirmed recording yet"}
      className={classNames("play-chip shrink-0", dims, className)}
      onClick={() => {
        if (!playable) {
          // Still select it, so the dock can explain and offer a search.
          play(ghazal, queueIds?.map((id) => getGhazalById(id)).filter(Boolean) as any);
          return;
        }
        if (isCurrent) {
          toggle();
          return;
        }
        const queue = (queueIds ?? [ghazalId])
          .map((id) => getGhazalById(id))
          .filter((g): g is NonNullable<typeof g> => Boolean(g));
        play(ghazal, queue.length ? queue : [ghazal]);
      }}
    >
      {isPlaying ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="M8 5h3v14H8V5Zm5 0h3v14h-3V5Z" />
        </svg>
      ) : playable ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-[1px]" fill="currentColor" aria-hidden>
          <path d="M8 5.2v13.6L19 12 8 5.2Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4.5 4.5" />
        </svg>
      )}
    </button>
  );
}
