"use client";

import { PlayerProvider } from "@/context/PlayerContext";
import { Dock } from "./Dock";

/** Holds the player and keeps the bottom of the page clear of the dock. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <PlayerProvider>
      {children}
      <Dock />
    </PlayerProvider>
  );
}
