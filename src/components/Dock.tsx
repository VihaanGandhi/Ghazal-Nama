"use client";

import { useEffect, useState } from "react";
import { HOST_ID, formatTime, usePlayer } from "@/context/PlayerContext";
import { classNames } from "@/lib/utils";

function Icon({ name, className = "" }: { name: "play" | "pause" | "next" | "prev" | "mute" | "sound"; className?: string }) {
  const common = { fill: "currentColor", className };
  switch (name) {
    case "play":
      return (
        <svg viewBox="0 0 16 16" aria-hidden {...common}>
          <path d="M3 1.6 14 8 3 14.4z" />
        </svg>
      );
    case "pause":
      return (
        <svg viewBox="0 0 16 16" aria-hidden {...common}>
          <path d="M3.5 2h3v12h-3zM9.5 2h3v12h-3z" />
        </svg>
      );
    case "next":
      return (
        <svg viewBox="0 0 16 16" aria-hidden {...common}>
          <path d="M2 2.4 10 8l-8 5.6zM11.5 2H14v12h-2.5z" />
        </svg>
      );
    case "prev":
      return (
        <svg viewBox="0 0 16 16" aria-hidden {...common}>
          <path d="M14 2.4 6 8l8 5.6zM2 2h2.5v12H2z" />
        </svg>
      );
    case "mute":
      return (
        <svg viewBox="0 0 16 16" aria-hidden {...common}>
          <path d="M8 2 4.5 5H2v6h2.5L8 14zM10.6 5.9 12 4.5l1.4 1.4-1.4 1.4 1.4 1.4L12 10.1l-1.4-1.4-1.4 1.4-1.4-1.4 1.4-1.4z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 16 16" aria-hidden {...common}>
          <path d="M8 2 4.5 5H2v6h2.5L8 14zM11 5.2c1 .8 1 4.8 0 5.6l-.9-1c.5-.6.5-3 0-3.6zM13 3.4c1.9 1.6 1.9 7.6 0 9.2l-.9-1c1.3-1.3 1.3-5.9 0-7.2z" />
        </svg>
      );
  }
}

export function Dock() {
  const {
    current,
    status,
    progress,
    duration,
    muted,
    needsGesture,
    attachHost,
    toggle,
    next,
    prev,
    seekTo,
    toggleMute,
  } = usePlayer();

  const [scrub, setScrub] = useState<number | null>(null);
  const isPlaying = status === "playing";
  const pct = duration > 0 ? ((scrub ?? progress) / duration) * 100 : 0;

  /* The scrub position follows playback until the listener lets go. */
  useEffect(() => {
    if (scrub === null) return;
  }, [scrub]);

  const searchHref = current
    ? `https://www.youtube.com/results?search_query=${encodeURIComponent(
        `${current.title} ${current.singer} ghazal`
      )}`
    : "#";

  /*
   * The bar is always on the page, even with nothing loaded. That is not
   * decoration: the frame has to exist before the first click so the player is
   * already built and warmed when a ghazal is asked for. Mounting it on demand
   * means asking a half-built frame to play, which is how you get silence.
   */
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink bg-paper/95 backdrop-blur-sm">
      <div className="sheet flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:gap-5">
        {/* The frame. Real video, real sound. */}
        <div className="relative h-[52px] w-[92px] shrink-0 overflow-hidden border border-ink bg-ink">
          <div id={HOST_ID} ref={attachHost} className="absolute inset-0" />
          {!isPlaying && (
            <button
              type="button"
              onClick={toggle}
              aria-label="Play"
              className="absolute inset-0 flex items-center justify-center bg-ink/45 text-paper transition-colors hover:bg-ink/20"
            >
              <Icon name="play" className="h-5 w-5 translate-x-[1px]" />
            </button>
          )}
        </div>

        <div className="min-w-0 flex-1">
          {current ? (
            <>
              <p className="truncate font-display text-[17px] leading-tight text-ink">{current.title}</p>
              <p className="truncate font-mono text-[11px] uppercase tracking-[0.14em] text-graphite">
                {current.singer}
                {current.year ? ` · ${current.year}` : ""}
              </p>
            </>
          ) : (
            <p className="font-display text-[17px] leading-tight text-faint">
              Nothing playing — choose a ghazal above
            </p>
          )}

          {current && status === "unavailable" && (
            <p className="mt-1 text-[12px] text-accent">
              No verified recording for this one —{" "}
              <a className="underline underline-offset-2" href={searchHref} target="_blank" rel="noreferrer">
                search it on YouTube
              </a>
              .
            </p>
          )}
          {current && needsGesture && (
            <p className="mt-1 text-[12px] text-accent">
              Your browser held the sound back — press play once more.
            </p>
          )}
        </div>

        {/* Transport */}
        <div className="flex items-center gap-4 sm:w-[19rem]">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={prev}
              disabled={!current}
              aria-label="Previous"
              className="p-2 text-graphite transition-colors hover:text-accent disabled:opacity-30 disabled:hover:text-graphite"
            >
              <Icon name="prev" className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={toggle}
              disabled={!current}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="border border-ink p-2.5 text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
            >
              <Icon name={isPlaying ? "pause" : "play"} className={classNames("h-3.5 w-3.5", !isPlaying && "translate-x-[1px]")} />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!current}
              aria-label="Next"
              className="p-2 text-graphite transition-colors hover:text-accent disabled:opacity-30 disabled:hover:text-graphite"
            >
              <Icon name="next" className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={toggleMute}
              disabled={!current}
              aria-label={muted ? "Unmute" : "Mute"}
              className="p-2 text-graphite transition-colors hover:text-accent disabled:opacity-30 disabled:hover:text-graphite"
            >
              <Icon name={muted ? "mute" : "sound"} className="h-4 w-4" />
            </button>
          </div>

          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="font-mono text-[10px] tabular-nums text-faint">{formatTime(scrub ?? progress)}</span>
            <input
              type="range"
              min={0}
              max={Math.max(duration, 1)}
              step={1}
              value={scrub ?? progress}
              onChange={(e) => setScrub(Number(e.target.value))}
              onPointerUp={() => {
                if (scrub !== null) seekTo(scrub);
                setScrub(null);
              }}
              onKeyUp={() => {
                if (scrub !== null) seekTo(scrub);
                setScrub(null);
              }}
              aria-label="Seek"
              className="h-1 min-w-0 flex-1 cursor-pointer appearance-none bg-rule accent-[#bf3b21]"
            />
            <span className="font-mono text-[10px] tabular-nums text-faint">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
