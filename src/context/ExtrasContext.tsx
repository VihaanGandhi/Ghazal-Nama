"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Ghazal } from "@/lib/types";

const KEY = "ghazal-nama-extras";

type Ctx = {
  extras: Ghazal[];
  addGhazal: (g: Ghazal) => void;
};

const ExtrasContext = createContext<Ctx | null>(null);

export function ExtrasProvider({ children }: { children: React.ReactNode }) {
  const [extras, setExtras] = useState<Ghazal[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setExtras(JSON.parse(raw) as Ghazal[]);
    } catch {
      /* ignore */
    }
  }, []);

  const addGhazal = (g: Ghazal) => {
    setExtras((prev) => {
      const next = [g, ...prev];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  const value = useMemo(() => ({ extras, addGhazal }), [extras]);
  return <ExtrasContext.Provider value={value}>{children}</ExtrasContext.Provider>;
}

export function useExtras() {
  const ctx = useContext(ExtrasContext);
  if (!ctx) throw new Error("useExtras must be used within ExtrasProvider");
  return ctx;
}
