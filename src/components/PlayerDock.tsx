"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatTime, HOST_ID, usePlayer } from "@/context/PlayerContext";
import { albumOf, poetOf, recordingOf, singerOf } from "@/lib/catalog";
import { classNames } from "@/lib/utils";

function Bars({ className = "" }: { className?: string }) {
  return (
    <span className={classNames("flex h-4 items-end gap-[2px] text-ember", className)}>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="eq-bar"
          style={{ animationDelay: `${i * 0.13}s`, height: `${8 + (i % 3) * 3}px` }}
        />
      ))}
    </span>
  );
}

function Icon({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    play: <path d="M8 5.2v13.6L19 12 8 5.2Z" />,
    pause: <path d="M8 5h3v14H8V5Zm5 0h3v14h-3V5Z" />,
    next: <path d="M6 5.2v13.6L15 12 6 5.2Zm9 0h2.6v13.6H15V5.2Z" />,
    prev: <path d="M18 5.2v13.6L9 12l9-6.8ZM6.4 5.2H9v13.6H6.4V5.2Z" />,
    close: <path d="M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4 6.4 19 5 17.6 10.6 12 5 6.4 6.4 5Z" />,
    volume: (
      <path d="M4 9.5h3.2L12 5v14l-4.8-4.5H4v-5Zm11.2-.6 1.3-1.3a6 6 0 0 1 0 8.8l-1.3-1.3a4.2 4.2 0 0 0 0-6.2Z" />
    ),
    mute: <path d="M4 9.5h3.2L12 5v14l-4.8-4.5H4v-5Zm11 1.1 1.4-1.4 1.4 1.4 1.4-1.4 1.1 1.1-1.4 1.4 1.4 1.4-1.1 1.1-1.4-1.4-1.4 1.4-1.1-1.1 1.4-1.4-1.4-1.4Z" />,
    expand: <path d="M5 5h6v2H7.8l4 4-1.4 1.4-4-4V12H5V5Zm14 14h-6v-2h3.2l-4-4 1.4-1.4 4 4V12h2v7Z" />,
    collapse: <path d="M11 5v6H5V9h3.2l-4-4L5.6 3.6l4 4V5h1.4Zm2 14v-6h6v2h-3.2l4 4-1.4 1.4-4-4V19H13Z" />,
    search: (
      <path d="M10.5 3a7.5 7.5 0 1 1-4.6 13.4l-3 3-1.4-1.4 3-3A7.5 7.5 0 0 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" />
    ),
    youtube: (
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      {paths[name]}
    </svg>
  );
}

export function PlayerDock() {
  const {
    current,
    queue,
    index,
    status,
    progress,
    duration,
    volume,
    muted,
    expanded,
    needsGesture,
    attachHost,
    toggle,
    next,
    prev,
    seekTo,
    setVolume,
    toggleMute,
    setExpanded,
  } = usePlayer();
  const [hover, setHover] = useState(false);

  const singer = singerOf(current ?? undefined);
  const poet = poetOf(current ?? undefined);
  const album = albumOf(current ?? undefined);
  const recording = recordingOf(current ?? undefined);
  const pct = duration ? Math.min(100, (progress / duration) * 100) : 0;
  const isPlaying = status === "playing";

  /* Space toggles the sitting — unless the visitor is typing somewhere. */
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (event.code !== "Space" || !current) return;
      event.preventDefault();
      toggle();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle, current]);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-bone/10 bg-night/95 backdrop-blur-xl"
      style={{ boxShadow: "0 -18px 60px -24px rgba(0,0,0,0.95)" }}
    >
      {/* expanded: the queue, above the bar */}
      {expanded && queue.length > 0 && (
        <div className="border-b border-bone/10 bg-night-100/95">
          <div className="mx-auto flex max-w-7xl items-start gap-8 px-4 py-5 sm:px-6">
            <div className="min-w-0 flex-1">
              <p className="kicker mb-3">Up next</p>
              <ol className="max-h-56 space-y-1 overflow-y-auto pr-2">
                {queue.map((item, i) => {
                  const active = i === index;
                  return (
                    <li key={`${item.id}-${i}`}>
                      <Link
                        href={`/ghazals/${item.slug}`}
                        className={classNames(
                          "flex items-baseline gap-3 py-1.5 transition-colors",
                          active ? "text-ember-soft" : "text-bone-mute hover:text-bone"
                        )}
                      >
                        <span className="w-6 shrink-0 font-mono text-[10px] text-bone-faint">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="truncate font-display text-lg">{item.title}</span>
                        <span className="truncate font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
                          {singerOf(item)?.name ?? ""}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>
            <div className="hidden w-72 shrink-0 border-l border-bone/10 pl-8 sm:block">
              <p className="kicker mb-3">The room</p>
              <p className="lede text-lg">
                {isPlaying
                  ? "The lamp is lit. Let it run."
                  : "Press play. The archive will carry the rest of the night."}
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
                {queue.length} in the sitting · {index + 1} playing
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-3 sm:gap-5 sm:px-6">
        {/* The frame. Real video, real sound, click it and it plays. */}
        <div className="relative h-[52px] w-[92px] shrink-0 overflow-hidden rounded-[2px] border border-bone/15 bg-black sm:h-[58px] sm:w-[103px]">
          <div id={HOST_ID} ref={attachHost} className="absolute inset-0" />
          {!isPlaying && !needsGesture && (
            <button
              type="button"
              onClick={toggle}
              aria-label="Play"
              className="absolute inset-0 flex items-center justify-center bg-night/55 text-bone transition-colors hover:bg-night/30 hover:text-ember-soft"
            >
              <Icon name="play" className="h-5 w-5 translate-x-[1px]" />
            </button>
          )}
          {needsGesture && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-night/70 px-1 text-center">
              <span className="font-mono text-[8px] uppercase leading-tight tracking-wideish text-ember-soft">
                tap here
              </span>
            </div>
          )}
          {isPlaying && (
            <div className="pointer-events-none absolute bottom-1 left-1">
              <Bars className="h-3" />
            </div>
          )}
        </div>

        {/* Identity + progress */}
        <div className="min-w-0 flex-1">
          {current ? (
            <>
              <div className="flex min-w-0 items-baseline gap-2">
                <Link
                  href={`/ghazals/${current.slug}`}
                  className="truncate font-display text-lg leading-tight text-bone hover:text-ember-soft sm:text-xl"
                >
                  {current.title}
                </Link>
                <span className="hidden shrink-0 truncate font-mono text-[10px] uppercase tracking-wideish text-bone-faint sm:inline">
                  {singer?.name}
                  {poet ? ` · ${poet.name}` : ""}
                  {album ? ` · ${album.title}` : ""}
                </span>
              </div>

              {status === "unavailable" ? (
                <div className="mt-2 flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-wideish text-rose">
                    No confirmed recording in the room
                  </span>
                  <a
                    className="btn btn-line text-ember-soft"
                    target="_blank"
                    rel="noreferrer"
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                      `${current.title} ${singer?.name ?? ""} ghazal`
                    )}`}
                  >
                    Search YouTube
                  </a>
                </div>
              ) : (
                <div
                  className="group mt-2 flex items-center gap-3"
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  <span className="w-9 shrink-0 font-mono text-[10px] tabular-nums text-bone-faint">
                    {formatTime(progress)}
                  </span>
                  <div
                    role="slider"
                    tabIndex={0}
                    aria-label="Seek"
                    aria-valuemin={0}
                    aria-valuemax={Math.round(duration)}
                    aria-valuenow={Math.round(progress)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight") seekTo(progress + 5);
                      if (e.key === "ArrowLeft") seekTo(Math.max(0, progress - 5));
                    }}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const ratio = (e.clientX - rect.left) / rect.width;
                      if (duration) seekTo(ratio * duration);
                    }}
                    className="relative h-4 flex-1 cursor-pointer"
                  >
                    <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-bone/15" />
                    <span
                      className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-ember transition-all"
                      style={{ width: `${pct}%` }}
                    />
                    <span
                      className={classNames(
                        "absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember-soft transition-opacity",
                        hover || isPlaying ? "opacity-100" : "opacity-0"
                      )}
                      style={{ left: `${pct}%` }}
                    />
                  </div>
                  <span className="w-9 shrink-0 text-right font-mono text-[10px] tabular-nums text-bone-faint">
                    {duration ? formatTime(duration) : current.duration ?? "—"}
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
              </span>
              <p className="font-mono text-[10px] uppercase tracking-kicker text-bone-mute">
                The room is open · choose a ghazal
              </p>
            </div>
          )}
        </div>

        {/* Transport */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button type="button" className="icon-btn" onClick={prev} aria-label="Previous">
            <Icon name="prev" className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ember text-[#1a1206] transition-transform hover:scale-105"
          >
            <Icon
              name={isPlaying ? "pause" : "play"}
              className={classNames("h-4 w-4", !isPlaying && "translate-x-[1px]")}
            />
          </button>
          <button type="button" className="icon-btn" onClick={next} aria-label="Next">
            <Icon name="next" className="h-3.5 w-3.5" />
          </button>

          <div className="ml-1 hidden items-center gap-2 md:flex">
            <button
              type="button"
              className="icon-btn"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
            >
              <Icon name={muted || volume === 0 ? "mute" : "volume"} className="h-3.5 w-3.5" />
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={muted ? 0 : volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-label="Volume"
              className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-bone/20 accent-ember"
            />
          </div>

          {current && recording && (
            <a
              className="icon-btn"
              title="Watch the recording on YouTube"
              href={`https://www.youtube.com/watch?v=${recording.youtubeId}`}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="youtube" className="h-4 w-4" />
            </a>
          )}

          <button
            type="button"
            className="icon-btn"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Hide the queue" : "Show the queue"}
          >
            <Icon name={expanded ? "collapse" : "expand"} className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export { Icon };
