import type { Metadata } from "next";
import { MoodCard } from "@/components/MoodCard";
import { SectionHeader } from "@/components/SectionHeader";
import { getMoods } from "@/lib/catalog";

export const metadata: Metadata = { title: "Moods" };

export default function MoodsPage() {
  const moods = getMoods();
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeader
        kicker="The rooms"
        title="How does your heart feel tonight?"
        subtitle="Eight climates. Not genres."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {moods.map((m) => (
          <MoodCard key={m.id} mood={m} />
        ))}
      </div>
    </div>
  );
}
