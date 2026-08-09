import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Users, Award, Compass, BookOpen,
  Waves, Ear, Wind, Plane, Droplets,
} from "lucide-react";
import DiveSiteCard from "@/components/home/dive-site-card";
import HeroSearchCard from "@/components/home/hero-search-card";
import HeroVideo from "@/components/home/hero-video";
import { GLASS_BG, GLASS_CHIP_SOLID, GLASS_BORDER, GLASS_BUTTON_BORDER } from "@/components/home/glass";
import { FixedMeshBackdrop, MESH_BASE } from "@/components/home/mesh-background";
import { COURSES, FUN_DIVES, DIVE_CENTERS, INSTRUCTORS } from "@/lib/mock-data";

const unsplash = (id: string, w = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const DIVE_SITES = [
  { name: "Temple Reef", region: "Pondicherry, Tamil Nadu", depth: "8–20m", type: "Reef", marine: "Angelfish & soft coral gardens", image: unsplash("1682687982360-3fbab65f9d50") },
  { name: "Cinque Island", region: "Port Blair, Andaman", depth: "10–30m", type: "Wall", marine: "Barracuda schools", image: unsplash("1505118380757-91f5f5632de0") },
  { name: "Netrani Pinnacle", region: "Murudeshwar, Karnataka", depth: "5–40m", type: "Reef", marine: "Whale sharks & bull sharks", image: unsplash("1540202404-b2979d19ed37") },
  { name: "Bangaram Lagoon", region: "Agatti Island, Lakshadweep", depth: "5–20m", type: "Reef", marine: "Manta rays & reef fish", image: unsplash("1507525428034-b723cf961d3e") },
  { name: "Grande Island", region: "Calangute, Goa", depth: "8–25m", type: "Reef", marine: "Clownfish & sea turtles", image: unsplash("1701673505077-27def0fe8219") },
  { name: "S.S. Iris Wreck", region: "Pondicherry, Tamil Nadu", depth: "14–28m", type: "Wreck", marine: "Groupers & lionfish", image: unsplash("1510637858650-c3be04731622") },
  { name: "The Boulders", region: "Murudeshwar, Karnataka", depth: "8–22m", type: "Reef", marine: "Nudibranchs & reef fish", image: unsplash("1657989602604-7087c5787ea9") },
  { name: "WWII Wreck", region: "Havelock Island, Andaman", depth: "18–35m", type: "Wreck", marine: "Lionfish & octopus", image: unsplash("1758968611255-af2c6f31370a") },
];

const EXPLORE_CATEGORIES = [
  { label: "First Time Diver", sub: "Start your certification journey", image: COURSES[0].image, href: "/courses" },
  { label: "Fun Dives", sub: "No certification course required", image: FUN_DIVES[0].image, href: "/dives" },
  { label: "Liveaboard", sub: "Multi-day trips to remote reefs", image: DIVE_CENTERS[4].image, href: "/search?type=Liveaboard" },
  { label: "Talk to an Instructor", sub: "Get personal advice before you book", image: INSTRUCTORS[0].image, href: "/instructors" },
];

const FEATURES = [
  { icon: Compass, title: "Discover", description: "Browse dive sites, marine life and conditions across India's coastline." },
  { icon: Award, title: "Plan your certification", description: "Compare PADI, SSI and NAUI courses to find the right path for your level." },
  { icon: Users, title: "Connect", description: "Find instructors, dive buddies and liveaboards for your next trip." },
  { icon: BookOpen, title: "Log your dives", description: "Keep a running log of every dive and certification, all in one place.", comingSoon: true },
];

const SAFETY_TIPS = [
  { icon: Waves, title: "Be a comfortable swimmer", text: "Certification courses require a basic swim test, like PADI's 200m swim and 10-minute float. You don't need to be an athlete, just at ease in the water." },
  { icon: Users, title: "Never dive alone", text: "Always use the buddy system, even as an experienced diver. Solo diving requires separate, specialized training." },
  { icon: Ear, title: "Equalize early and often", text: "Clear your ears every couple of feet as you descend to avoid barotrauma, the most common minor diving injury." },
  { icon: Wind, title: "Never hold your breath", text: "Breathe continuously at all times underwater. Holding your breath while ascending can cause serious lung over-expansion injury." },
  { icon: Plane, title: "Wait before you fly", text: "Leave at least 18–24 hours between your last dive and a flight to reduce the risk of decompression sickness." },
  { icon: Droplets, title: "Stay fit and hydrated", text: "Dehydration, fatigue and certain medical conditions raise your risk. A medical questionnaire is required before every course." },
];

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <FixedMeshBackdrop />

      {/* ─── Hero (full viewport) ─────────────────────────────── */}
      <section id="home-hero" className="relative h-screen min-h-[720px] w-full">
        {/* Photo + dark overlay dissolve into the fixed backdrop behind them, instead of
            ending in a flat color — so there's no hard seam where the hero meets the gradient.
            overflow-hidden lives here (not on the section) so the zoom is clipped but dropdowns
            from the search card below aren't. */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, black 68%, transparent 96%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 68%, transparent 96%)",
          }}
        >
          <div className="absolute inset-0">
            <HeroVideo />
          </div>
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(180deg, rgba(5,11,20,0.55) 0%, rgba(5,11,20,0.35) 45%, ${MESH_BASE} 100%)` }}
          />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-screen-2xl flex-col items-center justify-center gap-8 px-6 sm:px-10 lg:px-16 pb-24 text-center">
          <div className="flex flex-col items-center gap-6">
            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tighter text-white sm:text-5xl lg:text-6xl">
              Another world. One breath away.
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-white/85">
              Reefs bursting with color. Wrecks holding their stories. Walls that
              fall into endless blue.
              <br />
              Every dive is a new world. Yours to find, one breath below.
            </p>
          </div>
          {/* Marks where the search card docks — HeroSearchCard measures this to
              position itself, then fades out on scroll well before the next section. */}
          <div id="hero-search-anchor" className="w-full" />
        </div>

        <HeroSearchCard />
      </section>

      {/* ─── Everything below the hero sits on the single fixed backdrop, transparent ─── */}
      <div className="relative">
        {/* ─── Dive sites across the world ────────────────────── */}
        <section className="relative mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-16 pb-16 pt-16">
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-white/40">Just exploring?</p>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Dive sites across the world
              </h2>
              <p className="mt-2 max-w-lg text-white/60">
                No booking needed. Browse reefs, wrecks and walls, and the marine life you might find at each.
              </p>
            </div>
            <Link href="/dives" className="hidden shrink-0 items-center gap-1 text-sm font-bold text-white hover:underline sm:flex">
              Explore <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {DIVE_SITES.map((site) => (
              <DiveSiteCard key={site.name} {...site} />
            ))}
          </div>
        </section>

        {/* ─── Not sure where to start ─────────────────────────── */}
        <section className="relative mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-16 pb-16">
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-white/40">Pick your style</p>
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Not sure where to start?
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {EXPLORE_CATEGORIES.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className={`group relative h-64 overflow-hidden rounded-2xl ${GLASS_BORDER}`}
              >
                <Image src={c.image} alt={c.label} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-lg font-bold text-white">{c.label}</p>
                  <p className="text-sm text-white/70">{c.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── Before you dive ─────────────────────────────────── */}
        <section className="relative mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-16 pb-16">
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-white/40">Stay safe</p>
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Things to know before you dive
            </h2>
            <p className="mt-2 max-w-lg text-white/60">
              Real, standard diving guidance, the same basics every certification agency teaches.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SAFETY_TIPS.map((tip) => (
              <div key={tip.title} className={`rounded-2xl p-5 ${GLASS_BORDER}`} style={GLASS_BG}>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20" style={GLASS_CHIP_SOLID}>
                  <tip.icon className="h-4.5 w-4.5 text-white" />
                </div>
                <p className="mb-1.5 text-base font-bold text-white">{tip.title}</p>
                <p className="text-sm leading-relaxed text-white/60">{tip.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Your dive companion ─────────────────────────────── */}
        <section className="relative mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-16 pb-16">
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-white/40">More than bookings</p>
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Your diving companion
            </h2>
            <p className="mt-2 max-w-lg text-white/60">
              Descend helps you plan, discover and remember every dive, not just book one.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.title} className={`relative rounded-2xl p-5 ${GLASS_BORDER}`} style={GLASS_BG}>
                {f.comingSoon && (
                  <span className="absolute right-4 top-4 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white/60">
                    Coming soon
                  </span>
                )}
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20" style={GLASS_CHIP_SOLID}>
                  <f.icon className="h-4.5 w-4.5 text-white" />
                </div>
                <p className="mb-1.5 text-base font-bold text-white">{f.title}</p>
                <p className="text-sm leading-relaxed text-white/60">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Closing CTA ──────────────────────────────────────── */}
        <section className="relative overflow-hidden py-24">
          <div className="relative z-10 mx-auto flex max-w-screen-lg flex-col items-center gap-6 px-6 sm:px-10 lg:px-16 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              Ready when you are.
            </h2>
            <p className="max-w-lg text-lg text-white/70">
              Your next dive is closer than you think. Join divers across India discovering
              their next favorite reef with Descend.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-[#0F2E4C] transition-transform duration-150 hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
              >
                Create free account
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dives"
                style={GLASS_BG}
                className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-bold text-white transition-transform duration-150 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 ${GLASS_BUTTON_BORDER}`}
              >
                Explore dive sites
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
