import { classNames } from "@/lib/utils";

/** A slow ticker of couplets — the archive murmuring to itself. */
export function Marquee({
  items,
  className = "",
}: {
  items: { text: string; credit: string }[];
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className={classNames(
        "marquee-rail relative overflow-hidden border-y border-bone/10 bg-night-100/50 py-5",
        className
      )}
    >
      <div className="marquee-track gap-14">
        {doubled.map((item, i) => (
          <span key={i} className="flex shrink-0 items-baseline gap-4">
            <span className="rule-dot shrink-0" />
            <span className="display display-wonk whitespace-nowrap text-xl italic text-bone-mute sm:text-2xl">
              {item.text}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-kicker whitespace-nowrap text-ember/70">
              {item.credit}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
