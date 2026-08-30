import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveList } from "@/components/ArchiveList";
import { MoodCard } from "@/components/MoodCard";
import { ghazalsByMood, getMood, getMoods } from "@/lib/catalog";
import type { Mood } from "@/lib/types";
import { MOODS } from "@/lib/types";

type Params = { slug: string };

export function generateStaticParams() {
  return MOODS.map((m) => ({ slug: m }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const m = getMood(params.slug);
  return { title: m?.label ?? "Mood" };
}

export default function MoodPage({ params }: { params: Params }) {
  const mood = getMood(params.slug);
  if (!mood) notFound();
  const items = ghazalsByMood(params.slug as Mood);
  const others = getMoods().filter((m) => m.id !== mood.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="kicker">How the heart feels</p>
      <h1 className="display mt-3 text-5xl text-[#e8e6e3]">{mood.label}</h1>
      <p className="mt-4 max-w-2xl font-display text-2xl italic text-[#a09a8e]">{mood.phrase}</p>
      <p className="mt-3 max-w-2xl font-display text-lg text-[#a09a8e]">{mood.description}</p>
      <div className="mt-10">
        <ArchiveList items={items} />
      </div>
      <h2 className="display mt-16 text-3xl text-[#e8e6e3]">Other rooms</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {others.map((m) => (
          <MoodCard key={m.id} mood={m} />
        ))}
      </div>
    </div>
  );
}
