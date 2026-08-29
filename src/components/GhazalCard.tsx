import Link from "next/link";
import type { Ghazal } from "@/lib/types";
import { poetOf, singerOf } from "@/lib/catalog";
import { CoverArt } from "./CoverArt";
import { PlayButton } from "./PlayButton";

export function GhazalCard({ ghazal }: { ghazal: Ghazal }) {
  const singer = singerOf(ghazal);
  const poet = poetOf(ghazal);
  return (
    <article className="group border border-burgundy/15 bg-ivory-soft/50">
      <Link href={`/ghazals/${ghazal.slug}`} className="block">
        <CoverArt ghazal={ghazal} className="aspect-[4/5]" />
      </Link>
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <Link href={`/ghazals/${ghazal.slug}`} className="font-display text-2xl leading-tight hover:text-burgundy">
            {ghazal.title}
          </Link>
          <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-ink-fade">
            {singer?.name}
            {poet ? ` · ${poet.name}` : ""}
          </p>
        </div>
        <PlayButton ghazal={ghazal} />
      </div>
    </article>
  );
}
