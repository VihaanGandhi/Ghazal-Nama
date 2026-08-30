import type { Ghazal } from "@/lib/types";
import { classNames } from "@/lib/utils";

/**
 * Covers are generated, not borrowed: a deterministic plate per recording,
 * keyed off the title so a ghazal always looks like itself.
 */
function hash(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) {
    h = (h * 31 + value.charCodeAt(i)) % 100000;
  }
  return h;
}

const PALETTES = [
  ["#e8a24c", "#8e3a4a"],
  ["#6fa28f", "#2c251e"],
  ["#c86b7b", "#7c4a17"],
  ["#f2c57c", "#3f6a5c"],
  ["#8e3a4a", "#1b1714"],
  ["#e8a24c", "#3f6a5c"],
];

export function CoverArt({
  ghazal,
  className = "",
  showTitle = false,
}: {
  ghazal: Ghazal;
  className?: string;
  showTitle?: boolean;
}) {
  const seed = hash(ghazal.id + ghazal.title);
  const [a, b] = PALETTES[seed % PALETTES.length];
  const angle = seed % 360;
  const rings = 3 + (seed % 4);

  return (
    <div
      className={classNames("relative overflow-hidden rounded-[2px] bg-night-200", className)}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(${angle}deg, ${a}33, ${b}66 60%, #0a0908)` }}
      />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {Array.from({ length: rings }).map((_, i) => (
          <circle
            key={i}
            cx={28 + (seed % 44)}
            cy={24 + (seed % 52)}
            r={12 + i * 13}
            fill="none"
            stroke={a}
            strokeOpacity={0.28 - i * 0.04}
            strokeWidth="0.5"
          />
        ))}
        <path
          d={`M0 ${70 + (seed % 18)} Q 30 ${54 + (seed % 20)}, 60 ${72 + (seed % 12)} T 100 ${64 + (seed % 14)}`}
          fill="none"
          stroke={b}
          strokeOpacity="0.5"
          strokeWidth="0.7"
        />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_10%,rgba(243,237,227,0.12),transparent_70%)]" />
      {showTitle && (
        <div className="absolute inset-0 flex flex-col justify-end p-3">
          <span className="font-display text-sm leading-tight text-bone/90">{ghazal.title}</span>
        </div>
      )}
    </div>
  );
}
