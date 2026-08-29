import type { Metadata } from "next";
import { PoetCard } from "@/components/PoetCard";
import { SectionHeader } from "@/components/SectionHeader";
import { getPoets } from "@/lib/catalog";

export const metadata: Metadata = { title: "Poets" };

export default function PoetsPage() {
  const featured = getPoets().filter((p) => p.featured);
  const rest = getPoets().filter((p) => !p.featured);
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeader
        kicker="The diwan"
        title="The Words Behind the Voices"
        subtitle="A ghazal is a poem first. The voice arrives later, and sometimes more than once."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {featured.map((p) => (
          <PoetCard key={p.id} poet={p} />
        ))}
      </div>
      <h2 className="display mt-16 text-3xl text-burgundy-deep">Also in the archive</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {rest.map((p) => (
          <PoetCard key={p.id} poet={p} />
        ))}
      </div>
    </div>
  );
}
