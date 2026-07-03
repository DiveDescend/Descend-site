import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Waves } from "lucide-react";
import { INSTRUCTORS } from "@/lib/mock-data";
import { sessionsFrom } from "@/lib/mentor-sessions";

const CERT_ICONS: Record<string, string> = {
  PADI: "/padi.svg",
  SSI:  "/ssi.svg",
  NAUI: "/naui.svg",
};

const plus = (n: number) => `${n.toLocaleString()}+`;

export default function InstructorProfilePage({ params }: { params: { id: string } }) {
  const instructor = INSTRUCTORS.find((i) => i.id === params.id) ?? INSTRUCTORS[0];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full">
          <Image src={instructor.image} alt={instructor.name} fill className="object-cover" sizes="96px" />
        </div>
        <div>
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <h1 className="text-2xl font-bold tracking-tight">{instructor.name}</h1>
            {instructor.topRated && (
              <span className="flex items-center gap-1 rounded-full bg-foreground px-2.5 py-1 text-[11px] font-semibold text-background">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                Top rated
              </span>
            )}
          </div>
          <div className="mt-0.5 flex items-center justify-center gap-1.5 sm:justify-start">
            {CERT_ICONS[instructor.agency] && (
              <Image src={CERT_ICONS[instructor.agency]} alt={instructor.agency} width={20} height={20} />
            )}
            <p className="font-medium">{instructor.title}</p>
          </div>
          <p className="mt-0.5 flex items-center justify-center gap-1.5 text-sm text-muted-foreground sm:justify-start">
            <MapPin className="h-3.5 w-3.5" />
            {instructor.location}
          </p>
        </div>
      </div>

      <div className="flex gap-6 rounded-xl border p-4">
        <div className="flex flex-1 flex-col items-center">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xl font-bold">{instructor.rating.toFixed(1)}</span>
          </div>
          <p className="text-xs text-muted-foreground">{instructor.reviews} reviews</p>
        </div>
        <div className="flex flex-1 flex-col items-center border-l">
          <div className="flex items-center gap-1">
            <Waves className="h-4 w-4 text-primary" />
            <span className="text-xl font-bold">{plus(instructor.dives)}</span>
          </div>
          <p className="text-xs text-muted-foreground">Dives</p>
        </div>
        <div className="flex flex-1 flex-col items-center border-l">
          <span className="text-xl font-bold">{plus(instructor.years)}</span>
          <p className="text-xs text-muted-foreground">Years experience</p>
        </div>
      </div>

      <div>
        <h2 className="mb-2 font-semibold">About</h2>
        <p className="text-muted-foreground">{instructor.bio}</p>
      </div>

      <div>
        <h2 className="mb-2 font-semibold">Skills</h2>
        <div className="flex flex-wrap gap-1.5">
          {instructor.skills.map((skill) => (
            <Badge key={skill} variant="secondary">{skill}</Badge>
          ))}
        </div>
      </div>

      {instructor.courses.length > 0 && (
        <div>
          <h2 className="mb-2 font-semibold">Teaches</h2>
          <div className="flex flex-wrap gap-1.5">
            {instructor.courses.map((course) => (
              <Badge key={course} variant="outline">{course}</Badge>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="mb-3 font-semibold">Reviews</h2>
        <div className="space-y-3">
          {[
            { name: "Sophie M.", text: `${instructor.name.split(" ")[0]} made me feel completely safe on my first deep dive.`, rating: 5 },
            { name: "Ben R.", text: "Exceptional knowledge of the reef. Spotted 3 mantas on our trip.", rating: 5 },
          ].map((r, i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{r.name}</p>
                  <div className="flex">
                    {Array.from({ length: r.rating }, (_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{r.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <Button className="w-full" size="lg" asChild>
          <Link href={`/book/session/${instructor.id}`}>
            {instructor.category === "Dive Buddy"
              ? `Book a buddy dive with ${instructor.name.split(" ")[0]}`
              : `Book a session with ${instructor.name.split(" ")[0]}`}
          </Link>
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Sessions from ${sessionsFrom(instructor)}
        </p>
      </div>
    </div>
  );
}
