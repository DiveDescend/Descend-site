import SearchBar from "@/components/shared/search-bar";
import SectionHeader from "@/components/shared/section-header";
import LocationCard from "@/components/shared/location-card";
import DiveCenterCard from "@/components/shared/dive-center-card";
import CreatureCard from "@/components/shared/creature-card";
import { LOCATIONS, DIVE_CENTERS, CREATURES } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-8 space-y-10">
      <section className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Find your next dive</h1>
          <p className="text-muted-foreground">
            Discover operators, book courses, and explore the world beneath the surface.
          </p>
        </div>
        <SearchBar />
      </section>

      <section className="space-y-4">
        <SectionHeader title="Popular Locations" seeAllHref="/discover/locations" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {LOCATIONS.slice(0, 5).map((loc) => (
            <LocationCard key={loc.id} {...loc} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader title="Dive Centers" seeAllHref="/dive-centers" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {DIVE_CENTERS.slice(0, 3).map((dc) => (
            <DiveCenterCard key={dc.id} {...dc} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader title="Marine Creatures" seeAllHref="/discover/creatures" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {CREATURES.slice(0, 4).map((c) => (
            <CreatureCard key={c.id} {...c} />
          ))}
        </div>
      </section>
    </div>
  );
}
