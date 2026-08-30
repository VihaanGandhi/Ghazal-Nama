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
      className="group relative block border border-[#2a2a35] bg-[#121218] px-5 py-6 transition hover:border-[#b08d3e]/40 hover:bg-[#1a1a24]"
    >
      <span className="font-display text-2xl text-[#b08d3e]/70">{marks[mood.id] ?? "·"}</span>
      <h3 className="mt-3 font-display text-3xl text-[#e8e6e3]">{mood.label}</h3>
      <p className="mt-2 font-display italic text-[#a09a8e]">{mood.phrase}</p>
      <span className="mt-4 inline-block font-mono text-[10px] tracking-[0.22em] text-[#b08d3e] opacity-0 transition group-hover:opacity-100">
        OPEN THE ROOM →
      </span>
    </Link>
  );
}
