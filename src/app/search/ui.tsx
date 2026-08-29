"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SearchForm({ defaultValue }: { defaultValue: string }) {
  const [q, setQ] = useState(defaultValue);
  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next = q.trim();
    router.push(next ? `/search?q=${encodeURIComponent(next)}` : "/search");
  };

  return (
    <form onSubmit={onSubmit} className="flex border border-burgundy/30 bg-ivory-soft">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Ranjish, Faraz, Mehfil, 1970s…"
        className="w-full bg-transparent px-4 py-3 font-display text-xl italic outline-none"
      />
      <button type="submit" className="btn btn-solid rounded-none">
        Search
      </button>
    </form>
  );
}
