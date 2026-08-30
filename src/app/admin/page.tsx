import type { Metadata } from "next";
import { AdminForm } from "./ui";
import { albums } from "@/data";
import { getPoets, getSingers } from "@/lib/catalog";
import { ERAS, MOODS } from "@/lib/types";

export const metadata: Metadata = { title: "Add a ghazal" };

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="kicker">The registrar</p>
      <h1 className="display mt-3 text-5xl text-[#e8e6e3]">Add a ghazal</h1>
      <p className="mt-4 font-display text-lg italic text-[#a09a8e]">
        Thirty seconds. Title, singer, poet if known, a Spotify link if you have one. Leave the rest
        blank rather than guess. Entries are stored in this browser and appear in the archive at
        once. Connect Supabase to persist them for everyone.
      </p>
      <AdminForm
        singers={getSingers().map((s) => ({ id: s.id, name: s.name }))}
        poets={getPoets().map((p) => ({ id: p.id, name: p.name }))}
        albums={albums.map((a) => ({ id: a.id, title: a.title }))}
        moods={[...MOODS]}
        eras={[...ERAS]}
      />
    </div>
  );
}
