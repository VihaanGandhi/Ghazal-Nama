export const MOODS = [
  "midnight",
  "heartbreak",
  "ishq",
  "mehfil",
  "baarish",
  "tanhaai",
  "romance",
  "poetry",
] as const;

export type Mood = (typeof MOODS)[number];

export const ERAS = [
  "1930s",
  "1940s",
  "1950s",
  "1960s",
  "1970s",
  "1980s",
  "1990s",
  "2000s",
] as const;

export type Era = (typeof ERAS)[number];

export interface Singer {
  id: string;
  name: string;
  slug: string;
  bio: string;
  shortBio: string;
  photo?: string;
  era: string;
  born?: string;
  died?: string;
  honorific?: string;
  origin?: string;
  spotify_playlist_id?: string | null;
  featured: boolean;
}

export interface Poet {
  id: string;
  name: string;
  slug: string;
  bio: string;
  shortBio: string;
  photo?: string;
  years?: string;
  origin?: string;
  featured: boolean;
}

export interface Album {
  id: string;
  title: string;
  slug: string;
  singer_id?: string;
  year?: number;
  note?: string;
}

export interface Ghazal {
  id: string;
  title: string;
  slug: string;
  singer_id: string;
  poet_id?: string | null;
  album_id?: string | null;
  year?: number | null;
  era?: Era | null;
  mood?: Mood | null;
  description?: string | null;
  excerpt?: string | null;
  titleUrdu?: string | null;
  cover_image?: string | null;
  spotify_track_id?: string | null;
  spotify_url?: string | null;
  featured: boolean;
  duration?: string | null;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description: string;
  kicker?: string;
  ghazal_ids: string[];
}

export interface MoodMeta {
  id: Mood;
  label: string;
  phrase: string;
  description: string;
}

export interface EraMeta {
  id: Era;
  label: string;
  description: string;
  singer_ids: string[];
}

export interface Catalog {
  singers: Singer[];
  poets: Poet[];
  albums: Album[];
  ghazals: Ghazal[];
  collections: Collection[];
}

/**
 * Track — the only shape the browser ever sees.
 *
 * A song, its voice, its year and the id of the recording that plays it.
 * No description, no excerpt, no biography: the catalogue's prose stays on
 * the server, which is also why the client bundle no longer carries it.
 */
export interface Track {
  id: string;
  slug: string;
  title: string;
  titleUrdu: string | null;
  singer: string;
  singerSlug: string;
  poet: string | null;
  year: number | null;
  /** YouTube id of the verified upload, or null when there is none. */
  videoId: string | null;
  source: string | null;
}

/** A voice and how many of the two hundred it carries. */
export interface Voice {
  slug: string;
  name: string;
  count: number;
}
