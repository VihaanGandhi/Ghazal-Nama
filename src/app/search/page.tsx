import type { Metadata } from "next";
import { ArchiveList } from "@/components/ArchiveList";
import { PoetCard } from "@/components/PoetCard";
import { SingerCard } from "@/components/SingerCard";
import { searchCatalog } from "@/lib/catalog";
import { SearchForm } from "./ui";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams.q ?? "";
  const results = searchCatalog(q);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="kicker">The index</p>
      <h1 className="display mt-3 text-5xl text-[#e8e6e3]">Search the archive</h1>
      <p className="mt-3 font-display italic text-[#a09a8e]">
        Ghazal, singer, poet, album, era, mood.
      </p>
      <div className="mt-8">
        <SearchForm defaultValue={q} />
      </div>
      {q ? (
        <div className="mt-12 space-y-12">
          <section>
            <h2 className="display text-3xl text-[#e8e6e3]">Ghazals</h2>
            {results.ghazals.length ? (
              <div className="mt-4">
                <ArchiveList items={results.ghazals} />
              </div>
            ) : (
              <p className="mt-3 font-display italic text-[#a09a8e]">No ghazals matched.</p>
            )}
          </section>
          {results.singers.length > 0 && (
            <section>
              <h2 className="display mb-4 text-3xl text-[#e8e6e3]">Singers</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {results.singers.map((s, i) => (
                  <SingerCard key={s.id} singer={s} index={i} />
                ))}
              </div>
            </section>
          )}
          {results.poets.length > 0 && (
            <section>
              <h2 className="display mb-4 text-3xl text-[#e8e6e3]">Poets</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {results.poets.map((p) => (
                  <PoetCard key={p.id} poet={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : null}
    </div>
  );
}
