import Link from "next/link";
import { ArchiveList } from "@/components/ArchiveList";
import { EraTimeline } from "@/components/EraTimeline";
import { FeaturedGhazal } from "@/components/FeaturedGhazal";
import { Hero } from "@/components/Hero";
import { MoodCard } from "@/components/MoodCard";
import { PoetCard } from "@/components/PoetCard";
import { SectionHeader } from "@/components/SectionHeader";
import { SingerCard } from "@/components/SingerCard";
import { getFeaturedPoets, getGhazals, getSingers } from "@/lib/catalog";
import { moods } from "@/data";

export default function HomePage() {
  const singers = getSingers();
  const poets = getFeaturedPoets();
  const archivePreview = getGhazals().filter((g) => g.featured).slice(0, 8);

  return (
    <>
      <Hero />

      <FeaturedGhazal />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeader
          kicker="The gallery"
          title="Voices That Defined an Era"
          subtitle="Vintage plates from the archive — pinned, captioned, waiting to be turned over."
        />
        <div className="flex gap-5 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-5">
          {singers.map((s, i) => (
            <div key={s.id} className="min-w-[220px] sm:min-w-0">
              <SingerCard singer={s} index={i} />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeader
          kicker="The rooms"
          title="How does your heart feel tonight?"
          subtitle="Not genres. Climates."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {moods.map((m) => (
            <MoodCard key={m.id} mood={m} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeader
          kicker="The ledger"
          title="The Ghazal Archive"
          subtitle="A catalogue, not a carousel. Numbers in the margin, as they used to be."
        />
        <ArchiveList items={archivePreview} />
        <div className="mt-8 text-center">
          <Link href="/archive" className="btn btn-ghost">
            The full ledger
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeader
          kicker="The diwan"
          title="The Words Behind the Voices"
          subtitle="Poets whose couplets outlived the rooms they were first read in."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {poets.map((p) => (
            <PoetCard key={p.id} poet={p} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/poets" className="btn btn-ghost">
            All poets
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeader
          kicker="A century, in sitting"
          title="Across the Eras"
          subtitle="Not a timeline of products. A history of rooms."
        />
        <EraTimeline />
        <p className="mt-16 text-center font-mono text-[10px] tracking-[0.28em] text-[#a09a8e]/40">
          GHAZAL NAMA  ·  VOL. I  ·  P. 01
        </p>
      </section>
    </>
  );
}
