import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import DiveCenterCard from "@/components/shared/dive-center-card";
import { DIVE_CENTERS, LOCATIONS } from "@/lib/mock-data";
import { Search } from "lucide-react";

const FILTERS = ["All", "PADI", "SSI", "NAUI", "Liveaboard", "Day trips"];

export default function DiveCentersPage({
  searchParams,
}: {
  searchParams?: { location?: string };
}) {
  const location = searchParams?.location;
  const loc = LOCATIONS.find((l) => l.name === location);
  const centers = location
    ? DIVE_CENTERS.filter((dc) => {
        if (dc.location.includes(location)) return true;
        const region = dc.location.split(",").pop()?.trim() ?? "";
        return !!loc && loc.country.includes(region);
      })
    : DIVE_CENTERS;

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {location ? `Dive Centers in ${location}` : "Dive Centers"}
        </h1>
        <p className="text-muted-foreground">Find and book with certified dive operators worldwide.</p>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search dive centers..." className="pl-9" />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <Badge
              key={f}
              variant={f === "All" ? "default" : "outline"}
              className="cursor-pointer"
            >
              {f}
            </Badge>
          ))}
        </div>
      </div>

      {centers.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {centers.map((dc) => (
            <DiveCenterCard key={dc.id} {...dc} />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-muted-foreground">
          No dive centers in {location} yet. Check back soon.
        </p>
      )}
    </div>
  );
}
