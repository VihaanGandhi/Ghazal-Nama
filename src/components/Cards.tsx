import Link from "next/link";
import type { Ghazal, Singer, Poet, Collection, MoodMeta } from "@/lib/types";
import { ghazalsBySinger, poetCount, singerCount } from "@/lib/catalog";
import { recordings } from "@/data/recordings";
import { classNames } from "@/lib/utils";
import { CoverArt } from "./CoverArt";
import { PlayChip } from "./PlayChip";

export function GhazalCard({
  ghazal,
  queueIds,
  className = "",
}: {
  ghazal: Ghazal;
  queueIds?: string[];
  className?: string;
}) {
  const playable = Boolean(recordings[ghazal.id]);
  return (
    <article
      className={classNames(
        "group panel relative flex flex-col p-5 transition-all duration-500 ease-silk hover:-translate-y-1 hover:border-ember/40 hover:shadow-lift",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <Link href={`/ghazals/${ghazal.slug}`} className="min-w-0 flex-1">
          <h3 className="display text-2xl leading-tight text-bone transition-colors group-hover:text-ember-soft">
            {ghazal.title}
          </h3>
        </Link>
        <PlayChip ghazalId={ghazal.id} queueIds={queueIds} size="sm" />
      </div>
      {ghazal.excerpt && (
        <p className="lede mt-3 line-clamp-2 text-base">{ghazal.excerpt}</p>
      )}
      <p className="mt-4 font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
        {ghazal.year ?? ghazal.era ?? "undated"}
        {ghazal.mood ? ` · ${ghazal.mood}` : ""}
        {!playable && <span className="text-bone-ghost"> · catalogued only</span>}
      </p>
    </article>
  );
}

export function SingerCard({
  singer,
  index,
  className = "",
}: {
  singer: Singer;
  index?: number;
  className?: string;
}) {
  const count = singerCount(singer.id);
  const playable = ghazalsBySinger(singer.id).filter((g) => recordings[g.id]).length;
  return (
    <Link
      href={`/singers/${singer.slug}`}
      className={classNames(
        "group panel relative flex gap-5 overflow-hidden p-5 transition-all duration-500 ease-silk hover:-translate-y-1 hover:border-ember/40",
        className
      )}
    >
      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[2px] bg-night-300">
        {singer.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={singer.photo}
            alt=""
            className="duotone h-full w-full object-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-110"
          />
        ) : (
          <CoverArt ghazal={{ id: singer.id, title: singer.name } as Ghazal} className="h-full w-full" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        {typeof index === "number" && (
          <span className="font-mono text-[10px] text-ember">{String(index + 1).padStart(2, "0")}</span>
        )}
        <h3 className="display text-2xl leading-tight text-bone transition-colors group-hover:text-ember-soft">
          {singer.name}
        </h3>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
          {singer.honorific ?? singer.era}
        </p>
        <p className="mt-3 line-clamp-2 text-sm text-bone-mute">{singer.shortBio}</p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
          {count} catalogued · {playable} in the room
        </p>
      </div>
    </Link>
  );
}

export function PoetCard({ poet, className = "" }: { poet: Poet; className?: string }) {
  const count = poetCount(poet.id);
  return (
    <Link
      href={`/poets/${poet.slug}`}
      className={classNames(
        "group panel flex flex-col justify-between p-5 transition-all duration-500 ease-silk hover:-translate-y-1 hover:border-ember/40",
        className
      )}
    >
      <div>
        <h3 className="display text-2xl leading-tight text-bone transition-colors group-hover:text-ember-soft">
          {poet.name}
        </h3>
        {poet.years && (
          <p className="mt-1 font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
            {poet.years}
          </p>
        )}
        <p className="mt-3 line-clamp-3 text-sm text-bone-mute">{poet.shortBio}</p>
      </div>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-wideish text-ember/80">
        {count} in the archive
      </p>
    </Link>
  );
}

export function CollectionCard({
  collection,
  className = "",
}: {
  collection: Collection;
  className?: string;
}) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className={classNames(
        "group panel relative flex min-h-[13rem] flex-col justify-between overflow-hidden p-6 transition-all duration-500 ease-silk hover:-translate-y-1 hover:border-ember/40 hover:shadow-lift",
        className
      )}
    >
      <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-bone/5 transition-transform duration-[1400ms] ease-silk group-hover:scale-125" />
      <div>
        <p className="kicker mb-3">{collection.kicker ?? "Collection"}</p>
        <h3 className="display text-3xl leading-tight text-bone transition-colors group-hover:text-ember-soft">
          {collection.title}
        </h3>
      </div>
      <p className="mt-6 max-w-sm text-sm text-bone-mute">{collection.description}</p>
      <p className="mt-5 font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
        {collection.ghazal_ids.length} recordings →
      </p>
    </Link>
  );
}

export function MoodCard({ mood, count, className = "" }: { mood: MoodMeta; count: number; className?: string }) {
  return (
    <Link
      href={`/moods/${mood.id}`}
      className={classNames(
        "group panel relative flex flex-col justify-between overflow-hidden p-6 transition-all duration-500 ease-silk hover:-translate-y-1 hover:border-ember/40",
        className
      )}
    >
      <div>
        <h3 className="display text-3xl text-bone transition-colors group-hover:text-ember-soft">
          {mood.label}
        </h3>
        <p className="lede mt-2 text-lg">{mood.phrase}</p>
      </div>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
        {count} recordings
      </p>
    </Link>
  );
}
