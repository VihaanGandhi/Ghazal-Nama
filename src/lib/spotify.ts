import type { Ghazal, Singer } from "./types";

export function spotifySearchUrl(query: string): string {
  return `https://open.spotify.com/search/${encodeURIComponent(query)}`;
}

export function ghazalListenUrl(ghazal: Ghazal, singerName?: string): string {
  if (ghazal.spotify_url) return ghazal.spotify_url;
  if (ghazal.spotify_track_id) {
    return `https://open.spotify.com/track/${ghazal.spotify_track_id}`;
  }
  const query = [ghazal.title, singerName].filter(Boolean).join(" ");
  return spotifySearchUrl(query);
}

export function singerListenUrl(singer: Singer): string {
  if (singer.spotify_playlist_id) {
    return `https://open.spotify.com/playlist/${singer.spotify_playlist_id}`;
  }
  return spotifySearchUrl(singer.name);
}

export function collectionListenUrl(title: string): string {
  return spotifySearchUrl(`${title} ghazal`);
}
