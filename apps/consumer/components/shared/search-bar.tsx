import { Search, MapPin, CalendarDays, Waves } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Where to?" className="pl-9" />
        </div>
        <div className="relative flex-1">
          <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="date" className="pl-9" />
        </div>
        <div className="relative flex-1">
          <Waves className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Activity type" className="pl-9" />
        </div>
        <Button className="gap-2">
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>
    </div>
  );
}
