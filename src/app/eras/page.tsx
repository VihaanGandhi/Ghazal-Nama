import type { Metadata } from "next";
import { EraTimeline } from "@/components/EraTimeline";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = { title: "Eras" };

export default function ErasPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeader
        kicker="The historical ledger"
        title="Across the Eras"
        subtitle="A century of rooms, from Akhtari Bai to the last widely circulated ghazal albums."
      />
      <EraTimeline />
    </div>
  );
}
