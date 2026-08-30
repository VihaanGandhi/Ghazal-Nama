"use client";

import { usePlayer } from "@/context/PlayerContext";
import { getGhazalById } from "@/lib/catalog";

/** Starts a whole collection from its first confirmed recording. */
export function CollectionPlay({
  ghazalId,
  queueIds,
}: {
  ghazalId?: string;
  queueIds: string[];
}) {
  const { play } = usePlayer();
  if (!ghazalId) return null;
  const ghazal = getGhazalById(ghazalId);
  if (!ghazal) return null;

  return (
    <button
      type="button"
      className="btn btn-ember"
      onClick={() => {
        const queue = queueIds
          .map((id) => getGhazalById(id))
          .filter((g): g is NonNullable<typeof g> => Boolean(g));
        play(ghazal, queue);
      }}
    >
      <svg viewBox="0 0 24 24" className="h-3 w-3 translate-x-[1px]" fill="currentColor" aria-hidden>
        <path d="M8 5.2v13.6L19 12 8 5.2Z" />
      </svg>
      Play the sitting
    </button>
  );
}
