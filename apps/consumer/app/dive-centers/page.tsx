import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import DiveCenterCard from "@/components/shared/dive-center-card";
import { DIVE_CENTERS } from "@/lib/mock-data";
import { Search } from "lucide-react";

const FILTERS = ["All", "PADI", "SSI", "NAUI", "Liveaboard", "Day trips"];

export default function DiveCentersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dive Centers</h1>
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DIVE_CENTERS.map((dc) => (
          <DiveCenterCard key={dc.id} {...dc} />
        ))}
      </div>
    </div>
  );
}
