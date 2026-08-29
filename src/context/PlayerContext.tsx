"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Ghazal } from "@/lib/types";

type PlayerState = {
  current: Ghazal | null;
  setCurrent: (ghazal: Ghazal) => void;
};

const PlayerContext = createContext<PlayerState | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<Ghazal | null>(null);
  const value = useMemo(() => ({ current, setCurrent }), [current]);
  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
