import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { TrackList } from "@/components/TrackList";
import { CollectionCard, MoodCard, SingerCard } from "@/components/Cards";
import {
  getCollections,
  getEras,
  getMoods,
  getSingers,
  ghazalsByEra,
  ghazalsByMood,
  playableGhazals,
} from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Explore",
  description: "Every door into the archive: voices, moods, eras, collections, and the listening room.",
};

export default function ExplorePage() {
  const moods = getMoods();
  const eras = getEras();
  const singers = getSingers();
  const collections = getCollections();
  const room = playableGhazals();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionLabel index="01" title="Explore" note="Six doors into the archive" />
      <h1 className="display display-wonk max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.92] text-bone">
        Enter by voice, by weather, by decade — or straight into the room.
      </h1>

      <section className="mt-16">
        <SectionLabel index="02" title="Start here" note={`${room.length} confirmed recordings`} />
        <TrackList ids={room.slice(0, 12).map((g) => g.id)} />
        <Link href="/listen" className="btn btn-line mt-6">
          The whole listening room →
        </Link>
      </section>

      <section className="mt-24">
        <SectionLabel index="03" title="Voices" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {singers.slice(0, 6).map((singer, i) => (
            <Reveal key={singer.id} delay={(i % 3) * 60}>
              <SingerCard singer={singer} index={i} />
            </Reveal>
          ))}
        </div>
        <Link href="/singers" className="btn btn-line mt-6">
          All {singers.length} voices →
        </Link>
      </section>

      <section className="mt-24">
        <SectionLabel index="04" title="Moods" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {moods.map((mood, i) => (
            <Reveal key={mood.id} delay={(i % 4) * 50}>
              <MoodCard mood={mood} count={ghazalsByMood(mood.id).length} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <SectionLabel index="05" title="Eras" />
        <ul className="grid gap-px border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
          {eras.map((era) => (
            <li key={era.id}>
              <Link
                href={`/eras/${era.id}`}
                className="group flex h-full items-baseline justify-between gap-4 bg-night px-5 py-6 transition-colors hover:bg-night-200"
              >
                <span className="display text-3xl text-bone transition-colors group-hover:text-ember">
                  {era.label}
                </span>
                <span className="font-mono text-[10px] tabular-nums text-bone-faint">
                  {ghazalsByEra(era.id).length}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-24">
        <SectionLabel index="06" title="Collections" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {collections.slice(0, 6).map((collection, i) => (
            <Reveal key={collection.id} delay={(i % 3) * 60}>
              <CollectionCard collection={collection} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
