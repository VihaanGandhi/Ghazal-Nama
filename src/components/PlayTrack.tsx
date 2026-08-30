"use client";

import { usePlayer } from "@/context/PlayerContext";
import type { Track } from "@/lib/types";
import { classNames } from "@/lib/utils";

/** The one button on a song page. Plays it, or pauses it if it is already going. */
export function PlayTrack({ track, queue }: { track: Track; queue: Track[] }) {
  const { current, status, play, toggle } = usePlayer();
  const isCurrent = current?.id === track.id;
  const isPlaying = isCurrent && status === "playing";

  if (!track.videoId) {
    return (
      <a
        className="btn"
        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
          `${track.title} ${track.singer} ghazal`
        )}`}
        target="_blank"
        rel="noreferrer"
      >
        No verified recording — search it
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => (isCurrent ? toggle() : play(track, queue))}
      className={classNames("btn btn-accent px-6 py-3")}
    >
      <svg viewBox="0 0 16 16" aria-hidden className="h-3 w-3 translate-x-[1px]" fill="currentColor">
        {isPlaying ? <path d="M3.5 2h3v12h-3zM9.5 2h3v12h-3z" /> : <path d="M3 1.6 14 8 3 14.4z" />}
      </svg>
      {isPlaying ? "Pause" : "Play"}
    </button>
  );
}
