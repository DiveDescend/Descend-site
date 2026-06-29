import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MapPin, Star, Clock, Phone } from "lucide-react";
import { DIVE_CENTERS, COURSES, FUN_DIVES } from "@/lib/mock-data";

export default function DiveCenterProfilePage({ params }: { params: { id: string } }) {
  const center = DIVE_CENTERS.find((dc) => dc.id === params.id) ?? DIVE_CENTERS[0];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      <div className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{center.name}</h1>
            <p className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {center.location}
            </p>
          </div>
          <Button>Contact</Button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{center.rating}</span>
            <span className="text-muted-foreground">({center.reviewCount} reviews)</span>
          </div>
          {center.certifications.map((cert) => (
            <Badge key={cert} variant="secondary">{cert}</Badge>
          ))}
        </div>

        <div className="h-48 rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border" />
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="fun-dives">Fun Dives</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 pt-4">
          <p className="text-muted-foreground">{center.description}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Opening hours</p>
                  <p className="text-sm text-muted-foreground">Mon–Sun: 7:00 AM – 6:00 PM</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Contact</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 000-0000</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Popular reefs nearby</h3>
            <div className="flex flex-wrap gap-2">
              {["North Wall", "Blue Corner", "Shark Point", "The Pinnacle"].map((reef) => (
                <Badge key={reef} variant="outline">{reef}</Badge>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-3 pt-4">
          {COURSES.map((course) => (
            <Card key={course.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="font-semibold">{course.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {course.days} days · <Badge variant="outline" className="text-xs">{course.level}</Badge>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">${course.price}</span>
                  <Button size="sm" asChild>
                    <Link href={`/book/course/${course.id}`}>Book</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="fun-dives" className="space-y-3 pt-4">
          {FUN_DIVES.map((dive) => (
            <Card key={dive.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="font-semibold">{dive.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {dive.depth} · {dive.duration}
                  </p>
                  <p className="text-xs text-muted-foreground">Min: {dive.minCert}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">${dive.price}</span>
                  <Button size="sm" asChild>
                    <Link href={`/book/fun-dive/${dive.id}`}>Book</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="reviews" className="space-y-3 pt-4">
          {[
            { name: "Alex T.", rating: 5, text: "Incredible experience. The guides knew every corner of the reef." },
            { name: "Marie L.", rating: 5, text: "Professional, safe, and genuinely passionate about the ocean." },
            { name: "James K.", rating: 4, text: "Great dive centre, small groups which made a big difference." },
          ].map((review, i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{review.name}</p>
                  <div className="flex">
                    {Array.from({ length: review.rating }, (_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{review.text}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
