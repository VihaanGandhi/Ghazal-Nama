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
