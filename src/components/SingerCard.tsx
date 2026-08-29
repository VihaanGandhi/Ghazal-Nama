import Link from "next/link";
import type { Singer } from "@/lib/types";
import { singerCount } from "@/lib/catalog";
import { Portrait } from "./Portrait";

export function SingerCard({ singer, index = 0 }: { singer: Singer; index?: number }) {
  const count = singerCount(singer.id);
  const rotate = index % 2 === 0 ? "-rotate-[0.8deg]" : "rotate-[0.7deg]";

  return (
    <Link href={`/singers/${singer.slug}`} className="group block">
      <article className={`photo-plate ${rotate} transition duration-500 group-hover:-translate-y-1`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-burgundy-deep">
          <Portrait src={singer.photo} name={singer.name} className="h-full w-full" />
          <div className="absolute inset-0 bg-burgundy-deep/0 transition group-hover:bg-burgundy-deep/35" />
          <span className="absolute inset-x-0 bottom-0 translate-y-2 px-4 pb-4 font-mono text-[10px] tracking-[0.32em] text-ivory opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
            EXPLORE
          </span>
        </div>
        <div className="px-1 pt-3">
          <p className="font-display text-2xl leading-tight text-burgundy-deep">{singer.name}</p>
          <p className="mt-1 font-display text-sm italic text-ink-fade">{singer.shortBio}</p>
          <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-burgundy/80">
            {count} GHAZALS · {singer.era}
          </p>
        </div>
      </article>
    </Link>
  );
}
