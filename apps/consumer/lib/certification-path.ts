// Canonical certification ladder shared by the booking cert check and the
// journey skill tree. Agency-specific level strings (PADI/SSI/NAUI/CMAS/BSAC/…)
// are normalized onto one rank scale via keyword matching.

import type { DemoState } from "./demo-store";
import { COURSES } from "./mock-data";
import { todayISO } from "./dates";

export const RANK_NONE = 0;
export const RANK_OPEN_WATER = 1;
export const RANK_ADVANCED = 2;
export const RANK_RESCUE = 3;
export const RANK_DIVEMASTER = 4;
export const RANK_INSTRUCTOR = 5;

export const RANK_LABELS: Record<number, string> = {
  [RANK_NONE]: "Not yet certified",
  [RANK_OPEN_WATER]: "Open Water Diver",
  [RANK_ADVANCED]: "Advanced Open Water Diver",
  [RANK_RESCUE]: "Rescue Diver",
  [RANK_DIVEMASTER]: "Divemaster",
  [RANK_INSTRUCTOR]: "Instructor",
};

/** Keyword-map a heterogeneous agency level string onto the canonical ranks. */
export function normalizeCertLevel(level: string): number {
  const l = level.toLowerCase();
  if (!l.trim()) return RANK_NONE;
  if (l.includes("instructor") || l.includes("trainer") || l.includes("course director")) return RANK_INSTRUCTOR;
  if (l.includes("divemaster") || l.includes("dive leader") || l.includes("dive control") || l.includes("4 star")) return RANK_DIVEMASTER;
  if (l.includes("rescue") || l.includes("stress") || l.includes("master scuba diver") || l.includes("master diver") || l.includes("3 star") || l.includes("first class")) return RANK_RESCUE;
  if (l.includes("advanced") || l.includes("sports diver") || l.includes("2 star")) return RANK_ADVANCED;
  if (l.includes("open water") || l.includes("scuba diver") || l.includes("ocean diver") || l.includes("1 star") || l.includes("fundamentals") || l.includes("recreational")) return RANK_OPEN_WATER;
  return RANK_NONE;
}

/** Rank a course confers on completion (0 for specialties — they don't advance the spine). */
export function courseRank(courseId: string): number {
  const course = COURSES.find((c) => c.id === courseId);
  if (!course || course.level === "Specialty") return RANK_NONE;
  return normalizeCertLevel(course.name);
}

/**
 * The user's current rank: the max of their declared certifications and any
 * course bookings whose end date has passed — completing a booked course
 * advances the journey.
 */
export function userRank(s: DemoState): number {
  const today = todayISO();
  const certRanks = s.certs.map((c) => normalizeCertLevel(c.level));
  const completedCourseRanks = s.bookings
    .filter((b) => b.kind === "course" && b.status === "confirmed" && b.dateTo < today)
    .map((b) => courseRank(b.refId));
  return Math.max(RANK_NONE, ...certRanks, ...completedCourseRanks);
}

/** Rank required by a fun dive's minCert string. */
export function requiredRank(minCert: string): number {
  return normalizeCertLevel(minCert);
}

export interface JourneyNode {
  rank: number;
  title: string;
  note: string;
  /** COURSES id for the booking CTA; null when Descend has no bookable course yet. */
  courseId: string | null;
}

export const JOURNEY_SPINE: JourneyNode[] = [
  { rank: RANK_OPEN_WATER, title: "Open Water Diver",    note: "Your first certification — dive to 18m",     courseId: "1" },
  { rank: RANK_ADVANCED,   title: "Advanced Open Water", note: "Five adventure dives, extend to 30m",        courseId: "2" },
  { rank: RANK_RESCUE,     title: "Rescue Diver",        note: "Prevent and manage dive emergencies",        courseId: "3" },
  { rank: RANK_DIVEMASTER, title: "Divemaster",          note: "Lead certified divers professionally",       courseId: "4" },
  { rank: RANK_INSTRUCTOR, title: "Instructor",          note: "Teach courses and certify new divers",       courseId: null },
];

export interface SpecialtyNode {
  id: string;
  title: string;
  note: string;
  courseId: string | null;
  /** Lowercase keywords matched against cert levels to detect completion. */
  match: string[];
}

export const JOURNEY_SPECIALTIES: SpecialtyNode[] = [
  { id: "nitrox", title: "Nitrox",         note: "Dive longer with enriched air",      courseId: "5", match: ["nitrox", "enriched"] },
  { id: "deep",   title: "Deep Diver",     note: "Train for dives down to 40m",        courseId: "6", match: ["deep"] },
  { id: "night",  title: "Night Diver",    note: "Explore the reef after dark",        courseId: null, match: ["night"] },
  { id: "photo",  title: "UW Photography", note: "Bring the underwater world home",    courseId: null, match: ["photo"] },
];

export function specialtyCompleted(s: DemoState, spec: SpecialtyNode): boolean {
  const today = todayISO();
  if (s.certs.some((c) => spec.match.some((m) => c.level.toLowerCase().includes(m)))) return true;
  return s.bookings.some(
    (b) => b.kind === "course" && b.status === "confirmed" && b.dateTo < today && b.refId === spec.courseId
  );
}

/** The user's highest cert entry at their current rank, if any (for "PADI Open Water on file"). */
export function highestCert(s: DemoState) {
  let best: { agency: string; level: string } | null = null;
  let bestRank = RANK_NONE;
  for (const c of s.certs) {
    const r = normalizeCertLevel(c.level);
    if (r > bestRank) {
      bestRank = r;
      best = { agency: c.agency, level: c.level };
    }
  }
  return best;
}
