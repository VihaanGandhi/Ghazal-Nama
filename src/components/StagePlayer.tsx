"use client";

import { formatTime, usePlayer } from "@/context/PlayerContext";
import type { Ghazal } from "@/lib/types";
import { recordingOf, singerOf, poetOf, albumOf } from "@/lib/catalog";
import { classNames } from "@/lib/utils";
import { CoverArt } from "./CoverArt";

/**
 * The stage: a large, tactile transport for a single recording.
 * The actual frame lives in the dock (one player, site-wide), so the stage
 * mirrors its state and can raise the dock into theatre view.
 */
export function StagePlayer({
  ghazal,
  queueIds,
  className = "",
}: {
  ghazal: Ghazal;
  queueIds?: string[];
  className?: string;
}) {
  const {
    play,
    toggle,
    current,
    status,
    progress,
    duration,
    expanded,
    setExpanded,
    needsGesture,
  } = usePlayer();

  const recording = recordingOf(ghazal);
  const singer = singerOf(ghazal);
  const poet = poetOf(ghazal);
  const album = albumOf(ghazal);
  const isCurrent = current?.id === ghazal.id;
  const isPlaying = isCurrent && status === "playing";
  const pct = isCurrent && duration ? (progress / duration) * 100 : 0;

  if (!recording) {
    return (
      <div className={classNames("panel p-8", className)}>
        <p className="kicker mb-4 text-rose">Not yet in the listening room</p>
        <p className="display text-3xl text-bone">{ghazal.title}</p>
        <p className="lede mt-3 max-w-md text-lg">
          This recording is catalogued, but we could not confirm a source we are willing to
          point at. Nothing invented: search for it instead.
        </p>
        <a
          className="btn btn-ghost mt-6"
          target="_blank"
          rel="noreferrer"
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
            `${ghazal.title} ${singer?.name ?? ""} ghazal`
          )}`}
        >
          Search YouTube
        </a>
      </div>
    );
  }

  return (
    <div className={classNames("panel relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0 bg-lamp-glow opacity-60" />

      <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
        <div className="relative w-28 shrink-0 sm:w-36">
          <div className={classNames(isPlaying && "animate-platter")}>
            <CoverArt ghazal={ghazal} className="aspect-square w-full" />
          </div>
          <button
            type="button"
            aria-label={isPlaying ? `Pause ${ghazal.title}` : `Play ${ghazal.title}`}
            onClick={() => (isCurrent ? toggle() : play(ghazal, queueIds ? (queueIds as any) : undefined))}
            className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-ember text-[#1a1206] shadow-glow transition-transform hover:scale-105"
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M8 5h3v14H8V5Zm5 0h3v14h-3V5Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-[1px]" fill="currentColor" aria-hidden>
                <path d="M8 5.2v13.6L19 12 8 5.2Z" />
              </svg>
            )}
          </button>
        </div>

        <div className="min-w-0 flex-1">
          <p className="kicker mb-2">{isPlaying ? "Now playing" : "In the listening room"}</p>
          <h2 className="display text-3xl text-bone sm:text-4xl">{ghazal.title}</h2>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
            {singer?.name}
            {poet ? ` · words by ${poet.name}` : ""}
            {album ? ` · ${album.title}` : ""}
          </p>

          {isCurrent && (
            <div className="mt-5 flex items-center gap-3">
              <span className="w-10 font-mono text-[10px] tabular-nums text-bone-faint">
                {formatTime(progress)}
              </span>
              <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-bone/15">
                <span
                  className="absolute inset-y-0 left-0 bg-ember transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </span>
              <span className="w-10 text-right font-mono text-[10px] tabular-nums text-bone-faint">
                {duration ? formatTime(duration) : ghazal.duration ?? "—"}
              </span>
            </div>
          )}

          {needsGesture && isCurrent && (
            <p className="mt-4 font-mono text-[10px] uppercase tracking-wideish text-ember-soft">
              Your browser wants one tap inside the frame — press the picture in the dock.
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Hide the queue" : "Watch in theatre"}
            </button>
            <a
              className="btn btn-line"
              href={`https://www.youtube.com/watch?v=${recording.youtubeId}`}
              target="_blank"
              rel="noreferrer"
            >
              Source · {recording.source}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
