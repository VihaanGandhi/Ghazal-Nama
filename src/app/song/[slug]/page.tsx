import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlayTrack } from "@/components/PlayTrack";
import { allTracks, moreBy, trackBySlug } from "@/lib/tracks";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return allTracks().map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const track = trackBySlug(params.slug);
  return { title: track ? `${track.title} — ${track.singer}` : "Ghazal" };
}

export default function SongPage({ params }: Props) {
  const track = trackBySlug(params.slug);
  if (!track) notFound();

  const queue = allTracks();
  const others = moreBy(track);

  return (
    <article>
      <Link href="/" className="kicker mt-8 inline-block hover:text-accent">
        ← All {queue.length} ghazals
      </Link>

      <h1 className="mt-4 max-w-3xl font-display text-[34px] leading-[1.1] tracking-tight text-ink sm:text-[52px]">
        {track.title}
      </h1>

      {track.titleUrdu && (
        <p dir="rtl" lang="ur" className="mt-4 font-urdu text-2xl leading-[2.2] text-graphite sm:text-3xl">
          {track.titleUrdu}
        </p>
      )}

      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-graphite">
        {track.singer}
        {track.poet ? ` · ${track.poet}` : ""}
        {track.year ? ` · ${track.year}` : ""}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-4 border-y border-rule py-6">
        <PlayTrack track={track} queue={queue} />
        {track.source && <p className="text-[13px] text-faint">{track.source}</p>}
      </div>

      {others.length > 0 && (
        <section className="mt-12">
          <h2 className="kicker border-b border-rule pb-3">More by {track.singer}</h2>
          <ul>
            {others.map((other) => (
              <li key={other.id}>
                <Link href={`/song/${other.slug}`} className="row px-1 hover:bg-parch/60 sm:px-2">
                  <span className="row-title block truncate">{other.title}</span>
                  <span className="row-meta hidden truncate sm:block">{other.singer}</span>
                  <span className="row-year hidden sm:block">{other.year ?? ""}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
