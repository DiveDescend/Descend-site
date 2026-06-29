import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Waves } from "lucide-react";
import { INSTRUCTORS } from "@/lib/mock-data";

export default function InstructorProfilePage({ params }: { params: { id: string } }) {
  const instructor = INSTRUCTORS.find((i) => i.id === params.id) ?? INSTRUCTORS[0];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <div
          className={`h-24 w-24 shrink-0 rounded-full ${instructor.color} flex items-center justify-center text-4xl font-bold text-white`}
        >
          {instructor.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{instructor.name}</h1>
          <p className="text-muted-foreground">{instructor.location}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-1 sm:justify-start">
            {instructor.certifications.map((cert) => (
              <Badge key={cert} variant="secondary">{cert}</Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-6 rounded-xl border p-4">
        <div className="flex flex-1 flex-col items-center">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xl font-bold">{instructor.rating}</span>
          </div>
          <p className="text-xs text-muted-foreground">Rating</p>
        </div>
        <div className="flex flex-1 flex-col items-center border-l">
          <div className="flex items-center gap-1">
            <Waves className="h-4 w-4 text-primary" />
            <span className="text-xl font-bold">{instructor.divesLed.toLocaleString()}</span>
          </div>
          <p className="text-xs text-muted-foreground">Dives led</p>
        </div>
        <div className="flex flex-1 flex-col items-center border-l">
          <span className="text-xl font-bold">{instructor.certifications.length}</span>
          <p className="text-xs text-muted-foreground">Certifications</p>
        </div>
      </div>

      <div>
        <h2 className="mb-2 font-semibold">About</h2>
        <p className="text-muted-foreground">{instructor.bio}</p>
      </div>

      <div>
        <h2 className="mb-3 font-semibold">Reviews</h2>
        <div className="space-y-3">
          {[
            { name: "Sophie M.", text: "Marco made me feel completely safe on my first deep dive.", rating: 5 },
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

      <Button className="w-full" size="lg" asChild>
        <Link href="/book/fun-dive/1">Book a dive with {instructor.name.split(" ")[0]}</Link>
      </Button>
    </div>
  );
}
