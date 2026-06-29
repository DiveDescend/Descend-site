"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import StepIndicator from "@/components/shared/step-indicator";

const STEP_LABELS = ["About you", "Password", "Certification", "Details", "Profile"];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [certified, setCertified] = useState<boolean | null>(null);

  return (
    <div className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <StepIndicator steps={5} current={step} labels={STEP_LABELS} />

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Tell us about yourself</CardTitle>
              <CardDescription>We&apos;ll use this to personalise your experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full name</label>
                <Input placeholder="Jane Divers" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date of birth</label>
                <Input type="date" />
              </div>
              <Button className="w-full" onClick={() => setStep(2)}>
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Create a password</CardTitle>
              <CardDescription>You&apos;ll use this to log in to your Descend account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full" onClick={() => setStep(3)}>
                Continue
              </Button>
              <Button
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
            </CardContent>
          </Card>
        )}

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
            </CardContent>
          </Card>
        )}

        {step === 4 && certified && (
          <Card>
            <CardHeader>
              <CardTitle>Your certification details</CardTitle>
              <CardDescription>
                You&apos;ll need this to book fun dives. You can fill this in later.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Certification agency</label>
                <Input placeholder="e.g. PADI, SSI, NAUI" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Certification level</label>
                <Input placeholder="e.g. Open Water, Advanced" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Certification number</label>
                <Input placeholder="e.g. 1234567" />
              </div>
              <Button className="w-full" onClick={() => setStep(5)}>
                Continue
              </Button>
              <Button
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={() => setStep(5)}
              >
                Skip for now
              </Button>
            </CardContent>
          </Card>
        )}

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
              <div className="space-y-2">
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
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
