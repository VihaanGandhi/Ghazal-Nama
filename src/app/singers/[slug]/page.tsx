import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Divider, SectionLabel } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { TrackList } from "@/components/TrackList";
import { PoetCard } from "@/components/Cards";
import {
  albumsForSinger,
  getSinger,
  getSingers,
  ghazalsBySinger,
  poetsForSinger,
} from "@/lib/catalog";
import { recordings } from "@/data/recordings";
import { singers } from "@/data";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return getSingers().map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const singer = getSinger(params.slug);
  return {
    title: singer?.name ?? "Voice",
    description: singer?.shortBio ?? "",
  };
}

export default function SingerPage({ params }: Params) {
  const singer = getSinger(params.slug);
  if (!singer) notFound();

  const items = ghazalsBySinger(singer.id);
  const playable = items.filter((g) => recordings[g.id]);
  const poets = poetsForSinger(singer.id);
  const albums = albumsForSinger(singer.id);
  const others = getSingers().filter((s) => s.id !== singer.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <header className="grid items-end gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-bone/10">
            {singer.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={singer.photo}
                alt={singer.name}
                className="duotone h-full w-full object-cover mask-fade-b"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-night-200 font-display text-8xl text-bone-faint">
                {singer.name.charAt(0)}
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(232,162,76,0.18),transparent_70%)]" />
          </div>
          <dl className="mt-6 grid grid-cols-3 gap-px border border-bone/10 bg-bone/10">
            {[
              ["born", singer.born ?? "—"],
              ["origin", singer.origin ?? "—"],
              ["era", singer.era],
            ].map(([k, v]) => (
              <div key={k} className="bg-night px-4 py-4">
                <dt className="font-mono text-[9px] uppercase tracking-kicker text-bone-faint">{k}</dt>
                <dd className="mt-1.5 font-display text-lg text-bone">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <p className="kicker mb-5">{singer.honorific ?? "voice"}</p>
          <h1 className="display display-wonk text-[clamp(2.8rem,8vw,6rem)] leading-[0.9] text-bone">
            {singer.name}
          </h1>
          <p className="lede mt-6 text-xl sm:text-2xl">{singer.shortBio}</p>
          <Reveal delay={100}>
            <div className="mt-8 max-w-2xl space-y-5 text-[17px] leading-relaxed text-bone-mute">
              <p>{singer.bio}</p>
            </div>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-6 font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
            <span>{items.length} catalogued</span>
            <span className="text-ember">{playable.length} in the listening room</span>
            <span>{poets.length} poets</span>
            <span>{albums.length} albums</span>
          </div>
        </div>
      </header>

      {playable.length > 0 && (
        <section className="mt-24">
          <SectionLabel
            index="01"
            title="In the listening room"
            note="Confirmed recordings. These play where they sit."
          />
          <TrackList ids={playable.map((g) => g.id)} showPoet />
        </section>
      )}

      <section className="mt-24">
        <SectionLabel index="02" title="Everything catalogued" />
        <TrackList ids={items.map((g) => g.id)} showPoet />
      </section>

      {poets.length > 0 && (
        <section className="mt-24">
          <SectionLabel index="03" title="Poets in this voice" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {poets.slice(0, 8).map((poet) => (
              <PoetCard key={poet.id} poet={poet} />
            ))}
          </div>
        </section>
      )}

      {albums.length > 0 && (
        <section className="mt-24">
          <SectionLabel index="04" title="Albums" />
          <ul className="grid gap-px border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <li key={album.id}>
                <Link
                  href={`/albums/${album.slug}`}
                  className="group flex h-full items-baseline justify-between gap-4 bg-night px-5 py-5 transition-colors hover:bg-night-200"
                >
                  <span className="font-display text-xl text-bone transition-colors group-hover:text-ember-soft">
                    {album.title}
                  </span>
                  <span className="font-mono text-[10px] tabular-nums text-bone-faint">
                    {album.year ?? "—"}
                    {album.note ? ` · ${album.note}` : ""}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-24">
        <SectionLabel index="05" title="Other rooms" />
        <ul className="flex flex-wrap gap-3">
          {others.map((other) => (
            <li key={other.id}>
              <Link href={`/singers/${other.slug}`} className="btn btn-ghost">
                {other.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Divider className="mt-20" />
      <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
        {singers.length} voices in the archive
      </p>
    </div>
  );
}
