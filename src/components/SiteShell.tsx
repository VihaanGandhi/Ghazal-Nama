"use client";

import { usePathname } from "next/navigation";
import { ExtrasProvider } from "@/context/ExtrasContext";
import { PlayerProvider } from "@/context/PlayerContext";
import { Footer } from "./Footer";
import { MiniPlayer } from "./MiniPlayer";
import { Navbar } from "./Navbar";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <PlayerProvider>
      <ExtrasProvider>
      <div className="grain" />
      <div className="vignette" />
      <div className={isHome ? "" : "page-wrap"}>
        {!isHome && <Navbar />}
        <main>{children}</main>
        {!isHome && <Footer />}
      </div>
      <MiniPlayer />
      </ExtrasProvider>
    </PlayerProvider>
  );
}
