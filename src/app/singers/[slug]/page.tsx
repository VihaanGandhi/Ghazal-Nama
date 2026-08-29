import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchiveList } from "@/components/ArchiveList";
import { Portrait } from "@/components/Portrait";
import { SpotifyButton } from "@/components/SpotifyButton";
import {
  albumsForSinger,
  ghazalsBySinger,
  getSinger,
  getSingers,
  poetsForSinger,
  relatedSingers,
} from "@/lib/catalog";
import { singerListenUrl } from "@/lib/spotify";

type Params = { slug: string };

export function generateStaticParams() {
  return getSingers().map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const singer = getSinger(params.slug);
  return { title: singer?.name ?? "Singer" };
}

export default function SingerPage({ params }: { params: Params }) {
  const singer = getSinger(params.slug);
  if (!singer) notFound();
  const ghazals = ghazalsBySinger(singer.id);
  const poets = poetsForSinger(singer.id);
  const albums = albumsForSinger(singer.id);
  const related = relatedSingers(singer);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,0.85fr)_1.15fr]">
        <div className="photo-plate -rotate-[0.5deg]">
          <Portrait src={singer.photo} name={singer.name} className="aspect-[4/5]" />
        </div>
        <div>
          <p className="kicker">{singer.honorific}</p>
          <h1 className="display mt-3 text-5xl uppercase tracking-wide text-burgundy-deep sm:text-6xl">
            {singer.name}
          </h1>
          <p className="mt-4 font-display text-2xl italic text-ink-fade">{singer.shortBio}</p>
          <p className="mt-6 max-w-xl font-display text-lg leading-relaxed text-ink-soft">
            {singer.bio}
          </p>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] tracking-[0.18em] text-ink-fade">
            <div>
              <dt className="text-burgundy">ERA</dt>
              <dd className="mt-1 text-ink">{singer.era}</dd>
            </div>
            {singer.born ? (
              <div>
                <dt className="text-burgundy">BORN</dt>
                <dd className="mt-1 text-ink">
                  {singer.born}
                  {singer.died ? ` – ${singer.died}` : ""}
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="text-burgundy">IN THE LEDGER</dt>
              <dd className="mt-1 text-ink">{ghazals.length} ghazals</dd>
            </div>
          </dl>
          <div className="mt-8">
            <SpotifyButton href={singerListenUrl(singer)} label="Play All on Spotify" variant="solid" />
          </div>
        </div>
      </div>

      <nav className="mt-14 flex flex-wrap gap-5 border-y border-burgundy/20 py-3 font-mono text-[10px] tracking-[0.22em] text-burgundy">
        <a href="#about">ABOUT</a>
        <a href="#ghazals">ESSENTIAL GHAZALS</a>
        <a href="#albums">ALBUMS</a>
        <a href="#poets">POETS</a>
        <a href="#related">RELATED VOICES</a>
      </nav>

      <section id="about" className="py-12">
        <h2 className="display text-4xl text-burgundy-deep">About</h2>
        <p className="mt-4 max-w-3xl font-display text-lg leading-relaxed text-ink-soft">{singer.bio}</p>
      </section>

      <section id="ghazals" className="py-8">
        <h2 className="display mb-6 text-4xl text-burgundy-deep">Essential Ghazals</h2>
        <ArchiveList items={ghazals} includeExtras extraSingerId={singer.id} />
      </section>

      {albums.length > 0 && (
        <section id="albums" className="py-8">
          <h2 className="display mb-6 text-4xl text-burgundy-deep">Albums</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {albums.map((a) => (
              <li key={a.id} className="border border-burgundy/15 px-4 py-3">
                <Link href={`/albums/${a.slug}`} className="font-display text-2xl hover:text-burgundy">
                  {a.title}
                </Link>
                <p className="font-mono text-[10px] tracking-[0.16em] text-ink-ghost">
                  {a.year ?? "Year unrecorded"}
                  {a.note ? ` · ${a.note}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {poets.length > 0 && (
        <section id="poets" className="py-8">
          <h2 className="display mb-6 text-4xl text-burgundy-deep">Poets</h2>
          <div className="flex flex-wrap gap-3">
            {poets.map((p) => (
              <Link
                key={p.id}
                href={`/poets/${p.slug}`}
                className="border border-burgundy/20 px-4 py-2 font-display text-lg hover:border-burgundy/50"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section id="related" className="py-8">
        <h2 className="display mb-6 text-4xl text-burgundy-deep">Related Voices</h2>
        <div className="flex flex-wrap gap-4">
          {related.map((s) => (
            <Link key={s.id} href={`/singers/${s.slug}`} className="font-display text-xl italic hover:text-burgundy">
              {s.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
