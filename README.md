# Ghazal Nama

**A Home for Timeless Ghazals.**  
*Where poetry finds a voice.*

A digital archive of South Asian ghazal — editorial, nostalgic, and built for discovery rather than streaming. Playback lives on Spotify. The sitting lives here.

## Stack

- Next.js (App Router) · TypeScript · Tailwind CSS
- Local catalogue in `src/data` (200 recordings, 10 singers, poets, albums, moods, eras)
- Optional [Supabase](./supabase/schema.sql) when you are ready to persist
- Spotify links (search URLs when a track id is unknown — never invented)

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Add a ghazal in ~30 seconds

Visit `/admin` (Registrar in the footer). Title + singer are enough. The recording appears in the archive for this browser via `localStorage`. To persist for everyone, run `supabase/schema.sql` and set:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Integrity

Where poet, year, album, duration or a Spotify track id could not be confirmed, the field is empty. Do not invent metadata.

Portrait plates are archival in spirit (generated stills and typographic fallbacks), not licensed publicity photographs.
