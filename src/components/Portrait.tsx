"use client";

import { useState } from "react";
import { hashString } from "@/lib/utils";

const FALLBACKS = [
  "/images/hero/mehfil.jpg",
  "/images/hero/microphone.jpg",
  "/images/hero/gramophone.jpg",
  "/images/hero/cassette.jpg",
];

export function Portrait({
  src,
  name,
  className = "",
  alt,
}: {
  src?: string;
  name: string;
  className?: string;
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const fallback = FALLBACKS[hashString(name) % FALLBACKS.length];
  const showPhoto = src && !failed;

  return (
    <div className={`relative overflow-hidden bg-[#0a0a0f] ${className}`}>
      {showPhoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? name}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fallback}
            alt=""
            className="h-full w-full object-cover opacity-70 saturate-[0.6] contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-[#0a0a0f]/30 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-6xl text-[#e8e6e3]/80 sm:text-7xl">{initials}</span>
          </div>
        </>
      )}
    </div>
  );
}
