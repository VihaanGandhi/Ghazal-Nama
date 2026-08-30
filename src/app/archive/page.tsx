import type { Metadata } from "next";
import { ArchiveExplorer } from "@/components/ArchiveExplorer";
import { SectionLabel } from "@/components/Ornament";
import {
  ARCHIVE_TOTAL,
  getEras,
  getMoods,
  getSingers,
  playableCount,
} from "@/lib/catalog";
import { ghazals } from "@/data";
import { recordings } from "@/data/recordings";

export const metadata: Metadata = {
  title: "Archive",
  description: "Every recording in the catalogue, filterable by voice, poet, mood, era and year.",
};

export default function ArchivePage() {
  const rows = ghazals.map((g) => ({
    id: g.id,
    slug: g.slug,
    title: g.title,
    singer: g.singer_id,
    poet: g.poet_id ?? "",
    era: g.era ?? "",
    mood: g.mood ?? "",
    year: g.year ?? null,
    excerpt: g.excerpt ?? "",
    urdu: g.titleUrdu ?? "",
    playable: Boolean(recordings[g.id]),
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionLabel
        index="01"
        title="The archive"
        note={`${ARCHIVE_TOTAL} recordings · ${playableCount()} confirmed in the listening room`}
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)]">
        <div>
          <h1 className="display display-wonk max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.92] text-bone">
            Every ghazal we have catalogued, in one ledger.
          </h1>
          <p className="lede mt-6 max-w-2xl text-xl">
            Filter by voice, poet, mood or decade. Rows marked{" "}
            <span className="not-italic text-ember-soft">●</span> have a confirmed recording and
            will play where they sit.
          </p>
        </div>
      </div>

      <div className="mt-14">
        <ArchiveExplorer
          rows={rows}
          singers={getSingers().map((s) => ({ id: s.id, name: s.name }))}
          moods={getMoods().map((m) => ({ id: m.id, label: m.label }))}
          eras={getEras().map((e) => ({ id: e.id, label: e.label }))}
          poets={Array.from(
            new Map(
              ghazals
                .filter((g) => g.poet_id)
                .map((g) => [g.poet_id as string, g.poet_id as string])
            ).values()
          )}
        />
      </div>
    </div>
  );
}
