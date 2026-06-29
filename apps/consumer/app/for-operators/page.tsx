import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const BENEFITS = [
  "Get discovered by thousands of divers worldwide",
  "Manage bookings and courses in one place",
  "Showcase your certifications, instructors, and dive sites",
  "No setup fee — pay only when you take a booking",
];

export default function ForOperatorsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 space-y-16">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Grow your dive centre with Descend
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Join a platform built for dive operators. Reach more divers, manage
          bookings, and build your reputation — all in one place.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {BENEFITS.map((benefit) => (
          <Card key={benefit}>
            <CardContent className="flex items-start gap-3 pt-6">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm">{benefit}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="mx-auto max-w-sm space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-semibold">Get early access</h2>
          <p className="text-sm text-muted-foreground">
            We&apos;re onboarding dive centres now. Leave your email and we&apos;ll be in touch.
          </p>
        </div>
        <div className="space-y-3">
          <Input placeholder="Dive centre name" />
          <Input type="email" placeholder="your@divecenter.com" />
          <Button className="w-full" size="lg">
            Request access
          </Button>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          Already have an operator account?{" "}
          <a href="#" className="text-primary hover:underline">
            Log in to your dashboard
          </a>
        </p>
      </section>
    </div>
  );
}
