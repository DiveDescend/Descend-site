"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import InstructorCard from "@/components/shared/instructor-card";
import { INSTRUCTORS, INSTRUCTOR_COURSES, INSTRUCTOR_AGENCIES, type InstructorCategory } from "@/lib/mock-data";
import { Search } from "lucide-react";

const TYPES: { label: string; value: InstructorCategory | "All" }[] = [
  { label: "All",          value: "All" },
  { label: "Instructors",  value: "Instructor" },
  { label: "Divemasters",  value: "Divemaster" },
  { label: "Dive Buddies", value: "Dive Buddy" },
];

export default function InstructorsPage() {
  const [query, setQuery]   = useState("");
  const [type, setType]     = useState<InstructorCategory | "All">("All");
  const [course, setCourse] = useState<string | null>(null);
  const [agency, setAgency] = useState<string | null>(null);

  const filtered = INSTRUCTORS.filter((i) => {
    if (type !== "All" && i.category !== type) return false;
    if (course && !i.courses.includes(course)) return false;
    if (agency && i.agency !== agency) return false;
    if (query) {
      const q = query.toLowerCase();
      return (
        i.name.toLowerCase().includes(q) ||
        i.location.toLowerCase().includes(q) ||
        i.title.toLowerCase().includes(q) ||
        i.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Instructors</h1>
        <p className="text-muted-foreground">
          Hire freelance instructors and divemasters — or find an experienced buddy for your next dive.
        </p>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, location, or skill..."
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {TYPES.map(({ label, value }) => (
            <Badge
              key={value}
              variant={type === value ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setType(value)}
            >
              {label}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Course</span>
          {INSTRUCTOR_COURSES.map((c) => (
            <Badge
              key={c}
              variant={course === c ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setCourse(course === c ? null : c)}
            >
              {c}
            </Badge>
          ))}
          <span className="mx-1 h-4 w-px bg-border" />
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Agency</span>
          {INSTRUCTOR_AGENCIES.map((a) => (
            <Badge
              key={a}
              variant={agency === a ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setAgency(agency === a ? null : a)}
            >
              {a}
            </Badge>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {filtered.length} dive {filtered.length === 1 ? "professional" : "professionals"}
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {filtered.map((instructor) => (
            <InstructorCard key={instructor.id} {...instructor} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed py-16 text-center">
          <p className="font-medium">No matches found</p>
          <p className="text-sm text-muted-foreground">Try removing a filter or broadening your search.</p>
        </div>
      )}
    </div>
  );
}
