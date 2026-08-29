import Link from "next/link";
import type { Ghazal } from "@/lib/types";
import { poetOf, singerOf } from "@/lib/catalog";
import { padCatalog } from "@/lib/utils";
import { PlayButton } from "./PlayButton";
import { SpotifyMark } from "./SpotifyButton";
import { ghazalListenUrl } from "@/lib/spotify";

export function GhazalList({ items }: { items: Ghazal[] }) {
  return (
    <ol className="divide-y divide-burgundy/15 border-y border-burgundy/20">
      {items.map((g, i) => {
        const singer = singerOf(g);
        const poet = poetOf(g);
        return (
          <li key={g.id} className="archive-row flex items-center gap-4 py-3">
            <span className="w-8 font-mono text-xs text-burgundy/70">{padCatalog(i)}</span>
            <div className="min-w-0 flex-1">
              <Link href={`/ghazals/${g.slug}`} className="font-display text-xl hover:text-burgundy">
                {g.title}
              </Link>
              <p className="font-mono text-[10px] tracking-[0.14em] text-ink-fade">
                {poet?.name ?? singer?.name ?? ""}
                {g.album_id ? "" : ""}
              </p>
            </div>
            <a
              href={ghazalListenUrl(g, singer?.name)}
              target="_blank"
              rel="noreferrer"
              className="hidden text-burgundy/70 hover:text-burgundy sm:inline"
              aria-label="Spotify"
            >
              <SpotifyMark />
            </a>
            <PlayButton ghazal={g} />
          </li>
        );
      })}
    </ol>
  );
}
