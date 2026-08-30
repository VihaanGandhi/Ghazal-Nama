import type { Metadata } from "next";
import { ArchiveList } from "@/components/ArchiveList";
import { ARCHIVE_TOTAL, getGhazals } from "@/lib/catalog";

export const metadata: Metadata = { title: "The Archive" };

export default function ArchivePage() {
  const items = getGhazals();
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="kicker">The ledger</p>
      <h1 className="display mt-3 text-5xl text-[#e8e6e3]">The Ghazal Archive</h1>
      <p className="mt-4 font-display text-xl italic text-[#a09a8e]">
        {ARCHIVE_TOTAL} recordings. Numbered, as a catalogue should be.
      </p>
      <div className="mt-10">
        <ArchiveList items={items} includeExtras />
      </div>
    </div>
  );
}
