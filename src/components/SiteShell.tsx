"use client";

import { PlayerProvider } from "@/context/PlayerContext";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PlayerDock } from "./PlayerDock";
import { SearchOverlay } from "./SearchOverlay";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <PlayerProvider>
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 pb-32">{children}</main>
        <Footer />
      </div>
      <div className="grain" aria-hidden />
      <PlayerDock />
      <SearchOverlay />
    </PlayerProvider>
  );
}
