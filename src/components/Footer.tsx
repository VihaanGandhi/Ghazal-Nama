import Link from "next/link";
import { ARCHIVE_TOTAL, getEras, getMoods, getSingers } from "@/lib/catalog";
import { playableCount } from "@/lib/catalog";
import { Mark } from "./Navbar";

export function Footer() {
  const singers = getSingers();
  const moods = getMoods();
  const eras = getEras();

  return (
    <footer className="relative mt-24 border-t border-bone/10 bg-night-100/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3 text-ember">
              <Mark className="h-9 w-9" />
              <span className="font-display text-2xl text-bone">Ghazal Nama</span>
            </div>
            <p className="lede mt-5 max-w-sm text-lg">
              A room for the couplet: {ARCHIVE_TOTAL} recordings catalogued, {playableCount()}{" "}
              confirmed in the listening room and ready to play.
            </p>
            <p className="mt-6 max-w-sm font-mono text-[10px] leading-relaxed uppercase tracking-wideish text-bone-faint">
              Recordings play through their rights-holders&apos; own uploads. Nothing here is
              stored, re-hosted or redistributed.
            </p>
          </div>

          <div>
            <p className="kicker mb-4">Voices</p>
            <ul className="space-y-2">
              {singers.slice(0, 6).map((singer) => (
                <li key={singer.id}>
                  <Link
                    href={`/singers/${singer.slug}`}
                    className="text-bone-mute transition-colors hover:text-ember-soft"
                  >
                    {singer.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="kicker mb-4">Moods</p>
            <ul className="space-y-2">
              {moods.slice(0, 6).map((mood) => (
                <li key={mood.id}>
                  <Link
                    href={`/moods/${mood.id}`}
                    className="text-bone-mute transition-colors hover:text-ember-soft"
                  >
                    {mood.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="kicker mb-4">The archive</p>
            <ul className="space-y-2 text-bone-mute">
              <li>
                <Link href="/archive" className="transition-colors hover:text-ember-soft">
                  All recordings
                </Link>
              </li>
              <li>
                <Link href="/eras" className="transition-colors hover:text-ember-soft">
                  Eras ({eras.length})
                </Link>
              </li>
              <li>
                <Link href="/collections" className="transition-colors hover:text-ember-soft">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/listen" className="transition-colors hover:text-ember-soft">
                  Tonight&apos;s programme
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-ember-soft">
                  About &amp; method
                </Link>
              </li>
              <li>
                <Link href="/admin" className="transition-colors hover:text-ember-soft">
                  Registrar
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-14" />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
            Ghazal Nama · where poetry finds a voice
          </p>
          <p className="urdu text-base text-bone-mute/80">غزل نامہ</p>
        </div>
      </div>
    </footer>
  );
}
