// Badge catalog + earn rules. evaluateBadges runs inside every demo-store
// commit: it appends newly satisfied awards and never revokes earned ones.

import type { DemoState } from "./demo-store";
import { RANK_ADVANCED, userRank } from "./certification-path";

export interface BadgeDef {
  id: string;
  label: string;
  emoji: string;
  description: string;
  rule: (s: DemoState) => boolean;
}

export const BADGE_DEFS: BadgeDef[] = [
  {
    id: "first-booking",
    label: "Trip Planner",
    emoji: "🎫",
    description: "Book your first trip on Descend",
    rule: (s) => s.bookings.some((b) => b.status === "confirmed"),
  },
  {
    id: "first-dive",
    label: "First Dive",
    emoji: "🎉",
    description: "Log your first dive",
    rule: (s) => s.diveLogs.length >= 1,
  },
  {
    id: "five-dives",
    label: "High Five",
    emoji: "🐠",
    description: "Log 5 dives",
    rule: (s) => s.diveLogs.length >= 5,
  },
  {
    id: "deep-diver",
    label: "Deep Diver",
    emoji: "🌊",
    description: "Log a dive to 30m or beyond",
    rule: (s) => s.diveLogs.some((l) => l.maxDepthM >= 30),
  },
  {
    id: "night-owl",
    label: "Night Owl",
    emoji: "🌙",
    description: "Log a night dive",
    rule: (s) => s.diveLogs.some((l) => l.night),
  },
  {
    id: "globetrotter",
    label: "Globetrotter",
    emoji: "🗺️",
    description: "Dive 3 different sites",
    rule: (s) => new Set(s.diveLogs.map((l) => l.site.toLowerCase())).size >= 3,
  },
  {
    id: "species-spotter",
    label: "Species Spotter",
    emoji: "🐙",
    description: "Spot 5 different species",
    rule: (s) => new Set(s.diveLogs.flatMap((l) => l.creatureIds)).size >= 5,
  },
  {
    id: "certified",
    label: "Certified",
    emoji: "🎓",
    description: "Add a certification to your profile",
    rule: (s) => s.certs.length >= 1,
  },
  {
    id: "advanced-diver",
    label: "Advanced Diver",
    emoji: "🏅",
    description: "Reach Advanced Open Water or beyond",
    rule: (s) => userRank(s) >= RANK_ADVANCED,
  },
  {
    id: "mentored",
    label: "Mentored",
    emoji: "🤝",
    description: "Book a session with a dive mentor",
    rule: (s) => s.bookings.some((b) => b.kind === "mentor-session" && b.status === "confirmed"),
  },
];

export function badgeDef(id: string): BadgeDef | undefined {
  return BADGE_DEFS.find((d) => d.id === id);
}

export function evaluateBadges(s: DemoState): DemoState {
  const earned = new Set(s.badges.map((b) => b.badgeId));
  const newly = BADGE_DEFS.filter((d) => !earned.has(d.id) && d.rule(s));
  if (newly.length === 0) return s;
  const now = new Date().toISOString();
  return {
    ...s,
    badges: [...s.badges, ...newly.map((d) => ({ badgeId: d.id, earnedAt: now }))],
  };
}
