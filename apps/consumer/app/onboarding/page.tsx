"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import StepIndicator from "@/components/shared/step-indicator";
import { cn } from "@/lib/utils";

const STEP_LABELS = ["About you", "Password", "Certified?", "Details", "Profile"];

// Certification agency → levels mapping
const CERT_DATA: Record<string, string[]> = {
  PADI: [
    "Scuba Diver",
    "Open Water Diver",
    "Advanced Open Water Diver",
    "Rescue Diver",
    "Master Scuba Diver",
    "Divemaster",
    "Open Water Scuba Instructor",
  ],
  SSI: [
    "Scuba Diver",
    "Open Water Diver",
    "Advanced Open Water",
    "Stress & Rescue Diver",
    "React Right",
    "Divemaster",
    "Dive Control Specialist",
    "Instructor",
  ],
  NAUI: [
    "Scuba Diver",
    "Open Water Scuba Diver",
    "Advanced Scuba Diver",
    "Rescue Scuba Diver",
    "Master Scuba Diver",
    "Divemaster",
    "Instructor",
  ],
  CMAS: [
    "1 Star Diver (P1)",
    "2 Star Diver (P2)",
    "3 Star Diver (P3)",
    "4 Star Diver (P4)",
    "Instructor",
  ],
  BSAC: [
    "Ocean Diver",
    "Sports Diver",
    "Dive Leader",
    "Advanced Diver",
    "First Class Diver",
    "Instructor",
  ],
  GUE: [
    "Fundamentals",
    "Recreational 1",
    "Recreational 2",
    "Cave 1",
    "Cave 2",
    "Tech 1",
    "Tech 2",
  ],
  TDI: [
    "Intro to Tech",
    "Advanced Nitrox",
    "Decompression Procedures",
    "Extended Range",
    "Advanced Wreck",
    "Cave Diver",
    "Trimix",
  ],
  SDI: [
    "Open Water Scuba Diver",
    "Advanced Adventure Diver",
    "Rescue Diver",
    "Divemaster",
  ],
  RAID: [
    "Open Water 20",
    "Open Water Plus 20",
    "Advanced 35",
    "Advanced Plus 40",
    "Master Diver",
    "Rescue Diver",
    "Divemaster",
  ],
  Other: [],
};

const AGENCIES = Object.keys(CERT_DATA);

type CertEntry = { agency: string; level: string; number: string };
const emptyCert = (): CertEntry => ({ agency: "", level: "", number: "" });

const selectClass =
  "flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer";

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

function CertForm({
  cert,
  index,
  total,
  onChange,
  onRemove,
}: {
  cert: CertEntry;
  index: number;
  total: number;
  onChange: (field: keyof CertEntry, value: string) => void;
  onRemove: () => void;
}) {
  const levels = cert.agency && cert.agency !== "Other" ? CERT_DATA[cert.agency] ?? [] : [];

  return (
    <div className={cn("space-y-3", index > 0 && "border-t pt-4")}>
      {index > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Certification {index + 1}</p>
          <button
            onClick={onRemove}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="h-3 w-3" /> Remove
          </button>
        </div>
      )}

      {/* Agency */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Certification agency</label>
        <SelectWrapper>
          <select
            className={selectClass}
            value={cert.agency}
            onChange={(e) => onChange("agency", e.target.value)}
          >
            <option value="" disabled>Select agency…</option>
            {AGENCIES.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </SelectWrapper>
      </div>

      {/* Level — appears once agency is chosen */}
      {cert.agency && (
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Certification level</label>
          {cert.agency === "Other" ? (
            <Input
              placeholder="e.g. Open Water"
              value={cert.level}
              onChange={(e) => onChange("level", e.target.value)}
            />
          ) : (
            <SelectWrapper>
              <select
                className={selectClass}
                value={cert.level}
                onChange={(e) => onChange("level", e.target.value)}
              >
                <option value="" disabled>Select level…</option>
                {levels.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </SelectWrapper>
          )}
        </div>
      )}

      {/* Number — appears once level is chosen */}
      {cert.agency && cert.level && (
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Certification number</label>
          <Input
            placeholder="e.g. 1234567"
            value={cert.number}
            onChange={(e) => onChange("number", e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [certified, setCertified] = useState<boolean | null>(null);
  const [certs, setCerts] = useState<CertEntry[]>([emptyCert()]);

  const updateCert = (index: number, field: keyof CertEntry, value: string) => {
    setCerts((prev) => {
      const next = [...prev];
      // Reset downstream fields when agency changes
      if (field === "agency") {
        next[index] = { agency: value, level: "", number: "" };
      } else if (field === "level") {
        next[index] = { ...next[index], level: value, number: "" };
      } else {
        next[index] = { ...next[index], [field]: value };
      }
      return next;
    });
  };

  const addCert = () => setCerts((prev) => [...prev, emptyCert()]);
  const removeCert = (index: number) =>
    setCerts((prev) => prev.filter((_, i) => i !== index));

  return (
    <div className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <StepIndicator steps={5} current={step} labels={STEP_LABELS} />

        {/* Step 1 — About you */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Tell us about yourself</CardTitle>
              <CardDescription>We&apos;ll use this to personalise your experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Full name</label>
                <Input placeholder="Jane Divers" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Date of birth</label>
                <Input type="date" />
              </div>
              <Button className="w-full" onClick={() => setStep(2)}>Continue</Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2 — Password */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Create a password</CardTitle>
              <CardDescription>You&apos;ll use this to log in to your Descend account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Confirm password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full" onClick={() => setStep(3)}>Continue</Button>
              <Button variant="ghost" className="w-full" onClick={() => setStep(1)}>Back</Button>
            </CardContent>
          </Card>
        )}

        {/* Step 3 — Certified? */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Are you a certified diver?</CardTitle>
              <CardDescription>
                Certification is required to book fun dives. Courses are open to everyone.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full"
                onClick={() => { setCertified(true); setStep(4); }}
              >
                Yes, I&apos;m certified
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => { setCertified(false); setStep(5); }}
              >
                No, I&apos;m not certified yet
              </Button>
              <Button
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={() => setStep(5)}
              >
                Skip for now
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setStep(2)}>Back</Button>
            </CardContent>
          </Card>
        )}

        {/* Step 4 — Certification details */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Your certification details</CardTitle>
              <CardDescription>
                You can add multiple certifications. You can also fill this in later.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {certs.map((cert, i) => (
                <CertForm
                  key={i}
                  cert={cert}
                  index={i}
                  total={certs.length}
                  onChange={(field, value) => updateCert(i, field, value)}
                  onRemove={() => removeCert(i)}
                />
              ))}

              <button
                onClick={addCert}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-input py-2.5 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add another certification
              </button>

              <Button className="w-full" onClick={() => setStep(5)}>Continue</Button>
              <Button
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={() => setStep(5)}
              >
                Skip for now
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setStep(3)}>Back</Button>
            </CardContent>
          </Card>
        )}

        {/* Step 5 — Profile */}
        {step === 5 && (
          <Card>
            <CardHeader>
              <CardTitle>Set up your profile</CardTitle>
              <CardDescription>Help the community get to know you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-3xl">
                  📷
                </div>
                <Button variant="outline" size="sm">Upload photo</Button>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Bio</label>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                  placeholder="Tell other divers a bit about yourself..."
                />
              </div>
              <Button className="w-full" asChild>
                <Link href="/">Finish setup</Link>
              </Button>
              <Button variant="ghost" className="w-full text-muted-foreground" asChild>
                <Link href="/">Skip for now</Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setStep(certified ? 4 : 3)}
              >
                Back
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
