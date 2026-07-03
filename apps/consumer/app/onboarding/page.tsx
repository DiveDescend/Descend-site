"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import StepIndicator from "@/components/shared/step-indicator";
import { cn } from "@/lib/utils";
import { addCerts, setProfile } from "@/lib/demo-store";

const STEP_LABELS = ["About you", "Password", "Certified?", "Details", "Profile"];

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

function Required() {
  return <span className="ml-0.5 text-destructive">*</span>;
}

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
  onChange,
  onRemove,
}: {
  cert: CertEntry;
  index: number;
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
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [certified, setCertified] = useState<boolean | null>(null);
  const [certs, setCerts] = useState<CertEntry[]>([emptyCert()]);

  const finish = (destination: string) => {
    const validCerts = certs.filter((c) => c.agency && c.level);
    setProfile({
      ...(name.trim() ? { name: name.trim() } : {}),
      ...(bio.trim() ? { bio: bio.trim() } : {}),
      certified,
      onboarded: true,
    });
    if (certified && validCerts.length) {
      addCerts(validCerts.map(({ agency, level, number }) => ({ agency, level, number })));
    }
    router.push(destination);
  };

  const goBack = () => {
    if (step === 5) return setStep(certified ? 4 : 3);
    if (step > 1) setStep(step - 1);
  };

  const updateCert = (index: number, field: keyof CertEntry, value: string) => {
    setCerts((prev) => {
      const next = [...prev];
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
  const removeCert = (index: number) => setCerts((prev) => prev.filter((_, i) => i !== index));

  return (
    <div className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-5">

        {/* Navigation row: back button left, step indicator right */}
        <div className="flex items-start gap-3">
          <div className="w-12 shrink-0 pt-1.5">
            {step > 1 && (
              <button
                onClick={goBack}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <StepIndicator steps={5} current={step} labels={STEP_LABELS} />
          </div>
        </div>

        {/* Step 1 — About you */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Tell us about yourself</CardTitle>
              <CardDescription>We&apos;ll use this to personalise your experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Full name<Required /></label>
                <Input placeholder="Jane Divers" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Date of birth<Required /></label>
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
                <label className="text-sm font-medium">Password<Required /></label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Confirm password<Required /></label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full" onClick={() => setStep(3)}>Continue</Button>
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
              <Button className="w-full" onClick={() => { setCertified(true); setStep(4); }}>
                Yes, I&apos;m certified
              </Button>
              <Button variant="outline" className="w-full" onClick={() => { setCertified(false); setStep(5); }}>
                No, I&apos;m not certified yet
              </Button>
              <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => setStep(5)}>
                Skip for now
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 4 — Certification details */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Your certification details</CardTitle>
              <CardDescription>
                You can add multiple certifications and fill this in later.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {certs.map((cert, i) => (
                <CertForm
                  key={i}
                  cert={cert}
                  index={i}
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
              <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => setStep(5)}>
                Skip for now
              </Button>
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
                <label className="text-sm font-medium">
                  Bio <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                  placeholder="Tell other divers a bit about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={() => finish("/journey")}>
                Finish setup
              </Button>
              <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => finish("/")}>
                Skip for now
              </Button>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}
