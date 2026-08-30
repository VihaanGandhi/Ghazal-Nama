import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchiveList } from "@/components/ArchiveList";
import { ghazalsByAlbum, getAlbum, getAlbums, getSinger } from "@/lib/catalog";

type Params = { slug: string };

export function generateStaticParams() {
  return getAlbums().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const a = getAlbum(params.slug);
  return { title: a?.title ?? "Album" };
}

export default function AlbumPage({ params }: { params: Params }) {
  const album = getAlbum(params.slug);
  if (!album) notFound();
  const items = ghazalsByAlbum(album.id);
  const singer = album.singer_id ? getSinger(album.singer_id) : undefined;

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="kicker">{album.note ?? "Album"}</p>
      <h1 className="display mt-3 text-5xl text-[#e8e6e3]">{album.title}</h1>
      <p className="mt-3 font-display text-xl italic text-[#a09a8e]">
        {singer ? (
          <Link href={`/singers/${singer.slug}`} className="hover:text-[#b08d3e]">
            {singer.name}
          </Link>
        ) : (
          "Various"
        )}
        {album.year ? ` · ${album.year}` : ""}
      </p>
      <div className="mt-10">
        {items.length ? (
          <ArchiveList items={items} />
        ) : (
          <p className="font-display italic text-[#a09a8e]">
            No recordings from this album have been entered yet.
          </p>
        )}
      </div>
    </div>
  );
}
