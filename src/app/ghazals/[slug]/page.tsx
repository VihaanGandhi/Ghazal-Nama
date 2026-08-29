import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CoverArt } from "@/components/CoverArt";
import { GhazalList } from "@/components/GhazalList";
import { PlayButton } from "@/components/PlayButton";
import { SpotifyButton } from "@/components/SpotifyButton";
import {
  albumOf,
  getGhazal,
  getGhazals,
  moreBySinger,
  otherRenditions,
  poetOf,
  similarGhazals,
  singerOf,
} from "@/lib/catalog";
import { ghazalListenUrl } from "@/lib/spotify";

type Params = { slug: string };

export function generateStaticParams() {
  return getGhazals().map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const g = getGhazal(params.slug);
  return { title: g ? g.title : "Ghazal" };
}

export default function GhazalPage({ params }: { params: Params }) {
  const ghazal = getGhazal(params.slug);
  if (!ghazal) notFound();
  const singer = singerOf(ghazal);
  const poet = poetOf(ghazal);
  const album = albumOf(ghazal);
  const renditions = otherRenditions(ghazal);
  const more = moreBySinger(ghazal);
  const similar = similarGhazals(ghazal);
  const listen = ghazalListenUrl(ghazal, singer?.name);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="kicker">Sleeve notes</p>
      <div className="mt-6 grid items-start gap-10 md:grid-cols-[minmax(0,0.9fr)_1.1fr]">
        <div className="photo-plate">
          <CoverArt ghazal={ghazal} className="aspect-square" />
        </div>
        <div>
          {ghazal.titleUrdu ? (
            <p className="urdu text-3xl text-burgundy/75">{ghazal.titleUrdu}</p>
          ) : null}
          <h1 className="display mt-2 text-5xl uppercase text-burgundy-deep sm:text-6xl">
            {ghazal.title}
          </h1>
          <p className="mt-4 font-display text-2xl italic">
            {singer ? (
              <Link href={`/singers/${singer.slug}`} className="hover:text-burgundy">
                {singer.name}
              </Link>
            ) : null}
          </p>
          {ghazal.excerpt ? (
            <p className="mt-6 font-display text-xl italic leading-relaxed text-ink-fade">
              “{ghazal.excerpt}”
            </p>
          ) : null}

          <dl className="mt-8 space-y-3 border-y border-burgundy/20 py-6 font-mono text-[11px] tracking-[0.16em]">
            <Row label="Poet">
              {poet ? <Link href={`/poets/${poet.slug}`}>{poet.name}</Link> : "Unrecorded"}
            </Row>
            <Row label="Singer">
              {singer ? <Link href={`/singers/${singer.slug}`}>{singer.name}</Link> : "Unrecorded"}
            </Row>
            <Row label="Era">
              {ghazal.era ? <Link href={`/eras/${ghazal.era}`}>{ghazal.era}</Link> : "Unrecorded"}
            </Row>
            <Row label="Mood">
              {ghazal.mood ? (
                <Link href={`/moods/${ghazal.mood}`} className="capitalize">
                  {ghazal.mood}
                </Link>
              ) : (
                "Unrecorded"
              )}
            </Row>
            <Row label="Year">{ghazal.year ?? "Unrecorded"}</Row>
            <Row label="Album">
              {album ? <Link href={`/albums/${album.slug}`}>{album.title}</Link> : "Unrecorded"}
            </Row>
            <Row label="Duration">{ghazal.duration ?? "Unrecorded"}</Row>
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PlayButton ghazal={ghazal} className="h-14 w-14" />
            <SpotifyButton href={listen} variant="solid" />
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="display text-4xl text-burgundy-deep">About this Ghazal</h2>
        <p className="mt-4 max-w-3xl font-display text-lg leading-relaxed text-ink-soft">
          {ghazal.description ??
            `${ghazal.title} is held in the Ghazal Nama ledger as a recording by ${
              singer?.name ?? "an unrecorded singer"
            }${poet ? `, from a ghazal by ${poet.name}` : ""}. Where album, year or duration could not be confirmed, the field has been left empty rather than guessed.`}
        </p>
      </section>

      {poet && (
        <section className="mt-12 border border-burgundy/15 bg-ivory-soft/50 p-6">
          <p className="kicker">The poet</p>
          <h3 className="mt-2 font-display text-3xl">
            <Link href={`/poets/${poet.slug}`} className="hover:text-burgundy">
              {poet.name}
            </Link>
          </h3>
          <p className="mt-3 max-w-2xl font-display italic text-ink-fade">{poet.bio}</p>
        </section>
      )}

      {renditions.length > 0 && (
        <section className="mt-12">
          <h2 className="display mb-4 text-4xl text-burgundy-deep">Other Renditions</h2>
          <GhazalList items={renditions} />
        </section>
      )}

      {more.length > 0 && singer && (
        <section className="mt-12">
          <h2 className="display mb-4 text-4xl text-burgundy-deep">More by {singer.name}</h2>
          <GhazalList items={more} />
        </section>
      )}

      {similar.length > 0 && (
        <section className="mt-12">
          <h2 className="display mb-4 text-4xl text-burgundy-deep">Similar Ghazals</h2>
          <GhazalList items={similar} />
        </section>
      )}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-4">
      <dt className="text-burgundy">{label}</dt>
      <dd className="text-ink">{children}</dd>
    </div>
  );
}
