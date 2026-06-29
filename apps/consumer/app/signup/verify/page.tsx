"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const CODE_LENGTH = 6;

export default function VerifyPage() {
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    if (digit && index < CODE_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    const next = [...digits];
    pasted.split("").forEach((char, i) => { next[i] = char; });
    setDigits(next);
    inputs.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus();
  };

  const isComplete = digits.every((d) => d !== "");

  return (
    <div className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Check your inbox</CardTitle>
          <CardDescription>
            We sent a 6-digit code to your email. Enter it below to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center gap-2" onPaste={handlePaste}>
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={cn(
                  "h-12 w-10 rounded-lg border bg-background text-center text-lg font-semibold",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                  "transition-colors",
                  digit ? "border-primary" : "border-input"
                )}
              />
            ))}
          </div>

          <Button className="w-full" disabled={!isComplete} asChild>
            <Link href="/onboarding">Verify email</Link>
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Didn&apos;t receive it?{" "}
              <button className="text-primary hover:underline text-sm">
                Resend code
              </button>
            </p>
            <p className="text-sm text-muted-foreground">
              Wrong email?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Go back
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
