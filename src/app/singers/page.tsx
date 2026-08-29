import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { SingerCard } from "@/components/SingerCard";
import { getSingers } from "@/lib/catalog";

export const metadata: Metadata = { title: "Singers" };

export default function SingersPage() {
  const singers = getSingers();
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeader
        kicker="The voices"
        title="Legendary Voices"
        subtitle="Ten singers. A century of rooms. Each plate is a door."
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {singers.map((s, i) => (
          <SingerCard key={s.id} singer={s} index={i} />
        ))}
      </div>
    </div>
  );
}
