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
        className={`sticky top-0 z-40 border-b border-burgundy/20 transition ${
          scrolled ? "bg-ivory/92 backdrop-blur-sm" : "bg-ivory/70"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="group flex items-center gap-2">
            <Crescent className="h-4 w-4 text-burgundy" />
            <span className="font-display text-xl tracking-[0.18em] text-burgundy-deep sm:text-2xl">
              GHAZAL NAMA
            </span>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`font-mono text-[10px] tracking-[0.22em] uppercase transition ${
                  pathname === l.href ? "text-burgundy" : "text-ink-fade hover:text-burgundy"
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
              className="inline-flex h-9 w-9 items-center justify-center border border-burgundy/25 text-burgundy hover:bg-burgundy/5"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16.5 20.5 21" />
              </svg>
            </button>
            <Link
              href="/listen"
              className="hidden border border-burgundy/50 px-3 py-2 font-mono text-[10px] tracking-[0.24em] text-burgundy hover:bg-burgundy hover:text-ivory sm:inline-flex"
            >
              LISTEN
            </Link>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center border border-burgundy/25 lg:hidden"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <div className="space-y-1.5">
                <span className="block h-px w-4 bg-burgundy" />
                <span className="block h-px w-4 bg-burgundy" />
                <span className="block h-px w-4 bg-burgundy" />
              </div>
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-burgundy/15 bg-ivory px-6 py-5 lg:hidden">
            <div className="flex flex-col gap-3">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="font-display text-2xl text-burgundy-deep">
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
