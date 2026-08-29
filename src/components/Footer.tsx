import Link from "next/link";
import { Crescent, DiamondRule } from "./Ornament";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-burgundy/20 bg-[#2a1c16] text-ivory">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col items-center text-center">
          <Crescent className="h-5 w-5 text-gold" />
          <p className="mt-4 font-display text-3xl tracking-[0.28em] sm:text-4xl">GHAZAL NAMA</p>
          <p className="mt-3 font-display text-lg italic text-gold-mute">
            A Home for Timeless Ghazals.
          </p>
          <DiamondRule className="mt-6 w-48 text-gold/70" />
        </div>
        <nav className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] tracking-[0.24em] text-ivory/70">
          <Link href="/explore" className="hover:text-gold-pale">
            EXPLORE
          </Link>
          <Link href="/singers" className="hover:text-gold-pale">
            SINGERS
          </Link>
          <Link href="/poets" className="hover:text-gold-pale">
            POETS
          </Link>
          <Link href="/collections" className="hover:text-gold-pale">
            COLLECTIONS
          </Link>
          <Link href="/about" className="hover:text-gold-pale">
            ABOUT
          </Link>
          <Link href="/archive" className="hover:text-gold-pale">
            ARCHIVE
          </Link>
          <Link href="/admin" className="hover:text-gold-pale">
            REGISTRAR
          </Link>
          <a
            href="https://open.spotify.com/search/ghazal"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gold-pale"
          >
            SPOTIFY
          </a>
        </nav>
        <p className="mx-auto mt-10 max-w-2xl text-center font-display text-sm italic leading-relaxed text-ivory/55">
          Ghazal Nama does not host copyrighted recordings. Listen on Spotify. Portraiture is
          archival in spirit — generated stills and typographic plates, not licensed publicity
          photographs. Metadata is left empty where it could not be confirmed.
        </p>
        <p className="mt-6 text-center font-mono text-[10px] tracking-[0.2em] text-ivory/40">
          © {new Date().getFullYear()} GHAZAL NAMA · VOL. I · THE POETRY THAT STAYED
        </p>
      </div>
    </footer>
  );
}
