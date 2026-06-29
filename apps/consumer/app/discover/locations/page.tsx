import LocationCard from "@/components/shared/location-card";
import { LOCATIONS } from "@/lib/mock-data";

export default function LocationsPage() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Browse by Location</h1>
        <p className="text-muted-foreground">Explore dive destinations around the world.</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {LOCATIONS.map((loc) => (
          <LocationCard key={loc.id} {...loc} />
        ))}
      </div>
    </div>
  );
}
