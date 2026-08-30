import type { Metadata } from "next";
import { SectionLabel } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { CollectionCard } from "@/components/Cards";
import { getCollections } from "@/lib/catalog";
import { recordings } from "@/data/recordings";

export const metadata: Metadata = {
  title: "Collections",
  description: "Sittings, assembled with intent — programmes rather than playlists.",
};

export default function CollectionsPage() {
  const collections = getCollections();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionLabel index="01" title="Collections" note={`${collections.length} sittings`} />
      <h1 className="display display-wonk max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.92] text-bone">
        Programmes, not playlists. Each one is a sitting with a beginning.
      </h1>

      <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection, i) => {
          const playable = collection.ghazal_ids.filter((id) => recordings[id]).length;
          return (
            <Reveal key={collection.id} delay={(i % 3) * 60}>
              <div className="flex h-full flex-col">
                <CollectionCard collection={collection} className="flex-1" />
                <p className="mt-3 pl-1 font-mono text-[10px] uppercase tracking-wideish text-ember/70">
                  {playable} of {collection.ghazal_ids.length} play here
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
