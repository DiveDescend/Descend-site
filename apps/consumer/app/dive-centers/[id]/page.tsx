import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  MapPin, Star, Clock, Phone, Globe, ExternalLink,
  Droplets, Lock, Bed, Coffee, Heart, Package, Car,
  Gauge, Wrench, Camera, Anchor, Wifi, Ship,
  Fish, Moon, Wind, Layers, Zap, Lightbulb,
} from "lucide-react";
import { DIVE_CENTERS, COURSES, FUN_DIVES } from "@/lib/mock-data";

const CERT_LOGOS: Record<string, string> = {
  PADI: "/padi.svg",
  SSI:  "/ssi.svg",
  NAUI: "/naui.svg",
};

const AMENITY_ICONS: Record<string, React.FC<{ className?: string }>> = {
  "Showers":             Droplets,
  "Lockers":             Lock,
  "Accommodation":       Bed,
  "Cafeteria":           Coffee,
  "First Aid":           Heart,
  "Equipment Rental":    Package,
  "Shuttle Service":     Car,
  "Nitrox Fills":        Gauge,
  "Equipment Servicing": Wrench,
  "Photo & Video":       Camera,
  "Boat Dives":          Anchor,
  "Wi-Fi":               Wifi,
};

const DIVE_TYPE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  "Reef Dive":        Fish,
  "Night Dive":       Moon,
  "Wreck Dive":       Anchor,
  "Deep Dive":        Layers,
  "Wall Dive":        Layers,
  "Drift Dive":       Wind,
  "Photography Dive": Camera,
  "Shark Dive":       Zap,
  "Cave Dive":        Lightbulb,
  "Liveaboard":       Ship,
};

export default function DiveCenterProfilePage({ params }: { params: { id: string } }) {
  const center = DIVE_CENTERS.find((dc) => dc.id === params.id) ?? DIVE_CENTERS[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-8">

      {/* ── Hero image ── */}
      <div className="relative aspect-[21/8] w-full overflow-hidden rounded-2xl">
        <Image src={center.image} alt={center.name} fill className="object-cover" priority />
        {center.padi5star && (
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            PADI 5 Star Centre
          </div>
        )}
      </div>

      {/* ── Title + meta ── */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">{center.name}</h1>
        <div className="flex flex-wrap items-center gap-4">
          <p className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            {center.location}
          </p>
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-foreground text-foreground" />
            <span className="font-semibold">{center.rating.toFixed(1)}</span>
            <span className="text-muted-foreground text-sm">({center.reviewCount} reviews)</span>
          </div>
          <div className="flex items-center gap-3">
            {center.certifications.map((cert) =>
              CERT_LOGOS[cert] ? (
                <Image key={cert} src={CERT_LOGOS[cert]} alt={cert} width={40} height={40} className="shrink-0" />
              ) : (
                <Badge key={cert} variant="secondary">{cert}</Badge>
              )
            )}
          </div>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

        {/* ── Main content ── */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="fun-dives">Fun Dives</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview" className="space-y-10 pt-6">

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">{center.description}</p>

              {/* Amenities */}
              <section className="space-y-4">
                <h3 className="font-semibold text-lg">Amenities</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {center.amenities.map((amenity) => {
                    const Icon = AMENITY_ICONS[amenity];
                    return (
                      <div key={amenity} className="flex items-center gap-3 rounded-xl border px-4 py-3">
                        {Icon && <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />}
                        <span className="text-sm">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Dive Types */}
              <section className="space-y-4">
                <h3 className="font-semibold text-lg">Types of Dives</h3>
                <div className="flex flex-wrap gap-2">
                  {center.diveTypes.map((type) => {
                    const Icon = DIVE_TYPE_ICONS[type];
                    return (
                      <div key={type} className="flex items-center gap-1.5 rounded-full border bg-muted/40 px-3.5 py-1.5 text-sm">
                        {Icon && <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
                        {type}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Dive Sites */}
              <section className="space-y-4">
                <h3 className="font-semibold text-lg">Dive Sites</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {center.diveSites.map((site) => (
                    <div key={site.id} className="group">
                      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
                        <Image
                          src={site.image}
                          alt={site.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, 33vw"
                        />
                        <div className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                          {site.type}
                        </div>
                      </div>
                      <div className="mt-2 space-y-0.5">
                        <p className="text-sm font-semibold">{site.name}</p>
                        <p className="text-xs text-muted-foreground">{site.depth}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Instructors */}
              <section className="space-y-4">
                <h3 className="font-semibold text-lg">Meet the Instructors</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {center.instructors.map((instructor) => (
                    <div key={instructor.id} className="space-y-2">
                      <div className="relative aspect-square overflow-hidden rounded-2xl">
                        <Image
                          src={instructor.image}
                          alt={instructor.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, 25vw"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold leading-tight">{instructor.name}</p>
                        <p className="text-xs text-muted-foreground">{instructor.specialty}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{instructor.divesLed.toLocaleString()} dives</p>
                        <p className="text-[10px] text-muted-foreground/70 mt-0.5">{instructor.certifications[0]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </TabsContent>

            {/* Courses */}
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

            {/* Fun Dives */}
            <TabsContent value="fun-dives" className="space-y-3 pt-4">
              {FUN_DIVES.map((dive) => (
                <Card key={dive.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-semibold">{dive.name}</p>
                      <p className="text-sm text-muted-foreground">{dive.depth} · {dive.duration}</p>
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

            {/* Reviews */}
            <TabsContent value="reviews" className="space-y-3 pt-4">
              {[
                { name: "Alex T.",  rating: 5, text: "Incredible experience. The guides knew every corner of the reef." },
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

        {/* ── Sidebar ── */}
        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardContent className="p-5 space-y-4">

              {/* Hours */}
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Opening hours</p>
                  <p className="text-sm text-muted-foreground">Mon–Sun: 7:00 AM – 6:00 PM</p>
                </div>
              </div>

              <div className="border-t" />

              {/* Phone + Call button */}
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                <div className="flex-1 space-y-2">
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{center.phone}</p>
                  <Button className="w-full" size="sm" asChild>
                    <a href={`tel:${center.phone.replace(/\s/g, "")}`}>Call</a>
                  </Button>
                </div>
              </div>

              <div className="border-t" />

              {/* Website */}
              <div className="flex items-start gap-3">
                <Globe className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Website</p>
                  <a
                    href={center.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    {center.website.replace("https://", "")}
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
