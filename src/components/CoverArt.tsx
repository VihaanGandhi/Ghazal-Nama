import type { Ghazal, Mood } from "@/lib/types";
import { hashString } from "@/lib/utils";

const palettes: Record<Mood | "default", [string, string, string]> = {
  midnight: ["#241820", "#3d2a38", "#c4a574"],
  heartbreak: ["#3f141c", "#6b2430", "#e4d3a4"],
  ishq: ["#4a241c", "#8a3a44", "#e4d3a4"],
  mehfil: ["#3d2a14", "#7a5e28", "#f4ead6"],
  baarish: ["#243028", "#5e5c3e", "#dcc9a0"],
  tanhaai: ["#2a241c", "#5c4630", "#c4a574"],
  romance: ["#4a2830", "#9a5c62", "#f4ead6"],
  poetry: ["#1c1612", "#3d3226", "#e4d3a4"],
  default: ["#3f141c", "#6b2430", "#c4a574"],
};

export function CoverArt({
  ghazal,
  className = "",
}: {
  ghazal: Ghazal;
  className?: string;
}) {
  const [a, b, c] = palettes[ghazal.mood ?? "default"];
  const tilt = (hashString(ghazal.id) % 7) - 3;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(160deg, ${a} 0%, ${b} 55%, ${a} 100%)`,
      }}
    >
      <div
        className="absolute inset-3 border"
        style={{ borderColor: `${c}55` }}
      />
      <div
        className="absolute inset-5 border"
        style={{ borderColor: `${c}22` }}
      />
      <div
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, ${c}, transparent 70%)`,
          transform: `rotate(${tilt}deg)`,
        }}
      />
      <div className="relative flex h-full flex-col justify-between p-5">
        <p className="font-mono text-[9px] tracking-[0.32em] text-ivory/60">
          GHAZAL NAMA · SLEEVE
        </p>
        <div>
          <p className="font-display text-2xl leading-tight text-ivory sm:text-3xl">
            {ghazal.title}
          </p>
          {ghazal.titleUrdu ? (
            <p className="urdu mt-2 text-lg text-gold-pale/80">{ghazal.titleUrdu}</p>
          ) : null}
        </div>
        <div className="flex items-end justify-between">
          <p className="font-mono text-[10px] tracking-[0.22em] text-gold-mute">
            {ghazal.era ?? "ARCHIVE"}
          </p>
          <span
            className="h-8 w-8 rounded-full border"
            style={{ borderColor: `${c}66`, background: "rgba(0,0,0,0.25)" }}
          />
        </div>
      </div>
    </div>
  );
}
