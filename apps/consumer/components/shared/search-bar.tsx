"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ACTIVITIES = ["Scuba Diving", "Free Diving", "Snorkeling"] as const;
type Activity = (typeof ACTIVITIES)[number];

export default function SearchBar() {
  const [selected, setSelected] = useState<Activity>("Scuba Diving");

  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm space-y-3">
      <div className="flex gap-2">
        {ACTIVITIES.map((activity) => (
          <button
            key={activity}
            onClick={() => setSelected(activity)}
            className={cn(
              "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              selected === activity
                ? "bg-primary text-primary-foreground"
                : "border border-input bg-background text-foreground/70 hover:text-foreground hover:bg-muted"
            )}
          >
            {activity}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Where to?" className="pl-9" />
        </div>
        <Button className="gap-2">
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>
    </div>
  );
}
