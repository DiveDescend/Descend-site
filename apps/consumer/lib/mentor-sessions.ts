// Mentor session catalog + deterministic availability. Pure helpers — safe to
// import from server components (instructor detail) and client wizards alike.

import type { SessionType } from "./demo-store";
import type { Instructor, InstructorCategory } from "./mock-data";

export interface SessionTypeDef {
  id: SessionType;
  label: string;
  duration: string;
  description: string;
  basePrice: number;
}

export const SESSION_TYPES: SessionTypeDef[] = [
  {
    id: "video-call",
    label: "Dive advice video call",
    duration: "30 min",
    description: "Trip planning, gear questions, or course advice over a call.",
    basePrice: 25,
  },
  {
    id: "skills-coaching",
    label: "Skills coaching",
    duration: "90 min",
    description: "Buoyancy, navigation, or photography practice in confined water.",
    basePrice: 40,
  },
  {
    id: "guided-dive",
    label: "Guided dive together",
    duration: "Half day",
    description: "Dive their home sites with someone who knows every corner.",
    basePrice: 60,
  },
];

const CATEGORY_MULTIPLIER: Record<InstructorCategory, number> = {
  Instructor: 1.5,
  Divemaster: 1.2,
  "Dive Buddy": 1,
};

export function sessionPrice(type: SessionTypeDef, category: InstructorCategory): number {
  return Math.round((type.basePrice * CATEGORY_MULTIPLIER[category]) / 5) * 5;
}

export function sessionsFrom(instructor: Pick<Instructor, "category">): number {
  return Math.min(...SESSION_TYPES.map((t) => sessionPrice(t, instructor.category)));
}

export function sessionTypeLabel(id: SessionType): string {
  return SESSION_TYPES.find((t) => t.id === id)?.label ?? "Mentor session";
}

const SLOT_TIMES = ["07:00", "10:00", "14:00", "16:30"];

/**
 * Slots for the next 7 days, deterministically thinned per mentor so each
 * calendar looks distinct but stays stable across reloads.
 */
export function availableSlots(instructorId: string): { date: string; times: string[] }[] {
  const seed = Array.from(instructorId).reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 7);
  const days: { date: string; times: string[] }[] = [];
  for (let day = 1; day <= 7; day++) {
    const d = new Date();
    d.setDate(d.getDate() + day);
    const m = `${d.getMonth() + 1}`.padStart(2, "0");
    const dd = `${d.getDate()}`.padStart(2, "0");
    const times = SLOT_TIMES.filter((_, i) => (seed + day * 13 + i * 5) % 3 !== 0);
    days.push({ date: `${d.getFullYear()}-${m}-${dd}`, times });
  }
  return days;
}
