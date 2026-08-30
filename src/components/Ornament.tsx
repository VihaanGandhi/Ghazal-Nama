import { classNames } from "@/lib/utils";

export function Platter({
  className = "h-40 w-40",
  spinning = false,
  label,
}: {
  className?: string;
  spinning?: boolean;
  label?: string;
}) {
  return (
    <div className={classNames("relative", className)}>
      <div
        className={classNames(
          "absolute inset-0 rounded-full border border-bone/10",
          spinning && "animate-platter"
        )}
        style={{
          background:
            "repeating-radial-gradient(circle at 50% 50%, rgba(243,237,227,0.07) 0 1px, transparent 1px 5px)",
        }}
      />
      <div
        className={classNames(
          "absolute inset-[12%] rounded-full border border-bone/10",
          spinning && "animate-platter"
        )}
        style={{ animationDuration: "6s" }}
      />
      <div
        className={classNames(
          "absolute inset-[34%] rounded-full",
          spinning && "animate-platter"
        )}
        style={{
          background:
            "conic-gradient(from 0deg, rgba(232,162,76,0.9), rgba(200,107,123,0.5), rgba(111,162,143,0.4), rgba(232,162,76,0.9))",
        }}
      />
      <div className="absolute inset-[46%] rounded-full bg-night" />
      {label && (
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-kicker text-bone-faint">
          {label}
        </span>
      )}
    </div>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={classNames("flex items-center gap-4", className)} aria-hidden>
      <span className="h-px flex-1 bg-bone/10" />
      <span className="rule-dot" />
      <span className="h-px flex-1 bg-bone/10" />
    </div>
  );
}

export function LampGlow({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={classNames(
        "pointer-events-none absolute inset-x-0 top-0 h-[28rem] animate-breathe bg-lamp-glow",
        className
      )}
    />
  );
}

export function SectionLabel({
  index,
  title,
  note,
}: {
  index: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6">
      <div>
        <p className="kicker mb-3">
          <span className="text-bone-faint">{index}</span>
          <span className="mx-3 text-bone-ghost">/</span>
          {title}
        </p>
      </div>
      {note && (
        <p className="hidden max-w-xs text-right font-mono text-[10px] uppercase leading-relaxed tracking-wideish text-bone-faint sm:block">
          {note}
        </p>
      )}
    </div>
  );
}
