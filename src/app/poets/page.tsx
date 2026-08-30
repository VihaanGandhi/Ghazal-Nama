import type { Metadata } from "next";
import { SectionLabel } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { PoetCard } from "@/components/Cards";
import { getPoets, poetCount } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Poets",
  description: "Ghalib, Faiz, Faraz, Mir, Momin, Daagh — the poems the ghazal is built on.",
};

export default function PoetsPage() {
  const poets = [...getPoets()].sort((a, b) => poetCount(b.id) - poetCount(a.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionLabel index="01" title="The poets" note={`${poets.length} in the archive`} />
      <h1 className="display display-wonk max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.92] text-bone">
        The ghazal is a poem first. These are the hands that made them.
      </h1>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {poets.map((poet, i) => (
          <Reveal key={poet.id} delay={(i % 6) * 50}>
            <PoetCard poet={poet} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
