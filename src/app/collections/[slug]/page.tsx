import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Divider, SectionLabel } from "@/components/Ornament";
import { TrackList } from "@/components/TrackList";
import { CollectionPlay } from "@/components/CollectionPlay";
import { collectionGhazals, getCollection, getCollections } from "@/lib/catalog";
import { recordings } from "@/data/recordings";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return getCollections().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const collection = getCollection(params.slug);
  return { title: collection?.title ?? "Collection", description: collection?.description ?? "" };
}

export default function CollectionPage({ params }: Params) {
  const collection = getCollection(params.slug);
  if (!collection) notFound();

  const items = collectionGhazals(collection);
  const playable = items.filter((g) => recordings[g.id]);
  const others = getCollections().filter((c) => c.id !== collection.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="kicker mb-6">{collection.kicker ?? "Collection"}</p>
      <div className="grid items-end gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <h1 className="display display-wonk text-[clamp(2.6rem,8vw,6rem)] leading-[0.9] text-bone">
          {collection.title}
        </h1>
        <div>
          <p className="lede text-xl">{collection.description}</p>
          <div className="mt-6">
            <CollectionPlay ghazalId={playable[0]?.id ?? items[0]?.id} queueIds={items.map((g) => g.id)} />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-6 font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
        <span>{items.length} recordings</span>
        <span className="text-ember">{playable.length} confirmed in the room</span>
      </div>

      <section className="mt-16">
        <SectionLabel
          index="01"
          title="The sitting, in order"
          note="Playable recordings lead; the rest follow for reference."
        />
        <TrackList ids={items.map((g) => g.id)} />
      </section>

      <section className="mt-20">
        <SectionLabel index="02" title="Other sittings" />
        <ul className="flex flex-wrap gap-3">
          {others.map((other) => (
            <li key={other.id}>
              <Link href={`/collections/${other.slug}`} className="btn btn-ghost">
                {other.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Divider className="mt-20" />
    </div>
  );
}
