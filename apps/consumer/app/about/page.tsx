import { Waves, Globe, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const VALUES = [
  {
    icon: Waves,
    title: "Dive first",
    description:
      "Every decision we make starts with the diver. We build tools that get people in the water, not stuck behind a screen.",
  },
  {
    icon: Globe,
    title: "Global reach, local knowledge",
    description:
      "From Raja Ampat to the Red Sea, we connect divers with operators who know their waters intimately.",
  },
  {
    icon: Users,
    title: "Community-driven",
    description:
      "The best dive tips come from other divers. We're building a platform where that knowledge flows freely.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-14">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">About Descend</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Descend is a discovery and booking platform for scuba diving, free
          diving, and snorkeling experiences worldwide. We make it easy to find
          certified dive centers, book courses, and explore the ocean — whether
          you&apos;re a first-timer or logging your five hundredth dive.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Our mission</h2>
        <p className="text-muted-foreground leading-relaxed">
          The underwater world is one of the most extraordinary places on Earth,
          and it&apos;s more accessible than most people think. Our mission is
          to lower the barrier between a person and their first — or next — dive.
          We do that by making it simple to find the right operator, understand
          what&apos;s required, and book with confidence.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">What we believe</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardContent className="pt-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">The team</h2>
        <p className="text-muted-foreground leading-relaxed">
          We&apos;re a small team of divers and builders. We&apos;re actively
          growing — if you&apos;re passionate about the ocean and want to help
          build this,{" "}
          <a href="/careers" className="text-primary underline underline-offset-4">
            check out our open roles
          </a>
          .
        </p>
      </section>
    </div>
  );
}
