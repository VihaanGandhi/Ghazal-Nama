import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { Plate } from "@/components/Plate";
import { getSingers, singerCount } from "@/lib/catalog";
import { ghazalsBySinger } from "@/lib/catalog";
import { recordings } from "@/data/recordings";
import { PlayChip } from "@/components/PlayChip";

export const metadata: Metadata = {
  title: "Voices",
  description: "Ten singers who carried the ghazal — from Begum Akhtar to Hariharan.",
};

export default function SingersPage() {
  const singers = getSingers();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionLabel index="01" title="The voices" note="Ten rooms, ten weathers" />
      <h1 className="display display-wonk max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.92] text-bone">
        The archive is a catalogue of rooms. These are the people who kept them.
      </h1>

      <ul className="mt-16 divide-y divide-bone/8 border-y border-bone/10">
        {singers.map((singer, i) => {
          const items = ghazalsBySinger(singer.id);
          const playable = items.filter((g) => recordings[g.id]);
          const opener = playable[0] ?? items[0];

          return (
            <li key={singer.id}>
              <Reveal delay={i * 40}>
                <div className="group grid grid-cols-[auto_1fr] items-center gap-5 py-8 transition-colors sm:grid-cols-[auto_1.2fr_1fr_auto] sm:gap-8">
                  <Link
                    href={`/singers/${singer.slug}`}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-bone/12 sm:h-28 sm:w-28"
                  >
                    {singer.photo ? (
                      <Plate
                        src={singer.photo}
                        alt={singer.name}
                        sizes="(max-width: 640px) 40vw, 160px"
                        className="h-full w-full transition-transform duration-[1400ms] ease-silk group-hover:scale-110"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center bg-night-300 font-display text-3xl text-bone-faint">
                        {singer.name.charAt(0)}
                      </span>
                    )}
                  </Link>

                  <div className="min-w-0">
                    <span className="font-mono text-[10px] text-ember">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Link href={`/singers/${singer.slug}`}>
                      <h2 className="display text-4xl leading-tight text-bone transition-colors group-hover:text-ember-soft sm:text-5xl">
                        {singer.name}
                      </h2>
                    </Link>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
                      {singer.honorific} · {singer.era}
                      {singer.born ? ` · ${singer.born}–${singer.died ?? ""}` : ""}
                    </p>
                  </div>

                  <p className="hidden max-w-md text-sm leading-relaxed text-bone-mute sm:block">
                    {singer.shortBio}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="display text-2xl text-bone">{singerCount(singer.id)}</p>
                      <p className="font-mono text-[9px] uppercase tracking-wideish text-bone-faint">
                        {playable.length} in room
                      </p>
                    </div>
                    {opener && (
                      <PlayChip
                        ghazalId={opener.id}
                        queueIds={playable.map((g) => g.id)}
                      />
                    )}
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
