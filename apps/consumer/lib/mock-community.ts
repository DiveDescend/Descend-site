// Seeded community activity + the user's own derived feed items. Timestamps
// are computed relative to load time so the feed never looks stale.

import type { DemoState } from "./demo-store";
import { badgeDef } from "./badges";

const u = (id: string, w = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type FeedKind = "dive-log" | "badge" | "booking";

export interface FeedItem {
  id: string;
  kind: FeedKind;
  author: { name: string; image?: string; you?: boolean };
  text: string;
  image?: string;
  timestamp: number;
  baseKudos: number;
}

const hoursAgo = (h: number) => Date.now() - h * 3600_000;

export const SEED_FEED: FeedItem[] = [
  {
    id: "seed-feed-1",
    kind: "dive-log",
    author: { name: "Rhea Menon", image: u("1494790108377-be9c29b29330") },
    text: "logged a dive at Temple Reef — 18m · 46 min. First time seeing a whale shark!",
    image: u("1682687982360-3fbab65f9d50", 800),
    timestamp: hoursAgo(3),
    baseKudos: 12,
  },
  {
    id: "seed-feed-2",
    kind: "badge",
    author: { name: "Aditya Rao", image: u("1507003211169-0a1dd7228f2d") },
    text: "earned the Deep Diver badge 🌊 — first dive past 30m",
    timestamp: hoursAgo(22),
    baseKudos: 8,
  },
  {
    id: "seed-feed-3",
    kind: "booking",
    author: { name: "Sana Kapoor", image: u("1534528741775-53994a69daeb") },
    text: "booked Manta Ray Point in Lakshadweep for next weekend",
    image: u("1542443605-fcefd6550d4a", 800),
    timestamp: hoursAgo(30),
    baseKudos: 5,
  },
  {
    id: "seed-feed-4",
    kind: "dive-log",
    author: { name: "Vikram Shetty", image: u("1500648767791-00dcc994a43e") },
    text: "logged a night dive at Netrani Pinnacle — 32m · 41 min. Bioluminescence everywhere.",
    image: u("1510637858650-c3be04731622", 800),
    timestamp: hoursAgo(52),
    baseKudos: 21,
  },
  {
    id: "seed-feed-5",
    kind: "badge",
    author: { name: "Priya Nair", image: u("1544005313-94ddf0286df2") },
    text: "earned the Species Spotter badge 🐙 — 5 species and counting",
    timestamp: hoursAgo(76),
    baseKudos: 9,
  },
  {
    id: "seed-feed-6",
    kind: "dive-log",
    author: { name: "Rohan D'Costa", image: u("1472099645785-5658abf4ff4e") },
    text: "logged a dive at S.S. Iris Wreck — 26m · 38 min with Temple Adventures",
    image: u("1544551763-46a013bb70d5", 800),
    timestamp: hoursAgo(100),
    baseKudos: 14,
  },
  {
    id: "seed-feed-7",
    kind: "booking",
    author: { name: "Anjali Iyer", image: u("1580489944761-15a19d654956") },
    text: "enrolled in the PADI Advanced Open Water course — see you at 30m",
    timestamp: hoursAgo(124),
    baseKudos: 7,
  },
  {
    id: "seed-feed-8",
    kind: "dive-log",
    author: { name: "Kabir Singh", image: u("1582750433449-648ed127bb54") },
    text: "logged a dive at Lighthouse Rock — 14m · 44 min. Perfect conditions for beginners.",
    timestamp: hoursAgo(150),
    baseKudos: 4,
  },
  {
    id: "seed-feed-9",
    kind: "badge",
    author: { name: "Nisha Verma", image: u("1603415526960-f7e0328c63b1") },
    text: "earned the Night Owl badge 🌙 on her first night dive",
    timestamp: hoursAgo(190),
    baseKudos: 11,
  },
  {
    id: "seed-feed-10",
    kind: "dive-log",
    author: { name: "Dev Malhotra", image: u("1488508872907-592763824245") },
    text: "logged a dive at The Wall, Havelock — 24m · 49 min. Eagle rays on the drop-off.",
    image: u("1682687981907-170c006e3744", 800),
    timestamp: hoursAgo(240),
    baseKudos: 17,
  },
];

/** The user's own activity, derived from demo-store state — never stored. */
export function buildUserFeed(s: DemoState): FeedItem[] {
  const you = { name: s.profile.name, you: true };
  const items: FeedItem[] = [];

  for (const log of s.diveLogs) {
    items.push({
      id: `log-${log.id}`,
      kind: "dive-log",
      author: you,
      text: `logged a dive at ${log.site} — ${log.maxDepthM}m · ${log.durationMin} min${log.night ? " 🌙" : ""}`,
      image: log.photo,
      timestamp: new Date(`${log.date}T12:00:00`).getTime(),
      baseKudos: 0,
    });
  }

  for (const b of s.bookings) {
    if (b.status !== "confirmed" || b.id.startsWith("seed-")) continue;
    items.push({
      id: `booking-${b.id}`,
      kind: "booking",
      author: you,
      text: `booked ${b.title}`,
      image: b.image,
      timestamp: new Date(b.createdAt).getTime(),
      baseKudos: 0,
    });
  }

  for (const award of s.badges) {
    const def = badgeDef(award.badgeId);
    if (!def) continue;
    items.push({
      id: `badge-${award.badgeId}`,
      kind: "badge",
      author: you,
      text: `earned the ${def.label} badge ${def.emoji}`,
      timestamp: new Date(award.earnedAt).getTime(),
      baseKudos: 0,
    });
  }

  return items;
}

export function relativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `${Math.max(1, minutes)}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}
