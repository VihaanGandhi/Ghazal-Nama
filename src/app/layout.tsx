import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { PLAYABLE_COUNT, TRACK_COUNT, voices } from "@/lib/tracks";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "@fontsource-variable/inter";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ghazal Nama",
    template: "%s · Ghazal Nama",
  },
  description: `Two hundred ghazals, ten voices. Press play.`,
};

export const viewport: Viewport = {
  themeColor: "#f5f0e6",
};

const voiceCount = voices().length;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <SiteShell>
          <header className="sheet">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b-2 border-ink pb-4 pt-8">
              <Link href="/" className="font-display text-[28px] leading-none tracking-tight text-ink sm:text-[34px]">
                Ghazal Nama
              </Link>
              <p className="kicker pb-1">
                {TRACK_COUNT} ghazals · {voiceCount} voices · {PLAYABLE_COUNT} play now
              </p>
            </div>
          </header>

          <main className="sheet pb-40">{children}</main>

          <footer className="sheet border-t border-rule pt-6">
            <p className="max-w-xl pb-32 text-[13px] leading-relaxed text-graphite">
              Every recording here is a specific public upload, checked one by one before it was
              listed. Where none could be confirmed, the row says so and offers a search instead of
              guessing.
            </p>
          </footer>
        </SiteShell>
      </body>
    </html>
  );
}
