"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import StepIndicator from "@/components/shared/step-indicator";
import { AlertTriangle, Minus, Plus } from "lucide-react";
import { FUN_DIVES } from "@/lib/mock-data";

const EQUIPMENT = [
  { id: "wetsuit", label: "Wetsuit" },
  { id: "bcd", label: "BCD" },
  { id: "regulator", label: "Regulator" },
  { id: "mask", label: "Mask" },
  { id: "fins", label: "Fins" },
  { id: "tank", label: "Tank" },
];

const STEP_LABELS = ["Dates", "Certification", "Equipment", "Checkout"];

export default function FunDiveBookingPage({ params }: { params: { id: string } }) {
  const dive = FUN_DIVES.find((d) => d.id === params.id) ?? FUN_DIVES[0];
  const [step, setStep] = useState(1);
  const [days, setDays] = useState(1);
  const [flightAck, setFlightAck] = useState(false);
  const [certAck, setCertAck] = useState(false);
  const [equipment, setEquipment] = useState<string[]>(EQUIPMENT.map((e) => e.id));

  const toggleEquipment = (id: string) => {
    setEquipment((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{dive.name}</h1>
        <p className="text-muted-foreground">{dive.depth} · {dive.duration}</p>
      </div>

      <StepIndicator steps={4} current={step} labels={STEP_LABELS} />

      {step === 1 && (
        <Card>
          <CardHeader><CardTitle>Select your dates</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start date</label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Number of days</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setDays(Math.max(1, days - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-semibold">{days}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setDays(days + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
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
              disabled={!flightAck}
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
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
              <Button className="flex-1" onClick={() => setStep(3)}>Continue</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Equipment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              All equipment is included by default. Deselect items you&apos;re bringing yourself.
            </p>
            <div className="space-y-3">
              {EQUIPMENT.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center justify-between cursor-pointer"
                >
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
                <span className="text-muted-foreground">Duration</span>
                <span>{days} day{days > 1 ? "s" : ""}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Equipment ({equipment.length} items)</span>
                <span>Included</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>${dive.price * days}</span>
              </div>
            </div>
            <Button disabled className="w-full" size="lg">
              Payment — coming soon
            </Button>
            <Button variant="outline" className="w-full" onClick={() => setStep(3)}>Back</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
