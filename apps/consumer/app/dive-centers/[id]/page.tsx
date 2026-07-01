"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  MapPin, Star, Clock, Phone, Globe, ExternalLink, ArrowDown,
  Droplets, Lock, Bed, Coffee, Heart, Package, Car,
  Gauge, Wrench, Camera, Anchor, Wifi, Ship,
  Fish, Moon, Wind, Layers, Zap, Lightbulb,
} from "lucide-react";
import { DIVE_CENTERS, COURSES, FUN_DIVES } from "@/lib/mock-data";
import CardCarousel from "@/components/shared/card-carousel";

const CERT_LOGOS: Record<string, string> = { PADI: "/padi.svg", SSI: "/ssi.svg", NAUI: "/naui.svg" };

const AMENITY_ICONS: Record<string, React.FC<{ className?: string; strokeWidth?: string | number }>> = {
  "Showers": Droplets, "Lockers": Lock, "Accommodation": Bed, "Cafeteria": Coffee,
  "First Aid": Heart, "Equipment Rental": Package, "Shuttle Service": Car,
  "Nitrox Fills": Gauge, "Equipment Servicing": Wrench, "Photo & Video": Camera,
  "Boat Dives": Anchor, "Wi-Fi": Wifi,
};

const DIVE_TYPE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  "Reef Dive": Fish, "Night Dive": Moon, "Wreck Dive": Anchor, "Deep Dive": Layers,
  "Wall Dive": Layers, "Drift Dive": Wind, "Photography Dive": Camera,
  "Shark Dive": Zap, "Cave Dive": Lightbulb, "Liveaboard": Ship,
};

const Divider = () => <div className="border-t" />;

function shortAge(str: string): string {
  const m = str.match(/(\d+)\s+(day|week|month|year)s?/i);
  if (!m) return str;
  const map: Record<string, string> = { day: "d", week: "w", month: "mo", year: "y" };
  return `${m[1]}${map[m[2].toLowerCase()]}`;
}

export default function DiveCenterProfilePage({ params }: { params: { id: string } }) {
  const center    = DIVE_CENTERS.find((dc) => dc.id === params.id) ?? DIVE_CENTERS[0];
  const mapsUrl   = `https://www.google.com/maps?q=${center.coordinates.lat},${center.coordinates.lng}`;
  const [tab, setTab] = useState("overview");

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-8">

      {/* Hero */}
      <div className="relative aspect-[21/8] w-full overflow-hidden rounded-2xl">
        <Image src={center.image} alt={center.name} fill className="object-cover" priority />
        {center.padi5star && (
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            PADI 5 Star Centre
          </div>
        )}
      </div>

      {/* Title + meta */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">{center.name}</h1>
        <div className="flex flex-wrap items-center gap-4">
          <p className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />{center.location}
          </p>
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-foreground text-foreground" />
            <span className="font-semibold">{center.rating.toFixed(1)}</span>
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

      {/* Two-column */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

        {/* ── Main ── */}
        <div className="lg:col-span-2">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="fun-dives">Fun Dives</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            {/* ── Overview ── */}
            <TabsContent value="overview" className="space-y-8 pt-6">

              <p className="text-muted-foreground leading-relaxed">{center.description}</p>

              <Divider />

              {/* Fun Dives preview */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Fun Dives</h3>
                  <button onClick={() => setTab("fun-dives")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    View all
                  </button>
                </div>
                <CardCarousel cardWidth={192}>
                  {FUN_DIVES.slice(0, 3).map((dive) => (
                    <Link key={dive.id} href={`/book/fun-dive/${dive.id}`} className="flex-none w-48 snap-start group block">
                      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
                        <Image src={dive.image} alt={dive.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="192px" />
                      </div>
                      <div className="mt-3 space-y-1">
                        <p className="text-base font-bold tracking-tight leading-tight">{dive.name}</p>
                        <p className="flex items-center gap-1 text-sm text-muted-foreground">
                          <ArrowDown className="h-3.5 w-3.5 shrink-0" />{dive.depth} · {dive.duration}
                        </p>
                        <p className="text-sm font-semibold">${dive.price}</p>
                      </div>
                    </Link>
                  ))}
                </CardCarousel>
              </section>

              <Divider />

              {/* Courses preview */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Courses</h3>
                  <button onClick={() => setTab("courses")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    View all
                  </button>
                </div>
                <CardCarousel cardWidth={192}>
                  {COURSES.slice(0, 3).map((course) => (
                    <Link key={course.id} href={`/book/course/${course.id}`} className="flex-none w-48 snap-start group block">
                      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
                        <Image src={course.image} alt={course.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="192px" />
                      </div>
                      <div className="mt-3 space-y-1">
                        <p className="text-base font-bold tracking-tight leading-tight">{course.name}</p>
                        <p className="text-sm text-muted-foreground">{course.days} days · {course.level}</p>
                        <p className="text-sm font-semibold">${course.price}</p>
                      </div>
                    </Link>
                  ))}
                </CardCarousel>
              </section>

              <Divider />

              {/* Dive Sites */}
              <section className="space-y-4">
                <h3 className="font-semibold text-lg">Dive Sites</h3>
                <CardCarousel cardWidth={208}>
                  {center.diveSites.map((site) => (
                    <div key={site.id} className="flex-none w-52 snap-start group">
                      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
                        <Image src={site.image} alt={site.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="208px" />
                        <div className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">{site.type}</div>
                      </div>
                      <div className="mt-2 space-y-0.5">
                        <p className="text-sm font-semibold">{site.name}</p>
                        <p className="text-xs text-muted-foreground">{site.depth}</p>
                      </div>
                    </div>
                  ))}
                </CardCarousel>
              </section>

              <Divider />

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

              <Divider />

              {/* Amenities */}
              <section className="space-y-5">
                <h3 className="font-semibold text-lg">Amenities</h3>
                <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-12">
                  {center.amenities.map((amenity) => {
                    const Icon = AMENITY_ICONS[amenity];
                    return (
                      <div key={amenity} className="flex items-center gap-4">
                        {Icon && <Icon className="h-6 w-6 shrink-0 text-foreground" strokeWidth={1.5} />}
                        <span className="text-base">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </section>

              <Divider />

              {/* Instructors */}
              <section className="space-y-4">
                <h3 className="font-semibold text-lg">Meet the Instructors</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {center.instructors.map((instructor) => (
                    <div key={instructor.id} className="space-y-2">
                      <div className="relative aspect-square overflow-hidden rounded-2xl">
                        <Image src={instructor.image} alt={instructor.name} fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" />
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

            {/* ── Courses tab (full) ── */}
            <TabsContent value="courses" className="pt-4">
              <CardCarousel cardWidth={192}>
                {COURSES.map((course) => (
                  <Link key={course.id} href={`/book/course/${course.id}`} className="flex-none w-48 snap-start group block">
                    <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
                      <Image src={course.image} alt={course.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="192px" />
                    </div>
                    <div className="mt-3 space-y-1">
                      <p className="text-base font-bold tracking-tight leading-tight">{course.name}</p>
                      <p className="text-sm text-muted-foreground">{course.days} days · {course.level}</p>
                      <p className="text-sm font-semibold">${course.price}</p>
                    </div>
                  </Link>
                ))}
              </CardCarousel>
            </TabsContent>

            {/* ── Fun Dives tab (full) ── */}
            <TabsContent value="fun-dives" className="pt-4">
              <CardCarousel cardWidth={192}>
                {FUN_DIVES.map((dive) => (
                  <Link key={dive.id} href={`/book/fun-dive/${dive.id}`} className="flex-none w-48 snap-start group block">
                    <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
                      <Image src={dive.image} alt={dive.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="192px" />
                    </div>
                    <div className="mt-3 space-y-1">
                      <p className="text-base font-bold tracking-tight leading-tight">{dive.name}</p>
                      <p className="flex items-center gap-1 text-sm text-muted-foreground">
                        <ArrowDown className="h-3.5 w-3.5 shrink-0" />{dive.depth} · {dive.duration}
                      </p>
                      <p className="text-sm font-semibold">${dive.price}</p>
                    </div>
                  </Link>
                ))}
              </CardCarousel>
            </TabsContent>

            {/* ── Reviews tab (full list) ── */}
            <TabsContent value="reviews" className="space-y-3 pt-4">
              {center.reviews.map((review, i) => (
                <Card key={i}>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex">
                        {Array.from({ length: review.rating }, (_, j) => (
                          <Star key={j} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{shortAge(review.daysAgo)}</span>
                    </div>
                    <p className="font-semibold text-sm">{review.title}</p>
                    <p className="text-sm text-muted-foreground">&ldquo;{review.text}&rdquo;</p>
                    <div className="flex items-center gap-2 pt-1">
                      <div className="h-7 w-7 rounded-full bg-muted shrink-0" />
                      <div>
                        <p className="text-xs font-medium">{review.reviewerName}</p>
                        <p className="text-[10px] text-muted-foreground">{review.reviewerLocation}</p>
                      </div>
                      <Badge variant="outline" className="ml-auto text-[10px]">{review.courseType}</Badge>
                    </div>
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

              {/* Phone + Call */}
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
                  <a href={center.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-primary hover:underline">
                    {center.website.replace("https://", "")}
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                </div>
              </div>

              <div className="border-t" />

              {/* Map */}
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl cursor-pointer group">
                  <div
                    className="absolute inset-0 bg-[#dde8d8]"
                    style={{
                      backgroundImage: "radial-gradient(circle, #b8ccb0 1px, transparent 1px), linear-gradient(#c8d8c0 1px, transparent 1px), linear-gradient(90deg, #c8d8c0 1px, transparent 1px)",
                      backgroundSize: "18px 18px, 54px 54px, 54px 54px",
                    }}
                  />
                  <div className="absolute top-[45%] left-0 right-0 h-[3px] bg-white/70 rounded-full" />
                  <div className="absolute top-0 bottom-0 left-[30%] w-[3px] bg-white/70 rounded-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 ring-4 ring-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-0 inset-x-0 flex justify-center pb-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="flex items-center gap-1 text-[11px] font-medium bg-white/95 px-3 py-1 rounded-full shadow-sm">
                      <ExternalLink className="h-3 w-3" />
                      Open in Google Maps
                    </span>
                  </div>
                </div>
              </a>

            </CardContent>
          </Card>
        </div>

      </div>

      {/* ── Full-width reviews ── */}
      <div className="border-t pt-8 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5">
            <h2 className="text-xl font-semibold">What people are saying</h2>
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: Math.round(center.rating) }, (_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-semibold">{center.rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">· {center.reviewCount.toLocaleString()} reviews</span>
            </div>
          </div>
          <button onClick={() => setTab("reviews")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View all
          </button>
        </div>
        <CardCarousel cardWidth={288}>
          {center.reviews.map((review, i) => (
            <div key={i} className="flex-none w-72 snap-start rounded-2xl border bg-background p-5 shadow-sm space-y-3">
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                <div className="flex">
                  {Array.from({ length: review.rating }, (_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-muted-foreground/40">|</span>
                <span>{shortAge(review.daysAgo)}</span>
                <span className="text-muted-foreground/40">|</span>
                <span>{review.courseType}</span>
              </div>
              <p className="font-bold text-base leading-snug">{review.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-1 border-t">
                <div className="h-10 w-10 shrink-0 rounded-full bg-muted" />
                <div>
                  <p className="text-sm font-semibold">{review.reviewerName}</p>
                  <p className="text-xs text-muted-foreground">{review.reviewerLocation}</p>
                </div>
              </div>
            </div>
          ))}
        </CardCarousel>
      </div>

    </div>
  );
}
