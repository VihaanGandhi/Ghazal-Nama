"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { classNames } from "@/lib/utils";
import { PlayChip } from "./PlayChip";

type Row = {
  id: string;
  slug: string;
  title: string;
  singer: string;
  poet: string;
  era: string;
  mood: string;
  year: number | null;
  excerpt: string;
  urdu: string;
  playable: boolean;
};

const POET_NAMES: Record<string, string> = {
  "mirza-ghalib": "Mirza Ghalib",
  "faiz-ahmed-faiz": "Faiz Ahmed Faiz",
  "ahmad-faraz": "Ahmad Faraz",
  "nasir-kazmi": "Nasir Kazmi",
  "daagh-dehlvi": "Daagh Dehlvi",
  "meer-taqi-meer": "Mir Taqi Mir",
  "jigar-moradabadi": "Jigar Moradabadi",
  "firaq-gorakhpuri": "Firaq Gorakhpuri",
  "hasrat-mohani": "Hasrat Mohani",
  "shiv-kumar-batalvi": "Shiv Kumar Batalvi",
  "kaifi-azmi": "Kaifi Azmi",
  "nida-fazli": "Nida Fazli",
  "fayyaz-hashmi": "Fayyaz Hashmi",
  "ibn-e-insha": "Ibn-e-Insha",
  "shakeel-badayuni": "Shakeel Badayuni",
  "momin-khan-momin": "Momin Khan Momin",
  "sudarshan-fakir": "Sudarshan Fakir",
  "ameer-minai": "Ameer Minai",
  "akbar-allahabadi": "Akbar Allahabadi",
  "saleem-kausar": "Saleem Kausar",
  "bashir-badr": "Bashir Badr",
  "faaiz-anwar": "Faaiz Anwar",
  "nawaz-deobandi": "Nawaz Deobandi",
  gulzar: "Gulzar",
  "javed-akhtar": "Javed Akhtar",
  "anand-bakshi": "Anand Bakshi",
  "sahir-ludhianvi": "Sahir Ludhianvi",
  "ali-sardar-jafri": "Ali Sardar Jafri",
  "baqi-siddiqui": "Baqi Siddiqui",
  "quli-qutub-shah": "Quli Qutub Shah",
};

type Option = { id: string; name?: string; label?: string };

function labelFor(option?: Option) {
  return option?.name ?? option?.label ?? "";
}

export function ArchiveExplorer({
  rows,
  singers,
  moods,
  eras,
  poets,
}: {
  rows: Row[];
  singers: Option[];
  moods: Option[];
  eras: Option[];
  poets: string[];
}) {
  const [query, setQuery] = useState("");
  const [voice, setVoice] = useState("");
  const [poet, setPoet] = useState("");
  const [mood, setMood] = useState("");
  const [era, setEra] = useState("");
  const [roomOnly, setRoomOnly] = useState(false);

  const singerName = (id: string) => singers.find((s) => s.id === id)?.name ?? id;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (voice && row.singer !== voice) return false;
      if (poet && row.poet !== poet) return false;
      if (mood && row.mood !== mood) return false;
      if (era && row.era !== era) return false;
      if (roomOnly && !row.playable) return false;
      if (!q) return true;
      return (
        row.title.toLowerCase().includes(q) ||
        row.excerpt.toLowerCase().includes(q) ||
        row.urdu.includes(q) ||
        singerName(row.singer).toLowerCase().includes(q) ||
        (row.poet && (POET_NAMES[row.poet] ?? row.poet).toLowerCase().includes(q)) ||
        (row.year ? String(row.year).includes(q) : false)
      );
    });
  }, [rows, query, voice, poet, mood, era, roomOnly, singers]);

  const visibleIds = filtered.map((r) => r.id);
  const reset = () => {
    setQuery("");
    setVoice("");
    setPoet("");
    setMood("");
    setEra("");
    setRoomOnly(false);
  };

  return (
    <div>
      {/* Filter bar */}
      <div className="panel sticky top-[4.5rem] z-30 mb-6 bg-night/95 p-4 backdrop-blur-xl sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,0.8fr)_auto]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, couplets, years…"
            className="border border-bone/12 bg-night-100 px-4 py-3 font-display text-lg text-bone outline-none transition-colors placeholder:font-body placeholder:text-sm placeholder:text-bone-faint focus:border-ember/50"
          />
          <FilterSelect value={voice} onChange={setVoice} options={singers} placeholder="Voice" labelFor={labelFor} />
          <FilterSelect
            value={poet}
            onChange={setPoet}
            options={poets.map((id) => ({ id, label: POET_NAMES[id] ?? id }))}
            placeholder="Poet"
            labelFor={labelFor}
          />
          <FilterSelect value={mood} onChange={setMood} options={moods} placeholder="Mood" labelFor={labelFor} />
          <FilterSelect value={era} onChange={setEra} options={eras} placeholder="Era" labelFor={labelFor} />
          <button
            type="button"
            onClick={() => setRoomOnly((v) => !v)}
            className={classNames(
              "btn justify-center",
              roomOnly ? "btn-ember" : "btn-ghost"
            )}
          >
            In the room
          </button>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-wideish text-bone-faint">
            {filtered.length} of {rows.length} recordings
            {filtered.filter((r) => r.playable).length
              ? ` · ${filtered.filter((r) => r.playable).length} playable`
              : ""}
          </p>
          <button type="button" onClick={reset} className="btn btn-line text-bone-mute">
            Clear filters
          </button>
        </div>
      </div>

      {/* Ledger */}
      <div className="panel overflow-hidden">
        <ul>
          {filtered.map((row, i) => (
            <li key={row.id}>
              <div className="ledger-row grid grid-cols-[2rem_2.5rem_1fr] items-center gap-3 px-4 py-3.5 sm:px-5 lg:grid-cols-[3rem_3rem_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)_5rem]">
                <span className="ledger-index hidden font-mono text-[11px] tabular-nums text-bone-faint lg:block">
                  {String(i + 1).padStart(3, "0")}
                </span>
                <PlayChip ghazalId={row.id} queueIds={visibleIds} size="sm" />
                <div className="min-w-0">
                  <Link
                    href={`/ghazals/${row.slug}`}
                    className="block truncate font-display text-lg leading-tight text-bone transition-colors hover:text-ember-soft"
                  >
                    <span
                      className={classNames(
                        "mr-2 inline-block h-1.5 w-1.5 -translate-y-1 rounded-full align-middle",
                        row.playable ? "bg-ember" : "bg-bone/25"
                      )}
                      aria-hidden
                    />
                    {row.title}
                  </Link>
                  <p className="truncate font-mono text-[10px] uppercase tracking-wideish text-bone-faint lg:hidden">
                    {singerName(row.singer)}
                    {row.year ? ` · ${row.year}` : ""}
                  </p>
                </div>
                <span className="hidden truncate text-sm text-bone-mute lg:block">
                  {row.poet ? POET_NAMES[row.poet] ?? row.poet : "—"}
                </span>
                <span className="hidden truncate text-sm text-bone-mute lg:block">
                  {singerName(row.singer)}
                </span>
                <span className="hidden text-right font-mono text-[11px] tabular-nums text-bone-faint lg:block">
                  {row.year ?? row.era ?? "—"}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="p-10 text-center lede text-lg">
            Nothing answers to that combination. Loosen a filter.
          </p>
        )}
      </div>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
  placeholder,
  labelFor: label,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder: string;
  labelFor: (option?: Option) => string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none border border-bone/12 bg-night-100 px-3 py-3 font-mono text-[11px] uppercase tracking-wideish text-bone-mute outline-none transition-colors focus:border-ember/50"
    >
      <option value="">{placeholder} · all</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {label(option) || option.id}
        </option>
      ))}
    </select>
  );
}
