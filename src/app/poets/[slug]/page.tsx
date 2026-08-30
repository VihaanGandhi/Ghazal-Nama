import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveList } from "@/components/ArchiveList";
import { Portrait } from "@/components/Portrait";
import { ghazalsByPoet, getPoet, getPoets } from "@/lib/catalog";

type Params = { slug: string };

export function generateStaticParams() {
  return getPoets().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const poet = getPoet(params.slug);
  return { title: poet?.name ?? "Poet" };
}

export default function PoetPage({ params }: { params: Params }) {
  const poet = getPoet(params.slug);
  if (!poet) notFound();
  const ghazals = ghazalsByPoet(poet.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="grid gap-10 md:grid-cols-[200px_1fr]">
        <div className="relative h-fit overflow-hidden border border-[#2a2a35] bg-[#121218]">
          <Portrait src={poet.photo} name={poet.name} className="aspect-[3/4]" />
        </div>
        <div>
          <p className="kicker">{poet.years ?? "The diwan"}</p>
          <h1 className="display mt-3 text-5xl text-[#e8e6e3]">{poet.name}</h1>
          <p className="mt-4 font-display text-2xl italic text-[#a09a8e]">{poet.shortBio}</p>
          <p className="mt-6 max-w-2xl font-display text-lg leading-relaxed text-[#a09a8e]">{poet.bio}</p>
        </div>
      </div>
      <section className="mt-14">
        <h2 className="display mb-6 text-4xl text-[#e8e6e3]">Sung in the archive</h2>
        {ghazals.length ? (
          <ArchiveList items={ghazals} />
        ) : (
          <p className="font-display italic text-[#a09a8e]">
            Recordings of this poet have not yet been entered in the ledger.
          </p>
        )}
      </section>
    </div>
  );
}
