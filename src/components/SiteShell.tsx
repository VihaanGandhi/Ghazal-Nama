"use client";

import { ExtrasProvider } from "@/context/ExtrasContext";
import { PlayerProvider } from "@/context/PlayerContext";
import { Footer } from "./Footer";
import { MiniPlayer } from "./MiniPlayer";
import { Navbar } from "./Navbar";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <PlayerProvider>
      <ExtrasProvider>
      <div className="grain" />
      <div className="vignette" />
      <div className="page-wrap">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
      <MiniPlayer />
      </ExtrasProvider>
    </PlayerProvider>
  );
}
