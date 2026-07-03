"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { shortDate } from "@/components/shared/range-picker";
import { ArrowDown, Award, Clock, Lock, Plus, RotateCcw, Waves } from "lucide-react";
import { cn } from "@/lib/utils";
import { addCerts, diveStats, resetDemo } from "@/lib/demo-store";
import { useDemoStore } from "@/lib/use-demo-store";
import { BADGE_DEFS } from "@/lib/badges";
import { RANK_LABELS, userRank } from "@/lib/certification-path";

const AGENCIES = ["PADI", "SSI", "NAUI", "CMAS", "BSAC", "Other"];

function AddCertForm({ onDone }: { onDone: () => void }) {
  const [agency, setAgency] = useState("PADI");
  const [level, setLevel] = useState("");
  const [number, setNumber] = useState("");

  return (
    <div className="space-y-2 rounded-lg border border-dashed p-3">
      <div className="grid grid-cols-2 gap-2">
        <select
          className="flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
          value={agency}
          onChange={(e) => setAgency(e.target.value)}
        >
          {AGENCIES.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
        <Input placeholder="Cert number" value={number} onChange={(e) => setNumber(e.target.value)} />
      </div>
      <Input placeholder="Level, e.g. Advanced Open Water" value={level} onChange={(e) => setLevel(e.target.value)} />
      <div className="flex gap-2">
        <Button
          size="sm"
          className="flex-1"
          disabled={!level.trim()}
          onClick={() => {
            addCerts([{ agency, level: level.trim(), number: number.trim() }]);
            onDone();
          }}
        >
          Save
        </Button>
        <Button size="sm" variant="ghost" className="flex-1" onClick={onDone}>Cancel</Button>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const state = useDemoStore();
  const [addingCert, setAddingCert] = useState(false);
  const [equipment, setEquipment] = useState(["Wetsuit (3mm)", "Mask", "Fins", "Computer"]);
  const [newItem, setNewItem] = useState("");
  const [addingItem, setAddingItem] = useState(false);

  const stats = diveStats(state);
  const rank = userRank(state);
  const recentLogs = [...state.diveLogs].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  const earned = new Map(state.badges.map((b) => [b.badgeId, b.earnedAt]));

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-3xl">
          🤿
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl font-bold">{state.profile.name}</h1>
          <p className="text-muted-foreground">{RANK_LABELS[rank]}</p>
          {state.profile.bio && <p className="mt-1 text-sm text-muted-foreground">{state.profile.bio}</p>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {[
          { label: "Dives", value: stats.totalDives },
          { label: "Hours", value: stats.hours },
          { label: "Max depth", value: stats.maxDepthM ? `${stats.maxDepthM}m` : "—" },
          { label: "Sites", value: stats.sites },
          { label: "Species", value: stats.species },
        ].map((tile) => (
          <Card key={tile.label}>
            <CardContent className="p-3 text-center">
              <p className="text-xl font-bold">{tile.value}</p>
              <p className="text-xs text-muted-foreground">{tile.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Certifications</CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-primary">
              <Link href="/journey">View your journey →</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {state.certs.length === 0 && (
            <p className="py-2 text-center text-sm text-muted-foreground">No certifications yet.</p>
          )}
          {state.certs.map((cert) => (
            <div key={cert.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{cert.level}</p>
                <p className="text-xs text-muted-foreground">
                  {cert.agency}
                  {cert.number ? ` · #${cert.number}` : ""}
                </p>
              </div>
              <Badge variant="secondary">{cert.agency}</Badge>
            </div>
          ))}
          {addingCert ? (
            <AddCertForm onDone={() => setAddingCert(false)} />
          ) : (
            <Button variant="outline" size="sm" className="mt-2 gap-1 w-full" onClick={() => setAddingCert(true)}>
              <Plus className="h-3 w-3" /> Add certification
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="h-4 w-4" /> Badges
            <span className="font-normal text-muted-foreground">
              {earned.size}/{BADGE_DEFS.length}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-x-2 gap-y-4">
            {BADGE_DEFS.map((badge) => {
              const earnedAt = earned.get(badge.id);
              return (
                <div key={badge.id} className="flex flex-col items-center gap-1 text-center" title={badge.description}>
                  <div
                    className={cn(
                      "relative flex h-12 w-12 items-center justify-center rounded-full text-2xl",
                      earnedAt ? "bg-primary/10" : "bg-muted opacity-40 grayscale"
                    )}
                  >
                    {badge.emoji}
                    {!earnedAt && (
                      <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border bg-background p-0.5">
                        <Lock className="h-3 w-3 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <span className={cn("text-xs leading-tight", earnedAt ? "text-foreground" : "text-muted-foreground")}>
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2"><Waves className="h-4 w-4" /> Dive History</CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-primary">
              <Link href="/logbook">View logbook →</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {recentLogs.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-6 text-center">
              <p className="text-muted-foreground text-sm">No dives logged yet.</p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/logbook">Log a dive</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {recentLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between rounded-md border px-3 py-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{log.site}</p>
                    <p className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{shortDate(log.date)}</span>
                      <span className="flex items-center gap-1"><ArrowDown className="h-3 w-3" />{log.maxDepthM}m</span>
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{log.durationMin} min</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Equipment Arsenal</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1" onClick={() => setAddingItem(true)}>
              <Plus className="h-3 w-3" /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {equipment.map((item) => (
              <div key={item} className="flex items-center justify-between rounded-md border px-3 py-2">
                <span className="text-sm">{item}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive h-auto p-0 text-xs"
                  onClick={() => setEquipment((prev) => prev.filter((e) => e !== item))}
                >
                  Remove
                </Button>
              </div>
            ))}
            {addingItem && (
              <div className="flex gap-2">
                <Input
                  autoFocus
                  placeholder="e.g. Dive computer"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newItem.trim()) {
                      setEquipment((prev) => [...prev, newItem.trim()]);
                      setNewItem("");
                      setAddingItem(false);
                    }
                  }}
                />
                <Button
                  size="sm"
                  disabled={!newItem.trim()}
                  onClick={() => {
                    setEquipment((prev) => [...prev, newItem.trim()]);
                    setNewItem("");
                    setAddingItem(false);
                  }}
                >
                  Add
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-2">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-muted-foreground"
          onClick={() => {
            if (window.confirm("Reset all demo data (bookings, logs, badges) back to the seed?")) resetDemo();
          }}
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset demo data
        </Button>
      </div>
    </div>
  );
}
