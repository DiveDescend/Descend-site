"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RangePicker, { shortDate } from "@/components/shared/range-picker";
import { CheckCircle, CheckCircle2, Loader2 } from "lucide-react";
import { COURSES } from "@/lib/mock-data";
import { addBooking, type Booking } from "@/lib/demo-store";
import { addDaysISO } from "@/lib/dates";

const DAY_BREAKDOWN: Record<string, string[]> = {
  "1": ["Day 1: Pool session — buoyancy, mask clearing, regulator recovery", "Day 2: Open water dive 1 & 2 — shallow reef", "Day 3: Open water dive 3 & 4 — deeper reef exploration", "Day 4: Final assessment + certification dive"],
  "2": ["Day 1: Navigation & deep dive briefing", "Day 2: Deep dive + wreck dive", "Day 3: Night dive + certification"],
  default: ["Day 1: Theory and pool introduction", "Day 2: Open water skills", "Day 3: Advanced techniques", "Day 4: Assessment and certification"],
};

export default function CourseBookingPage({ params }: { params: { id: string } }) {
  const course = COURSES.find((c) => c.id === params.id) ?? COURSES[0];
  const breakdown = DAY_BREAKDOWN[params.id] ?? DAY_BREAKDOWN.default;

  const [startDate, setStartDate] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);

  const endDate = startDate ? addDaysISO(startDate, course.days - 1) : "";

  function handleConfirm() {
    setConfirming(true);
    setTimeout(() => {
      const created = addBooking({
        kind: "course",
        refId: course.id,
        title: `${course.name} (${course.agency})`,
        image: course.image,
        dateFrom: startDate,
        dateTo: endDate,
        price: course.price,
      });
      setBooking(created);
      setConfirming(false);
    }, 1200);
  }

  if (booking) {
    const ref = `DSC-${booking.id.replace(/-/g, "").slice(0, 6).toUpperCase()}`;
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">You&apos;re enrolled!</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Booking reference <span className="font-mono font-medium text-foreground">{ref}</span>
              </p>
            </div>
            <div className="w-full space-y-2 rounded-xl bg-muted/50 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{course.name}</span>
                <span className="font-medium">{shortDate(startDate)} – {shortDate(endDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{course.days} days · {course.agency}</span>
                <span className="font-semibold">${course.price}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Completing this course advances your certification journey.
            </p>
            <div className="flex w-full gap-2 pt-2">
              <Button asChild className="flex-1">
                <Link href="/itinerary">View my trips</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/journey">See your journey</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8 space-y-6">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold">{course.name}</h1>
          <Badge>{course.level}</Badge>
        </div>
        <p className="text-muted-foreground">{course.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{course.days}</p>
            <p className="text-sm text-muted-foreground">Days</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">${course.price}</p>
            <p className="text-sm text-muted-foreground">Total cost</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="mb-3 font-semibold">What you&apos;ll cover</h2>
        <div className="space-y-2">
          {breakdown.map((day, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p className="text-sm">{day}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-semibold">Pick a start date</h2>
        <div className="rounded-2xl border overflow-hidden">
          <RangePicker dateFrom={startDate} dateTo={endDate} onSelect={setStartDate} />
        </div>
        {startDate && (
          <p className="mt-2 text-sm text-muted-foreground">
            {shortDate(startDate)} – {shortDate(endDate)} · {course.days} day{course.days !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        <p className="text-sm font-medium">What&apos;s included</p>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          <li>• All equipment rental</li>
          <li>• PADI/SSI certification fee</li>
          <li>• Course materials</li>
          <li>• Pool & open water sessions</li>
        </ul>
      </div>

      <div className="space-y-2">
        <Button className="w-full" size="lg" disabled={!startDate || confirming} onClick={handleConfirm}>
          {confirming ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Confirming…
            </span>
          ) : startDate ? (
            `Confirm booking — $${course.price}`
          ) : (
            "Pick a start date to book"
          )}
        </Button>
        <Button variant="ghost" className="w-full" asChild>
          <Link href="/dive-centers">Back to dive centres</Link>
        </Button>
      </div>
    </div>
  );
}
