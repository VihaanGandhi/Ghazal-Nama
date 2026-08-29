import { classNames } from "@/lib/utils";

export function SpotifyButton({
  href,
  label = "Listen on Spotify",
  variant = "ghost",
  className = "",
}: {
  href: string;
  label?: string;
  variant?: "ghost" | "solid" | "gold";
  className?: string;
}) {
  const style =
    variant === "solid" ? "btn-solid" : variant === "gold" ? "btn-gold" : "btn-ghost";
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={classNames("btn", style, className)}
    >
      <SpotifyMark />
      {label}
    </a>
  );
}

export function SpotifyMark({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5Zm4.86 15.12a.66.66 0 0 1-.9.22c-2.47-1.51-5.58-1.85-9.24-1.01a.66.66 0 1 1-.3-1.29c4.02-.92 7.45-.52 10.22 1.17a.66.66 0 0 1 .22.91Zm1.3-2.9a.82.82 0 0 1-1.13.27c-2.83-1.74-7.14-2.24-10.49-1.23a.82.82 0 1 1-.47-1.57c3.84-1.15 8.56-.59 11.8 1.4a.82.82 0 0 1 .29 1.13Zm.11-3.02c-3.39-2.01-8.98-2.2-12.21-1.22a.99.99 0 1 1-.57-1.89c3.72-1.13 9.9-.9 13.8 1.41a.99.99 0 0 1-1.02 1.7Z" />
    </svg>
  );
}
