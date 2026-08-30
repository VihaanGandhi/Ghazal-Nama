"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Track } from "@/lib/types";

/* global YT */

export type PlaybackStatus =
  | "idle"
  | "loading"
  | "playing"
  | "paused"
  | "unavailable";

type PlayerValue = {
  current: Track | null;
  queue: Track[];
  index: number;
  status: PlaybackStatus;
  progress: number;
  duration: number;
  volume: number;
  muted: boolean;
  expanded: boolean;
  needsGesture: boolean;
  attachHost: (el: HTMLDivElement | null) => void;
  play: (track: Track, queue?: Track[]) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (value: number) => void;
  toggleMute: () => void;
  setExpanded: (open: boolean) => void;
  stop: () => void;
};

const PlayerContext = createContext<PlayerValue | null>(null);

const STORAGE_KEY = "ghazal-nama:session:v2";
const HOST_ID = "ghazal-nama-yt-host";

/** Loads the YouTube IFrame API exactly once per page life. */
let apiPromise: Promise<void> | null = null;
function loadYouTubeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    document.head.appendChild(tag);
  });
  return apiPromise;
}

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = useState<Track[]>([]);
  const [index, setIndex] = useState(-1);
  const [status, setStatus] = useState<PlaybackStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(80);
  const [muted, setMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);

  const playerRef = useRef<any>(null);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const pollRef = useRef<number | null>(null);
  const gestureTimer = useRef<number | null>(null);
  const restored = useRef(false);
  /** Video id currently loaded inside the frame, so we never reload needlessly. */
  const loadedId = useRef<string | null>(null);
  /** Set when a session is restored: the video is armed, not started. */
  const skipNextLoad = useRef(false);
  // Mirrors the current queue/index for callbacks that cannot re-bind cheaply.
  const live = useRef({ queue, index });
  live.current = { queue, index };

  const current = index >= 0 ? queue[index] ?? null : null;
  // The recording travels with the track, so the browser never needs the catalogue.
  const currentRecording = current?.videoId ? { youtubeId: current.videoId } : undefined;

  const startPolling = useCallback(() => {
    if (pollRef.current) return;
    pollRef.current = window.setInterval(() => {
      const player = playerRef.current;
      if (!player?.getCurrentTime) return;
      const time = player.getCurrentTime?.() ?? 0;
      const total = player.getDuration?.() ?? 0;
      setProgress(time);
      if (total) setDuration(total);
    }, 400);
  }, []);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  /* Create the player once the host element exists. */
  const createPlayer = useCallback(() => {
    const host = hostRef.current;
    if (!host || playerRef.current) return;
    loadYouTubeApi().then(() => {
      if (!window.YT?.Player || playerRef.current || !host.isConnected) return;
      playerRef.current = new window.YT.Player(host, {
        width: "100%",
        height: "100%",
        playerVars: {
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(volume);
            event.target.unMute?.();
          },
          onStateChange: (event: any) => {
            const state = event.data;
            if (state === 1) {
              setStatus("playing");
              setNeedsGesture(false);
              startPolling();
            } else if (state === 2) {
              setStatus("paused");
              stopPolling();
            } else if (state === 3) {
              setStatus("loading");
            } else if (state === 0) {
              stopPolling();
              const { queue: q, index: i } = live.current;
              if (i >= 0 && i < q.length - 1) {
                setIndex(i + 1);
              } else {
                setStatus("idle");
              }
            }
          },
          onError: () => {
            setStatus("unavailable");
            stopPolling();
          },
        },
      });
    });
  }, [startPolling, stopPolling, volume]);

  const attachHost = useCallback(
    (el: HTMLDivElement | null) => {
      hostRef.current = el;
      if (el) createPlayer();
    },
    [createPlayer]
  );

  /* Restore the last sitting (never autoplay — browsers would refuse anyway). */
  useEffect(() => {
    if (restored.current || typeof window === "undefined") return;
    restored.current = true;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        queue?: Track[];
        index?: number;
        volume?: number;
        muted?: boolean;
      };
      if (typeof parsed.volume === "number") setVolumeState(parsed.volume);
      if (typeof parsed.muted === "boolean") setMuted(parsed.muted);
      const restoredQueue = (parsed.queue ?? []).filter(
        (t): t is Track => Boolean(t && typeof t.id === "string" && typeof t.title === "string")
      );
      if (!restoredQueue.length) return;
      setQueue(restoredQueue);
      const idx = Math.min(Math.max(parsed.index ?? 0, 0), restoredQueue.length - 1);
      skipNextLoad.current = true;
      setIndex(idx);
      setStatus("idle");
    } catch {
      /* a corrupt session is not worth surfacing */
    }
  }, []);

  /* Persist the sitting. */
  useEffect(() => {
    if (typeof window === "undefined" || !queue.length) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ queue, index, volume, muted })
      );
    } catch {
      /* storage may be unavailable; the session simply will not be remembered */
    }
  }, [queue, index, volume, muted]);

  /**
   * Loads the confirmed upload into the frame and starts it.
   * Returns false if the frame was not ready yet (the caller may retry).
   */
  const loadAndPlay = useCallback(
    (videoId: string) => {
      const player = playerRef.current;
      if (!player?.loadVideoById) return false;
      setNeedsGesture(false);
      setStatus("loading");
      setProgress(0);
      setDuration(0);
      player.loadVideoById({ videoId, startSeconds: 0 });
      player.setVolume?.(muted ? 0 : volume);
      loadedId.current = videoId;
      // If the browser refuses to start sound from a gesture made outside the
      // frame, say so instead of pretending the ghazal is playing.
      if (gestureTimer.current) window.clearTimeout(gestureTimer.current);
      gestureTimer.current = window.setTimeout(() => {
        const state = playerRef.current?.getPlayerState?.();
        if (state !== 1 && state !== 3) setNeedsGesture(true);
      }, 1600);
      return true;
    },
    [muted, volume]
  );

  /* Arm the frame whenever the current track changes. */
  useEffect(() => {
    if (!current || !currentRecording) return;
    if (skipNextLoad.current) {
      // Restored session: show the last sitting, but do not start it —
      // nothing here has been asked for yet.
      skipNextLoad.current = false;
      return;
    }
    if (loadedId.current === currentRecording.youtubeId) return;
    if (!loadAndPlay(currentRecording.youtubeId)) {
      loadYouTubeApi().then(() => window.setTimeout(() => loadAndPlay(currentRecording.youtubeId), 120));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id]);

  useEffect(() => () => stopPolling(), [stopPolling]);

  const play = useCallback((track: Track, nextQueue?: Track[]) => {
    const prevQueue = live.current.queue;
    let list = prevQueue;
    let target = prevQueue.findIndex((t) => t.id === track.id);
    if (nextQueue?.length) {
      list = nextQueue;
      target = Math.max(
        0,
        nextQueue.findIndex((t) => t.id === track.id)
      );
    } else if (target < 0) {
      list = [...prevQueue, track];
      target = list.length - 1;
    }
    setQueue(list);
    setIndex(target);
    // A ghazal without a confirmed recording still becomes the current entry so
    // the dock can explain itself and offer a search — it never fakes playback.
    setStatus(track.videoId ? "loading" : "unavailable");
    setNeedsGesture(false);
  }, []);

  const toggle = useCallback(() => {
    const player = playerRef.current;
    if (!player?.playVideo || !currentRecording) return;
    // The frame may be armed but empty (a restored sitting): load it on demand.
    if (loadedId.current !== currentRecording.youtubeId) {
      if (!loadAndPlay(currentRecording.youtubeId)) {
        loadYouTubeApi().then(() =>
          window.setTimeout(() => loadAndPlay(currentRecording.youtubeId), 120)
        );
      }
      return;
    }
    const state = player.getPlayerState?.();
    if (state === 1) {
      player.pauseVideo();
    } else {
      player.playVideo();
      setNeedsGesture(false);
      if (gestureTimer.current) window.clearTimeout(gestureTimer.current);
      gestureTimer.current = window.setTimeout(() => {
        if (playerRef.current?.getPlayerState?.() !== 1) setNeedsGesture(true);
      }, 1200);
    }
  }, [currentRecording, loadAndPlay]);

  const next = useCallback(() => {
    setIndex((i) => Math.min(i + 1, Math.max(live.current.queue.length - 1, 0)));
  }, []);

  const prev = useCallback(() => {
    const player = playerRef.current;
    if (player?.getCurrentTime?.() > 4) {
      player.seekTo(0, true);
      return;
    }
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const seekTo = useCallback((seconds: number) => {
    playerRef.current?.seekTo?.(seconds, true);
    setProgress(seconds);
  }, []);

  const setVolume = useCallback((value: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(value)));
    setVolumeState(clamped);
    setMuted(clamped === 0);
    playerRef.current?.setVolume?.(clamped);
    if (clamped > 0) playerRef.current?.unMute?.();
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const nextMuted = !m;
      playerRef.current?.setVolume?.(nextMuted ? 0 : volume);
      if (nextMuted) playerRef.current?.mute?.();
      else playerRef.current?.unMute?.();
      return nextMuted;
    });
  }, [volume]);

  const stop = useCallback(() => {
    playerRef.current?.pauseVideo?.();
    stopPolling();
    setStatus("idle");
    setIndex(-1);
  }, [stopPolling]);

  const value = useMemo<PlayerValue>(
    () => ({
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
      play,
      toggle,
      next,
      prev,
      seekTo,
      setVolume,
      toggleMute,
      setExpanded,
      stop,
    }),
    [
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
      play,
      toggle,
      next,
      prev,
      seekTo,
      setVolume,
      toggleMute,
      stop,
    ]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer(): PlayerValue {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
}

export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

export { HOST_ID };
