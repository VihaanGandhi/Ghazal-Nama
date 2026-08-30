import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Divider, SectionLabel } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { StagePlayer } from "@/components/StagePlayer";
import { TrackList } from "@/components/TrackList";
import {
  albumOf,
  getGhazal,
  moreBySinger,
  otherRenditions,
  poetOf,
  recordingOf,
  similarGhazals,
  singerOf,
} from "@/lib/catalog";
import { ghazals } from "@/data";
import { ghazalListenUrl } from "@/lib/spotify";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return ghazals.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const ghazal = getGhazal(params.slug);
  if (!ghazal) return { title: "Recording not found" };
  const singer = singerOf(ghazal);
  return {
    title: ghazal.title,
    description: `${ghazal.title}${singer ? ` — ${singer.name}` : ""}. ${ghazal.description ?? ""}`,
  };
}

export default function GhazalPage({ params }: Params) {
  const ghazal = getGhazal(params.slug);
  if (!ghazal) notFound();

  const singer = singerOf(ghazal);
  const poet = poetOf(ghazal);
  const album = albumOf(ghazal);
  const recording = recordingOf(ghazal);
  const renditions = otherRenditions(ghazal);
  const more = moreBySinger(ghazal, 8);
  const similar = similarGhazals(ghazal, 8);
  const queueIds = [ghazal.id, ...more.map((g) => g.id), ...similar.map((g) => g.id)];

  const facts: [string, React.ReactNode][] = [
    ["Voice", singer ? <Link href={`/singers/${singer.slug}`}>{singer.name}</Link> : "—"],
    ["Words", poet ? <Link href={`/poets/${poet.slug}`}>{poet.name}</Link> : "not attributed"],
    ["Album", album ? <Link href={`/albums/${album.slug}`}>{album.title}</Link> : "—"],
    ["Year", ghazal.year ? String(ghazal.year) : "—"],
    ["Era", ghazal.era ? <Link href={`/eras/${ghazal.era}`}>{ghazal.era}</Link> : "—"],
    ["Mood", ghazal.mood ? <Link href={`/moods/${ghazal.mood}`}>{ghazal.mood}</Link> : "—"],
    ["Length", ghazal.duration ?? "—"],
    [
      "Source",
      recording ? (
        <a
          href={`https://www.youtube.com/watch?v=${recording.youtubeId}`}
          target="_blank"
          rel="noreferrer"
        >
          {recording.source}
        </a>
      ) : (
        <a href={ghazalListenUrl(ghazal, singer?.name)} target="_blank" rel="noreferrer">
          not confirmed — search
        </a>
      ),
    ],
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <nav className="mb-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
        <Link href="/archive" className="transition-colors hover:text-ember">
          Archive
        </Link>
        <span>/</span>
        {singer && (
          <>
            <Link href={`/singers/${singer.slug}`} className="transition-colors hover:text-ember">
              {singer.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-bone-mute">{ghazal.title}</span>
      </nav>

      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        {/* Sticky left: the stage */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <StagePlayer ghazal={ghazal} queueIds={queueIds} />

          <dl className="panel mt-6 divide-y divide-bone/8">
            {facts.map(([label, value]) => (
              <div key={label} className="flex items-baseline justify-between gap-6 px-5 py-3">
                <dt className="font-mono text-[10px] uppercase tracking-kicker text-bone-faint">
                  {label}
                </dt>
                <dd className="text-right text-sm text-bone [&_a]:border-b [&_a]:border-bone/20 [&_a]:transition-colors hover:[&_a]:border-ember hover:[&_a]:text-ember-soft">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: the poem and its company */}
        <div>
          <p className="kicker mb-4">
            {ghazal.mood ?? "ghazal"}
            {ghazal.year ? ` · ${ghazal.year}` : ""}
          </p>
          <h1 className="display display-wonk text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.94] text-bone">
            {ghazal.title}
          </h1>

          {ghazal.titleUrdu && (
            <p className="urdu mt-6 text-3xl leading-[2.6] text-ember-soft/90">{ghazal.titleUrdu}</p>
          )}

          {ghazal.excerpt && (
            <Reveal>
              <blockquote className="mt-8 border-l border-ember/40 pl-6">
                <p className="display display-wonk text-2xl italic leading-snug text-bone-mute sm:text-3xl">
                  {ghazal.excerpt}
                </p>
              </blockquote>
            </Reveal>
          )}

          {ghazal.description && (
            <Reveal delay={80}>
              <div className="mt-10 max-w-2xl space-y-5 text-[17px] leading-relaxed text-bone-mute">
                <p>{ghazal.description}</p>
              </div>
            </Reveal>
          )}

          {singer && (
            <Reveal delay={120}>
              <Link
                href={`/singers/${singer.slug}`}
                className="group mt-12 flex items-center gap-5 border-t border-bone/10 pt-8"
              >
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-bone/15">
                  {singer.photo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={singer.photo}
                      alt=""
                      className="duotone h-full w-full object-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-110"
                    />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="kicker block">{singer.honorific ?? "voice"}</span>
                  <span className="display mt-1 block text-2xl text-bone transition-colors group-hover:text-ember-soft">
                    {singer.name}
                  </span>
                  <span className="mt-1 block text-sm text-bone-faint">{singer.shortBio}</span>
                </span>
              </Link>
            </Reveal>
          )}

          {renditions.length > 0 && (
            <section className="mt-16">
              <SectionLabel
                index="02"
                title="Other renditions"
                note="The same poem, carried by another voice."
              />
              <TrackList ids={renditions.map((g) => g.id)} showYear />
            </section>
          )}

          {more.length > 0 && (
            <section className="mt-16">
              <SectionLabel index="03" title={`More by ${singer?.name ?? "this voice"}`} />
              <TrackList ids={more.map((g) => g.id)} showPoet />
            </section>
          )}

          {similar.length > 0 && (
            <section className="mt-16">
              <SectionLabel index="04" title="Kept nearby" note="Same weather, same poets." />
              <TrackList ids={similar.map((g) => g.id)} />
            </section>
          )}
        </div>
      </div>

      <Divider className="mt-20" />
    </div>
  );
}
