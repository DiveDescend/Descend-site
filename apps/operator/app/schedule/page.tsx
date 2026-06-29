import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const TODAY_SLOTS = [
  { time: "07:00", empty: true },
  { time: "08:00", name: "Open Water Course – Day 2", instructor: "Marco R.", guests: 4, status: "confirmed", type: "Course" },
  { time: "09:00", empty: true },
  { time: "09:30", name: "Blue Corner Wall Dive", instructor: "Sarah K.", guests: 6, status: "confirmed", type: "Fun Dive" },
  { time: "10:00", empty: true },
  { time: "11:00", name: "Manta Ray Point", instructor: "David O.", guests: 2, status: "pending", type: "Fun Dive" },
  { time: "12:00", empty: true },
  { time: "13:00", empty: true },
  { time: "14:00", name: "Advanced Open Water – Day 1", instructor: "Marco R.", guests: 3, status: "confirmed", type: "Course" },
  { time: "15:00", empty: true },
  { time: "16:30", name: "Night Reef Dive", instructor: "Sarah K.", guests: 4, status: "pending", type: "Fun Dive" },
];

const WEEK_DAYS = [
  {
    day: "Mon", date: "Dec 23",
    events: [
      { time: "08:00", name: "Open Water Day 2", status: "confirmed" },
      { time: "09:30", name: "Blue Corner Wall", status: "confirmed" },
    ],
  },
  {
    day: "Tue", date: "Dec 24",
    events: [
      { time: "09:00", name: "Manta Ray Point", status: "pending" },
      { time: "14:00", name: "AOW Day 1", status: "confirmed" },
      { time: "16:30", name: "Night Reef Dive", status: "pending" },
    ],
  },
  { day: "Wed", date: "Dec 25", events: [] },
  {
    day: "Thu", date: "Dec 26",
    events: [
      { time: "08:00", name: "Blue Corner Wall", status: "confirmed" },
      { time: "11:00", name: "Shark Drift Dive", status: "confirmed" },
    ],
  },
  {
    day: "Fri", date: "Dec 27",
    events: [
      { time: "09:00", name: "Open Water Day 3", status: "confirmed" },
    ],
  },
  {
    day: "Sat", date: "Dec 28",
    events: [
      { time: "07:30", name: "Shark Drift Dive", status: "confirmed" },
      { time: "14:00", name: "WWII Wreck Dive", status: "confirmed" },
    ],
  },
  {
    day: "Sun", date: "Dec 29",
    events: [
      { time: "09:00", name: "Night Reef Dive", status: "pending" },
    ],
  },
];

const MONTH_EVENTS = [
  { date: "Dec 23", name: "Open Water Course Day 2", type: "Course", instructor: "Marco R.", guests: 4, status: "confirmed" },
  { date: "Dec 23", name: "Blue Corner Wall Dive", type: "Fun Dive", instructor: "Sarah K.", guests: 6, status: "confirmed" },
  { date: "Dec 24", name: "Manta Ray Point", type: "Fun Dive", instructor: "David O.", guests: 2, status: "pending" },
  { date: "Dec 24", name: "Advanced Open Water Day 1", type: "Course", instructor: "Marco R.", guests: 3, status: "confirmed" },
  { date: "Dec 24", name: "Night Reef Dive", type: "Fun Dive", instructor: "Sarah K.", guests: 4, status: "pending" },
  { date: "Dec 26", name: "Blue Corner Wall Dive", type: "Fun Dive", instructor: "David O.", guests: 5, status: "confirmed" },
  { date: "Dec 26", name: "Shark Drift Dive", type: "Fun Dive", instructor: "Sarah K.", guests: 3, status: "confirmed" },
  { date: "Dec 27", name: "Open Water Course Day 3", type: "Course", instructor: "Marco R.", guests: 4, status: "confirmed" },
  { date: "Dec 28", name: "Shark Drift Dive", type: "Fun Dive", instructor: "David O.", guests: 3, status: "confirmed" },
  { date: "Dec 28", name: "WWII Wreck Dive", type: "Fun Dive", instructor: "Sarah K.", guests: 6, status: "confirmed" },
  { date: "Dec 29", name: "Night Reef Dive", type: "Fun Dive", instructor: "Marco R.", guests: 2, status: "pending" },
];

export default function SchedulePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Schedule</h1>
        <p className="text-muted-foreground">View your upcoming dives and courses.</p>
      </div>

      <Tabs defaultValue="today">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
        </TabsList>

        {/* Today */}
        <TabsContent value="today">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {TODAY_SLOTS.map((slot, i) =>
                  slot.empty ? (
                    <div key={i} className="flex items-center gap-4 px-6 py-3">
                      <span className="w-12 shrink-0 text-sm font-mono text-muted-foreground/50">{slot.time}</span>
                      <span className="text-sm text-muted-foreground/40">No dives scheduled</span>
                    </div>
                  ) : (
                    <div key={i} className="flex items-center gap-4 px-6 py-4">
                      <span className="w-12 shrink-0 text-sm font-mono text-muted-foreground">{slot.time}</span>
                      <div className={`w-1 h-10 shrink-0 rounded-full ${slot.status === "confirmed" ? "bg-primary" : "bg-amber-400"}`} />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm">{slot.name}</p>
                        <p className="text-xs text-muted-foreground">{slot.instructor} · {slot.guests} guests</p>
                      </div>
                      <Badge variant="outline" className="shrink-0 text-[10px]">{slot.type}</Badge>
                      <Badge variant={slot.status === "confirmed" ? "default" : "warning"} className="shrink-0 text-[10px]">
                        {slot.status === "confirmed" ? "Confirmed" : "Pending"}
                      </Badge>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Week */}
        <TabsContent value="week">
          <div className="grid grid-cols-7 gap-2">
            {WEEK_DAYS.map((day) => (
              <div key={day.day} className="space-y-2">
                <div className="text-center">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">{day.day}</p>
                  <p className="text-xs text-muted-foreground">{day.date}</p>
                </div>
                <Card className="min-h-[120px]">
                  <CardContent className="p-2 space-y-1.5">
                    {day.events.length === 0 ? (
                      <p className="text-[10px] text-muted-foreground/50 text-center pt-4">No dives</p>
                    ) : (
                      day.events.map((e, i) => (
                        <div key={i} className={`rounded p-1.5 text-[10px] leading-tight ${e.status === "confirmed" ? "bg-primary/10 text-primary" : "bg-amber-50 text-amber-700"}`}>
                          <p className="font-medium">{e.time}</p>
                          <p className="truncate">{e.name}</p>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Month */}
        <TabsContent value="month">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {MONTH_EVENTS.map((e, i) => (
                  <div key={i} className="flex items-center gap-4 px-6 py-3">
                    <span className="w-16 shrink-0 text-sm text-muted-foreground">{e.date}</span>
                    <div className={`w-1 h-8 shrink-0 rounded-full ${e.status === "confirmed" ? "bg-primary" : "bg-amber-400"}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{e.name}</p>
                      <p className="text-xs text-muted-foreground">{e.instructor} · {e.guests} guests</p>
                    </div>
                    <Badge variant="outline" className="text-[10px]">{e.type}</Badge>
                    <Badge variant={e.status === "confirmed" ? "default" : "warning"} className="text-[10px]">
                      {e.status === "confirmed" ? "Confirmed" : "Pending"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
