import { ghazals } from "@/data/ghazals";
import { poets } from "@/data/poets";
import { singers } from "@/data/singers";
import { recordings } from "@/data/recordings";
import type { Ghazal, Track, Voice } from "@/lib/types";

/**
 * Server-side only. This is where the catalogue is reduced to the one shape
 * the site actually uses: two hundred songs, each with a voice, a year and —
 * where one was verified — the recording that plays it.
 *
 * Nothing here reaches the browser except the Track itself.
 */

const singerById = new Map(singers.map((s) => [s.id, s]));
const poetById = new Map(poets.map((p) => [p.id, p]));

export function toTrack(ghazal: Ghazal): Track {
  const singer = singerById.get(ghazal.singer_id);
  const poet = ghazal.poet_id ? poetById.get(ghazal.poet_id) : undefined;
  const recording = recordings[ghazal.id];

  return {
    id: ghazal.id,
    slug: ghazal.slug,
    title: ghazal.title,
    titleUrdu: ghazal.titleUrdu ?? null,
    singer: singer?.name ?? "Unknown voice",
    singerSlug: singer?.slug ?? "",
    poet: poet?.name ?? null,
    year: ghazal.year ?? null,
    videoId: recording?.youtubeId ?? null,
    source: recording?.source ?? null,
  };
}

/** All two hundred, in catalogue order. */
export function allTracks(): Track[] {
  return ghazals.map(toTrack);
}

export function trackBySlug(slug: string): Track | undefined {
  const ghazal = ghazals.find((g) => g.slug === slug);
  return ghazal ? toTrack(ghazal) : undefined;
}

/** Every song by the same voice, excluding the one passed in. */
export function moreBy(track: Track, limit = 8): Track[] {
  return ghazals
    .filter((g) => g.singer_id && singerById.get(g.singer_id)?.slug === track.singerSlug)
    .filter((g) => g.id !== track.id)
    .slice(0, limit)
    .map(toTrack);
}

/** The ten voices, most recorded first. */
export function voices(): Voice[] {
  const counts = new Map<string, number>();
  for (const g of ghazals) {
    counts.set(g.singer_id, (counts.get(g.singer_id) ?? 0) + 1);
  }
  return singers
    .map((s) => ({ slug: s.slug, name: s.name, count: counts.get(s.id) ?? 0 }))
    .filter((v) => v.count > 0)
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export const TRACK_COUNT = ghazals.length;
export const PLAYABLE_COUNT = Object.keys(recordings).length;
