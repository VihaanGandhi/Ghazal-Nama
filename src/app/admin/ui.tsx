"use client";

import { FormEvent, useState } from "react";
import { useExtras } from "@/context/ExtrasContext";
import type { Era, Ghazal, Mood } from "@/lib/types";
import { slugify } from "@/lib/utils";

export function AdminForm({
  singers,
  poets,
  albums,
  moods,
  eras,
}: {
  singers: { id: string; name: string }[];
  poets: { id: string; name: string }[];
  albums: { id: string; title: string }[];
  moods: Mood[];
  eras: Era[];
}) {
  const { addGhazal, extras } = useExtras();
  const [done, setDone] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const singer_id = String(form.get("singer_id") ?? "");
    if (!title || !singer_id) return;

    const ghazal: Ghazal = {
      id: `local-${Date.now()}`,
      title,
      slug: `${slugify(title)}-${singer_id}-${Date.now()}`,
      singer_id,
      poet_id: String(form.get("poet_id") ?? "") || null,
      album_id: String(form.get("album_id") ?? "") || null,
      year: form.get("year") ? Number(form.get("year")) : null,
      era: (String(form.get("era") ?? "") as Era) || null,
      mood: (String(form.get("mood") ?? "") as Mood) || null,
      description: String(form.get("description") ?? "") || null,
      excerpt: String(form.get("excerpt") ?? "") || null,
      cover_image: String(form.get("cover_image") ?? "") || null,
      spotify_url: String(form.get("spotify_url") ?? "") || null,
      spotify_track_id: null,
      featured: false,
      duration: String(form.get("duration") ?? "") || null,
    };
    addGhazal(ghazal);
    setDone(title);
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-5 border border-burgundy/20 bg-ivory-soft/60 p-6">
      <Field label="Title" name="title" required placeholder="Ranjish Hi Sahi" />
      <label className="block">
        <span className="kicker">Singer</span>
        <select name="singer_id" required className="input mt-2">
          <option value="">Select</option>
          {singers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="kicker">Poet</span>
        <select name="poet_id" className="input mt-2">
          <option value="">Unknown — leave empty</option>
          {poets.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="kicker">Album</span>
        <select name="album_id" className="input mt-2">
          <option value="">Unknown — leave empty</option>
          {albums.map((a) => (
            <option key={a.id} value={a.id}>
              {a.title}
            </option>
          ))}
        </select>
      </label>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Year" name="year" type="number" placeholder="1979" />
        <label className="block">
          <span className="kicker">Era</span>
          <select name="era" className="input mt-2">
            <option value="">—</option>
            {eras.map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="kicker">Mood</span>
          <select name="mood" className="input mt-2">
            <option value="">—</option>
            {moods.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </label>
      </div>
      <Field label="Opening line" name="excerpt" placeholder="Ranjish hi sahi…" />
      <Field label="Cover image URL" name="cover_image" placeholder="https://…" />
      <Field label="Spotify URL" name="spotify_url" placeholder="https://open.spotify.com/track/…" />
      <Field label="Duration" name="duration" placeholder="6:12" />
      <label className="block">
        <span className="kicker">Description</span>
        <textarea name="description" rows={4} className="input mt-2" />
      </label>
      <button type="submit" className="btn btn-solid">
        Enter in the ledger
      </button>
      {done ? (
        <p className="font-display italic text-burgundy">
          “{done}” is in the archive. {extras.length} local addition{extras.length === 1 ? "" : "s"} in this browser.
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  required,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="kicker">{label}</span>
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        type={type}
        className="input mt-2"
      />
    </label>
  );
}
