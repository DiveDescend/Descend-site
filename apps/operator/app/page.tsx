import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DollarSign, TrendingUp, CalendarCheck, Clock,
  CheckCircle, XCircle, Bell, AlertCircle, Star, User,
} from "lucide-react";

const KPI_CARDS = [
  { label: "Total Revenue", value: "$24,830", icon: DollarSign, sub: "All time" },
  { label: "This Month", value: "$3,240", icon: TrendingUp, sub: "+12% vs last month" },
  { label: "Bookings Today", value: "6", icon: CalendarCheck, sub: "3 confirmed · 3 pending" },
  { label: "Pending Approval", value: "3", icon: Clock, sub: "Requires your action", warning: true },
];

const TODAY_SCHEDULE = [
  { time: "08:00", name: "Open Water Course – Day 2", instructor: "Marco R.", guests: 4, status: "confirmed" },
  { time: "09:30", name: "Blue Corner Wall Dive", instructor: "Sarah K.", guests: 6, status: "confirmed" },
  { time: "11:00", name: "Manta Ray Point", instructor: "David O.", guests: 2, status: "pending" },
  { time: "14:00", name: "Advanced Open Water – Day 1", instructor: "Marco R.", guests: 3, status: "confirmed" },
  { time: "16:30", name: "Night Reef Dive", instructor: "Sarah K.", guests: 4, status: "pending" },
];

const NOTIFICATIONS = [
  { text: "New booking request from Aisha M. for Manta Ray Point", time: "5 min ago", unread: true },
  { text: "You received a 5-star review from Tom B.", time: "1 hr ago", unread: true },
  { text: "James L. requested the Night Reef Dive", time: "2 hrs ago", unread: false },
  { text: "Regulator set #4 is due for service", time: "Yesterday", unread: false },
  { text: "Booking confirmed for Blue Corner Wall Dive", time: "Yesterday", unread: false },
];

const PENDING_BOOKINGS = [
  { diver: "Aisha Malik", cert: "Advanced Open Water", dive: "Manta Ray Point", date: "Today, 11:00", guests: 2, price: "$220" },
  { diver: "James Liu", cert: "Open Water", dive: "Night Reef Dive", date: "Today, 16:30", guests: 4, price: "$340" },
  { diver: "Sofia Andersen", cert: "Open Water", dive: "Blue Corner Wall", date: "Tomorrow, 09:00", guests: 1, price: "$120" },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Good morning, Blue Horizon Dive.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {KPI_CARDS.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  <p className={`mt-1 text-3xl font-bold ${kpi.warning ? "text-amber-500" : ""}`}>{kpi.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{kpi.sub}</p>
                </div>
                <kpi.icon className={`h-5 w-5 ${kpi.warning ? "text-amber-500" : "text-primary"}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Today&apos;s Schedule</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {TODAY_SCHEDULE.map((slot, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-3">
                  <span className="w-12 shrink-0 text-sm font-mono text-muted-foreground">{slot.time}</span>
                  <div className={`w-1 h-8 shrink-0 rounded-full ${slot.status === "confirmed" ? "bg-primary" : "bg-amber-400"}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{slot.name}</p>
                    <p className="text-xs text-muted-foreground">{slot.instructor} · {slot.guests} guests</p>
                  </div>
                  <Badge variant={slot.status === "confirmed" ? "default" : "warning"} className="shrink-0 text-[10px]">
                    {slot.status === "confirmed" ? "Confirmed" : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4" /> Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {NOTIFICATIONS.map((n, i) => (
                <div key={i} className={`flex gap-3 px-4 py-3 ${n.unread ? "bg-primary/5" : ""}`}>
                  <div className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${n.unread ? "bg-primary" : ""}`} />
                  <div className="min-w-0">
                    <p className="text-xs leading-snug">{n.text}</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending approvals */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-500" />
            Pending Approvals
            <Badge variant="warning" className="ml-1">{PENDING_BOOKINGS.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {PENDING_BOOKINGS.map((booking, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                  {booking.diver.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm">{booking.diver}</p>
                  <p className="text-xs text-muted-foreground">{booking.cert} · {booking.dive}</p>
                </div>
                <div className="hidden sm:block text-sm text-muted-foreground">{booking.date}</div>
                <div className="hidden sm:block text-sm text-muted-foreground">{booking.guests} guest{booking.guests > 1 ? "s" : ""}</div>
                <div className="font-semibold text-sm">{booking.price}</div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" className="gap-1">
                    <CheckCircle className="h-3.5 w-3.5" /> Accept
                  </Button>
                  <Button size="sm" variant="ghost" className="gap-1 text-destructive hover:text-destructive hover:bg-destructive/10">
                    <XCircle className="h-3.5 w-3.5" /> Decline
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
