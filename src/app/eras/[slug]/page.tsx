import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchiveList } from "@/components/ArchiveList";
import { ghazalsByEra, getEra, getEras, getSinger } from "@/lib/catalog";
import { ERAS, type Era } from "@/lib/types";

type Params = { slug: string };

export function generateStaticParams() {
  return ERAS.map((e) => ({ slug: e }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  return { title: params.slug };
}

export default function EraPage({ params }: { params: Params }) {
  const era = getEra(params.slug);
  if (!era) notFound();
  const items = ghazalsByEra(params.slug as Era);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="kicker">The historical ledger</p>
      <h1 className="display mt-3 text-6xl text-[#e8e6e3]">{era.label}</h1>
      <p className="mt-4 max-w-2xl font-display text-xl italic text-[#a09a8e]">{era.description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {era.singer_ids.map((id) => {
          const s = getSinger(id);
          if (!s) return null;
          return (
            <Link key={id} href={`/singers/${s.slug}`} className="border border-[#2a2a35] bg-[#121218] px-3 py-1 font-display text-lg hover:border-[#b08d3e]/50 hover:text-[#b08d3e]">
              {s.name}
            </Link>
          );
        })}
      </div>
      <div className="mt-10">
        <ArchiveList items={items} />
      </div>
      <div className="mt-12 flex flex-wrap gap-3 font-mono text-[10px] tracking-[0.2em] text-[#b08d3e]">
        {getEras().map((e) => (
          <Link key={e.id} href={`/eras/${e.id}`} className={e.id === era.id ? "underline" : "opacity-70"}>
            {e.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
