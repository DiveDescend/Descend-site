"use client";

import Image from "next/image";
import { Anchor, Award, Heart, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleKudos } from "@/lib/demo-store";
import { relativeTime, type FeedItem } from "@/lib/mock-community";

const KIND_ICONS = {
  "dive-log": Anchor,
  badge: Award,
  booking: Ticket,
} as const;

export default function FeedCard({ item, liked }: { item: FeedItem; liked: boolean }) {
  const KindIcon = KIND_ICONS[item.kind];
  const kudos = item.baseKudos + (liked ? 1 : 0);

  return (
    <div className="space-y-3 rounded-2xl border p-4">
      <div className="flex items-center gap-3">
        {item.author.image ? (
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image src={item.author.image} alt={item.author.name} fill className="object-cover" sizes="40px" />
          </div>
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-lg">
            🤿
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-snug">
            <span className={cn("font-semibold", item.author.you && "text-primary")}>
              {item.author.you ? "You" : item.author.name}
            </span>{" "}
            {item.text}
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <KindIcon className="h-3 w-3" />
            {relativeTime(item.timestamp)}
          </p>
        </div>
      </div>

      {item.image && (
        <div className="relative aspect-[2/1] overflow-hidden rounded-xl">
          <Image src={item.image} alt="" fill className="object-cover" sizes="(max-width: 640px) 100vw, 640px" />
        </div>
      )}

      <button
        onClick={() => toggleKudos(item.id)}
        className={cn(
          "flex items-center gap-1.5 text-sm transition-colors",
          liked ? "text-red-500" : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Heart className={cn("h-4 w-4 transition-transform", liked && "scale-110 fill-red-500")} />
        {kudos > 0 ? kudos : "Kudos"}
      </button>
    </div>
  );
}
