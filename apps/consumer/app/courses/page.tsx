"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/shared/course-card";
import LearningPathModal from "@/components/shared/learning-path-modal";
import { COURSES, COURSE_LEVELS, INSTRUCTOR_AGENCIES } from "@/lib/mock-data";
import { Route } from "lucide-react";

const LEVEL_TAGLINES: Record<string, string> = {
  Beginner:     "No experience needed — start your diving journey here",
  Intermediate: "Build on your Open Water skills and go deeper",
  Advanced:     "Sharpen your rescue, deep, and leadership skills",
  Specialty:    "Focused add-ons you can take any time after Open Water",
  Professional: "Turn diving into a career",
};

export default function CoursesPage() {
  const [agency, setAgency] = useState<string | null>(null);
  const [pathOpen, setPathOpen] = useState(false);

  const filtered = agency ? COURSES.filter((c) => c.agency === agency) : COURSES;
  const sections = COURSE_LEVELS
    .map((level) => ({ level, courses: filtered.filter((c) => c.level === level) }))
    .filter((s) => s.courses.length > 0);

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
        <p className="text-muted-foreground">Get certified — from your first breath underwater to professional level.</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge
          variant={!agency ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setAgency(null)}
        >
          All
        </Badge>
        <span className="mx-1 h-4 w-px bg-border" />
        <span className="text-xs font-semibold text-muted-foreground">Agency</span>
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

      <div className="flex flex-col items-start justify-between gap-3 rounded-2xl border bg-muted/40 p-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Route className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-sm font-semibold">Not sure which course to do?</p>
            <p className="text-sm text-muted-foreground">See how certifications build on each other, from Open Water to Instructor.</p>
          </div>
        </div>
        <Button variant="outline" className="shrink-0" onClick={() => setPathOpen(true)}>
          View the learning path
        </Button>
      </div>

      {sections.map(({ level, courses }) => (
        <section key={level} className="space-y-4 pt-2">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">{level}</h2>
            <p className="text-sm text-muted-foreground">{LEVEL_TAGLINES[level]}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </section>
      ))}

      <LearningPathModal open={pathOpen} onClose={() => setPathOpen(false)} />
    </div>
  );
}
