import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays, Waves, BookOpen } from "lucide-react";

export default function ItineraryPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Itinerary</h1>
        <p className="text-muted-foreground">Your upcoming dives and courses.</p>
      </div>

      <section className="space-y-3">
        <h2 className="font-semibold flex items-center gap-2">
          <Waves className="h-4 w-4 text-primary" /> Upcoming Dives
        </h2>
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed py-12 text-center">
          <CalendarDays className="h-10 w-10 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No upcoming dives booked.</p>
          <Button size="sm" asChild>
            <Link href="/dive-centers">Browse dive centres</Link>
          </Button>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" /> Upcoming Courses
        </h2>
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed py-12 text-center">
          <CalendarDays className="h-10 w-10 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No upcoming courses booked.</p>
          <Button size="sm" asChild>
            <Link href="/dive-centers">Find a course</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
