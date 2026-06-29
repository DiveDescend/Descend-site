"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, User, Star, AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type NType = "booking" | "review" | "system" | "message";

const NOTIFICATIONS: Array<{
  id: string; type: NType; title: string; body: string; time: string; unread: boolean;
}> = [
  { id: "1", type: "booking", title: "New booking request", body: "Aisha Malik requested Manta Ray Point for Today, 11:00 — 2 guests.", time: "5 min ago", unread: true },
  { id: "2", type: "review", title: "New 5-star review", body: "Tom Blackwell left a 5-star review: \"Incredible experience — Marco was a fantastic instructor.\"", time: "1 hr ago", unread: true },
  { id: "3", type: "booking", title: "New booking request", body: "James Liu requested Night Reef Dive for Today, 16:30 — 4 guests.", time: "2 hrs ago", unread: false },
  { id: "4", type: "system", title: "Equipment service due", body: "Regulator set #4 was last serviced in June 2024 and is now overdue for service.", time: "Yesterday", unread: false },
  { id: "5", type: "booking", title: "Booking confirmed", body: "Sofia Andersen's booking for Blue Corner Wall Dive on Dec 26 has been confirmed.", time: "Yesterday", unread: false },
  { id: "6", type: "message", title: "Message from Marco R.", body: "Hey, just a heads up — the current at Blue Corner was strong today, might want to brief guests more thoroughly.", time: "2 days ago", unread: false },
  { id: "7", type: "review", title: "New 4-star review", body: "Elena Vasquez left a 4-star review for the Advanced Open Water course.", time: "3 days ago", unread: false },
  { id: "8", type: "system", title: "Boat service reminder", body: "Blue Wing is due for its next service in January 2025.", time: "4 days ago", unread: false },
];

const ICON: Record<NType, React.ElementType> = {
  booking: User,
  review: Star,
  system: AlertCircle,
  message: Bell,
};

const ICON_COLOR: Record<NType, string> = {
  booking: "text-primary",
  review: "text-yellow-500",
  system: "text-amber-500",
  message: "text-muted-foreground",
};

const FILTERS = ["All", "Bookings", "Reviews", "Messages", "System"] as const;
type Filter = (typeof FILTERS)[number];

const FILTER_TYPE: Record<Filter, NType | null> = {
  All: null,
  Bookings: "booking",
  Reviews: "review",
  Messages: "message",
  System: "system",
};

export default function NotificationsPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const filtered = FILTER_TYPE[filter]
    ? NOTIFICATIONS.filter((n) => n.type === FILTER_TYPE[filter])
    : NOTIFICATIONS;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">Stay on top of bookings, reviews, and alerts.</p>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              filter === f
                ? "bg-primary text-primary-foreground"
                : "border text-muted-foreground hover:text-foreground hover:border-primary"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">No notifications.</p>
          ) : (
            <div className="divide-y">
              {filtered.map((n) => {
                const Icon = ICON[n.type];
                return (
                  <div
                    key={n.id}
                    className={cn("flex gap-4 px-6 py-4 transition-colors", n.unread ? "bg-primary/5 border-l-2 border-primary" : "")}
                  >
                    <div className={cn("mt-0.5 shrink-0", ICON_COLOR[n.type])}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <p className={cn("text-sm", n.unread ? "font-semibold" : "font-medium")}>{n.title}</p>
                        <span className="shrink-0 text-xs text-muted-foreground">{n.time}</span>
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
