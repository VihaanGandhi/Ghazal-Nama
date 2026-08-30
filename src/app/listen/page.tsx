import type { Metadata } from "next";
import { ArchiveList } from "@/components/ArchiveList";
import { Cassette } from "@/components/Cassette";
import { VinylDisc } from "@/components/Ornament";
import { SpotifyButton } from "@/components/SpotifyButton";
import { collectionGhazals, getCollection, getFeaturedGhazal, singerOf } from "@/lib/catalog";
import { ghazalListenUrl } from "@/lib/spotify";

export const metadata: Metadata = { title: "Listen" };

export default function ListenPage() {
  const tonight = getCollection("tonights-mehfil");
  const items = tonight ? collectionGhazals(tonight) : [];
  const featured = getFeaturedGhazal();
  const singer = singerOf(featured);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col items-center">
          <p className="kicker mb-6">On air</p>
          <VinylDisc className="h-56 w-56" label="SIDE A" />
          <p className="mt-6 font-mono text-[10px] tracking-[0.28em] text-[#b08d3e]">
            GHAZAL NAMA RADIO  ·  LATE NIGHT
          </p>
          <div className="mt-8 w-full">
            <Cassette />
          </div>
        </div>
        <div>
          <h1 className="display text-5xl text-[#e8e6e3]">Listen</h1>
          <p className="mt-4 max-w-xl font-display text-xl italic text-[#a09a8e]">
            A programme, not a shuffle. Playback lives on Spotify; the sitting lives here.
          </p>
          <p className="mt-6 font-display text-lg text-[#a09a8e]">
            Now on the turntable: <span className="italic text-[#e8e6e3]">{featured.title}</span>
            {singer ? ` — ${singer.name}` : ""}.
          </p>
          <div className="mt-6">
            <SpotifyButton href={ghazalListenUrl(featured, singer?.name)} variant="solid" />
          </div>
        </div>
      </div>
      <section className="mt-16">
        <h2 className="display mb-6 text-4xl text-[#e8e6e3]">Tonight&apos;s programme</h2>
        <ArchiveList items={items} />
      </section>
    </div>
  );
}
