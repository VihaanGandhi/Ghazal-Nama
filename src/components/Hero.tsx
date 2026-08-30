"use client";

import { useState } from "react";
import { getSingers } from "@/lib/catalog";
import type { Singer } from "@/lib/types";

export function Hero() {
  const singers = getSingers();
  const [activeSinger, setActiveSinger] = useState<Singer | null>(null);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a0a0f]">
      {/* Full-screen mehfil background image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero/mehfil.jpg"
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.55) saturate(1.1)" }}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/40 via-transparent to-[#0a0a0f]/80" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,15,0.6)_100%)]" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-24">
        {/* Title */}
        <div className="text-center">
          <p
            className="urdu text-5xl tracking-wider text-[#f5f0e0]/95 sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ textShadow: "0 2px 30px rgba(0,0,0,0.6), 0 0 60px rgba(232,220,192,0.2)" }}
          >
            غزل نامہ
          </p>
          <p
            className="mt-1 font-display text-3xl tracking-[0.3em] text-[#e8dcc0]/80 sm:text-4xl md:text-5xl"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
          >
            ग़ज़ल नामा
          </p>
        </div>

        {/* Singer names */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-5 gap-y-2 sm:gap-x-7 md:gap-x-8">
          {singers.map((singer) => (
            <button
              key={singer.id}
              type="button"
              onClick={() => setActiveSinger(activeSinger?.id === singer.id ? null : singer)}
              className={`font-display text-base italic transition-all duration-300 sm:text-lg md:text-xl ${
                activeSinger?.id === singer.id
                  ? "text-[#e8dcc0] scale-110"
                  : "text-[#d4c8a8]/70 hover:text-[#f5f0e0]"
              }`}
              style={{ textShadow: "0 1px 12px rgba(0,0,0,0.7)" }}
            >
              {singer.name}
            </button>
          ))}
        </div>
      </div>

      {/* Spotify embed player — appears at bottom when singer is selected */}
      {activeSinger && (
        <div className="absolute bottom-0 left-0 right-0 z-20">
          {/* Gradient fade behind player */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/90 to-transparent" />
          <div className="relative px-4 pb-4 pt-16 sm:px-8 md:px-16">
            <div className="mx-auto max-w-2xl">
              <p className="mb-2 text-center font-display text-sm italic text-[#b08d3e] sm:text-base">
                Now Playing: {activeSinger.name}
              </p>
              <div className="overflow-hidden rounded-xl shadow-2xl">
                <iframe
                  key={activeSinger.id}
                  src={`https://open.spotify.com/embed/playlist/${activeSinger.spotify_playlist_id}?utm_source=generator&theme=0`}
                  width="100%"
                  height="152"
                  style={{ borderRadius: "12px" }}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="eager"
                  title={`Play ${activeSinger.name}`}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
