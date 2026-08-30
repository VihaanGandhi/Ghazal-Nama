import type { Metadata } from "next";
import Link from "next/link";
import { Marquee } from "@/components/Marquee";
import { Platter, SectionLabel } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { TrackList } from "@/components/TrackList";
import { CollectionPlay } from "@/components/CollectionPlay";
import {
  collectionGhazals,
  getCollection,
  getCollections,
  getSingers,
  playableCount,
  playableGhazals,
} from "@/lib/catalog";
import { recordings } from "@/data/recordings";

export const metadata: Metadata = {
  title: "Listen",
  description:
    "Tonight's programme — a sitting of confirmed recordings that play in full, in the room.",
};

const TICKER = [
  { text: "the room is open", credit: "press play" },
  { text: "recordings play in full", credit: "no thirty-second teases" },
  { text: "the queue follows the programme", credit: "tonight" },
];

export default function ListenPage() {
  const tonight = getCollection("tonights-mehfil");
  const programme = tonight ? collectionGhazals(tonight) : [];
  const room = playableGhazals();
  const collections = getCollections();
  const singers = getSingers();

  return (
    <div>
      {/* The stage */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-lamp-glow" aria-hidden />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="kicker mb-7">On air · ghazal nama radio</p>
            <h1 className="display display-wonk text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.88] text-bone">
              A programme,
              <span className="block text-ember">not a shuffle.</span>
            </h1>
            <p className="lede mt-7 max-w-xl text-xl sm:text-2xl">
              {playableCount()} recordings are confirmed in the listening room. Press one and the
              rest of the sitting follows — the queue is the programme, in order.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <CollectionPlay ghazalId={programme[0]?.id} queueIds={programme.map((g) => g.id)} />
              <Link href="/archive" className="btn btn-ghost">
                Browse everything
              </Link>
            </div>
            <p className="mt-8 max-w-md font-mono text-[10px] uppercase leading-relaxed tracking-wideish text-bone-faint">
              Playback runs through the rights-holders&apos; own uploads, embedded — the audio is
              theirs, the sitting is ours.
            </p>
          </div>

          <Reveal className="flex flex-col items-center gap-10">
            <Platter className="h-72 w-72" spinning label="side a" />
            <ol className="w-full max-w-sm space-y-2">
              {programme.slice(0, 5).map((g, i) => (
                <li
                  key={g.id}
                  className="flex items-baseline gap-3 border-b border-bone/8 pb-2 text-sm text-bone-mute"
                >
                  <span className="font-mono text-[10px] text-ember">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Link
                    href={`/ghazals/${g.slug}`}
                    className="truncate font-display text-lg text-bone hover:text-ember-soft"
                  >
                    {g.title}
                  </Link>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <Marquee items={TICKER} />

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionLabel
          index="01"
          title="Tonight's programme"
          note="Ten recordings, in order."
        />
        <TrackList ids={programme.map((g) => g.id)} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionLabel
          index="02"
          title="The whole listening room"
          note={`${room.length} confirmed recordings`}
        />
        <TrackList ids={room.map((g) => g.id)} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionLabel index="03" title="Other sittings" />
        <ul className="grid gap-px border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => {
            const playable = collection.ghazal_ids.filter((id) => recordings[id]).length;
            return (
              <li key={collection.id}>
                <Link
                  href={`/collections/${collection.slug}`}
                  className="group flex h-full flex-col justify-between gap-6 bg-night px-6 py-7 transition-colors hover:bg-night-200"
                >
                  <span>
                    <span className="kicker block">{collection.kicker ?? "Collection"}</span>
                    <span className="display mt-2 block text-2xl text-bone transition-colors group-hover:text-ember-soft">
                      {collection.title}
                    </span>
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
                    {playable} of {collection.ghazal_ids.length} play
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <SectionLabel index="04" title="Start with a voice" />
        <ul className="flex flex-wrap gap-3">
          {singers.map((singer) => (
            <li key={singer.id}>
              <Link href={`/singers/${singer.slug}`} className="btn btn-ghost">
                {singer.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
