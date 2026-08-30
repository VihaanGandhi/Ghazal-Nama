import { albums, collections, eras, ghazals, moods, poets, singers } from "@/data";
import { recordings, type Recording } from "@/data/recordings";
import type { Album, Collection, Era, Ghazal, Mood, Poet, Singer } from "./types";
import { normalizeTitle } from "./utils";

export function getSingers(): Singer[] {
  return singers;
}

export function getSinger(slug: string): Singer | undefined {
  return singers.find((s) => s.slug === slug);
}

export function getPoets(): Poet[] {
  return poets;
}

export function getFeaturedPoets(): Poet[] {
  return poets.filter((p) => p.featured);
}

export function getPoet(slug: string): Poet | undefined {
  return poets.find((p) => p.slug === slug);
}

export function getAlbums(): Album[] {
  return albums;
}

export function getAlbum(slug: string): Album | undefined {
  return albums.find((a) => a.slug === slug);
}

export function getGhazals(): Ghazal[] {
  return ghazals;
}

export function getGhazal(slug: string): Ghazal | undefined {
  return ghazals.find((g) => g.slug === slug);
}

export function getGhazalById(id: string): Ghazal | undefined {
  return ghazals.find((g) => g.id === id);
}

export function getFeaturedGhazal(): Ghazal {
  return ghazals.find((g) => g.slug === "ranjish-hi-sahi-mehdi-hassan") ?? ghazals[0];
}

export function ghazalsBySinger(singerId: string): Ghazal[] {
  return ghazals.filter((g) => g.singer_id === singerId);
}

export function ghazalsByPoet(poetId: string): Ghazal[] {
  return ghazals.filter((g) => g.poet_id === poetId);
}

export function ghazalsByAlbum(albumId: string): Ghazal[] {
  return ghazals.filter((g) => g.album_id === albumId);
}

export function ghazalsByMood(mood: Mood): Ghazal[] {
  return ghazals.filter((g) => g.mood === mood);
}

export function ghazalsByEra(era: Era): Ghazal[] {
  return ghazals.filter((g) => g.era === era);
}

export function singerOf(ghazal?: Ghazal | null): Singer | undefined {
  if (!ghazal) return undefined;
  return singers.find((s) => s.id === ghazal.singer_id);
}

export function poetOf(ghazal?: Ghazal | null): Poet | undefined {
  if (!ghazal?.poet_id) return undefined;
  return poets.find((p) => p.id === ghazal.poet_id);
}

export function albumOf(ghazal?: Ghazal | null): Album | undefined {
  if (!ghazal?.album_id) return undefined;
  return albums.find((a) => a.id === ghazal.album_id);
}

export function otherRenditions(ghazal: Ghazal): Ghazal[] {
  const key = normalizeTitle(ghazal.title);
  return ghazals.filter((g) => g.id !== ghazal.id && normalizeTitle(g.title) === key);
}

export function moreBySinger(ghazal: Ghazal, limit = 6): Ghazal[] {
  return ghazalsBySinger(ghazal.singer_id)
    .filter((g) => g.id !== ghazal.id)
    .slice(0, limit);
}

export function similarGhazals(ghazal: Ghazal, limit = 6): Ghazal[] {
  const renditionIds = new Set(otherRenditions(ghazal).map((g) => g.id));
  return ghazals
    .filter((g) => {
      if (g.id === ghazal.id) return false;
      if (renditionIds.has(g.id)) return false;
      return g.mood === ghazal.mood || g.poet_id === ghazal.poet_id;
    })
    .slice(0, limit);
}

export function relatedSingers(singer: Singer, limit = 4): Singer[] {
  return singers.filter((s) => s.id !== singer.id).slice(0, limit);
}

export function poetsForSinger(singerId: string): Poet[] {
  const ids = new Set(
    ghazalsBySinger(singerId)
      .map((g) => g.poet_id)
      .filter((id): id is string => Boolean(id))
  );
  return poets.filter((p) => ids.has(p.id));
}

export function albumsForSinger(singerId: string): Album[] {
  return albums.filter((a) => a.singer_id === singerId);
}

export function singerCount(singerId: string): number {
  return ghazalsBySinger(singerId).length;
}

export function poetCount(poetId: string): number {
  return ghazalsByPoet(poetId).length;
}

export function getCollections(): Collection[] {
  return collections;
}

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function collectionGhazals(collection: Collection): Ghazal[] {
  return collection.ghazal_ids
    .map((id) => ghazals.find((g) => g.id === id))
    .filter((g): g is Ghazal => Boolean(g));
}

export function getMoods() {
  return moods;
}

export function getMood(id: string) {
  return moods.find((m) => m.id === id);
}

export function getEras() {
  return eras;
}

export function getEra(id: string) {
  return eras.find((e) => e.id === id);
}

export function searchCatalog(query: string): {
  ghazals: Ghazal[];
  singers: Singer[];
  poets: Poet[];
  albums: Album[];
} {
  const q = query.trim().toLowerCase();
  if (!q) {
    return { ghazals: [], singers: [], poets: [], albums: [] };
  }

  const hit = (value?: string | null) => Boolean(value && value.toLowerCase().includes(q));

  const matchedSingers = singers.filter(
    (s) => hit(s.name) || hit(s.honorific) || hit(s.origin)
  );
  const matchedPoets = poets.filter((p) => hit(p.name) || hit(p.origin));
  const matchedAlbums = albums.filter((a) => hit(a.title));

  const singerIds = new Set(matchedSingers.map((s) => s.id));
  const poetIds = new Set(matchedPoets.map((p) => p.id));
  const albumIds = new Set(matchedAlbums.map((a) => a.id));

  const matchedGhazals = ghazals.filter((g) => {
    if (hit(g.title) || hit(g.excerpt) || hit(g.era) || hit(g.mood) || hit(g.titleUrdu)) {
      return true;
    }
    if (g.year && String(g.year).includes(q)) return true;
    if (singerIds.has(g.singer_id)) return true;
    if (g.poet_id && poetIds.has(g.poet_id)) return true;
    if (g.album_id && albumIds.has(g.album_id)) return true;
    const singer = singers.find((s) => s.id === g.singer_id);
    const poet = g.poet_id ? poets.find((p) => p.id === g.poet_id) : undefined;
    return hit(singer?.name) || hit(poet?.name);
  });

  return {
    ghazals: matchedGhazals.slice(0, 40),
    singers: matchedSingers,
    poets: matchedPoets,
    albums: matchedAlbums,
  };
}

export const ARCHIVE_TOTAL = ghazals.length;

/* ————————————————————————————————
   The listening room
   ———————————————————————————————— */

export function recordingOf(ghazal: Ghazal | undefined): Recording | undefined {
  if (!ghazal) return undefined;
  return recordings[ghazal.id];
}

export function isPlayable(ghazal: Ghazal): boolean {
  return Boolean(recordings[ghazal.id]);
}

/** Ghazals with a confirmed recording, in archive order. */
export function playableGhazals(): Ghazal[] {
  return ghazals.filter((g) => Boolean(recordings[g.id]));
}

export function playableCount(): number {
  return playableGhazals().length;
}

/**
 * A queue for a page: playable tracks first so the room is never silent,
 * then the rest of the list in its original order.
 */
export function asQueue(items: Ghazal[]): Ghazal[] {
  const head = items.filter((g) => Boolean(recordings[g.id]));
  const tail = items.filter((g) => !recordings[g.id]);
  return [...head, ...tail];
}

export function firstPlayable(items: Ghazal[]): Ghazal | undefined {
  return items.find((g) => Boolean(recordings[g.id]));
}

export function playableBySinger(singerId: string): Ghazal[] {
  return ghazalsBySinger(singerId).filter((g) => Boolean(recordings[g.id]));
}

export function singersWithRecordings(limit = 10): { singer: Singer; ghazals: Ghazal[] }[] {
  return singers
    .map((singer) => ({ singer, ghazals: playableBySinger(singer.id) }))
    .filter((entry) => entry.ghazals.length > 0)
    .sort((a, b) => b.ghazals.length - a.ghazals.length)
    .slice(0, limit);
}

/** The voices that define a decade. */
export function getEraSingers(eraId: string): Singer[] {
  const era = eras.find((e) => e.id === eraId);
  if (!era) return [];
  return era.singer_ids
    .map((id) => singers.find((s) => s.id === id))
    .filter((s): s is Singer => Boolean(s));
}

export function getSingerById(id: string): Singer | undefined {
  return singers.find((s) => s.id === id);
}
