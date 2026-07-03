"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import SectionHeader from "@/components/shared/section-header";
import FunDiveCard from "@/components/shared/fun-dive-card";
import DiveCenterCard from "@/components/shared/dive-center-card";
import InstructorCard from "@/components/shared/instructor-card";
import CourseCard from "@/components/shared/course-card";
import { shortDate } from "@/components/shared/range-picker";
import { COURSES, DIVE_CENTERS, FUN_DIVES, INSTRUCTORS, LOCATIONS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

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

export default function SearchResults() {
  const params = useSearchParams();
  const where = params.get("where")?.trim() ?? "";
  const from = params.get("from") ?? "";
  const to = params.get("to") ?? "";
  const divers = params.get("divers") ?? "";

  const q = where.toLowerCase();

  const funDives = q ? FUN_DIVES.filter((d) => matchesWhere(d.location, q)) : FUN_DIVES;
  const centers = q ? DIVE_CENTERS.filter((dc) => matchesWhere(dc.location, q)) : DIVE_CENTERS;
  const instructors = q ? INSTRUCTORS.filter((i) => matchesWhere(i.location, q)) : INSTRUCTORS;

  // Courses have no location — offer the ones taught by agencies present at
  // the matched dive centers.
  const agencies = new Set(centers.flatMap((dc) => dc.certifications));
  const courses = q ? COURSES.filter((c) => agencies.has(c.agency)) : COURSES;

  const bookingQuery = new URLSearchParams();
  if (from) bookingQuery.set("from", from);
  if (to) bookingQuery.set("to", to);
  if (divers) bookingQuery.set("divers", divers);

  const summary = [
    where ? `Results for “${where}”` : "All results",
    from && to ? `${shortDate(from)} – ${shortDate(to)}` : null,
    divers ? `${divers} diver${divers === "1" ? "" : "s"}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const nothing = funDives.length + centers.length + instructors.length === 0;

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-8 space-y-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{summary}</h1>
        <p className="text-muted-foreground">
          {nothing
            ? "Nothing matched your search."
            : `${funDives.length + centers.length + instructors.length} matches across dives, centers and mentors.`}
        </p>
      </div>

      {nothing && (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed py-16 text-center">
          <SearchX className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            We couldn&apos;t find anything in &ldquo;{where}&rdquo; yet.
          </p>
          <Button asChild variant="outline">
            <Link href="/search">Browse everything</Link>
          </Button>
        </div>
      )}

      {funDives.length > 0 && (
        <section className="space-y-4">
          <SectionHeader title="Fun Dives" seeAllHref="/dives" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {funDives.map((dive) => (
              <FunDiveCard key={dive.id} {...dive} bookingQuery={bookingQuery.toString() || undefined} />
            ))}
          </div>
        </section>
      )}

      {centers.length > 0 && (
        <section className="space-y-4">
          <SectionHeader title="Dive Centers" seeAllHref="/dive-centers" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {centers.map((dc) => (
              <DiveCenterCard key={dc.id} {...dc} />
            ))}
          </div>
        </section>
      )}

      {instructors.length > 0 && (
        <section className="space-y-4">
          <SectionHeader title="Instructors & Buddies" seeAllHref="/instructors" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {instructors.map((instructor) => (
              <InstructorCard key={instructor.id} {...instructor} />
            ))}
          </div>
        </section>
      )}

      {courses.length > 0 && !nothing && (
        <section className="space-y-4">
          <SectionHeader title="Courses" seeAllHref="/courses" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {courses.slice(0, 5).map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
