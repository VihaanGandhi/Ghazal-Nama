import Link from "next/link";
import type { Poet } from "@/lib/types";
import { poetCount } from "@/lib/catalog";
import { Portrait } from "./Portrait";

export function PoetCard({ poet }: { poet: Poet }) {
  const count = poetCount(poet.id);
  return (
    <Link href={`/poets/${poet.slug}`} className="group block border border-burgundy/20 bg-ivory-soft/70 p-4 transition hover:border-burgundy/40 hover:bg-ivory-soft">
      <div className="flex gap-4">
        <div className="h-20 w-16 shrink-0 overflow-hidden border border-burgundy/15">
          <Portrait src={poet.photo} name={poet.name} className="h-full w-full" />
        </div>
        <div>
          <p className="kicker">{poet.years ?? "The diwan"}</p>
          <h3 className="mt-1 font-display text-2xl leading-tight text-burgundy-deep group-hover:text-burgundy">
            {poet.name}
          </h3>
          <p className="mt-1 font-display text-sm italic text-ink-fade">{poet.shortBio}</p>
          <p className="mt-2 font-mono text-[10px] tracking-[0.18em] text-ink-ghost">
            {count} RECORDINGS IN THE ARCHIVE
          </p>
        </div>
      </div>
    </Link>
  );
}
