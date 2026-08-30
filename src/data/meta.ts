import type { Collection, EraMeta, MoodMeta } from "@/lib/types";
import { ghazals } from "./ghazals";
import { recordings } from "./recordings";

export const moods: MoodMeta[] = [
  {
    id: "midnight",
    label: "Midnight",
    phrase: "When the lamps are the only audience.",
    description:
      "Ghazals for the hour when the city thins and the radio still knows your name.",
  },
  {
    id: "heartbreak",
    label: "Heartbreak",
    phrase: "The quarrel that is also a plea.",
    description:
      "Recordings that sit with ranjish, firaaq, and the dignity of not pretending.",
  },
  {
    id: "ishq",
    label: "Ishq",
    phrase: "Not a mood. A climate.",
    description:
      "Desire without hurry — the ghazal’s oldest weather.",
  },
  {
    id: "mehfil",
    label: "Mehfil",
    phrase: "A little wine, a little witness.",
    description:
      "Concert pieces, tavern metaphors, and the pleasure of being among listeners.",
  },
  {
    id: "baarish",
    label: "Baarish",
    phrase: "Rain as an old accomplice.",
    description:
      "Sawan, clouds, and the rooms that sound different when it rains.",
  },
  {
    id: "tanhaai",
    label: "Tanhaai",
    phrase: "The letter that did not come.",
    description:
      "Solitude, distance, and the ghazal as company rather than cure.",
  },
  {
    id: "romance",
    label: "Romance",
    phrase: "Stay. The night is still unfinished.",
    description:
      "Invitation, moonlight, and the rare ghazal that allows a happy nearness.",
  },
  {
    id: "poetry",
    label: "Poetry",
    phrase: "When the couplet is the point.",
    description:
      "Ghalib, Faiz, and the recordings that treat the poem as the destination.",
  },
];

export const eras: EraMeta[] = [
  {
    id: "1930s",
    label: "1930s",
    description:
      "Akhtari Bai Faizabadi is becoming Begum Akhtar. Ghazal still lives in the courtly and the theatrical.",
    singer_ids: ["begum-akhtar"],
  },
  {
    id: "1940s",
    label: "1940s",
    description:
      "Radio Lucknow and HMV. Talat Mahmood’s first ghazals, before Bombay fully claims the velvet voice.",
    singer_ids: ["talat-mahmood", "begum-akhtar"],
  },
  {
    id: "1950s",
    label: "1950s",
    description:
      "Film ghazal’s high summer. Talat, Begum Akhtar, and a diction the studios have not yet diluted.",
    singer_ids: ["talat-mahmood", "begum-akhtar"],
  },
  {
    id: "1960s",
    label: "1960s",
    description:
      "Mehdi Hassan’s public arrival. Farida Khanum’s concert art. Begum Akhtar’s late mastery.",
    singer_ids: ["mehdi-hassan", "begum-akhtar", "farida-khanum", "talat-mahmood"],
  },
  {
    id: "1970s",
    label: "1970s",
    description:
      "The Unforgettables. Radio Pakistan’s golden ghazal. Cassettes beginning to replace the mehfil as the room.",
    singer_ids: ["jagjit-singh", "mehdi-hassan", "ghulam-ali", "farida-khanum", "iqbal-bano", "munni-begum"],
  },
  {
    id: "1980s",
    label: "1980s",
    description:
      "Ghazal as popular music in India. Jagjit, Pankaj Udhas, Ghulam Ali; Iqbal Bano’s Hum Dekhenge in Lahore.",
    singer_ids: ["jagjit-singh", "pankaj-udhas", "ghulam-ali", "mehdi-hassan", "iqbal-bano", "munni-begum", "farida-khanum"],
  },
  {
    id: "1990s",
    label: "1990s",
    description:
      "After the boom, the keepers. Hariharan’s Gulfam, Jagjit’s Marasim, a quieter fidelity to the form.",
    singer_ids: ["hariharan", "jagjit-singh", "pankaj-udhas", "ghulam-ali"],
  },
  {
    id: "2000s",
    label: "2000s",
    description:
      "Studio ghazal after the century turns. Kaash, later concerts, and the archive beginning to look at itself.",
    singer_ids: ["hariharan", "jagjit-singh", "farida-khanum", "ghulam-ali"],
  },
];

function idsBy(pred: (g: (typeof ghazals)[number]) => boolean, limit = 12): string[] {
  return ghazals.filter(pred).slice(0, limit).map((g) => g.id);
}

/** Keeps a collection listenable: confirmed recordings float to the top. */
function withRecordingsFirst(ids: string[]): string[] {
  const playable = ids.filter((id) => Boolean(recordings[id]));
  const rest = ids.filter((id) => !recordings[id]);
  return [...playable, ...rest];
}

export const collections: Collection[] = [
  {
    id: "tonights-mehfil",
    title: "Tonight’s Mehfil",
    slug: "tonights-mehfil",
    kicker: "Vol. I",
    description:
      "A short programme for the lamp still burning. Not a playlist — a sitting.",
    ghazal_ids: [
      "gh-021", // Ranjish Hi Sahi — Mehdi Hassan
      "gh-041", // Chupke Chupke Raat Din — Ghulam Ali
      "gh-001", // Hothon Se Chhoo Lo Tum — Jagjit Singh
      "gh-022", // Gulon Mein Rang Bhare — Mehdi Hassan
      "gh-081", // Aaj Jaane Ki Zid Na Karo — Farida Khanum
      "gh-042", // Hungama Hai Kyon Barpa — Ghulam Ali
      "gh-063", // Mere Humnafas Mere Humnawa — Begum Akhtar
      "gh-009", // Woh Kaghaz Ki Kashti — Jagjit Singh
      "gh-161", // Dasht-e-Tanhai Mein — Iqbal Bano
      "gh-044", // Yeh Dil Yeh Pagal Dil Mera — Ghulam Ali
    ],
  },
  {
    id: "voices-of-pakistan",
    title: "Voices of Pakistan",
    slug: "voices-of-pakistan",
    kicker: "The other capital",
    description:
      "Mehdi Hassan, Ghulam Ali, Farida Khanum, Iqbal Bano, Munni Begum — the archive’s western rooms.",
    ghazal_ids: idsBy((g) =>
      ["mehdi-hassan", "ghulam-ali", "farida-khanum", "iqbal-bano", "munni-begum"].includes(
        g.singer_id
      )
    ),
  },
  {
    id: "women-of-ghazal",
    title: "Women of Ghazal",
    slug: "women-of-ghazal",
    kicker: "Mallika",
    description:
      "Begum Akhtar, Farida Khanum, Iqbal Bano, Munni Begum — four ways of keeping the night.",
    ghazal_ids: idsBy((g) =>
      ["begum-akhtar", "farida-khanum", "iqbal-bano", "munni-begum"].includes(g.singer_id)
    ),
  },
  {
    id: "ghalib-sung",
    title: "Ghalib, Sung",
    slug: "ghalib-sung",
    kicker: "1797–1869",
    description:
      "The poet against whom Urdu still measures itself, heard through Begum Akhtar, Mehdi Hassan, Jagjit Singh and others.",
    ghazal_ids: withRecordingsFirst(idsBy((g) => g.poet_id === "mirza-ghalib", 16)),
  },
  {
    id: "faiz-in-voice",
    title: "Faiz in Voice",
    slug: "faiz-in-voice",
    kicker: "The rose remains",
    description:
      "Gulon Mein Rang Bhare, Dasht-e-Tanhai, Hum Dekhenge — Faiz as he was carried into rooms.",
    ghazal_ids: withRecordingsFirst(idsBy((g) => g.poet_id === "faiz-ahmed-faiz", 16)),
  },
  {
    id: "film-ghazals",
    title: "From the Studio",
    slug: "film-ghazals",
    kicker: "Silver screen",
    description:
      "When the ghazal entered the cinema without quite becoming something else. Arth, Prem Geet, Nikaah, Sujata, Naam.",
    ghazal_ids: [
      "gh-001",
      "gh-002",
      "gh-003",
      "gh-010",
      "gh-041",
      "gh-022",
      "gh-102",
      "gh-103",
      "gh-121",
      "gh-126",
    ],
  },
  {
    id: "cassette-eighties",
    title: "Cassette Classics",
    slug: "cassette-eighties",
    kicker: "1980–1989",
    description:
      "The decade the ghazal became a drawing-room habit. Jagjit, Pankaj, Ghulam Ali, Munni Begum.",
    ghazal_ids: withRecordingsFirst(idsBy((g) => g.era === "1980s", 16)),
  },
  {
    id: "rain-and-longing",
    title: "Rain & Longing",
    slug: "rain-and-longing",
    kicker: "Sawan",
    description: "Baarish, midnight, and the particular ache of weather.",
    ghazal_ids: idsBy(
      (g) => g.mood === "baarish" || g.mood === "midnight" || g.mood === "tanhaai",
      14
    ),
  },
];
