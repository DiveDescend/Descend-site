import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { COURSES } from "@/lib/mock-data";

const DAY_BREAKDOWN: Record<string, string[]> = {
  "1": ["Day 1: Pool session — buoyancy, mask clearing, regulator recovery", "Day 2: Open water dive 1 & 2 — shallow reef", "Day 3: Open water dive 3 & 4 — deeper reef exploration", "Day 4: Final assessment + certification dive"],
  "2": ["Day 1: Navigation & deep dive briefing", "Day 2: Deep dive + wreck dive", "Day 3: Night dive + certification"],
  default: ["Day 1: Theory and pool introduction", "Day 2: Open water skills", "Day 3: Advanced techniques", "Day 4: Assessment and certification"],
};

export default function CourseBookingPage({ params }: { params: { id: string } }) {
  const course = COURSES.find((c) => c.id === params.id) ?? COURSES[0];
  const breakdown = DAY_BREAKDOWN[params.id] ?? DAY_BREAKDOWN.default;

  return (
    <div className="mx-auto max-w-lg px-4 py-8 space-y-6">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold">{course.name}</h1>
          <Badge>{course.level}</Badge>
        </div>
        <p className="text-muted-foreground">{course.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{course.days}</p>
            <p className="text-sm text-muted-foreground">Days</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">${course.price}</p>
            <p className="text-sm text-muted-foreground">Total cost</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="mb-3 font-semibold">What you&apos;ll cover</h2>
        <div className="space-y-2">
          {breakdown.map((day, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p className="text-sm">{day}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        <p className="text-sm font-medium">What&apos;s included</p>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          <li>• All equipment rental</li>
          <li>• PADI/SSI certification fee</li>
          <li>• Course materials</li>
          <li>• Pool & open water sessions</li>
        </ul>
      </div>

      <div className="space-y-2">
        <Button className="w-full" size="lg">Confirm booking</Button>
        <Button variant="outline" className="w-full" disabled>
          Checkout — coming soon
        </Button>
        <Button variant="ghost" className="w-full" asChild>
          <Link href="/dive-centers">Back to dive centres</Link>
        </Button>
      </div>
    </div>
  );
}
