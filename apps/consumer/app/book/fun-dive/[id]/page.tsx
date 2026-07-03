"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import StepIndicator from "@/components/shared/step-indicator";
import RangePicker, { shortDate } from "@/components/shared/range-picker";
import { AlertTriangle, CheckCircle2, CreditCard, Loader2, Lock } from "lucide-react";
import { FUN_DIVES } from "@/lib/mock-data";
import { addBooking, type Booking } from "@/lib/demo-store";
import { useDemoStore } from "@/lib/use-demo-store";
import { highestCert, requiredRank, userRank } from "@/lib/certification-path";

const EQUIPMENT = [
  { id: "wetsuit",    label: "Wetsuit" },
  { id: "bcd",        label: "BCD" },
  { id: "regulator",  label: "Regulator" },
  { id: "mask",       label: "Mask" },
  { id: "fins",       label: "Fins" },
  { id: "tank",       label: "Tank" },
];

const STEP_LABELS = ["Dates", "Certification", "Equipment", "Summary", "Payment"];

function diffDays(from: string, to: string) {
  const a = new Date(from), b = new Date(to);
  return Math.max(1, Math.round((b.getTime() - a.getTime()) / 86400000));
}

export default function FunDiveBookingPage({ params }: { params: { id: string } }) {
  return (
    <Suspense>
      <FunDiveWizard id={params.id} />
    </Suspense>
  );
}

function FunDiveWizard({ id }: { id: string }) {
  const dive = FUN_DIVES.find((d) => d.id === id) ?? FUN_DIVES[0];
  const searchParams = useSearchParams();
  const store = useDemoStore();

  const [step, setStep]           = useState(1);
  const [dateFrom, setDateFrom]   = useState("");
  const [dateTo, setDateTo]       = useState("");
  const [flightAck, setFlightAck] = useState(false);
  const [certAck, setCertAck]     = useState(false);
  const [equipment, setEquipment] = useState<string[]>(EQUIPMENT.map((e) => e.id));
  const [paying, setPaying]       = useState(false);
  const [booking, setBooking]     = useState<Booking | null>(null);

  // Pre-fill dates handed over from search.
  useEffect(() => {
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    if (from && to && from <= to) {
      setDateFrom(from);
      setDateTo(to);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const divers = Math.max(1, parseInt(searchParams.get("divers") ?? "1", 10) || 1);
  const days = dateFrom && dateTo ? diffDays(dateFrom, dateTo) : 1;
  const total = dive.price * days * divers;

  const certVerified = userRank(store) >= requiredRank(dive.minCert);
  const cert = highestCert(store);

  function handleDateSelect(iso: string) {
    if (!dateFrom || (dateFrom && dateTo)) {
      setDateFrom(iso); setDateTo("");
    } else if (iso < dateFrom) {
      setDateFrom(iso); setDateTo("");
    } else {
      setDateTo(iso);
    }
  }

  const toggleEquipment = (id: string) => {
    setEquipment((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  function handlePay() {
    setPaying(true);
    setTimeout(() => {
      const created = addBooking({
        kind: "fun-dive",
        refId: dive.id,
        title: dive.name,
        image: dive.image,
        location: dive.location,
        dateFrom,
        dateTo,
        divers,
        equipment: EQUIPMENT.filter((e) => equipment.includes(e.id)).map((e) => e.label),
        price: total,
      });
      setBooking(created);
      setPaying(false);
    }, 1200);
  }

  const dateLabel = dateFrom && dateTo
    ? `${shortDate(dateFrom)} – ${shortDate(dateTo)}`
    : dateFrom ? `${shortDate(dateFrom)} – ?` : null;

  if (booking) {
    const ref = `DSC-${booking.id.replace(/-/g, "").slice(0, 6).toUpperCase()}`;
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Booking confirmed!</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Booking reference <span className="font-mono font-medium text-foreground">{ref}</span>
              </p>
            </div>
            <div className="w-full space-y-2 rounded-xl bg-muted/50 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{dive.name}</span>
                <span className="font-medium">{dateLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{divers} diver{divers !== 1 ? "s" : ""} · equipment included</span>
                <span className="font-semibold">${total}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              A confirmation email is on its way. The dive center will contact you before your dive.
            </p>
            <div className="flex w-full gap-2 pt-2">
              <Button asChild className="flex-1">
                <Link href="/itinerary">View my trips</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/dives">Explore more dives</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{dive.name}</h1>
        <p className="text-muted-foreground">{dive.location} · {dive.depth} · {dive.duration}</p>
      </div>

      <StepIndicator steps={5} current={step} labels={STEP_LABELS} />

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select your dates</CardTitle>
            {dateLabel && (
              <p className="text-sm text-muted-foreground">{dateLabel} · {days} day{days !== 1 ? "s" : ""}</p>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border overflow-hidden">
              <RangePicker
                dateFrom={dateFrom}
                dateTo={dateTo}
                onSelect={handleDateSelect}
              />
            </div>
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 space-y-2">
              <p className="flex items-center gap-2 text-sm font-medium text-yellow-800">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                Flying after diving
              </p>
              <p className="text-xs text-yellow-700">
                Divers should not fly within 24 hours of their last dive. Please plan your travel accordingly.
              </p>
              <label className="flex items-center gap-2 text-sm text-yellow-800 cursor-pointer">
                <Checkbox
                  checked={flightAck}
                  onCheckedChange={(v) => setFlightAck(v === true)}
                />
                I understand and will plan my flights accordingly
              </label>
            </div>
            <Button
              className="w-full"
              disabled={!flightAck || !dateFrom || !dateTo}
              onClick={() => setStep(2)}
            >
              Continue
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader><CardTitle>Certification check</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This dive requires: <span className="font-medium text-foreground">{dive.minCert}</span>
            </p>
            {certVerified ? (
              <div className="rounded-lg border border-green-200 bg-green-50 p-3 space-y-1">
                <p className="flex items-center gap-2 text-sm font-medium text-green-800">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Certification verified
                </p>
                <p className="text-xs text-green-700">
                  You have a {cert ? `${cert.agency} ${cert.level}` : "qualifying certification"} on file — you&apos;re good to go for this dive.
                </p>
              </div>
            ) : (
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-3 space-y-2">
                <p className="flex items-center gap-2 text-sm font-medium text-orange-800">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  Certification warning
                </p>
                <p className="text-xs text-orange-700">
                  We don&apos;t have a {dive.minCert} certification on file for your account. You may still book, but the dive operator may decline on the day.
                </p>
                <label className="flex items-center gap-2 text-sm text-orange-800 cursor-pointer">
                  <Checkbox
                    checked={certAck}
                    onCheckedChange={(v) => setCertAck(v === true)}
                  />
                  I understand I may not hold the required certification
                </label>
              </div>
            )}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
              <Button className="flex-1" disabled={!certVerified && !certAck} onClick={() => setStep(3)}>Continue</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader><CardTitle>Equipment</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              All equipment is included by default. Deselect items you&apos;re bringing yourself.
            </p>
            <div className="space-y-3">
              {EQUIPMENT.map((item) => (
                <label key={item.id} className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm">{item.label}</span>
                  <Checkbox
                    checked={equipment.includes(item.id)}
                    onCheckedChange={() => toggleEquipment(item.id)}
                  />
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
              <Button className="flex-1" onClick={() => setStep(4)}>Continue</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader><CardTitle>Booking summary</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{dive.name}</span>
                <span>${dive.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dates</span>
                <span>{dateLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span>{days} day{days > 1 ? "s" : ""}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Divers</span>
                <span>{divers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Equipment ({equipment.length} items)</span>
                <span>Included</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
            <Button className="w-full" size="lg" onClick={() => setStep(5)}>Continue to payment</Button>
            <Button variant="outline" className="w-full" onClick={() => setStep(3)}>Back</Button>
          </CardContent>
        </Card>
      )}

      {step === 5 && (
        <Card>
          <CardHeader><CardTitle>Payment</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Card number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input defaultValue="4242 4242 4242 4242" className="pl-9 font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Expiry</label>
                  <Input defaultValue="12/28" className="font-mono" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">CVC</label>
                  <Input defaultValue="123" className="font-mono" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Name on card</label>
                <Input defaultValue={store.profile.name} />
              </div>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" />
              Demo checkout — no card will be charged.
            </p>
            <Button className="w-full" size="lg" disabled={paying} onClick={handlePay}>
              {paying ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Processing…
                </span>
              ) : (
                `Pay $${total}`
              )}
            </Button>
            <Button variant="outline" className="w-full" disabled={paying} onClick={() => setStep(4)}>Back</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
