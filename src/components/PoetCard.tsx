import Link from "next/link";
import type { Poet } from "@/lib/types";
import { poetCount } from "@/lib/catalog";
import { Portrait } from "./Portrait";

export function PoetCard({ poet }: { poet: Poet }) {
  const count = poetCount(poet.id);
  return (
    <Link href={`/poets/${poet.slug}`} className="group block border border-[#2a2a35] bg-[#121218] p-4 transition hover:border-[#b08d3e]/40 hover:bg-[#1a1a24]">
      <div className="flex gap-4">
        <div className="h-20 w-16 shrink-0 overflow-hidden border border-[#2a2a35]">
          <Portrait src={poet.photo} name={poet.name} className="h-full w-full" />
        </div>
        <div>
          <p className="kicker">{poet.years ?? "The diwan"}</p>
          <h3 className="mt-1 font-display text-2xl leading-tight text-[#e8e6e3] group-hover:text-[#b08d3e]">
            {poet.name}
          </h3>
          <p className="mt-1 font-display text-sm italic text-[#a09a8e]">{poet.shortBio}</p>
          <p className="mt-2 font-mono text-[10px] tracking-[0.18em] text-[#a09a8e]/60">
            {count} RECORDINGS IN THE ARCHIVE
          </p>
        </div>
      </div>
    </Link>
  );
}
