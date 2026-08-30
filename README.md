# Ghazal Nama

Two hundred ghazals, ten voices. One ledger. Press play.

Nothing else. No essays, no biographies, no moods or eras or collections — the
prose was cut and the site is the list.

## What's here

| Route | What it is |
| --- | --- |
| `/` | All 200 ghazals: a searchable ledger, filterable by voice. Click a row to play it. |
| `/song/[slug]` | One ghazal — title, voice, poet, year, a play button, and more by that voice. |

A fixed dock at the bottom holds the video frame and the transport. It is on the
page from the first paint, empty, because the player has to be built before it
is asked to play.

## Playback

Every recording is one specific public YouTube upload, checked individually
against YouTube's oEmbed endpoint before it was listed — title and channel both
confirmed, so pressing play produces the performance rather than a search page.
25 of the 200 have a verified recording. Where none could be confirmed, the row
says so and offers a search instead of guessing an id.

`src/data/recordings.ts` is the list. Re-check it with:

```
https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<ID>&format=json
```

`Not Found` means the upload is gone; `Unauthorized` means embedding is blocked.
Either way the id must not ship.

## Architecture

`src/lib/tracks.ts` reduces the catalogue to a `Track` — id, slug, title, voice,
poet, year, video id — and that is the only shape the browser ever receives.
Song descriptions, excerpts and biographies stay on the server and are not
rendered anywhere. Nothing under `src/` imports `@/data` on the client, so the
catalogue is not in the JavaScript bundle.

The player (`src/context/PlayerContext.tsx`) drives the YouTube IFrame API and
persists the sitting — the queue travels as tracks, so restoring it needs no
lookup table either.

## Running it

```bash
npm install
npm run build && npm start
```

Next.js 14 App Router, TypeScript, Tailwind. The build produces 205 static
pages; a page weighs about 130 KB on the wire including all CSS and JS (the 40 KB polyfill file is `noModule`, so modern browsers skip it).
