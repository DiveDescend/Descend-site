// Client-side demo store: all user-generated state (bookings, dive logs,
// certs, badges, kudos) lives in one versioned localStorage key so the app
// demos end-to-end without a backend. mock-data.ts stays the read-only
// catalog; this store holds only what the user does.

import { daysFromNow, todayISO, type ISODate } from "./dates";
import { evaluateBadges } from "./badges";

export { daysFromNow, todayISO, type ISODate };

export type BookingKind = "fun-dive" | "course" | "mentor-session";
export type SessionType = "video-call" | "guided-dive" | "skills-coaching";

export interface Booking {
  id: string;
  kind: BookingKind;
  refId: string; // FUN_DIVES / COURSES / INSTRUCTORS id
  title: string;
  image: string;
  location?: string;
  dateFrom: ISODate;
  dateTo: ISODate; // equals dateFrom for mentor sessions
  slotTime?: string; // "10:00" for mentor sessions
  sessionType?: SessionType;
  divers?: number;
  equipment?: string[];
  price: number; // total
  status: "confirmed" | "cancelled";
  createdAt: string;
}

export interface DiveLog {
  id: string;
  source: "manual" | "booking";
  bookingId?: string;
  site: string;
  location?: string;
  date: ISODate;
  maxDepthM: number;
  durationMin: number;
  buddy?: string;
  creatureIds: string[]; // CREATURES ids
  notes?: string;
  photo?: string; // preset URL only — no data URLs in localStorage
  night?: boolean;
}

export interface CertEntry {
  id: string;
  agency: string;
  level: string;
  number: string;
}

export interface BadgeAward {
  badgeId: string;
  earnedAt: string;
}

export interface DemoState {
  version: 1;
  profile: { name: string; bio: string; certified: boolean | null; onboarded: boolean };
  certs: CertEntry[];
  bookings: Booking[];
  diveLogs: DiveLog[];
  dismissedDraftIds: string[];
  badges: BadgeAward[];
  likedFeedIds: string[];
}

const STORAGE_KEY = "descend-demo-v1";

export function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// ---------------------------------------------------------------------------
// Seed

const unsplash = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

function buildSeed(): DemoState {
  return {
    version: 1,
    profile: { name: "Alex Diver", bio: "", certified: true, onboarded: false },
    certs: [{ id: "seed-cert-1", agency: "PADI", level: "Open Water Diver", number: "2210-4451" }],
    bookings: [
      {
        id: "seed-booking-upcoming",
        kind: "fun-dive",
        refId: "2",
        title: "Manta Ray Point",
        image: unsplash("1542443605-fcefd6550d4a"),
        location: "Agatti Island, Lakshadweep",
        dateFrom: daysFromNow(5),
        dateTo: daysFromNow(6),
        divers: 2,
        equipment: ["Full equipment rental"],
        price: 220,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      },
      {
        // Intentionally never logged — surfaces the draft-log flow in the demo.
        id: "seed-booking-unlogged",
        kind: "fun-dive",
        refId: "4",
        title: "Night Reef Dive",
        image: unsplash("1742461399600-3ded0fe5bb0e"),
        location: "Pondicherry, Tamil Nadu",
        dateFrom: daysFromNow(-12),
        dateTo: daysFromNow(-12),
        divers: 1,
        price: 85,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      },
      {
        id: "seed-booking-logged",
        kind: "fun-dive",
        refId: "1",
        title: "Blue Corner Wall",
        image: unsplash("1682687981907-170c006e3744"),
        location: "Havelock Island, Andaman",
        dateFrom: daysFromNow(-40),
        dateTo: daysFromNow(-39),
        divers: 1,
        price: 120,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      },
    ],
    diveLogs: [
      {
        id: "seed-log-1",
        source: "booking",
        bookingId: "seed-booking-logged",
        site: "Blue Corner Wall",
        location: "Havelock Island, Andaman",
        date: daysFromNow(-40),
        maxDepthM: 28,
        durationMin: 52,
        buddy: "Tara D'Souza",
        creatureIds: ["5", "6"],
        notes: "Strong current on the wall, barracuda school at 20m.",
        photo: unsplash("1682687981907-170c006e3744"),
      },
      {
        id: "seed-log-2",
        source: "manual",
        site: "Temple Reef",
        location: "Pondicherry, Tamil Nadu",
        date: daysFromNow(-70),
        maxDepthM: 16,
        durationMin: 45,
        buddy: "Dev Malhotra",
        creatureIds: ["2", "4"],
        notes: "Great viz, turtles everywhere.",
      },
      {
        id: "seed-log-3",
        source: "manual",
        site: "Lighthouse Rock",
        location: "Pondicherry, Tamil Nadu",
        date: daysFromNow(-100),
        maxDepthM: 14,
        durationMin: 40,
        creatureIds: ["2", "7"],
      },
    ],
    dismissedDraftIds: [],
    badges: [],
    likedFeedIds: [],
  };
}

// Stable server-side snapshot. Must be the same object every call — React
// compares by reference during hydration.
const SERVER_SEED: DemoState = buildSeed();

// ---------------------------------------------------------------------------
// Store core

let state: DemoState | null = null;
const listeners = new Set<() => void>();

function load(): DemoState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DemoState;
      if (parsed && parsed.version === 1) return parsed;
    }
  } catch {
    // corrupt or unavailable — fall through to reseed
  }
  const seed = evaluateBadges(buildSeed());
  save(seed);
  return seed;
}

function save(s: DemoState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    // storage full/unavailable — demo keeps working in-memory
  }
}

export function getSnapshot(): DemoState {
  if (state === null) state = load();
  return state;
}

export function getServerSnapshot(): DemoState {
  return SERVER_SEED;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function commit(update: (s: DemoState) => DemoState) {
  state = evaluateBadges(update(getSnapshot()));
  save(state);
  listeners.forEach((l) => l());
}

// ---------------------------------------------------------------------------
// Mutations

export function addBooking(booking: Omit<Booking, "id" | "status" | "createdAt">): Booking {
  const full: Booking = { ...booking, id: uid(), status: "confirmed", createdAt: new Date().toISOString() };
  commit((s) => ({ ...s, bookings: [...s.bookings, full] }));
  return full;
}

export function cancelBooking(id: string) {
  commit((s) => ({
    ...s,
    bookings: s.bookings.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b)),
  }));
}

export function addDiveLog(log: Omit<DiveLog, "id">): DiveLog {
  const full: DiveLog = { ...log, id: uid() };
  commit((s) => ({ ...s, diveLogs: [...s.diveLogs, full] }));
  return full;
}

export function dismissDraft(bookingId: string) {
  commit((s) => ({ ...s, dismissedDraftIds: [...s.dismissedDraftIds, bookingId] }));
}

export function setProfile(profile: Partial<DemoState["profile"]>) {
  commit((s) => ({ ...s, profile: { ...s.profile, ...profile } }));
}

export function addCerts(certs: Omit<CertEntry, "id">[]) {
  const withIds = certs.map((c) => ({ ...c, id: uid() }));
  commit((s) => ({ ...s, certs: [...s.certs, ...withIds] }));
}

export function toggleKudos(feedId: string) {
  commit((s) => ({
    ...s,
    likedFeedIds: s.likedFeedIds.includes(feedId)
      ? s.likedFeedIds.filter((id) => id !== feedId)
      : [...s.likedFeedIds, feedId],
  }));
}

export function resetDemo() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  state = evaluateBadges(buildSeed());
  save(state);
  listeners.forEach((l) => l());
}

// ---------------------------------------------------------------------------
// Selectors (pure — call with the state from useDemoStore)

export function upcomingBookings(s: DemoState): Booking[] {
  const today = todayISO();
  return s.bookings
    .filter((b) => b.status === "confirmed" && b.dateTo >= today)
    .sort((a, b) => a.dateFrom.localeCompare(b.dateFrom));
}

export function pastBookings(s: DemoState): Booking[] {
  const today = todayISO();
  return s.bookings
    .filter((b) => b.status === "confirmed" && b.dateTo < today)
    .sort((a, b) => b.dateFrom.localeCompare(a.dateFrom));
}

/** Past fun-dive bookings with no confirmed log — rendered as draft log cards. */
export function draftCandidates(s: DemoState): Booking[] {
  const logged = new Set(s.diveLogs.map((l) => l.bookingId).filter(Boolean));
  return pastBookings(s).filter(
    (b) => b.kind === "fun-dive" && !logged.has(b.id) && !s.dismissedDraftIds.includes(b.id)
  );
}

export interface DiveStats {
  totalDives: number;
  hours: number;
  maxDepthM: number;
  sites: number;
  species: number;
}

export function diveStats(s: DemoState): DiveStats {
  const logs = s.diveLogs;
  const minutes = logs.reduce((sum, l) => sum + l.durationMin, 0);
  return {
    totalDives: logs.length,
    hours: Math.round((minutes / 60) * 10) / 10,
    maxDepthM: logs.reduce((max, l) => Math.max(max, l.maxDepthM), 0),
    sites: new Set(logs.map((l) => l.site.toLowerCase())).size,
    species: new Set(logs.flatMap((l) => l.creatureIds)).size,
  };
}
