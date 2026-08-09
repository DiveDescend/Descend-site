"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SearchX, MapPin, ArrowRight, CalendarDays, Sun, Fish, ShieldAlert, Hospital, TriangleAlert } from "lucide-react";
import GlassDiveCard from "@/components/search/glass-dive-card";
import GlassCourseCard from "@/components/search/glass-course-card";
import GlassInstructorCard from "@/components/search/glass-instructor-card";
import GlassCenterCard from "@/components/search/glass-center-card";
import { GLASS_BG, GLASS_BORDER } from "@/components/home/glass";
import { FixedMeshBackdrop, MESH_BASE } from "@/components/home/mesh-background";
import { shortDate } from "@/components/shared/range-picker";
import { COURSES, DIVE_CENTERS, FUN_DIVES, INSTRUCTORS, LOCATIONS, LOCATION_DIVE_INFO, DIVE_SITE_INDEX } from "@/lib/mock-data";

const PREVIEW_COUNT = 4;
const COURSE_PREVIEW_COUNT = 3;

/** True when an item's "Site, Region" location string matches the query,
 *  either directly or via a known location's name/region. */
function matchesWhere(itemLocation: string, q: string): boolean {
  const loc = itemLocation.toLowerCase();
  if (loc.includes(q)) return true;
  const matchedLocations = LOCATIONS.filter(
    (l) => l.name.toLowerCase().includes(q) || l.country.toLowerCase().includes(q)
  );
  return matchedLocations.some((l) => {
    if (loc.includes(l.name.toLowerCase())) return true;
    const region = itemLocation.split(",").pop()?.trim().toLowerCase() ?? "";
    return region.length > 0 && l.country.toLowerCase().includes(region);
  });
}

/** Resolves a raw "Site, Region" string (e.g. a dive site's or dive center's location)
 *  back to its canonical LOCATIONS entry. */
function resolveLocationFromString(locationStr: string) {
  const loc = locationStr.toLowerCase();
  return LOCATIONS.find((l) => loc.includes(l.name.toLowerCase()) || loc.includes(l.country.toLowerCase()));
}

export default function SearchResults() {
  const params = useSearchParams();
  const where = params.get("where")?.trim() ?? "";
  const from = params.get("from") ?? "";
  const to = params.get("to") ?? "";
  const divers = params.get("divers") ?? "";
  const isCourseSearch = params.get("type") === "Certification course";

  const q = where.toLowerCase();

  // A search can name a location directly ("Havelock Island") or a specific dive
  // site ("Blue Corner Wall", "Netrani Pinnacle") — resolve either back to the
  // location that everything else on this page gets filtered by.
  const directLocationMatch = q
    ? LOCATIONS.find(
        (l) => l.name.toLowerCase().includes(q) || q.includes(l.name.toLowerCase()) || l.country.toLowerCase().includes(q)
      )
    : undefined;
  const matchedSite = !directLocationMatch && q ? DIVE_SITE_INDEX.find((s) => s.name.toLowerCase().includes(q)) : undefined;
  const matchedLocation = directLocationMatch ?? (matchedSite ? resolveLocationFromString(matchedSite.location) : undefined);

  // Once a location is known (directly or resolved from a site name), filter by its
  // name so a site search still surfaces the instructors, centers and other dive
  // sites around it — not just the one exact site that was typed.
  const effectiveQuery = matchedLocation ? matchedLocation.name.toLowerCase() : q;

  const funDives = q
    ? FUN_DIVES.filter((d) => matchesWhere(d.location, effectiveQuery) || d.name.toLowerCase().includes(q))
    : FUN_DIVES;
  const centers = q ? DIVE_CENTERS.filter((dc) => matchesWhere(dc.location, effectiveQuery)) : DIVE_CENTERS;
  const instructors = q ? INSTRUCTORS.filter((i) => matchesWhere(i.location, effectiveQuery)) : INSTRUCTORS;

  // Courses have no location of their own — go by the agencies taught at the
  // dive centers matched in this location (falls back to every course when browsing broadly).
  const agencies = new Set(centers.flatMap((dc) => dc.certifications));
  const courses = q ? COURSES.filter((c) => agencies.has(c.agency)) : COURSES;
  const info = matchedLocation ? LOCATION_DIVE_INFO[matchedLocation.id] : undefined;

  const bookingQuery = new URLSearchParams();
  if (from) bookingQuery.set("from", from);
  if (to) bookingQuery.set("to", to);
  if (divers) bookingQuery.set("divers", divers);

  const dateLabel = from && to ? `${shortDate(from)} – ${shortDate(to)}` : "";
  const primaryCount = isCourseSearch ? courses.length : funDives.length;
  const nothing = primaryCount + centers.length + instructors.length === 0;

  const centersSection = centers.length > 0 && (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold tracking-tight text-white">
          {matchedLocation ? `Dive centers in ${matchedLocation.name}` : "Dive Centers"}
        </h2>
        {centers.length > PREVIEW_COUNT && (
          <Link href="/dive-centers" className="flex shrink-0 items-center gap-1 text-sm font-semibold text-white/70 hover:text-white">
            Explore more <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {centers.slice(0, PREVIEW_COUNT).map((dc) => (
          <GlassCenterCard key={dc.id} {...dc} />
        ))}
      </div>
    </section>
  );

  const instructorsSection = instructors.length > 0 && (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold tracking-tight text-white">
          {matchedLocation ? `Instructors in ${matchedLocation.name}` : "Instructors & Buddies"}
        </h2>
        {instructors.length > PREVIEW_COUNT && (
          <Link href="/instructors" className="flex shrink-0 items-center gap-1 text-sm font-semibold text-white/70 hover:text-white">
            Explore more <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {instructors.slice(0, PREVIEW_COUNT).map((instructor) => (
          <GlassInstructorCard key={instructor.id} {...instructor} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="relative min-h-screen">
      <FixedMeshBackdrop />

      {/* ─── Location banner: full-bleed, runs behind the transparent header ─── */}
      {matchedLocation && (
        <div className="relative h-[480px] w-full sm:h-[620px]">
          {/* Photo + dark overlay dissolve into the fixed backdrop behind them, instead of
              ending in a flat color — same technique as the homepage hero. */}
          <div
            className="absolute inset-0"
            style={{
              maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 92%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 92%)",
            }}
          >
            <Image src={matchedLocation.image} alt={matchedLocation.name} fill className="object-cover" priority />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(180deg, rgba(5,11,20,0.45) 0%, rgba(5,11,20,0.3) 40%, ${MESH_BASE} 100%)` }}
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 px-6 pb-24 sm:px-10 sm:pb-28 lg:px-16">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-white/70">
              <MapPin className="h-4 w-4" /> {matchedLocation.country}
            </p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">{matchedLocation.name}</h1>
          </div>
        </div>
      )}

      <div className={`relative mx-auto max-w-screen-2xl space-y-12 px-6 pb-20 sm:px-10 lg:px-16 ${matchedLocation ? "-mt-16" : "pt-28"}`}>
        {/* ─── Description + season / weather / marine life ────────── */}
        {matchedLocation && info && (
          <div className={`relative z-10 rounded-3xl p-6 sm:p-8 ${GLASS_BORDER}`} style={GLASS_BG}>
            <p className="leading-relaxed text-white/80">{info.description}</p>
            <div className="mt-6 grid grid-cols-1 gap-5 border-t border-white/15 pt-5 sm:grid-cols-3">
              <div>
                <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-white/40">
                  <CalendarDays className="h-3.5 w-3.5" /> Best season
                </p>
                <p className="mt-1 text-sm font-medium text-white">{info.season}</p>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-white/40">
                  <Sun className="h-3.5 w-3.5" /> Ideal weather
                </p>
                <p className="mt-1 text-sm font-medium text-white">{info.weather}</p>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-white/40">
                  <Fish className="h-3.5 w-3.5" /> Marine life
                </p>
                <p className="mt-1 text-sm font-medium text-white">{info.marineLife.join(", ")}</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-amber-400/25 bg-amber-500/10 p-4">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-amber-300">
                <TriangleAlert className="h-3.5 w-3.5" /> Emergency info — unverified, confirm locally
              </p>
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-white/50">
                    <ShieldAlert className="h-3.5 w-3.5" /> Nearest decompression chamber
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">{info.chamber}</p>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-white/50">
                    <Hospital className="h-3.5 w-3.5" /> Emergency hospital
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">{info.hospital}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-white/40">
                Best-effort information, not verified in real time. Always confirm current chamber status with DAN or your dive operator before diving.
              </p>
            </div>

            <p className="mt-5 border-t border-white/15 pt-4 text-sm text-white/50">
              {isCourseSearch ? `${courses.length} courses` : `${funDives.length} dive sites`} · {instructors.length} instructors · {centers.length} dive centers
              {dateLabel && ` · ${dateLabel}`}
            </p>
          </div>
        )}

        {!matchedLocation && (
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              {where ? `Results for "${where}"` : "Explore everywhere"}
            </h1>
            <p className="mt-2 text-white/60">
              {nothing
                ? "Nothing matched your search."
                : `${primaryCount + centers.length + instructors.length} matches across ${isCourseSearch ? "courses" : "dive sites"}, instructors and centers${dateLabel ? ` · ${dateLabel}` : ""}.`}
            </p>
          </div>
        )}

        {nothing && (
          <div className={`flex flex-col items-center gap-4 rounded-2xl py-16 text-center ${GLASS_BORDER}`} style={GLASS_BG}>
            <SearchX className="h-8 w-8 text-white/50" />
            <p className="text-sm text-white/60">
              We couldn&apos;t find anything in &ldquo;{where}&rdquo; yet.
            </p>
            <Link
              href="/search"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#0F2E4C] transition-colors hover:bg-white/90"
            >
              Browse everything
            </Link>
          </div>
        )}

        {/* ─── Primary content: courses when searching for a certification
               course, otherwise fun dives / dive sites ────────────────── */}
        {isCourseSearch ? (
          courses.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold tracking-tight text-white">
                  {matchedLocation ? `Courses in ${matchedLocation.name}` : "Courses"}
                </h2>
                {courses.length > COURSE_PREVIEW_COUNT && (
                  <Link href="/courses" className="flex shrink-0 items-center gap-1 text-sm font-semibold text-white/70 hover:text-white">
                    Explore more <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>

              <div className={`rounded-3xl p-6 sm:p-8 ${GLASS_BORDER}`} style={GLASS_BG}>
                <p className="text-sm leading-relaxed text-white/70">
                  Certifications build on each other, and they never expire — you can start with the basics and
                  pick up the next level whenever you&apos;re ready.
                </p>
                <div className="mt-5 grid grid-cols-1 gap-5 border-t border-white/15 pt-5 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-bold text-white">Open Water Diver (OW)</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/60">
                      Your first certification. Covers core scuba skills — buoyancy, mask clearing, controlled
                      ascents — through e-learning, pool sessions and open water dives. Certifies you to dive
                      independently with a buddy to 18m. Typically 3–4 days.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Advanced Open Water (AOW)</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/60">
                      Builds on Open Water with five guided adventure dives — a deep dive, navigation, and your
                      choice of electives like wreck or drift diving. Extends your depth limit to 30m. Typically
                      2–3 days.
                    </p>
                  </div>
                </div>
                <p className="mt-5 border-t border-white/15 pt-4 text-sm text-white/50">
                  From there, most divers continue to Rescue Diver, Divemaster, or specialty courses like Nitrox
                  and Wreck diving — pick whichever fits where you want to take your diving next.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {courses.slice(0, COURSE_PREVIEW_COUNT).map((course) => (
                  <GlassCourseCard key={course.id} {...course} />
                ))}
              </div>
            </section>
          )
        ) : (
          funDives.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-white">
                {matchedLocation ? `Dive sites in ${matchedLocation.name}` : "Fun Dives"}
              </h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {funDives.map((dive) => (
                  <GlassDiveCard key={dive.id} {...dive} bookingQuery={bookingQuery.toString() || undefined} />
                ))}
              </div>
            </section>
          )
        )}

        {/* Dive centers and instructors swap order depending on search mode:
            course searches lead with the dive shops that teach them; the default
            fun-dive search leads with instructors. */}
        {isCourseSearch ? (
          <>
            {centersSection}
            {instructorsSection}
          </>
        ) : (
          <>
            {instructorsSection}
            {centersSection}
          </>
        )}
      </div>
    </div>
  );
}
