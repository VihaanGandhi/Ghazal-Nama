export function Crescent({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M13.2 3.1a8.8 8.8 0 1 0 7.4 13.6A9 9 0 0 1 13.2 3.1Z" />
    </svg>
  );
}

export function DiamondRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-[#b08d3e] ${className}`} aria-hidden>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#2a2a35]" />
      <span className="text-[9px] tracking-[0.4em]">◆</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#2a2a35]" />
    </div>
  );
}

export function CornerFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <span className="pointer-events-none absolute left-2 top-2 h-6 w-6 border-l border-t border-[#b08d3e]/40" />
      <span className="pointer-events-none absolute right-2 top-2 h-6 w-6 border-r border-t border-[#b08d3e]/40" />
      <span className="pointer-events-none absolute bottom-2 left-2 h-6 w-6 border-b border-l border-[#b08d3e]/40" />
      <span className="pointer-events-none absolute bottom-2 right-2 h-6 w-6 border-b border-r border-[#b08d3e]/40" />
      {children}
    </div>
  );
}

export function VinylDisc({
  spinning = true,
  className = "h-64 w-64",
  label = "GHAZAL NAMA",
}: {
  spinning?: boolean;
  className?: string;
  label?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        className={`absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,#111_0%,#111_28%,#1a1a1a_29%,#0c0c0c_100%)] shadow-sleeve ${
          spinning ? "animate-vinyl" : ""
        }`}
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at center, rgba(255,255,255,0.035) 0 1px, transparent 1px 3px), radial-gradient(circle at 35% 30%, rgba(255,255,255,0.12), transparent 28%)",
        }}
      >
        <div className="absolute inset-[31%] rounded-full border border-[#b08d3e]/40 bg-gradient-to-br from-[#3f141c] to-[#1a0a10] shadow-inner">
          <div className="flex h-full flex-col items-center justify-center px-2 text-center">
            <span className="font-mono text-[8px] tracking-[0.28em] text-[#e4d3a4]/80">EST. ARCHIVE</span>
            <span className="mt-1 font-display text-[11px] leading-tight tracking-wide text-[#e8e6e3]">{label}</span>
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8e6e3]/90" />
      </div>
    </div>
  );
}
