import Link from "next/link";
import { eras } from "@/data";
import { getSinger } from "@/lib/catalog";

export function EraTimeline() {
  return (
    <div className="relative">
      <div className="mb-6 hidden h-px bg-burgundy/30 md:block" />
      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
        {eras.map((era) => (
          <Link
            key={era.id}
            href={`/eras/${era.id}`}
            className="min-w-[220px] snap-start border border-burgundy/20 bg-ivory-soft/60 p-4 transition hover:border-burgundy/40"
          >
            <p className="font-display text-3xl text-burgundy">{era.label}</p>
            <p className="mt-2 font-display text-sm italic leading-relaxed text-ink-fade">
              {era.description}
            </p>
            <p className="mt-3 font-mono text-[10px] tracking-[0.14em] text-ink-ghost">
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
