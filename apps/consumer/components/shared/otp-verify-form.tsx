"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const CODE_LENGTH = 6;

export default function OtpVerifyForm({
  email,
  redirectTo,
  backHref,
  shouldCreateUser,
}: {
  email: string;
  redirectTo: string;
  backHref: string;
  shouldCreateUser: boolean;
}) {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resent, setResent] = useState(false);
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

  async function handleVerify() {
    setVerifying(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: digits.join(""),
      type: "email",
    });

    if (error) {
      setError(error.message);
      setVerifying(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  async function handleResend() {
    setResending(true);
    setError(null);
    setResent(false);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser },
    });

    if (error) {
      setError(error.message);
    } else {
      setResent(true);
    }
    setResending(false);
  }

  return (
    <div className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Check your inbox</CardTitle>
          <CardDescription>
            We sent a 6-digit code to {email || "your email"}. Enter it below to continue.
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

          {error && <p className="text-center text-sm text-destructive">{error}</p>}
          {resent && !error && (
            <p className="text-center text-sm text-muted-foreground">Code resent.</p>
          )}

          <Button className="w-full" disabled={!isComplete || verifying} onClick={handleVerify}>
            {verifying ? "Verifying…" : "Verify email"}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Didn&apos;t receive it?{" "}
              <button
                className="text-primary hover:underline text-sm disabled:opacity-50"
                onClick={handleResend}
                disabled={resending || !email}
              >
                {resending ? "Resending…" : "Resend code"}
              </button>
            </p>
            <p className="text-sm text-muted-foreground">
              Wrong email?{" "}
              <Link href={backHref} className="text-primary hover:underline">
                Go back
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
