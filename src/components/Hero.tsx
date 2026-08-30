"use client";

import { getSingers } from "@/lib/catalog";
import { singerListenUrl } from "@/lib/spotify";

export function Hero() {
  const singers = getSingers();

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a0a0f]">
      {/* Night sky */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
                opacity: Math.random() * 0.5 + 0.15,
              }}
            />
          ))}
        </div>

        {/* Moon */}
        <div className="absolute right-[12%] top-[6%]">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#f5f0e0] via-[#e8dcc0] to-[#d4c8a8] shadow-[0_0_60px_rgba(245,240,224,0.35),0_0_120px_rgba(245,240,224,0.15)] sm:h-28 sm:w-28 md:h-32 md:w-32" />
        </div>

        {/* Bottom glow */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#1a1208] via-[#0f0d08] to-transparent" />
      </div>

      {/* Content — everything centered, no scroll */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        {/* Title */}
        <p className="urdu text-4xl tracking-wider text-[#e8dcc0]/90 sm:text-5xl md:text-6xl lg:text-7xl" style={{ textShadow: "0 0 40px rgba(232,220,192,0.25)" }}>
          غزل نامہ
        </p>
        <p className="mt-1 font-display text-2xl tracking-[0.3em] text-[#b08d3e]/70 sm:text-3xl md:text-4xl">
          ग़ज़ल नामा
        </p>

        <p className="mt-4 font-display text-sm italic text-[#a09a8e]/60 sm:text-base">
          A Home for Timeless Ghazals
        </p>

        {/* Singer names — click to listen on Spotify */}
        <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 md:gap-x-8 md:gap-y-4">
          {singers.map((singer) => (
            <a
              key={singer.id}
              href={singerListenUrl(singer)}
              target="_blank"
              rel="noreferrer"
              className="group relative font-display text-lg italic text-[#c4a574]/70 transition-colors duration-300 hover:text-[#e8dcc0] sm:text-xl md:text-2xl"
            >
              {singer.name}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#b08d3e]/50 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Spotify hint */}
        <p className="mt-10 font-mono text-[9px] tracking-[0.25em] text-[#a09a8e]/30 sm:text-[10px]">
          CLICK A NAME TO LISTEN ON SPOTIFY
        </p>
      </div>
    </section>
  );
}
