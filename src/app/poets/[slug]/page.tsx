import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Divider, SectionLabel } from "@/components/Ornament";
import { TrackList } from "@/components/TrackList";
import { Reveal } from "@/components/Reveal";
import { getPoet, getPoets, ghazalsByPoet } from "@/lib/catalog";
import { recordings } from "@/data/recordings";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return getPoets().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const poet = getPoet(params.slug);
  return { title: poet?.name ?? "Poet", description: poet?.shortBio ?? "" };
}

export default function PoetPage({ params }: Params) {
  const poet = getPoet(params.slug);
  if (!poet) notFound();

  const items = ghazalsByPoet(poet.id);
  const playable = items.filter((g) => recordings[g.id]);

  const byVoice = items.reduce<Record<string, number>>((acc, g) => {
    acc[g.singer_id] = (acc[g.singer_id] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="kicker mb-5">{poet.years ?? "poet"}</p>
          <h1 className="display display-wonk text-[clamp(2.6rem,8vw,6rem)] leading-[0.9] text-bone">
            {poet.name}
          </h1>
          <p className="lede mt-6 text-xl sm:text-2xl">{poet.shortBio}</p>
        </div>
        <Reveal>
          <div className="panel p-8">
            <p className="kicker mb-4">In this archive</p>
            <p className="display text-6xl text-ember">{items.length}</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
              recordings · {playable.length} in the listening room
            </p>
            <ul className="mt-8 space-y-2">
              {Object.entries(byVoice)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 6)
                .map(([singerId, count]) => (
                  <li key={singerId} className="flex justify-between gap-4 text-sm text-bone-mute">
                    <span className="capitalize">{singerId.replace(/-/g, " ")}</span>
                    <span className="font-mono text-[11px] text-bone-faint">{count}</span>
                  </li>
                ))}
            </ul>
            <Link href="/archive" className="btn btn-line mt-8">
              Search the archive →
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="mt-12 max-w-3xl space-y-5 text-[17px] leading-relaxed text-bone-mute">
        <p>{poet.bio}</p>
      </div>

      {playable.length > 0 && (
        <section className="mt-20">
          <SectionLabel index="01" title="In the listening room" />
          <TrackList ids={playable.map((g) => g.id)} />
        </section>
      )}

      <section className="mt-20">
        <SectionLabel index="02" title="Every setting catalogued" />
        <TrackList ids={items.map((g) => g.id)} showPoet={false} />
      </section>

      <Divider className="mt-20" />
    </div>
  );
}

