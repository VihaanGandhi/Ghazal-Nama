"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Crescent } from "./Ornament";
import { SearchModal } from "./SearchModal";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/singers", label: "Singers" },
  { href: "/poets", label: "Poets" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b border-[#2a2a35] transition ${
          scrolled ? "bg-[#0a0a0f]/95 backdrop-blur-md" : "bg-[#0a0a0f]/80"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="group flex items-center gap-2">
            <Crescent className="h-4 w-4 text-[#b08d3e]" />
            <span className="font-display text-xl tracking-[0.18em] text-[#e8e6e3] sm:text-2xl">
              GHAZAL NAMA
            </span>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`font-mono text-[10px] tracking-[0.22em] uppercase transition ${
                  pathname === l.href ? "text-[#b08d3e]" : "text-[#a09a8e] hover:text-[#e8e6e3]"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearch(true)}
              className="inline-flex h-9 w-9 items-center justify-center border border-[#2a2a35] text-[#a09a8e] hover:bg-[#1a1a24] hover:text-[#e8e6e3]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16.5 20.5 21" />
              </svg>
            </button>
            <Link
              href="/listen"
              className="hidden items-center gap-2 border border-[#b08d3e]/50 px-3 py-2 font-mono text-[10px] tracking-[0.24em] text-[#b08d3e] hover:bg-[#b08d3e] hover:text-[#0a0a0f] sm:inline-flex"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5Zm4.86 15.12a.66.66 0 0 1-.9.22c-2.47-1.51-5.58-1.85-9.24-1.01a.66.66 0 1 1-.3-1.29c4.02-.92 7.45-.52 10.22 1.17a.66.66 0 0 1 .22.91Zm1.3-2.9a.82.82 0 0 1-1.13.27c-2.83-1.74-7.14-2.24-10.49-1.23a.82.82 0 1 1-.47-1.57c3.84-1.15 8.56-.59 11.8 1.4a.82.82 0 0 1 .29 1.13Zm.11-3.02c-3.39-2.01-8.98-2.2-12.21-1.22a.99.99 0 1 1-.57-1.89c3.72-1.13 9.9-.9 13.8 1.41a.99.99 0 0 1-1.02 1.7Z" />
              </svg>
              <span>LISTEN</span>
            </Link>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center border border-[#2a2a35] lg:hidden"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <div className="space-y-1.5">
                <span className="block h-px w-4 bg-[#a09a8e]" />
                <span className="block h-px w-4 bg-[#a09a8e]" />
                <span className="block h-px w-4 bg-[#a09a8e]" />
              </div>
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-[#2a2a35] bg-[#0a0a0f] px-6 py-5 lg:hidden">
            <div className="flex flex-col gap-3">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="font-display text-2xl text-[#e8e6e3]">
                  {l.label}
                </Link>
              ))}
              <Link href="/listen" className="kicker mt-2">
                Listen
              </Link>
            </div>
          </div>
        )}
      </header>
      <SearchModal open={search} onClose={() => setSearch(false)} />
    </>
  );
}
