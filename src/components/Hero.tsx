import Link from "next/link";
import { CornerFrame, VinylDisc } from "./Ornament";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-8 pt-8 sm:px-6 sm:pt-12">
      <CornerFrame className="overflow-hidden bg-ivory-soft/40">
        <div className="grid items-center gap-8 px-6 py-10 md:grid-cols-[1.15fr_0.85fr] md:px-12 md:py-14">
          <div className="animate-fade-up">
            <p className="kicker">Vol. I  ·  The Archive  ·  Est. for the night</p>
            <h1 className="display mt-5 text-5xl text-burgundy-deep sm:text-6xl md:text-7xl">
              Some songs are heard.
              <br />
              <span className="italic text-burgundy">Some are remembered.</span>
            </h1>
            <p className="mt-6 max-w-lg font-display text-xl italic leading-relaxed text-ink-fade">
              Discover timeless ghazals, legendary voices and poetry that refuses to fade.
            </p>
            <p className="urdu mt-4 text-2xl text-burgundy/70">جہاں شاعری کو آواز ملتی ہے</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/explore" className="btn btn-solid">
                Explore Ghazals
              </Link>
              <Link href="/archive" className="btn btn-ghost">
                Enter the Archive
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md animate-soft-in">
            <div className="relative aspect-square overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero/gramophone.jpg"
                alt="A vintage gramophone in warm lamplight"
                className="h-full w-full object-cover"
                style={{ filter: "sepia(0.25) contrast(1.05)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/40 to-transparent" />
              <div className="absolute bottom-4 right-4 hidden sm:block">
                <VinylDisc className="h-28 w-28" spinning />
              </div>
            </div>
            <p className="mt-3 text-center font-mono text-[10px] tracking-[0.22em] text-ink-ghost">
              LATE NIGHT PROGRAMME  ·  SIDE A
            </p>
          </div>
        </div>
      </CornerFrame>
    </section>
  );
}
