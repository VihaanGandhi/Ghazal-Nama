import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Divider, SectionLabel } from "@/components/Ornament";
import { TrackList } from "@/components/TrackList";
import { CollectionPlay } from "@/components/CollectionPlay";
import { getAlbum, getAlbums, getSingerById, ghazalsByAlbum } from "@/lib/catalog";
import { recordings } from "@/data/recordings";
import type { Album } from "@/lib/types";
import { albums } from "@/data";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return albums.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const album = getAlbum(params.slug);
  return {
    title: album ? `${album.title} (${album.year ?? "album"})` : "Album",
    description: album?.note ?? "",
  };
}

export default function AlbumPage({ params }: Params) {
  const album: Album | undefined = getAlbum(params.slug);
  if (!album) notFound();

  const items = ghazalsByAlbum(album.id);
  const playable = items.filter((g) => recordings[g.id]);
  const singer = album.singer_id ? getSingerById(album.singer_id) : undefined;
  const related = albums
    .filter((a) => a.singer_id === album.singer_id && a.id !== album.id)
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="kicker mb-6">
            Album {album.year ? `· ${album.year}` : ""} {album.note ? `· ${album.note}` : ""}
          </p>
          <h1 className="display display-wonk text-[clamp(2.6rem,8vw,6rem)] leading-[0.9] text-bone">
            {album.title}
          </h1>
          {singer && (
            <Link
              href={`/singers/${singer.slug}`}
              className="mt-6 inline-block font-mono text-[11px] uppercase tracking-wideish text-ember transition-colors hover:text-ember-soft"
            >
              {singer.name} →
            </Link>
          )}
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
            {items.length} catalogued · <span className="text-ember">{playable.length} in the room</span>
          </p>
          {playable[0] && (
            <div className="mt-6">
              <CollectionPlay ghazalId={playable[0].id} queueIds={items.map((g) => g.id)} />
            </div>
          )}
        </div>
      </div>

      <section className="mt-16">
        <SectionLabel index="01" title="The album, as catalogued" />
        <TrackList ids={items.map((g) => g.id)} showPoet />
      </section>

      {related.length > 0 && (
        <section className="mt-20">
          <SectionLabel index="02" title="More from this voice" />
          <ul className="grid gap-px border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((other) => (
              <li key={other.id}>
                <Link
                  href={`/albums/${other.slug}`}
                  className="group flex h-full items-baseline justify-between gap-4 bg-night px-5 py-5 transition-colors hover:bg-night-200"
                >
                  <span className="font-display text-xl text-bone transition-colors group-hover:text-ember-soft">
                    {other.title}
                  </span>
                  <span className="font-mono text-[10px] tabular-nums text-bone-faint">
                    {other.year ?? "—"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Divider className="mt-20" />
    </div>
  );
}
