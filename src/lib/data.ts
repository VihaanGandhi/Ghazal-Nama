import { getSupabase, isSupabaseConfigured } from "./supabase";
import type { Ghazal, Poet, Singer } from "./types";
import { ghazals as seedGhazals, poets as seedPoets, singers as seedSingers } from "@/data";

/**
 * Optional Supabase-backed reads. The site ships with a complete local catalogue
 * so it launches without credentials. When env vars are present, these helpers
 * prefer the database and fall back to seed data.
 */
export async function fetchSingers(): Promise<Singer[]> {
  if (!isSupabaseConfigured()) return seedSingers;
  const supabase = getSupabase();
  if (!supabase) return seedSingers;
  const { data, error } = await supabase.from("singers").select("*");
  if (error || !data?.length) return seedSingers;
  return data as Singer[];
}

export async function fetchPoets(): Promise<Poet[]> {
  if (!isSupabaseConfigured()) return seedPoets;
  const supabase = getSupabase();
  if (!supabase) return seedPoets;
  const { data, error } = await supabase.from("poets").select("*");
  if (error || !data?.length) return seedPoets;
  return data as Poet[];
}

export async function fetchGhazals(): Promise<Ghazal[]> {
  if (!isSupabaseConfigured()) return seedGhazals;
  const supabase = getSupabase();
  if (!supabase) return seedGhazals;
  const { data, error } = await supabase.from("ghazals").select("*");
  if (error || !data?.length) return seedGhazals;
  return data as Ghazal[];
}
