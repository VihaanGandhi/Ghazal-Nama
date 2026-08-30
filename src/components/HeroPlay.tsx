"use client";

import { usePlayer } from "@/context/PlayerContext";
import { getGhazalById } from "@/lib/catalog";
import { Icon } from "./PlayerDock";

/** The one button that starts the night. */
export function HeroPlay({
  ghazalId,
  queueIds,
}: {
  ghazalId: string;
  queueIds: string[];
}) {
  const { play, current, toggle, status } = usePlayer();
  const ghazal = getGhazalById(ghazalId);
  if (!ghazal) return null;

  const isCurrent = current?.id === ghazal.id;
  const isPlaying = isCurrent && status === "playing";

  return (
    <button
      type="button"
      onClick={() => {
        if (isCurrent) {
          toggle();
          return;
        }
        const queue = queueIds
          .map((id) => getGhazalById(id))
          .filter((g): g is NonNullable<typeof g> => Boolean(g));
        play(ghazal, queue.length ? queue : [ghazal]);
      }}
      className="btn btn-ember group"
    >
      <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-[#1a1206]/15">
        <Icon name={isPlaying ? "pause" : "play"} className="h-3 w-3" />
      </span>
      {isPlaying ? "Pause the night" : "Play tonight's opener"}
    </button>
  );
}
