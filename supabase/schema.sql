-- Ghazal Nama · Supabase schema
-- Run in the Supabase SQL editor. Seed data currently ships in the Next.js app
-- (src/data). Once these tables are populated, set NEXT_PUBLIC_SUPABASE_URL
-- and NEXT_PUBLIC_SUPABASE_ANON_KEY to read from the database.

create table if not exists singers (
  id text primary key,
  name text not null,
  slug text not null unique,
  bio text,
  photo text,
  era text,
  spotify_playlist_id text,
  featured boolean default false,
  created_at timestamptz default now()
);

create table if not exists poets (
  id text primary key,
  name text not null,
  slug text not null unique,
  bio text,
  photo text,
  created_at timestamptz default now()
);

create table if not exists albums (
  id text primary key,
  title text not null,
  slug text not null unique,
  singer_id text references singers (id),
  year int,
  created_at timestamptz default now()
);

create table if not exists moods (
  id text primary key,
  label text not null,
  description text
);

create table if not exists eras (
  id text primary key,
  label text not null,
  description text
);

create table if not exists ghazals (
  id text primary key,
  title text not null,
  slug text not null unique,
  singer_id text references singers (id),
  poet_id text references poets (id),
  album_id text references albums (id),
  year int,
  era text references eras (id),
  mood text references moods (id),
  description text,
  cover_image text,
  spotify_track_id text,
  spotify_url text,
  featured boolean default false,
  created_at timestamptz default now()
);

create table if not exists collections (
  id text primary key,
  title text not null,
  slug text not null unique,
  description text,
  created_at timestamptz default now()
);

create table if not exists collection_ghazals (
  collection_id text references collections (id) on delete cascade,
  ghazal_id text references ghazals (id) on delete cascade,
  position int,
  primary key (collection_id, ghazal_id)
);

create index if not exists ghazals_singer_idx on ghazals (singer_id);
create index if not exists ghazals_poet_idx on ghazals (poet_id);
create index if not exists ghazals_mood_idx on ghazals (mood);
create index if not exists ghazals_era_idx on ghazals (era);
create index if not exists ghazals_title_idx on ghazals (title);

alter table singers enable row level security;
alter table poets enable row level security;
alter table albums enable row level security;
alter table moods enable row level security;
alter table eras enable row level security;
alter table ghazals enable row level security;
alter table collections enable row level security;
alter table collection_ghazals enable row level security;

create policy "public read singers" on singers for select using (true);
create policy "public read poets" on poets for select using (true);
create policy "public read albums" on albums for select using (true);
create policy "public read moods" on moods for select using (true);
create policy "public read eras" on eras for select using (true);
create policy "public read ghazals" on ghazals for select using (true);
create policy "public read collections" on collections for select using (true);
create policy "public read collection_ghazals" on collection_ghazals for select using (true);
