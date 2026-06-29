"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import StepIndicator from "@/components/shared/step-indicator";

const STEP_LABELS = ["Dive centre", "Contact", "Certifications", "Profile"];

const AGENCIES = ["PADI", "SSI", "NAUI", "CMAS", "BSAC", "GUE", "TDI", "SDI"];

function Required() {
  return <span className="ml-0.5 text-destructive">*</span>;
}

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [selectedAgencies, setSelectedAgencies] = useState<string[]>(["PADI"]);

  const toggleAgency = (agency: string) =>
    setSelectedAgencies((prev) =>
      prev.includes(agency) ? prev.filter((a) => a !== agency) : [...prev, agency]
    );

  const goBack = () => { if (step > 1) setStep(step - 1); };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-muted/30">
      <div className="w-full max-w-md space-y-5">

        {/* Back + step indicator */}
        <div className="flex items-start gap-3">
          <div className="w-12 shrink-0 pt-1.5">
            {step > 1 && (
              <button
                onClick={goBack}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <StepIndicator steps={4} current={step} labels={STEP_LABELS} />
          </div>
        </div>

        {/* Step 1 — Dive centre */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Your dive centre</CardTitle>
              <CardDescription>Tell us about your business.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Centre name<Required /></label>
                <Input placeholder="Blue Horizon Dive" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Country<Required /></label>
                  <Input placeholder="Indonesia" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">City / Region<Required /></label>
                  <Input placeholder="Raja Ampat" />
                </div>
              </div>
              <Button className="w-full" onClick={() => setStep(2)}>Continue</Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2 — Contact details */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Contact details</CardTitle>
              <CardDescription>How can divers and Descend reach you?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Owner / Manager name<Required /></label>
                <Input placeholder="Your full name" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Phone<Required /></label>
                <Input type="tel" placeholder="+62 812 3456 7890" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Business email<Required /></label>
                <Input type="email" placeholder="info@yourdivecenter.com" disabled className="opacity-70" defaultValue="info@bluehorizondive.com" />
                <p className="text-xs text-muted-foreground">Filled from your account email</p>
              </div>
              <Button className="w-full" onClick={() => setStep(3)}>Continue</Button>
            </CardContent>
          </Card>
        )}

        {/* Step 3 — Certifications */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Agency certifications</CardTitle>
              <CardDescription>Which certification agencies does your centre hold? Select all that apply.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {AGENCIES.map((agency) => (
                  <button
                    key={agency}
                    onClick={() => toggleAgency(agency)}
                    className={`rounded-lg border px-4 py-3 text-sm font-medium text-left transition-colors ${
                      selectedAgencies.includes(agency)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-input text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {agency}
                  </button>
                ))}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Years in business</label>
                <Input type="number" placeholder="e.g. 10" min={0} />
              </div>
              <Button className="w-full" onClick={() => setStep(4)}>Continue</Button>
              <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => setStep(4)}>Skip for now</Button>
            </CardContent>
          </Card>
        )}

        {/* Step 4 — Profile */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Set up your profile</CardTitle>
              <CardDescription>Help divers discover your centre.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Logo upload */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed border-input bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <Button variant="outline" size="sm">Upload logo</Button>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">
                  Description <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Tell divers what makes your centre special..."
                />
              </div>

              <Button className="w-full" asChild>
                <Link href="/">Finish setup</Link>
              </Button>
              <Button variant="ghost" className="w-full text-muted-foreground" asChild>
                <Link href="/">Skip for now</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
