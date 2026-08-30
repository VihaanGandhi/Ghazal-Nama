# Ghazal Nama

**Where poetry finds a voice.**

A living archive of South Asian ghazal — 200 recordings catalogued across 10 voices and 31 poets,
with a **listening room** that actually plays: press a ghazal and it runs, in full, while you keep
reading the archive.

## What is here

- **The archive** (`/archive`) — every recording as a ledger row, filterable by voice, poet, mood,
  era and year, playable in place.
- **The listening room** (`/listen`) — a programme rather than a shuffle. One player lives in the
  dock at the bottom of every page, so a ghazal keeps playing across navigation.
- **Voices, poets, albums, collections, moods, eras** — each with its own page and its own queue.
- **Registrar** (`/admin`) — propose a recording; kept in the browser only.

## How playback works

Nothing is re-hosted. Every playable recording points at one specific public upload — usually the
label's own channel (Saregama, EMI Pakistan, Universal, Sony, T-Series, Shemaroo) — checked against
YouTube's oEmbed endpoint before it was added. The map lives in
[`src/data/recordings.ts`](./src/data/recordings.ts), keyed by ghazal id, each entry carrying the
channel or release it was verified against:

```ts
"gh-021": { youtubeId: "Xc6uwbXpmUY", source: "Mehdi Hassan – Topic · Greatest Ghazals (1988)" },
```

Adding an entry there is what puts a recording in the listening room; the rest of the site picks it
up automatically (the row lights up, the collection re-orders, the count on the footer changes).

A recording that could not be confirmed — or whose owner blocks embedding — stays catalogued, says
so, and offers a search instead. YouTube's `listType=search` embed is deprecated, so nothing here
guesses at an id.

## Stack

- Next.js (App Router) · TypeScript · Tailwind CSS
- Local catalogue in `src/data` (recordings, singers, poets, albums, moods, eras, collections)
- YouTube IFrame Player API for playback; Fraunces / Inter / Noto Nastaliq Urdu / IBM Plex Mono,
  all self-hosted via Fontsource
- [`supabase/schema.sql`](./supabase/schema.sql) is included as a starting point if you want to
  persist the catalogue later — the site ships without it

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Integrity

Where a poet, year, album or source could not be confirmed, the field is empty rather than
guessed. Two entries corrected on the last pass: *Hothon Se Chhoo Lo Tum* is credited to Indeevar
(not Shiv Kumar Batalvi), and two recordings whose uploads had disappeared or blocked embedding
were replaced after re-checking every id in `recordings.ts`.

Portrait plates and covers are archival in spirit — generated stills and typographic plates, not
licensed publicity photographs.
