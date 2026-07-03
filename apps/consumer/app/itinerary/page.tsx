"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TripCard from "@/components/shared/trip-card";
import { CalendarDays } from "lucide-react";
import { pastBookings, upcomingBookings, type Booking } from "@/lib/demo-store";
import { useDemoStore } from "@/lib/use-demo-store";

function EmptyState({ message, ctaHref, ctaLabel }: { message: string; ctaHref: string; ctaLabel: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed py-12 text-center">
      <CalendarDays className="h-10 w-10 text-muted-foreground/50" />
      <p className="text-sm text-muted-foreground">{message}</p>
      <Button size="sm" asChild>
        <Link href={ctaHref}>{ctaLabel}</Link>
      </Button>
    </div>
  );
}

export default function TripsPage() {
  const state = useDemoStore();
  const upcoming = upcomingBookings(state);
  const past = pastBookings(state);
  const logged = new Set(state.diveLogs.map((l) => l.bookingId).filter(Boolean));
  const needsLog = (b: Booking) => b.kind === "fun-dive" && !logged.has(b.id);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Trips</h1>
        <p className="text-muted-foreground">Your dives, courses and mentor sessions.</p>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming{upcoming.length > 0 ? ` (${upcoming.length})` : ""}</TabsTrigger>
          <TabsTrigger value="past">Past{past.length > 0 ? ` (${past.length})` : ""}</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-3 pt-4">
          {upcoming.length === 0 ? (
            <EmptyState
              message="No upcoming trips booked."
              ctaHref="/dives"
              ctaLabel="Browse dives"
            />
          ) : (
            upcoming.map((b) => <TripCard key={b.id} booking={b} upcoming />)
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-3 pt-4">
          {past.length === 0 ? (
            <EmptyState
              message="No past trips yet — your dive history will show up here."
              ctaHref="/dives"
              ctaLabel="Book your first dive"
            />
          ) : (
            past.map((b) => (
              <TripCard key={b.id} booking={b} upcoming={false} needsLog={needsLog(b)} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
