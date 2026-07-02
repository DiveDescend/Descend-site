"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import OtpVerifyForm from "@/components/shared/otp-verify-form";

function LoginVerifyContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const next = searchParams.get("next") ?? "/";

  return (
    <OtpVerifyForm
      email={email}
      redirectTo={next}
      backHref="/login"
      shouldCreateUser={false}
    />
  );
}

export default function LoginVerifyPage() {
  return (
    <Suspense fallback={null}>
      <LoginVerifyContent />
    </Suspense>
  );
}
