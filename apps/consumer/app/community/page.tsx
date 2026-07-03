"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FeedCard from "@/components/shared/feed-card";
import { Plus } from "lucide-react";
import { useDemoStore } from "@/lib/use-demo-store";
import { buildUserFeed, SEED_FEED, type FeedKind } from "@/lib/mock-community";

const FILTERS: { id: FeedKind | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "dive-log", label: "Dives" },
  { id: "badge", label: "Badges" },
  { id: "booking", label: "Trips" },
];

export default function CommunityPage() {
  const state = useDemoStore();
  const [filter, setFilter] = useState<FeedKind | "all">("all");

  const feed = [...SEED_FEED, ...buildUserFeed(state)]
    .filter((item) => filter === "all" || item.kind === filter)
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="mx-auto max-w-xl px-4 py-8 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Community</h1>
          <p className="text-muted-foreground">What divers are up to right now.</p>
        </div>
        <Button size="sm" className="gap-1.5" asChild>
          <Link href="/logbook">
            <Plus className="h-3.5 w-3.5" /> Log a dive
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button key={f.id} onClick={() => setFilter(f.id)}>
            <Badge variant={filter === f.id ? "default" : "outline"} className="cursor-pointer">
              {f.label}
            </Badge>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {feed.map((item) => (
          <FeedCard key={item.id} item={item} liked={state.likedFeedIds.includes(item.id)} />
        ))}
        {feed.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">Nothing here yet.</p>
        )}
      </div>
    </div>
  );
}
