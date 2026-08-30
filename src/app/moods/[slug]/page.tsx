import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Divider, SectionLabel } from "@/components/Ornament";
import { TrackList } from "@/components/TrackList";
import { CollectionPlay } from "@/components/CollectionPlay";
import { getMood, getMoods, ghazalsByMood } from "@/lib/catalog";
import { recordings } from "@/data/recordings";
import type { Mood } from "@/lib/types";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return getMoods().map((m) => ({ slug: m.id }));
}

export function generateMetadata({ params }: Params): Metadata {
  const mood = getMood(params.slug);
  return { title: mood?.label ?? "Mood", description: mood?.description ?? "" };
}

export default function MoodPage({ params }: Params) {
  const mood = getMood(params.slug);
  if (!mood) notFound();

  const items = ghazalsByMood(mood.id as Mood);
  const playable = items.filter((g) => recordings[g.id]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="kicker mb-6">Mood · {mood.id}</p>
          <h1 className="display display-wonk text-[clamp(2.8rem,9vw,7rem)] leading-[0.88] text-bone">
            {mood.label}
          </h1>
          <p className="lede mt-6 text-2xl">{mood.phrase}</p>
        </div>
        <div>
          <p className="max-w-md text-[17px] leading-relaxed text-bone-mute">{mood.description}</p>
          <div className="mt-6">
            <CollectionPlay ghazalId={playable[0]?.id} queueIds={items.map((g) => g.id)} />
          </div>
        </div>
      </div>

      <div className="mt-8 font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
        {items.length} recordings · <span className="text-ember">{playable.length} in the room</span>
      </div>

      {playable.length > 0 && (
        <section className="mt-16">
          <SectionLabel index="01" title="In the listening room" />
          <TrackList ids={playable.map((g) => g.id)} />
        </section>
      )}

      <section className="mt-16">
        <SectionLabel index="02" title="Everything in this weather" />
        <TrackList ids={items.map((g) => g.id)} />
      </section>

      <Divider className="mt-20" />
    </div>
  );
}
