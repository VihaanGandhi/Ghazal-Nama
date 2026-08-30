import Link from "next/link";

const ARTISTS = [
  "Jagjit Singh",
  "Mehdi Hassan",
  "Ghulam Ali",
  "Begum Akhtar",
  "Farida Khanum",
  "Talat Mahmood",
  "Pankaj Udhas",
  "Hariharan",
  "Iqbal Bano",
  "Munni Begum",
];

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0f]">
      {/* Night sky background with gradient */}
      <div className="absolute inset-0">
        {/* Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
                opacity: Math.random() * 0.6 + 0.2,
                animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Moon */}
        <div className="absolute right-[15%] top-[8%]">
          <div className="relative">
            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-[#f5f0e0] via-[#e8dcc0] to-[#d4c8a8] shadow-[0_0_60px_rgba(245,240,224,0.4),0_0_120px_rgba(245,240,224,0.2)]" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-transparent via-transparent to-[rgba(0,0,0,0.15)]" />
          </div>
        </div>

        {/* Mehfil scene illustration area */}
        <div className="absolute inset-0 flex items-end justify-center">
          <div className="relative w-full max-w-6xl px-4">
            {/* Silhouette of building/architecture */}
            <div className="relative mx-auto max-w-4xl">
              {/* Architectural arches */}
              <svg viewBox="0 0 800 300" className="w-full opacity-30" fill="none">
                {/* Left arch */}
                <path d="M50 300 L50 120 Q150 20 250 120 L250 300" stroke="rgba(176,141,62,0.3)" strokeWidth="1" fill="rgba(176,141,62,0.05)" />
                {/* Center arch */}
                <path d="M280 300 L280 80 Q400 -10 520 80 L520 300" stroke="rgba(176,141,62,0.4)" strokeWidth="1.5" fill="rgba(176,141,62,0.08)" />
                {/* Right arch */}
                <path d="M550 300 L550 120 Q650 20 750 120 L750 300" stroke="rgba(176,141,62,0.3)" strokeWidth="1" fill="rgba(176,141,62,0.05)" />
                {/* Pillars */}
                <rect x="48" y="120" width="4" height="180" fill="rgba(176,141,62,0.2)" />
                <rect x="248" y="120" width="4" height="180" fill="rgba(176,141,62,0.2)" />
                <rect x="278" y="80" width="4" height="220" fill="rgba(176,141,62,0.25)" />
                <rect x="518" y="80" width="4" height="220" fill="rgba(176,141,62,0.25)" />
                <rect x="548" y="120" width="4" height="180" fill="rgba(176,141,62,0.2)" />
                <rect x="748" y="120" width="4" height="180" fill="rgba(176,141,62,0.2)" />
              </svg>

              {/* Musicians silhouette */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-8 opacity-20">
                <svg viewBox="0 0 120 100" className="h-24 w-24 text-[#b08d3e]">
                  {/* Tabla player silhouette */}
                  <ellipse cx="60" cy="85" rx="35" ry="15" fill="currentColor" opacity="0.5" />
                  <circle cx="40" cy="70" r="18" fill="currentColor" opacity="0.6" />
                  <circle cx="80" cy="75" r="14" fill="currentColor" opacity="0.6" />
                  <path d="M55 20 Q60 5 65 20 L70 50 Q60 55 50 50 Z" fill="currentColor" opacity="0.7" />
                </svg>
                <svg viewBox="0 0 120 100" className="h-24 w-24 text-[#b08d3e]">
                  {/* Harmonium player silhouette */}
                  <rect x="25" y="55" width="70" height="30" rx="3" fill="currentColor" opacity="0.6" />
                  <rect x="30" y="45" width="60" height="12" rx="2" fill="currentColor" opacity="0.5" />
                  <path d="M55 15 Q60 0 65 15 L68 45 Q60 48 52 45 Z" fill="currentColor" opacity="0.7" />
                </svg>
                <svg viewBox="0 0 120 100" className="h-24 w-24 text-[#b08d3e]">
                  {/* Singer silhouette */}
                  <path d="M45 15 Q50 0 55 15 L60 45 Q50 50 40 45 Z" fill="currentColor" opacity="0.7" />
                  <ellipse cx="50" cy="85" rx="25" ry="12" fill="currentColor" opacity="0.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Warm lamp glow at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#1a1208] via-[#0f0d08] to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-20 pb-40">
        {/* Urdu title */}
        <div className="animate-fade-up text-center">
          <p className="urdu text-5xl tracking-wider text-[#e8dcc0]/90 sm:text-6xl md:text-7xl lg:text-8xl" style={{ textShadow: "0 0 40px rgba(232,220,192,0.3)" }}>
            غزل نامہ
          </p>
          <p className="mt-2 font-display text-3xl tracking-[0.3em] text-[#b08d3e]/80 sm:text-4xl md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
            ग़ज़ल नामा
          </p>
        </div>

        {/* Subtitle */}
        <p className="mt-6 max-w-lg text-center font-display text-lg italic leading-relaxed text-[#a09a8e]/80 sm:text-xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
          A Home for Timeless Ghazals
        </p>

        {/* Artist names */}
        <div className="mt-10 flex flex-wrap justify-center gap-x-4 gap-y-2 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          {ARTISTS.map((artist, i) => (
            <span
              key={artist}
              className="font-display text-sm italic tracking-wide text-[#c4a574]/60 transition-colors hover:text-[#e4d3a4]"
            >
              {artist}
              {i < ARTISTS.length - 1 && <span className="ml-4 text-[#b08d3e]/30">·</span>}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <Link href="/explore" className="btn btn-solid">
            Explore Ghazals
          </Link>
          <Link href="/archive" className="btn btn-ghost">
            Enter the Archive
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#b08d3e]/40" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>

      <style jsx>{`\n        @keyframes twinkle {\n          0%, 100% { opacity: 0.2; }\n          50% { opacity: 0.8; }\n        }\n      `}</style>
    </section>
  );
}
