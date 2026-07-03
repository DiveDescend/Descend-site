"use client";

import Link from "next/link";
import Image from "next/image";
import { Anchor, BookOpen, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { shortDate } from "@/components/shared/range-picker";
import { cancelBooking, type Booking } from "@/lib/demo-store";
import { sessionTypeLabel } from "@/lib/mentor-sessions";

const KIND_META = {
  "fun-dive": { label: "Fun dive", icon: Anchor },
  course: { label: "Course", icon: BookOpen },
  "mentor-session": { label: "Mentor session", icon: Users },
} as const;

export default function TripCard({ booking, upcoming, needsLog }: {
  booking: Booking;
  upcoming: boolean;
  needsLog?: boolean;
}) {
  const { label, icon: Icon } = KIND_META[booking.kind];
  const dates =
    booking.dateFrom === booking.dateTo
      ? shortDate(booking.dateFrom)
      : `${shortDate(booking.dateFrom)} – ${shortDate(booking.dateTo)}`;

  return (
    <div className="flex gap-4 rounded-2xl border p-3 sm:p-4">
      <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl sm:w-36">
        <Image src={booking.image} alt={booking.title} fill className="object-cover" sizes="144px" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div className="min-w-0 space-y-1">
          <Badge variant="secondary" className="gap-1 font-normal">
            <Icon className="h-3 w-3" />
            {booking.kind === "mentor-session" && booking.sessionType
              ? sessionTypeLabel(booking.sessionType)
              : label}
          </Badge>
          <p className="truncate text-base font-bold tracking-tight">{booking.title}</p>
          {booking.location && (
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {booking.location}
            </p>
          )}
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            {dates}
            {booking.slotTime ? ` · ${booking.slotTime}` : ""}
            {booking.divers && booking.divers > 1 ? ` · ${booking.divers} divers` : ""}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
          <p className="text-sm font-semibold">${booking.price}</p>
          {upcoming ? (
            <Button
              size="sm"
              variant="outline"
              className="text-muted-foreground hover:text-destructive"
              onClick={() => cancelBooking(booking.id)}
            >
              Cancel
            </Button>
          ) : needsLog ? (
            <Button size="sm" asChild>
              <Link href={`/logbook?draft=${booking.id}`}>Log this dive</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
