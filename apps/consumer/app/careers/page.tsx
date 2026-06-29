import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

const ROLES = [
  {
    id: "researcher",
    title: "Researcher",
    type: "Full-time",
    location: "Remote",
    description:
      "We're looking for a curious, analytical researcher to help us understand the scuba diving market — diver behavior, operator needs, competitive landscape, and the barriers that keep people out of the water. You'll work closely with the founding team to shape product decisions with real insight.",
    responsibilities: [
      "Conduct user interviews with divers, instructors, and dive operators",
      "Synthesize qualitative and quantitative research into actionable insights",
      "Map the competitive landscape across dive booking platforms and operators",
      "Define diver personas and identify underserved segments",
      "Collaborate with the product team to prioritize based on findings",
    ],
  },
  {
    id: "fullstack-developer",
    title: "Full Stack Developer",
    type: "Full-time",
    location: "Remote",
    description:
      "We're building Descend on a modern TypeScript stack (Next.js, PostgreSQL, Tailwind) and we're looking for a developer who can move fast, care about UX, and help us ship the core platform. You'll work across the entire product — consumer app, operator dashboard, and backend APIs.",
    responsibilities: [
      "Build and iterate on the consumer-facing Next.js app",
      "Design and implement backend APIs and database schema (PostgreSQL)",
      "Integrate third-party services (payments, maps, auth)",
      "Ship features end-to-end: from DB schema to polished UI",
      "Care about performance, accessibility, and code quality",
    ],
  },
];

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-10">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">Careers</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          We&apos;re a small team building the platform for diving discovery and
          booking. If you love the ocean and want to help more people experience
          it, we&apos;d love to hear from you.
        </p>
      </div>

      <div className="space-y-6">
        {ROLES.map((role) => (
          <Card key={role.id}>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{role.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Badge variant="secondary">{role.type}</Badge>
                    <span>{role.location}</span>
                  </CardDescription>
                </div>
                <Button asChild>
                  <Link href="#">Apply</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {role.description}
              </p>
              <div>
                <p className="text-sm font-medium mb-2">What you&apos;ll do</p>
                <ul className="space-y-1.5">
                  {role.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-xl border bg-muted/50 p-6 text-center space-y-2">
        <p className="font-medium">Don&apos;t see your role?</p>
        <p className="text-sm text-muted-foreground">
          We&apos;re always open to hearing from talented people. Reach out at{" "}
          <a href="mailto:hello@divedescend.com" className="text-primary underline underline-offset-4">
            hello@divedescend.com
          </a>
        </p>
      </div>
    </div>
  );
}
