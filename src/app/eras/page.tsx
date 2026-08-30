import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { getEras, ghazalsByEra } from "@/lib/catalog";
import { recordings } from "@/data/recordings";

export const metadata: Metadata = {
  title: "Eras",
  description: "Ninety years of ghazal, decade by decade.",
};

export default function ErasPage() {
  const eras = getEras();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionLabel index="01" title="Eras" note="1930s → 2000s" />
      <h1 className="display display-wonk max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.92] text-bone">
        Ninety years of a form refusing to hurry.
      </h1>

      <ol className="mt-16 border-l border-bone/10 pl-8">
        {eras.map((era, i) => {
          const items = ghazalsByEra(era.id);
          const playable = items.filter((g) => recordings[g.id]).length;
          return (
            <li key={era.id} className="relative pb-12">
              <span className="absolute -left-[2.35rem] top-3 h-2 w-2 rounded-full bg-ember shadow-[0_0_14px_rgba(232,162,76,0.8)]" />
              <Reveal delay={i * 50}>
                <Link href={`/eras/${era.id}`} className="group block">
                  <div className="flex flex-wrap items-baseline gap-6">
                    <h2 className="display text-5xl text-bone transition-colors group-hover:text-ember sm:text-6xl">
                      {era.label}
                    </h2>
                    <span className="font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
                      {items.length} recordings · {playable} in the room
                    </span>
                  </div>
                  <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-bone-mute">
                    {era.description}
                  </p>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
