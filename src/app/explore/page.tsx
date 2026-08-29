import type { Metadata } from "next";
import Link from "next/link";
import { ArchiveList } from "@/components/ArchiveList";
import { MoodCard } from "@/components/MoodCard";
import { SectionHeader } from "@/components/SectionHeader";
import { SingerCard } from "@/components/SingerCard";
import { collections, moods } from "@/data";
import { getGhazals, getSingers } from "@/lib/catalog";

export const metadata: Metadata = { title: "Explore" };

export default function ExplorePage() {
  const ghazals = getGhazals().slice(0, 18);
  const singers = getSingers();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="kicker">The rooms</p>
      <h1 className="display mt-3 text-5xl text-burgundy-deep sm:text-6xl">Explore</h1>
      <p className="mt-4 max-w-2xl font-display text-xl italic text-ink-fade">
        Begin anywhere. Singer, poet, mood, era — the archive is built so that one recording always
        opens another door.
      </p>
      <div className="rule-double mt-8" />

      <section className="py-14">
        <SectionHeader kicker="Collections" title="Shelves" align="left" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c) => (
            <Link
              key={c.id}
              href={`/collections/${c.slug}`}
              className="border border-burgundy/20 bg-ivory-soft/60 p-5 hover:border-burgundy/40"
            >
              <p className="kicker">{c.kicker}</p>
              <h3 className="mt-2 font-display text-3xl text-burgundy-deep">{c.title}</h3>
              <p className="mt-2 font-display italic text-ink-fade">{c.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-8">
        <SectionHeader kicker="Mood" title="How does the night feel?" align="left" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {moods.map((m) => (
            <MoodCard key={m.id} mood={m} />
          ))}
        </div>
      </section>

      <section className="py-8">
        <SectionHeader kicker="Voices" title="Begin with a singer" align="left" />
        <div className="flex gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {singers.map((s, i) => (
            <div key={s.id} className="min-w-[200px]">
              <SingerCard singer={s} index={i} />
            </div>
          ))}
        </div>
      </section>

      <section className="py-8">
        <SectionHeader kicker="A first sitting" title="Eighteen from the ledger" align="left" />
        <ArchiveList items={ghazals} />
      </section>
    </div>
  );
}
