import Link from "next/link";
import { eras } from "@/data";
import { getSinger } from "@/lib/catalog";

export function EraTimeline() {
  return (
    <div className="relative">
      <div className="mb-6 hidden h-px bg-[#2a2a35] md:block" />
      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
        {eras.map((era) => (
          <Link
            key={era.id}
            href={`/eras/${era.id}`}
            className="min-w-[220px] snap-start border border-[#2a2a35] bg-[#121218] p-4 transition hover:border-[#b08d3e]/40 hover:bg-[#1a1a24]"
          >
            <p className="font-display text-3xl text-[#b08d3e]">{era.label}</p>
            <p className="mt-2 font-display text-sm italic leading-relaxed text-[#a09a8e]">
              {era.description}
            </p>
            <p className="mt-3 font-mono text-[10px] tracking-[0.14em] text-[#a09a8e]/60">
              {era.singer_ids
                .map((id) => getSinger(id)?.name)
                .filter(Boolean)
                .slice(0, 3)
                .join(" · ")}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
