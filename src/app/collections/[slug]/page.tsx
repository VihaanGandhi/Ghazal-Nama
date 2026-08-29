import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveList } from "@/components/ArchiveList";
import { SpotifyButton } from "@/components/SpotifyButton";
import { collectionGhazals, getCollection, getCollections } from "@/lib/catalog";
import { collectionListenUrl } from "@/lib/spotify";

type Params = { slug: string };

export function generateStaticParams() {
  return getCollections().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const c = getCollection(params.slug);
  return { title: c?.title ?? "Collection" };
}

export default function CollectionPage({ params }: { params: Params }) {
  const collection = getCollection(params.slug);
  if (!collection) notFound();
  const items = collectionGhazals(collection);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="kicker">{collection.kicker ?? "Collection"}</p>
      <h1 className="display mt-3 text-5xl text-burgundy-deep">{collection.title}</h1>
      <p className="mt-4 max-w-2xl font-display text-xl italic text-ink-fade">
        {collection.description}
      </p>
      <div className="mt-6">
        <SpotifyButton
          href={collectionListenUrl(collection.title)}
          label="Listen to Collection"
          variant="gold"
        />
      </div>
      <div className="mt-10">
        <ArchiveList items={items} />
      </div>
    </div>
  );
}
