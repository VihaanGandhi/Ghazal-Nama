"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { classNames } from "@/lib/utils";
import { Icon } from "./PlayerDock";

const LINKS = [
  { href: "/archive", label: "Archive" },
  { href: "/singers", label: "Voices" },
  { href: "/poets", label: "Poets" },
  { href: "/collections", label: "Collections" },
  { href: "/eras", label: "Eras" },
  { href: "/listen", label: "Listen" },
];

export function Mark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <circle cx="20" cy="20" r="12.5" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.28" />
      <path
        d="M27.4 20a7.4 7.4 0 1 1-9.1-7.2 6 6 0 1 0 9.1 7.2Z"
        fill="currentColor"
        opacity="0.95"
      />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={classNames(
          "sticky top-0 z-40 transition-all duration-500",
          solid
            ? "border-b border-bone/10 bg-night/85 backdrop-blur-xl"
            : "border-b border-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
          <Link href="/" className="group flex items-center gap-3">
            <span className="text-ember transition-transform duration-700 group-hover:rotate-[24deg]">
              <Mark className="h-8 w-8" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-xl tracking-tight text-bone">
                Ghazal Nama
              </span>
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-kicker text-bone-faint">
                archive · since the mehfil
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={classNames(
                    "relative font-mono text-[11px] uppercase tracking-wideish transition-colors",
                    active ? "text-ember" : "text-bone-mute hover:text-bone"
                  )}
                >
                  {link.label}
                  <span
                    className={classNames(
                      "absolute -bottom-1.5 left-0 h-px bg-ember transition-all duration-500",
                      active ? "w-full opacity-100" : "w-0 opacity-0"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hidden items-center gap-2 border border-bone/15 px-3 py-2 font-mono text-[10px] uppercase tracking-wideish text-bone-mute transition-colors hover:border-ember/60 hover:text-ember-soft sm:flex"
              data-search-open
            >
              <Icon name="search" className="h-3.5 w-3.5" />
              search
              <kbd className="ml-2 border border-bone/15 px-1.5 py-0.5 text-[9px] text-bone-faint">
                ⌘K
              </kbd>
            </button>
            <button
              type="button"
              className="icon-btn lg:hidden"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-3 w-4">
                <span
                  className={classNames(
                    "absolute left-0 h-px w-full bg-current transition-all duration-300",
                    open ? "top-1.5 rotate-45" : "top-0"
                  )}
                />
                <span
                  className={classNames(
                    "absolute left-0 h-px w-full bg-current transition-all duration-300",
                    open ? "top-1.5 -rotate-45" : "top-3"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        className={classNames(
          "fixed inset-0 z-40 flex flex-col justify-center bg-night/97 px-8 transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <nav className="flex flex-col gap-5">
          {[...LINKS, { href: "/about", label: "About" }].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="display text-4xl text-bone"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="mr-4 font-mono text-[10px] tracking-wideish text-ember">
                {String(i + 1).padStart(2, "0")}
              </span>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
