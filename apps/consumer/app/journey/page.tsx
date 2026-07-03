"use client";

import Link from "next/link";
import { Camera, Flame, GraduationCap, LifeBuoy, Medal, Moon, Ship, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PathNode, Arrow, type PathNodeState } from "@/components/shared/path-node";
import { COURSES } from "@/lib/mock-data";
import { useDemoStore } from "@/lib/use-demo-store";
import {
  JOURNEY_SPECIALTIES,
  JOURNEY_SPINE,
  RANK_LABELS,
  RANK_OPEN_WATER,
  specialtyCompleted,
  userRank,
} from "@/lib/certification-path";

const SPINE_ICONS: Record<number, React.ElementType> = {
  1: Waves,
  2: Ship,
  3: LifeBuoy,
  4: Medal,
  5: GraduationCap,
};

const SPECIALTY_ICONS: Record<string, React.ElementType> = {
  nitrox: Flame,
  deep: Waves,
  night: Moon,
  photo: Camera,
};

export default function JourneyPage() {
  const state = useDemoStore();
  const rank = userRank(state);

  const nodeState = (nodeRank: number): PathNodeState => {
    if (rank >= nodeRank) return "completed";
    if (nodeRank === rank + 1) return "current";
    return "locked";
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">Your dive journey</h1>
        <p className="mt-1 text-muted-foreground">
          {rank > 0 ? (
            <>
              You&apos;re a <span className="font-medium text-foreground">{RANK_LABELS[rank]}</span> —{" "}
              {rank} of {JOURNEY_SPINE.length} milestones complete.
            </>
          ) : (
            <>Every diver starts here. Your first certification is one course away.</>
          )}
        </p>
        <div className="mx-auto mt-4 flex max-w-xs gap-1.5">
          {JOURNEY_SPINE.map((node) => (
            <div
              key={node.rank}
              className={`h-1.5 flex-1 rounded-full ${rank >= node.rank ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-md">
        {JOURNEY_SPINE.map((node, i) => {
          const s = nodeState(node.rank);
          const course = node.courseId ? COURSES.find((c) => c.id === node.courseId) : undefined;
          return (
            <div key={node.rank}>
              {i > 0 && <Arrow />}
              <PathNode
                icon={SPINE_ICONS[node.rank]}
                title={node.title}
                note={node.note}
                state={s}
                action={
                  s === "current" && course ? (
                    <Button asChild size="sm" className="w-full">
                      <Link href={`/book/course/${course.id}`}>
                        Continue your journey — {course.name} · {course.days} days · ${course.price}
                      </Link>
                    </Button>
                  ) : s === "current" && !course ? (
                    <Button asChild size="sm" variant="outline" className="w-full">
                      <Link href="/instructors">Find a Course Director</Link>
                    </Button>
                  ) : undefined
                }
              />
            </div>
          );
        })}
      </div>

      <div>
        <h2 className="mb-3 text-center text-sm font-semibold text-muted-foreground">
          Specialties — add any of these after Open Water
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {JOURNEY_SPECIALTIES.map((spec) => {
            const done = specialtyCompleted(state, spec);
            const unlocked = rank >= RANK_OPEN_WATER;
            const course = spec.courseId ? COURSES.find((c) => c.id === spec.courseId) : undefined;
            return (
              <PathNode
                key={spec.id}
                icon={SPECIALTY_ICONS[spec.id]}
                title={spec.title}
                note={spec.note}
                state={done ? "completed" : unlocked ? "default" : "locked"}
                action={
                  !done && unlocked && course ? (
                    <Button asChild size="sm" variant="outline" className="w-full">
                      <Link href={`/book/course/${course.id}`}>
                        Book {course.name} · ${course.price}
                      </Link>
                    </Button>
                  ) : undefined
                }
              />
            );
          })}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Completing a course you booked on Descend advances your journey automatically.
      </p>
    </div>
  );
}
