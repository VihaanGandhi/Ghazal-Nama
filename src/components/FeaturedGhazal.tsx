import Link from "next/link";
import { getFeaturedGhazal, poetOf, singerOf } from "@/lib/catalog";
import { ghazalListenUrl } from "@/lib/spotify";
import { CoverArt } from "./CoverArt";
import { PlayButton } from "./PlayButton";
import { SpotifyButton } from "./SpotifyButton";
import { SectionHeader } from "./SectionHeader";

export function FeaturedGhazal() {
  const ghazal = getFeaturedGhazal();
  const singer = singerOf(ghazal);
  const poet = poetOf(ghazal);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeader
        kicker="On the turntable"
        title="Tonight's Ghazal"
        subtitle="One recording. The rest of the night can wait."
      />
      <div className="grid items-stretch gap-8 md:grid-cols-[minmax(0,0.9fr)_1.1fr]">
        <div className="relative overflow-hidden border border-[#2a2a35] bg-[#121218] rotate-[-0.6deg]">
          <CoverArt ghazal={ghazal} className="aspect-square" />
        </div>
        <div className="flex flex-col justify-center border border-[#2a2a35] bg-[#121218] px-6 py-8 sm:px-10">
          {ghazal.titleUrdu ? (
            <p className="urdu text-3xl text-[#b08d3e]/80">{ghazal.titleUrdu}</p>
          ) : null}
          <h3 className="display mt-3 text-5xl text-[#e8e6e3] sm:text-6xl">{ghazal.title}</h3>
          <p className="mt-4 font-display text-2xl italic text-[#a09a8e]">{singer?.name}</p>
          <p className="mt-4 max-w-lg font-display text-lg italic leading-relaxed text-[#a09a8e]/80">
            {ghazal.excerpt ? `"${ghazal.excerpt}…"` : ghazal.description}
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-4 font-mono text-[10px] tracking-[0.18em] text-[#a09a8e] sm:grid-cols-4">
            <div>
              <dt className="text-[#b08d3e]">SINGER</dt>
              <dd className="mt-1 text-[#e8e6e3]">
                {singer ? <Link href={`/singers/${singer.slug}`} className="hover:text-[#b08d3e]">{singer.name}</Link> : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-[#b08d3e]">POET</dt>
              <dd className="mt-1 text-[#e8e6e3]">
                {poet ? <Link href={`/poets/${poet.slug}`} className="hover:text-[#b08d3e]">{poet.name}</Link> : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-[#b08d3e]">ERA</dt>
              <dd className="mt-1 text-[#e8e6e3]">{ghazal.era ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-[#b08d3e]">DURATION</dt>
              <dd className="mt-1 text-[#e8e6e3]">{ghazal.duration ?? "—"}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PlayButton ghazal={ghazal} className="h-12 w-12" />
            <Link href={`/ghazals/${ghazal.slug}`} className="btn btn-ghost">
              Sleeve notes
            </Link>
            <SpotifyButton href={ghazalListenUrl(ghazal, singer?.name)} variant="gold" />
          </div>
        </div>
      </div>
    </section>
  );
}
