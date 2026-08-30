/**
 * RECORDINGS — the listening room.
 *
 * Every entry below points at one specific public upload that was individually
 * checked against YouTube's oEmbed endpoint (title + channel) so that pressing
 * play produces the actual performance rather than a search page. Re-checked
 * 2026-08-30; two ids that had since disappeared or blocked embedding were
 * replaced on that pass.
 *
 * Nothing here is guessed. If a recording could not be confirmed — or its owner
 * does not allow embedding — it is absent, and the interface says so and offers
 * a search instead of inventing an id.
 */

export type Recording = {
  /** YouTube video id of the confirmed, embeddable upload. */
  youtubeId: string;
  /** Where the recording was confirmed, kept so the source can be re-checked. */
  source: string;
};

export const recordings: Record<string, Recording> = {
  // ——— Jagjit Singh ———
  "gh-001": { youtubeId: "Ee5sDeaNCnw", source: "Shemaroo Musical Maestros · Prem Geet (1981)" },
  "gh-002": { youtubeId: "JKWlQrkOgj8", source: "Arth (1982) · lyrical upload" },
  "gh-005": { youtubeId: "7pVfX9bfJ5M", source: "T-Series Bollywood Classics · Tum Bin (2001)" },
  "gh-006": { youtubeId: "JzaVoULkZNM", source: "Saregama Ghazal · Duniya Jise Kahte Hain" },
  "gh-008": { youtubeId: "1UGntT1CZXw", source: "Mirza Ghalib (TV serial) · audio upload" },
  "gh-009": { youtubeId: "kvZpom9wny8", source: "Saregama Ghazal · Aaj, lyrical" },

  // ——— Mehdi Hassan ———
  "gh-021": { youtubeId: "Xc6uwbXpmUY", source: "Mehdi Hassan – Topic · Greatest Ghazals (1988)" },
  "gh-022": { youtubeId: "EaNLlusLXYI", source: "Mehdi Hassan – Topic · Meri Pasand Vol. 1 (1978)" },
  "gh-023": { youtubeId: "A373M8P6S6o", source: "Mehfil recording · with Ustad Tari Khan" },
  "gh-024": { youtubeId: "PNPs2-Bj8T4", source: "Ahmad Faraz · with lyrics" },

  // ——— Ghulam Ali ———
  "gh-041": { youtubeId: "MWjaK_nW72E", source: "Saregama Ghazal · Hasrat Mohani" },
  "gh-042": { youtubeId: "xQsMn1kmJs4", source: "Saregama Ghazal · Shaam-E-Ghazal" },
  "gh-043": { youtubeId: "Bm-bBvnLVtQ", source: "Ghulam Ali Khan – Topic · Live In India Vol. 2" },
  "gh-044": { youtubeId: "b9qBp0xtSaM", source: "Nupur Audio Mehfil · Mohsin Naqvi" },
  "gh-045": { youtubeId: "R-PBamWmZrk", source: "Chamakte Chand Ko Toota Hua Tara" },

  // ——— Begum Akhtar ———
  "gh-062": { youtubeId: "92XMEi8_Q7k", source: "Begam Akhtar · Momin (traditional)" },
  "gh-063": { youtubeId: "XYgG6SiX7ZE", source: "Begum Akhtar · Shakeel Badayuni" },

  // ——— Farida Khanum ———
  "gh-081": { youtubeId: "fIGsYx9XY5M", source: "Fayyaz Hashmi · Farida Khanum" },

  // ——— Talat Mahmood ———
  "gh-101": { youtubeId: "d-DmpvBhGGs", source: "Non-film 78 rpm (1944) · Kamal Dasgupta" },
  "gh-102": { youtubeId: "3X-zFcDGcZM", source: "Sujata (1959) · S. D. Burman" },

  // ——— Pankaj Udhas ———
  "gh-121": { youtubeId: "yexZf8g_dJw", source: "Saregama Music · Naam (1986)" },
  "gh-123": { youtubeId: "Rl22SzwuK5Q", source: "Universal Music India · Stolen Moments" },

  // ——— Hariharan ———
  "gh-141": { youtubeId: "v7GYiDuBrBo", source: "Gulfam (1994) · Khumar Barabankvi" },

  // ——— Iqbal Bano ———
  "gh-161": { youtubeId: "YXy8D9Qvw04", source: "Faiz Ahmed Faiz · archival upload" },
  "gh-162": { youtubeId: "dxtgsq5oVy4", source: "Lahore, 1985 · audience recording" },
};

export const RECORDING_COUNT = Object.keys(recordings).length;

/** YouTube ids for the tracks that open the archive — the ones we lead with. */
export const FEATURED_RECORDING_IDS = [
  "gh-021",
  "gh-041",
  "gh-001",
  "gh-022",
  "gh-081",
  "gh-042",
  "gh-063",
  "gh-009",
] as const;
