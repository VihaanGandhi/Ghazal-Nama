import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { getCollections } from "@/lib/catalog";

export const metadata: Metadata = { title: "Collections" };

export default function CollectionsPage() {
  const collections = getCollections();
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeader
        kicker="The shelves"
        title="Collections"
        subtitle="Not playlists. Sittings. Each with a reason to be together."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {collections.map((c) => (
          <Link
            key={c.id}
            href={`/collections/${c.slug}`}
            className="border border-[#2a2a35] bg-[#121218] p-6 transition hover:border-[#b08d3e]/40 hover:bg-[#1a1a24]"
          >
            <p className="kicker">{c.kicker}</p>
            <h2 className="mt-2 font-display text-4xl text-[#e8e6e3]">{c.title}</h2>
            <p className="mt-3 font-display italic text-[#a09a8e]">{c.description}</p>
            <p className="mt-4 font-mono text-[10px] tracking-[0.18em] text-[#a09a8e]/60">
              {c.ghazal_ids.length} RECORDINGS
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
