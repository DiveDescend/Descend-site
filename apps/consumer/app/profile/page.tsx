import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Waves, Award } from "lucide-react";

const CERTIFICATIONS = [
  { agency: "PADI", level: "Open Water Diver", number: "1234567" },
];

const BADGES = [
  { label: "First Dive", icon: "🎉" },
  { label: "10 Dives", icon: "🐠" },
  { label: "Night Diver", icon: "🌙" },
];

const EQUIPMENT = ["Wetsuit (3mm)", "Mask", "Fins", "Computer"];

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-3xl">
          🤿
        </div>
        <div>
          <h1 className="text-2xl font-bold">Jane Divers</h1>
          <p className="text-muted-foreground">Member since 2024</p>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Certifications</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {CERTIFICATIONS.map((cert, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{cert.level}</p>
                <p className="text-xs text-muted-foreground">{cert.agency} · #{cert.number}</p>
              </div>
              <Badge variant="secondary">{cert.agency}</Badge>
            </div>
          ))}
          <Button variant="outline" size="sm" className="mt-2 gap-1 w-full">
            <Plus className="h-3 w-3" /> Add certification
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Award className="h-4 w-4" /> Badges</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {BADGES.map((badge) => (
              <div key={badge.label} className="flex flex-col items-center gap-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl">
                  {badge.icon}
                </div>
                <span className="text-xs text-muted-foreground">{badge.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Waves className="h-4 w-4" /> Dive History</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-2 py-6 text-center">
            <p className="text-muted-foreground text-sm">No dives logged yet.</p>
            <Button variant="outline" size="sm">Log a dive</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Equipment Arsenal</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1">
              <Plus className="h-3 w-3" /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {EQUIPMENT.map((item) => (
              <div key={item} className="flex items-center justify-between rounded-md border px-3 py-2">
                <span className="text-sm">{item}</span>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive h-auto p-0 text-xs">
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
