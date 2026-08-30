import Link from "next/link";
import { Marquee } from "@/components/Marquee";
import { Platter, SectionLabel } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { Scramble } from "@/components/Scramble";
import { TrackList } from "@/components/TrackList";
import { CollectionCard, MoodCard, PoetCard, SingerCard } from "@/components/Cards";
import { HeroPlay } from "@/components/HeroPlay";
import {
  ARCHIVE_TOTAL,
  collectionGhazals,
  getCollection,
  getCollections,
  getEras,
  getMoods,
  getPoets,
  getSingers,
  ghazalsByEra,
  ghazalsByMood,
  playableCount,
} from "@/lib/catalog";

const TICKER = [
  { text: "ranjish hi sahi, dil hi dukhaane ke liye aa", credit: "Faraz · Mehdi Hassan" },
  { text: "hazaaron khwahishen aisi ke har khwahish pe dam nikle", credit: "Ghalib · Jagjit Singh" },
  { text: "chupke chupke raat din aansoo bahaana yaad hai", credit: "Hasrat · Ghulam Ali" },
  { text: "aaj jaane ki zid na karo", credit: "Fayyaz Hashmi · Farida Khanum" },
  { text: "gulon mein rang bhare baad-e-nau-bahaar chale", credit: "Faiz · Mehdi Hassan" },
  { text: "woh jo hum mein tum mein qaraar tha", credit: "Momin · Begum Akhtar" },
];

export default function HomePage() {
  const tonight = getCollection("tonights-mehfil");
  const programme = tonight ? collectionGhazals(tonight) : [];
  const singers = getSingers();
  const moods = getMoods();
  const eras = getEras();
  const collections = getCollections();
  const poets = getPoets().filter((p) => p.featured).slice(0, 4);

  return (
    <>
      {/* ————— 01 · The room opens ————— */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-lamp-glow opacity-90" aria-hidden />
        <div className="mx-auto grid max-w-7xl gap-14 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:pt-24">
          <div>
            <Reveal>
              <p className="kicker mb-8">
                An archive of South Asian ghazal · {ARCHIVE_TOTAL} recordings
              </p>
              <h1 className="display display-wonk text-[clamp(3.4rem,11vw,9rem)] leading-[0.86] text-bone">
                <Scramble text="Ghazal" />
                <span className="block pl-[0.12em] text-ember">
                  <Scramble text="Nama" />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="urdu mt-8 text-2xl text-bone-mute/80">غزل نامہ</p>
              <p className="lede mt-6 max-w-xl text-xl sm:text-2xl">
                The catalogue is the memory. The listening room is the mercy — every recording
                marked <span className="text-ember-soft not-italic">in the room</span> plays
                here, in full, without leaving the page.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <HeroPlay ghazalId={programme[0]?.id ?? "gh-021"} queueIds={programme.map((g) => g.id)} />
                <Link href="/archive" className="btn btn-ghost">
                  Enter the archive
                </Link>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <dl className="mt-16 grid max-w-2xl grid-cols-2 gap-px overflow-hidden border border-bone/10 bg-bone/10 sm:grid-cols-4">
                {[
                  { k: "recordings", v: String(ARCHIVE_TOTAL) },
                  { k: "in the room", v: String(playableCount()) },
                  { k: "voices", v: String(singers.length) },
                  { k: "poets", v: String(getPoets().length) },
                ].map((stat) => (
                  <div key={stat.k} className="bg-night px-5 py-6">
                    <dt className="font-mono text-[10px] uppercase tracking-kicker text-bone-faint">
                      {stat.k}
                    </dt>
                    <dd className="display mt-2 text-4xl text-bone">{stat.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* The platter: what is spinning before you press anything */}
          <Reveal delay={160} className="relative flex flex-col items-center justify-center gap-10">
            <div className="relative">
              <Platter className="h-64 w-64 sm:h-80 sm:w-80" />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-kicker text-bone-faint">
                side a · tonight
              </span>
            </div>
            {programme[0] && (
              <div className="w-full max-w-sm border-t border-bone/10 pt-6">
                <p className="kicker mb-2">Opening the night</p>
                <p className="display text-3xl leading-tight text-bone">{programme[0].title}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
                  {programme[0].excerpt}
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <Marquee items={TICKER} />

      {/* ————— 02 · Tonight ————— */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionLabel
          index="02"
          title="Tonight's programme"
          note="Ten recordings, in order. Press the first and let the rest follow."
        />
        <Reveal>
          <TrackList ids={programme.map((g) => g.id)} />
        </Reveal>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
          Programme: {tonight?.title} — {tonight?.description}
        </p>
      </section>

      {/* ————— 03 · Voices ————— */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionLabel
          index="03"
          title="The voices"
          note="Ten ways of keeping the night. Scroll the rail."
        />
        <Reveal>
          <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 sm:mx-0 sm:px-0">
            {singers.map((singer, i) => (
              <div key={singer.id} className="w-[22rem] shrink-0 snap-start">
                <SingerCard singer={singer} index={i} />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ————— 04 · Moods ————— */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionLabel index="04" title="Moods of the mehfil" note="Not genres. Weathers." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {moods.map((mood, i) => (
            <Reveal key={mood.id} delay={i * 60}>
              <MoodCard mood={mood} count={ghazalsByMood(mood.id).length} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ————— 05 · Eras ————— */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionLabel
          index="05"
          title="Eras"
          note="From the courtly 1930s to the studio 2000s."
        />
        <Reveal>
          <div className="-mx-4 flex snap-x gap-px overflow-x-auto border-y border-bone/10 bg-bone/10 px-4 sm:mx-0 sm:px-0">
            {eras.map((era) => (
              <Link
                key={era.id}
                href={`/eras/${era.id}`}
                className="group w-56 shrink-0 snap-start bg-night px-6 py-8 transition-colors hover:bg-night-200"
              >
                <span className="display block text-5xl text-bone transition-colors group-hover:text-ember">
                  {era.label}
                </span>
                <span className="mt-3 block font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
                  {ghazalsByEra(era.id).length} recordings
                </span>
                <span className="mt-4 block text-sm leading-relaxed text-bone-mute">
                  {era.description.slice(0, 96)}…
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ————— 06 · Collections ————— */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionLabel index="06" title="Collections" note="Sittings, assembled with intent." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {collections.slice(0, 6).map((collection, i) => (
            <Reveal key={collection.id} delay={i * 60}>
              <CollectionCard collection={collection} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ————— 07 · Poets ————— */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionLabel index="07" title="The poets" note="The poem is the destination." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {poets.map((poet, i) => (
            <Reveal key={poet.id} delay={i * 60}>
              <PoetCard poet={poet} />
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/poets" className="btn btn-line">
            All {getPoets().length} poets →
          </Link>
        </div>
      </section>
    </>
  );
}
