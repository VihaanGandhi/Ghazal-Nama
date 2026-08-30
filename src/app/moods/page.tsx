import type { Metadata } from "next";
import { SectionLabel } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { MoodCard } from "@/components/Cards";
import { getMoods, ghazalsByMood } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Moods",
  description: "Eight weathers of the mehfil — midnight, heartbreak, ishq, baarish and more.",
};

export default function MoodsPage() {
  const moods = getMoods();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionLabel index="01" title="Moods" note="Not genres — weathers" />
      <h1 className="display display-wonk max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.92] text-bone">
        The ghazal keeps its own calendar. Here are its seasons.
      </h1>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {moods.map((mood, i) => (
          <Reveal key={mood.id} delay={(i % 4) * 60}>
            <MoodCard mood={mood} count={ghazalsByMood(mood.id).length} className="h-full" />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
