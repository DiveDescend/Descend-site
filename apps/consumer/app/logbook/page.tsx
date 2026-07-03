"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LogDiveModal from "@/components/shared/log-dive-modal";
import { shortDate } from "@/components/shared/range-picker";
import { ArrowDown, Check, Clock, MapPin, Moon, Plus, Users, Watch } from "lucide-react";
import { CREATURES } from "@/lib/mock-data";
import { diveStats, dismissDraft, draftCandidates, type Booking } from "@/lib/demo-store";
import { useDemoStore } from "@/lib/use-demo-store";

export default function LogbookPage() {
  return (
    <Suspense>
      <LogbookContent />
    </Suspense>
  );
}

function creatureNames(ids: string[]): string[] {
  return ids
    .map((id) => CREATURES.find((c) => c.id === id)?.name)
    .filter((n): n is string => Boolean(n));
}

function LogbookContent() {
  const state = useDemoStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState<Booking | null>(null);
  const [garminClicked, setGarminClicked] = useState(false);

  const stats = diveStats(state);
  const drafts = draftCandidates(state);
  const logs = [...state.diveLogs].sort((a, b) => b.date.localeCompare(a.date));

  // Deep link from Trips: /logbook?draft={bookingId}
  const draftParam = searchParams.get("draft");
  useEffect(() => {
    if (!draftParam) return;
    const booking = draftCandidates(state).find((b) => b.id === draftParam);
    if (booking) {
      setDraft(booking);
      setModalOpen(true);
    }
    router.replace("/logbook");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftParam]);

  const openDraft = (booking: Booking) => {
    setDraft(booking);
    setModalOpen(true);
  };

  const openManual = () => {
    setDraft(null);
    setModalOpen(true);
  };

  const STAT_TILES = [
    { label: "Total dives", value: stats.totalDives },
    { label: "Hours underwater", value: stats.hours },
    { label: "Max depth", value: stats.maxDepthM ? `${stats.maxDepthM}m` : "—" },
    { label: "Sites", value: stats.sites },
    { label: "Species", value: stats.species },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      <LogDiveModal open={modalOpen} onClose={() => setModalOpen(false)} draft={draft} />

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Logbook</h1>
          <p className="text-muted-foreground">Every dive, logged and counted.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setGarminClicked(true)}>
            {garminClicked ? (
              <>
                <Check className="h-3.5 w-3.5" /> You&apos;re on the list
              </>
            ) : (
              <>
                <Watch className="h-3.5 w-3.5" /> Connect Garmin
              </>
            )}
          </Button>
          <Button size="sm" className="gap-1.5" onClick={openManual}>
            <Plus className="h-3.5 w-3.5" /> Log a dive
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {STAT_TILES.map((tile) => (
          <Card key={tile.label}>
            <CardContent className="p-3 text-center sm:p-4">
              <p className="text-xl font-bold sm:text-2xl">{tile.value}</p>
              <p className="text-xs text-muted-foreground">{tile.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {drafts.map((booking) => (
        <div key={booking.id} className="flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
            <Image src={booking.image} alt={booking.title} fill className="object-cover" sizes="56px" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">
              You dived {booking.title} on {shortDate(booking.dateFrom)}
            </p>
            <p className="text-xs text-muted-foreground">Confirm the details to add it to your logbook.</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button size="sm" onClick={() => openDraft(booking)}>Confirm log</Button>
            <Button size="sm" variant="ghost" className="text-muted-foreground" onClick={() => dismissDraft(booking.id)}>
              Dismiss
            </Button>
          </div>
        </div>
      ))}

      <div className="space-y-3">
        {logs.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed py-12 text-center">
            <p className="text-sm text-muted-foreground">No dives logged yet.</p>
            <Button size="sm" onClick={openManual}>Log your first dive</Button>
          </div>
        )}
        {logs.map((log) => (
          <div key={log.id} className="flex gap-4 rounded-2xl border p-3 sm:p-4">
            {log.photo && (
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl sm:w-32">
                <Image src={log.photo} alt={log.site} fill className="object-cover" sizes="128px" />
              </div>
            )}
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <p className="truncate text-base font-bold tracking-tight">{log.site}</p>
                {log.night && <Moon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
              </div>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {shortDate(log.date)} · {log.durationMin} min
                </span>
                <span className="flex items-center gap-1">
                  <ArrowDown className="h-3.5 w-3.5" /> {log.maxDepthM}m
                </span>
                {log.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {log.location}
                  </span>
                )}
                {log.buddy && (
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> {log.buddy}
                  </span>
                )}
              </p>
              {log.creatureIds.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {creatureNames(log.creatureIds).map((name) => (
                    <Badge key={name} variant="secondary" className="text-[11px] font-medium">
                      {name}
                    </Badge>
                  ))}
                </div>
              )}
              {log.notes && <p className="text-sm text-muted-foreground">&ldquo;{log.notes}&rdquo;</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
