export function Cassette() {
  return (
    <div className="relative mx-auto w-full max-w-xs">
      <div className="border border-[#b08d3e]/30 bg-gradient-to-b from-[#c4a574] to-[#8a6a3a] p-3 shadow-photo">
        <div className="border border-[#3d2e1e]/40 bg-[#1a1a24] px-3 py-2">
          <p className="font-mono text-[9px] tracking-[0.28em] text-[#b08d3e]">GHAZAL NAMA · C-90</p>
          <p className="mt-1 font-display text-lg italic text-[#e8e6e3]">Tonight's Mehfil — Side A</p>
        </div>
        <div className="mt-3 flex items-center justify-center gap-8 bg-[#0a0a0f] py-4">
          <Reel />
          <div className="h-8 w-16 border border-[#e8e6e3]/20" />
          <Reel reverse />
        </div>
      </div>
    </div>
  );
}

function Reel({ reverse = false }: { reverse?: boolean }) {
  return (
    <div
      className={`relative h-14 w-14 rounded-full border-4 border-[#6b5c4a] bg-[#1a1a24] ${
        reverse ? "animate-reel" : "animate-vinyl"
      }`}
    >
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <span
          key={deg}
          className="absolute left-1/2 top-1/2 h-5 w-px origin-top bg-[#b08d3e]/50"
          style={{ transform: `translate(-50%, 0) rotate(${deg}deg)` }}
        />
      ))}
      <span className="absolute inset-5 rounded-full bg-[#e8e6e3]/80" />
    </div>
  );
}
