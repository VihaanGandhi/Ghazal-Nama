import Link from "next/link";
import type { MoodMeta } from "@/lib/types";

const marks: Record<string, string> = {
  midnight: "☾",
  heartbreak: "†",
  ishq: "♡",
  mehfil: "♩",
  baarish: "≈",
  tanhaai: "·",
  romance: "❀",
  poetry: "¶",
};

export function MoodCard({ mood }: { mood: MoodMeta }) {
  return (
    <Link
      href={`/moods/${mood.id}`}
      className="group relative block border border-burgundy/20 bg-ivory-soft/50 px-5 py-6 transition hover:border-burgundy/45 hover:bg-ivory-soft"
    >
      <span className="font-display text-2xl text-burgundy/70">{marks[mood.id] ?? "·"}</span>
      <h3 className="mt-3 font-display text-3xl text-burgundy-deep">{mood.label}</h3>
      <p className="mt-2 font-display italic text-ink-fade">{mood.phrase}</p>
      <span className="mt-4 inline-block font-mono text-[10px] tracking-[0.22em] text-burgundy opacity-0 transition group-hover:opacity-100">
        OPEN THE ROOM →
      </span>
    </Link>
  );
}
