import Link from "next/link";
import { Crescent, DiamondRule } from "./Ornament";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-[#282828] bg-[#0a0a0f]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col items-center text-center">
          <Crescent className="h-5 w-5 text-[#b08d3e]" />
          <p className="mt-4 font-display text-3xl tracking-[0.28em] text-[#e8e6e3] sm:text-4xl">GHAZAL NAMA</p>
          <p className="mt-3 font-display text-lg italic text-[#a09a8e]">
            A Home for Timeless Ghazals.
          </p>
          <DiamondRule className="mt-6 w-48 text-[#b08d3e]/70" />
        </div>
        <nav className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] tracking-[0.24em] text-[#a09a8e]">
          <Link href="/explore" className="hover:text-[#e8e6e3]">
            EXPLORE
          </Link>
          <Link href="/singers" className="hover:text-[#e8e6e3]">
            SINGERS
          </Link>
          <Link href="/poets" className="hover:text-[#e8e6e3]">
            POETS
          </Link>
          <Link href="/collections" className="hover:text-[#e8e6e3]">
            COLLECTIONS
          </Link>
          <Link href="/about" className="hover:text-[#e8e6e3]">
            ABOUT
          </Link>
          <Link href="/archive" className="hover:text-[#e8e6e3]">
            ARCHIVE
          </Link>
          <Link href="/admin" className="hover:text-[#e8e6e3]">
            REGISTRAR
          </Link>
          <a
            href="https://open.spotify.com/search/ghazal"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[#1db954]"
          >
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
              <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5Zm4.86 15.12a.66.66 0 0 1-.9.22c-2.47-1.51-5.58-1.85-9.24-1.01a.66.66 0 1 1-.3-1.29c4.02-.92 7.45-.52 10.22 1.17a.66.66 0 0 1 .22.91Zm1.3-2.9a.82.82 0 0 1-1.13.27c-2.83-1.74-7.14-2.24-10.49-1.23a.82.82 0 1 1-.47-1.57c3.84-1.15 8.56-.59 11.8 1.4a.82.82 0 0 1 .29 1.13Zm.11-3.02c-3.39-2.01-8.98-2.2-12.21-1.22a.99.99 0 1 1-.57-1.89c3.72-1.13 9.9-.9 13.8 1.41a.99.99 0 0 1-1.02 1.7Z" />
            </svg>
            SPOTIFY
          </a>
        </nav>
        <p className="mx-auto mt-10 max-w-2xl text-center font-display text-sm italic leading-relaxed text-[#a09a8e]/60">
          Ghazal Nama does not host copyrighted recordings. Listen on Spotify. Portraiture is
          archival in spirit — generated stills and typographic plates, not licensed publicity
          photographs. Metadata is left empty where it could not be confirmed.
        </p>
        <p className="mt-6 text-center font-mono text-[10px] tracking-[0.2em] text-[#a09a8e]/40">
          © {new Date().getFullYear()} GHAZAL NAMA · VOL. I · THE POETRY THAT STAYED
        </p>
      </div>
    </footer>
  );
}
