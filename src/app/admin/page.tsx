import type { Metadata } from "next";
import { Registrar } from "./registrar";
import { SectionLabel } from "@/components/Ornament";

export const metadata: Metadata = { title: "Registrar" };

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionLabel index="01" title="Registrar" note="Local to this browser" />
      <h1 className="display display-wonk max-w-3xl text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.92] text-bone">
        Propose a recording for the archive.
      </h1>
      <p className="lede mt-6 max-w-2xl text-xl">
        Entries are kept in this browser only — the catalogue itself is versioned, so nothing here
        changes what other visitors see. Add the source you found and it can be verified properly
        before it enters the listening room.
      </p>

      <div className="mt-14">
        <Registrar />
      </div>

      <div className="panel mt-14 p-6">
        <p className="kicker mb-3">For the keeper of the archive</p>
        <p className="max-w-2xl text-[16px] leading-relaxed text-bone-mute">
          Confirmed recordings live in{" "}
          <code className="font-mono text-sm text-ember-soft">src/data/recordings.ts</code>, keyed
          by ghazal id, each with the channel or release it was verified against. Adding an entry
          there is what puts a recording in the listening room — the rest of the site picks it up
          automatically.
        </p>
      </div>
    </div>
  );
}
