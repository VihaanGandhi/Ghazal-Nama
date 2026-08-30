import { DiamondRule } from "./Ornament";

export function SectionHeader({
  kicker,
  title,
  subtitle,
  align = "center",
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <header className={`mb-10 ${align === "center" ? "text-center" : "text-left"}`}>
      {kicker ? <p className="kicker mb-3">{kicker}</p> : null}
      <h2 className="display text-4xl text-[#e8e6e3] sm:text-5xl">{title}</h2>
      {subtitle ? (
        <p
          className={`mt-4 max-w-2xl font-display text-lg italic text-[#a09a8e] ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      ) : null}
      <DiamondRule className={`mt-6 ${align === "center" ? "mx-auto max-w-md" : "max-w-sm"}`} />
    </header>
  );
}
