import type { Metadata } from "next";
import Link from "next/link";
import { Divider, SectionLabel } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { ARCHIVE_TOTAL, getPoets, getSingers, playableCount } from "@/lib/catalog";
import { RECORDING_COUNT } from "@/data/recordings";

export const metadata: Metadata = {
  title: "About",
  description: "How Ghazal Nama is catalogued, and what we refuse to invent.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <p className="kicker mb-6">About &amp; method</p>
      <h1 className="display display-wonk text-[clamp(2.6rem,7vw,5rem)] leading-[0.92] text-bone">
        An archive is a promise about what is true.
      </h1>
      <p className="urdu mt-8 text-2xl text-bone-mute/80">غزل نامہ</p>

      <div className="mt-14 space-y-8 text-[18px] leading-relaxed text-bone-mute">
        <Reveal>
          <p>
            Ghazal Nama catalogues {ARCHIVE_TOTAL} recordings across {getSingers().length} voices
            and {getPoets().length} poets — the ghazal as it moved from the court and the radio
            studio into ordinary rooms.
          </p>
        </Reveal>
        <Reveal delay={60}>
          <p>
            The difference between a list and an archive is the discipline of what you leave out.
            Where a poet, a year, an album or a source could not be confirmed, the field is empty
            rather than guessed. A blank is honest; an invented credit is not.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <p>
            Playback follows the same rule. {playableCount()} recordings sit in the listening room
            because a specific upload — usually the label&apos;s own channel — was checked against
            the performance. Everything else stays catalogued, with a search offered instead of a
            guess. Nothing is re-hosted: the audio belongs to its rights-holders and plays through
            their embed.
          </p>
        </Reveal>
      </div>

      <section className="mt-20">
        <SectionLabel index="01" title="How the room works" />
        <ul className="panel divide-y divide-bone/8">
          {[
            [
              "One player, site-wide",
              "The frame lives in the dock at the bottom of every page, so a ghazal keeps playing while you read the next one.",
            ],
            [
              "Programmes, not shuffles",
              "A queue is an ordering someone chose. Collections keep their order; the room follows it.",
            ],
            [
              "Verified sources",
              `${RECORDING_COUNT} recordings carry the channel and release they were confirmed against, shown on every page.`,
            ],
            [
              "Honest gaps",
              "A recording we could not confirm says so, and points you to a search rather than playing the wrong thing.",
            ],
          ].map(([title, body]) => (
            <li key={title} className="px-6 py-6">
              <h2 className="display text-2xl text-bone">{title}</h2>
              <p className="mt-2 text-[16px] leading-relaxed text-bone-mute">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <SectionLabel index="02" title="A note on the plates" />
        <p className="text-[17px] leading-relaxed text-bone-mute">
          Portrait plates and covers in the archive are archival in spirit — generated stills and
          typographic plates, not licensed publicity photographs. Where a recording is played, the
          video itself comes from its rights-holder.
        </p>
      </section>

      <Divider className="mt-20" />

      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/listen" className="btn btn-ember">
          Go to the listening room
        </Link>
        <Link href="/admin" className="btn btn-ghost">
          Registrar — add a recording
        </Link>
      </div>
    </div>
  );
}
