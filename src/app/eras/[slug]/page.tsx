import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Divider, SectionLabel } from "@/components/Ornament";
import { TrackList } from "@/components/TrackList";
import { CollectionPlay } from "@/components/CollectionPlay";
import { getEra, getEras, getEraSingers, ghazalsByEra } from "@/lib/catalog";
import { recordings } from "@/data/recordings";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return getEras().map((e) => ({ slug: e.id }));
}

export function generateMetadata({ params }: Params): Metadata {
  const era = getEra(params.slug);
  return { title: era ? `${era.label} ghazal` : "Era", description: era?.description ?? "" };
}

export default function EraPage({ params }: Params) {
  const era = getEra(params.slug);
  if (!era) notFound();

  const items = ghazalsByEra(era.id);
  const playable = items.filter((g) => recordings[g.id]);
  const eraSingers = getEraSingers(era.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="kicker mb-6">Era</p>
          <h1 className="display display-wonk text-[clamp(4rem,14vw,11rem)] leading-[0.82] text-bone">
            {era.label}
          </h1>
        </div>
        <div>
          <p className="lede text-xl">{era.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {eraSingers.map((singer) => (
              <Link key={singer.id} href={`/singers/${singer.slug}`} className="btn btn-ghost">
                {singer.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6 font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
        <span>{items.length} recordings</span>
        <span className="text-ember">{playable.length} in the listening room</span>
        {playable[0] && <CollectionPlay ghazalId={playable[0].id} queueIds={items.map((g) => g.id)} />}
      </div>

      {playable.length > 0 && (
        <section className="mt-16">
          <SectionLabel index="01" title="In the listening room" />
          <TrackList ids={playable.map((g) => g.id)} />
        </section>
      )}

      <section className="mt-16">
        <SectionLabel index="02" title="The decade, catalogued" />
        <TrackList ids={items.map((g) => g.id)} />
      </section>

      <Divider className="mt-20" />
    </div>
  );
}
