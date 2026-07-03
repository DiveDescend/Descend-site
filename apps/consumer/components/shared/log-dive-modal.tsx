"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { Moon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CREATURES, DIVE_CENTERS, FUN_DIVES } from "@/lib/mock-data";
import { addDiveLog, todayISO, type Booking } from "@/lib/demo-store";

const u = (id: string, w = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

// Preset gallery only — data-URL uploads would bloat localStorage.
const PRESET_PHOTOS = [
  u("1682687982360-3fbab65f9d50"),
  u("1544551763-46a013bb70d5"),
  u("1510637858650-c3be04731622"),
  u("1542443605-fcefd6550d4a"),
  u("1682687981907-170c006e3744"),
  u("1437622368342-7a3d73a34c8f"),
];

const SITE_SUGGESTIONS = Array.from(
  new Set([
    ...DIVE_CENTERS.flatMap((dc) => dc.diveSites.map((s) => s.name)),
    ...FUN_DIVES.map((d) => d.name),
  ])
);

export default function LogDiveModal({ open, onClose, draft }: {
  open: boolean;
  onClose: () => void;
  /** Booking to prefill from when confirming a draft log. */
  draft?: Booking | null;
}) {
  const [site, setSite] = useState("");
  const [date, setDate] = useState(todayISO());
  const [depth, setDepth] = useState("");
  const [duration, setDuration] = useState("");
  const [buddy, setBuddy] = useState("");
  const [creatureIds, setCreatureIds] = useState<string[]>([]);
  const [night, setNight] = useState(false);
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setSite(draft?.title ?? "");
    setDate(draft ? draft.dateFrom : todayISO());
    setDepth("");
    setDuration("");
    setBuddy("");
    setCreatureIds([]);
    setNight(draft?.title.toLowerCase().includes("night") ?? false);
    setNotes("");
    setPhoto(draft?.image ?? null);
  }, [open, draft]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const toggleCreature = (id: string) =>
    setCreatureIds((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));

  const valid = site.trim() && date && Number(depth) > 0 && Number(duration) > 0;

  function handleSave() {
    addDiveLog({
      source: draft ? "booking" : "manual",
      ...(draft ? { bookingId: draft.id } : {}),
      site: site.trim(),
      ...(draft?.location ? { location: draft.location } : {}),
      date,
      maxDepthM: Number(depth),
      durationMin: Number(duration),
      ...(buddy.trim() ? { buddy: buddy.trim() } : {}),
      creatureIds,
      ...(notes.trim() ? { notes: notes.trim() } : {}),
      ...(photo ? { photo } : {}),
      night,
    });
    onClose();
  }

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onMouseDown={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border bg-background p-6 shadow-lg sm:p-8">
        <button onClick={onClose} aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted">
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-xl font-bold tracking-tight">
          {draft ? "Confirm your dive log" : "Log a dive"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {draft
            ? `From your ${draft.title} booking — fill in the details.`
            : "Add a dive to your logbook."}
        </p>

        <div className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Dive site</label>
            <Input
              list="dive-sites"
              placeholder="e.g. Temple Reef"
              value={site}
              onChange={(e) => setSite(e.target.value)}
            />
            <datalist id="dive-sites">
              {SITE_SUGGESTIONS.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Date</label>
              <Input type="date" max={todayISO()} value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Max depth (m)</label>
              <Input type="number" min={1} max={130} placeholder="18" value={depth} onChange={(e) => setDepth(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Duration (min)</label>
              <Input type="number" min={1} max={240} placeholder="45" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Buddy <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <Input placeholder="Who did you dive with?" value={buddy} onChange={(e) => setBuddy(e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">What did you see?</label>
            <div className="flex flex-wrap gap-1.5">
              {CREATURES.map((c) => (
                <button key={c.id} type="button" onClick={() => toggleCreature(c.id)}>
                  <Badge
                    variant={creatureIds.includes(c.id) ? "default" : "outline"}
                    className="cursor-pointer"
                  >
                    {c.name}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox checked={night} onCheckedChange={(v) => setNight(v === true)} />
            <span className="flex items-center gap-1.5">
              <Moon className="h-3.5 w-3.5 text-muted-foreground" /> Night dive
            </span>
          </label>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Notes <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <textarea
              className="flex min-h-[64px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Conditions, highlights, anything worth remembering…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Photo <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <div className="grid grid-cols-6 gap-2">
              {PRESET_PHOTOS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPhoto(photo === p ? null : p)}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-lg border-2 transition-colors",
                    photo === p ? "border-primary" : "border-transparent hover:border-muted-foreground/40"
                  )}
                >
                  <Image src={p} alt="Dive photo option" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          </div>

          <Button className="w-full" size="lg" disabled={!valid} onClick={handleSave}>
            Save dive
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
