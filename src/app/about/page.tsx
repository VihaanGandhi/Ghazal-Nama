import type { Metadata } from "next";
import { DiamondRule } from "@/components/Ornament";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="kicker">A note from the archive</p>
      <h1 className="display mt-4 text-5xl text-[#e8e6e3] sm:text-6xl">Why Ghazal Nama?</h1>
      <DiamondRule className="mt-6 max-w-xs" />

      <div className="mt-10 space-y-6 font-display text-xl leading-relaxed text-[#a09a8e]">
        <p>
          Ghazal Nama is a digital home for the timeless art of ghazal. A place to discover legendary
          voices, forgotten recordings, celebrated poets and songs that have survived generations.
        </p>
        <p className="italic text-[#b08d3e]">Where poetry finds a voice.</p>
        <p>
          The goal is not to compete with Spotify. The goal is to preserve the experience of
          discovering ghazal — the way a record sleeve used to, or a late-night radio programme, or
          a mehfil that did not need to explain itself.
        </p>
        <p>
          Streaming services are very good at playing a track. They are less interested in the poet
          behind the couplet, the other singer who also kept the same ghazal, the decade the
          recording belongs to, the mood that is not a genre. Ghazal Nama is built around those
          relationships: singer to poet, poet to rendition, era to room.
        </p>
        <p>
          We do not host copyrighted music. Every &quot;play&quot; is an invitation to listen on Spotify. The
          archive&apos;s work is editorial: to name, to connect, to leave a field empty rather than invent
          it, and to make browsing feel like opening a drawer in an old record shop.
        </p>
      </div>

      <blockquote className="mt-12 border-l-2 border-[#b08d3e] px-6 font-display text-3xl italic leading-snug text-[#e8e6e3]">
        Some songs are heard.
        <br />
        Some are remembered.
      </blockquote>

      <p className="mt-12 font-display text-lg italic text-[#a09a8e]">
        If a date, poet, album or duration could not be confirmed, it has been left blank. The ledger
        prefers silence to invention.
      </p>
    </article>
  );
}
