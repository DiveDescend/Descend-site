import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckCircle, XCircle } from "lucide-react";

type BookingStatus = "pending" | "confirmed" | "past" | "cancelled";

const BOOKINGS: Array<{
  id: string; diver: string; cert: string; dive: string; type: string;
  date: string; guests: number; price: string; status: BookingStatus;
}> = [
  { id: "1", diver: "Aisha Malik", cert: "Advanced Open Water", dive: "Manta Ray Point", type: "Fun Dive", date: "Today, 11:00", guests: 2, price: "$220", status: "pending" },
  { id: "2", diver: "James Liu", cert: "Open Water", dive: "Night Reef Dive", type: "Fun Dive", date: "Today, 16:30", guests: 4, price: "$340", status: "pending" },
  { id: "3", diver: "Sofia Andersen", cert: "Open Water", dive: "Blue Corner Wall", type: "Fun Dive", date: "Tomorrow, 09:00", guests: 1, price: "$120", status: "pending" },
  { id: "4", diver: "Tom Blackwell", cert: "Rescue Diver", dive: "Open Water Course – Day 2", type: "Course", date: "Today, 08:00", guests: 1, price: "$450", status: "confirmed" },
  { id: "5", diver: "Elena Vasquez", cert: "PADI IDC Staff", dive: "Advanced Open Water", type: "Course", date: "Tomorrow, 08:00", guests: 1, price: "$380", status: "confirmed" },
  { id: "6", diver: "Marco Rossi", cert: "Divemaster", dive: "Shark Drift Dive", type: "Fun Dive", date: "Dec 28, 07:30", guests: 3, price: "$390", status: "confirmed" },
  { id: "7", diver: "Yuki Tanaka", cert: "Open Water", dive: "Blue Corner Wall", type: "Fun Dive", date: "Dec 20, 09:00", guests: 2, price: "$240", status: "past" },
  { id: "8", diver: "David Okafor", cert: "Advanced Open Water", dive: "WWII Wreck Dive", type: "Fun Dive", date: "Dec 18, 08:00", guests: 1, price: "$95", status: "past" },
  { id: "9", diver: "Sarah Chen", cert: "Nitrox Specialist", dive: "Night Reef Dive", type: "Fun Dive", date: "Dec 15, 17:00", guests: 2, price: "$170", status: "cancelled" },
];

function Avatar({ name }: { name: string }) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
      {name.charAt(0)}
    </div>
  );
}

function BookingRow({ booking }: { booking: typeof BOOKINGS[number] }) {
  const isPending = booking.status === "pending";
  return (
    <div className="flex items-center gap-4 px-6 py-4 border-b last:border-0">
      <Avatar name={booking.diver} />
      <div className="min-w-0 flex-1">
        <p className="font-medium text-sm">{booking.diver}</p>
        <p className="text-xs text-muted-foreground">{booking.cert}</p>
      </div>
      <div className="hidden md:block min-w-0 w-48">
        <p className="text-sm truncate">{booking.dive}</p>
        <p className="text-xs text-muted-foreground">{booking.type}</p>
      </div>
      <div className="hidden sm:block text-sm text-muted-foreground w-36">{booking.date}</div>
      <div className="hidden sm:block text-sm text-muted-foreground w-16">{booking.guests} pax</div>
      <div className="font-semibold text-sm w-16">{booking.price}</div>
      <div className="flex gap-2 shrink-0">
        {isPending ? (
          <>
            <Button size="sm" className="gap-1 h-8">
              <CheckCircle className="h-3.5 w-3.5" /> Accept
            </Button>
            <Button size="sm" variant="ghost" className="gap-1 h-8 text-destructive hover:text-destructive hover:bg-destructive/10">
              <XCircle className="h-3.5 w-3.5" /> Decline
            </Button>
          </>
        ) : (
          <Button size="sm" variant="outline" className="h-8">View</Button>
        )}
      </div>
    </div>
  );
}

export default function BookingsPage() {
  const pending = BOOKINGS.filter((b) => b.status === "pending");
  const confirmed = BOOKINGS.filter((b) => b.status === "confirmed");
  const past = BOOKINGS.filter((b) => b.status === "past");
  const cancelled = BOOKINGS.filter((b) => b.status === "cancelled");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground">Manage and approve diver bookings.</p>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">
            Pending
            {pending.length > 0 && (
              <Badge variant="warning" className="ml-2 h-4 px-1.5 text-[10px]">{pending.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardContent className="p-0">
              {pending.length === 0 ? (
                <p className="py-12 text-center text-muted-foreground">No pending bookings.</p>
              ) : (
                pending.map((b) => <BookingRow key={b.id} booking={b} />)
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="confirmed">
          <Card>
            <CardContent className="p-0">
              {confirmed.map((b) => <BookingRow key={b.id} booking={b} />)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past">
          <Card>
            <CardContent className="p-0">
              {past.map((b) => <BookingRow key={b.id} booking={b} />)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled">
          <Card>
            <CardContent className="p-0">
              {cancelled.length === 0 ? (
                <p className="py-12 text-center text-muted-foreground">No cancelled bookings.</p>
              ) : (
                cancelled.map((b) => <BookingRow key={b.id} booking={b} />)
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
