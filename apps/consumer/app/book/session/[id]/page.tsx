"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StepIndicator from "@/components/shared/step-indicator";
import { shortDate } from "@/components/shared/range-picker";
import { Anchor, CheckCircle2, Loader2, Target, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { INSTRUCTORS } from "@/lib/mock-data";
import { addBooking, type Booking, type SessionType } from "@/lib/demo-store";
import { availableSlots, SESSION_TYPES, sessionPrice, sessionTypeLabel } from "@/lib/mentor-sessions";

const STEP_LABELS = ["Session", "Time", "Confirm"];

const TYPE_ICONS: Record<SessionType, React.ElementType> = {
  "video-call": Video,
  "skills-coaching": Target,
  "guided-dive": Anchor,
};

function weekdayLabel(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { weekday: "short" });
}

export default function SessionBookingPage({ params }: { params: { id: string } }) {
  const mentor = INSTRUCTORS.find((i) => i.id === params.id) ?? INSTRUCTORS[0];
  const slots = availableSlots(mentor.id);

  const [step, setStep] = useState(1);
  const [sessionType, setSessionType] = useState<SessionType | null>(null);
  const [slotDate, setSlotDate] = useState(slots[0]?.date ?? "");
  const [slotTime, setSlotTime] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);

  const firstName = mentor.name.split(" ")[0];
  const selectedType = SESSION_TYPES.find((t) => t.id === sessionType);
  const price = selectedType ? sessionPrice(selectedType, mentor.category) : 0;
  const dayTimes = slots.find((s) => s.date === slotDate)?.times ?? [];

  function handleConfirm() {
    if (!sessionType) return;
    setConfirming(true);
    setTimeout(() => {
      const created = addBooking({
        kind: "mentor-session",
        refId: mentor.id,
        title: `${sessionTypeLabel(sessionType)} with ${mentor.name}`,
        image: mentor.image,
        location: mentor.location,
        dateFrom: slotDate,
        dateTo: slotDate,
        slotTime,
        sessionType,
        price,
      });
      setBooking(created);
      setConfirming(false);
    }, 1000);
  }

  if (booking) {
    const ref = `DSC-${booking.id.replace(/-/g, "").slice(0, 6).toUpperCase()}`;
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Session booked!</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Booking reference <span className="font-mono font-medium text-foreground">{ref}</span>
              </p>
            </div>
            <div className="w-full space-y-2 rounded-xl bg-muted/50 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{selectedType?.label} with {firstName}</span>
                <span className="font-medium">{shortDate(slotDate)} · {slotTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{selectedType?.duration}</span>
                <span className="font-semibold">${price}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {firstName} will reach out to confirm the details before your session.
            </p>
            <div className="flex w-full gap-2 pt-2">
              <Button asChild className="flex-1">
                <Link href="/itinerary">View my trips</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/instructors">Find more mentors</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8 space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
          <Image src={mentor.image} alt={mentor.name} fill className="object-cover" sizes="64px" />
        </div>
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight">Book a session with {mentor.name}</h1>
          <p className="text-sm text-muted-foreground">{mentor.title} · {mentor.location}</p>
        </div>
      </div>

      <StepIndicator steps={3} current={step} labels={STEP_LABELS} />

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>What kind of session?</CardTitle>
            {mentor.category === "Dive Buddy" && (
              <p className="text-sm text-muted-foreground">
                Experienced divers can mentor too — {firstName} has {mentor.dives.toLocaleString()}+ dives to learn from.
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            {SESSION_TYPES.map((type) => {
              const Icon = TYPE_ICONS[type.id];
              const selected = sessionType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSessionType(type.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors",
                    selected ? "border-primary bg-primary/5" : "hover:bg-muted/40"
                  )}
                >
                  <div className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    selected ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  )}>
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{type.label}</p>
                    <p className="text-xs text-muted-foreground">{type.duration} · {type.description}</p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold">${sessionPrice(type, mentor.category)}</p>
                </button>
              );
            })}
            <Button className="w-full" disabled={!sessionType} onClick={() => setStep(2)}>
              Continue
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader><CardTitle>Pick a time</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {slots.map((day) => (
                <button
                  key={day.date}
                  onClick={() => { setSlotDate(day.date); setSlotTime(""); }}
                  disabled={day.times.length === 0}
                  className={cn(
                    "flex min-w-[64px] flex-col items-center rounded-xl border px-3 py-2 transition-colors disabled:opacity-40",
                    slotDate === day.date ? "border-primary bg-primary/5" : "hover:bg-muted/40"
                  )}
                >
                  <span className="text-xs text-muted-foreground">{weekdayLabel(day.date)}</span>
                  <span className="text-sm font-semibold">{shortDate(day.date)}</span>
                </button>
              ))}
            </div>
            {dayTimes.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No slots this day — try another.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {dayTimes.map((time) => (
                  <button key={time} onClick={() => setSlotTime(time)}>
                    <Badge
                      variant={slotTime === time ? "default" : "outline"}
                      className="cursor-pointer px-3 py-1.5 text-sm"
                    >
                      {time}
                    </Badge>
                  </button>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
              <Button className="flex-1" disabled={!slotDate || !slotTime} onClick={() => setStep(3)}>
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader><CardTitle>Session summary</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Session</span>
                <span>{selectedType?.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mentor</span>
                <span>{mentor.name} ({mentor.title})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">When</span>
                <span>{shortDate(slotDate)} · {slotTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span>{selectedType?.duration}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>${price}</span>
              </div>
            </div>
            <Button className="w-full" size="lg" disabled={confirming} onClick={handleConfirm}>
              {confirming ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Confirming…
                </span>
              ) : (
                `Confirm session — $${price}`
              )}
            </Button>
            <Button variant="outline" className="w-full" disabled={confirming} onClick={() => setStep(2)}>
              Back
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
