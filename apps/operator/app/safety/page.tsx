import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Hospital, Phone, MapPin } from "lucide-react";

const HOSPITALS = [
  { id: "1", name: "RSUD Waisai", address: "Jl. Kofiau No. 1, Waisai, Raja Ampat", distance: "12 km", phone: "+62 951 21234", emergency: "+62 951 21234" },
  { id: "2", name: "Puskesmas Waisai", address: "Jl. Pattimura, Waisai, Raja Ampat", distance: "11 km", phone: "+62 951 21300", emergency: "+62 951 21300" },
];

const CHAMBERS = [
  { id: "1", name: "Sorong Hyperbaric Centre", address: "Jl. Yos Sudarso No. 5, Sorong, Papua Barat", distance: "85 km", phone: "+62 951 321456", emergency: "+62 951 321456", level: "Level II" },
  { id: "2", name: "DAN Indonesia — Bali", address: "Jl. Bypass Ngurah Rai, Sanur, Bali", distance: "~2,000 km (medevac)", phone: "+62 361 710505", emergency: "+62 361 710505", level: "Level III" },
];

const LEVEL_COLOR: Record<string, string> = {
  "Level I": "bg-blue-100 text-blue-700",
  "Level II": "bg-teal-100 text-teal-700",
  "Level III": "bg-emerald-100 text-emerald-700",
};

export default function SafetyPage() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Safety & Emergency</h1>
        <p className="text-muted-foreground">
          Hospital and chamber details are shared with booked divers before their dive.
        </p>
      </div>

      {/* Hospitals */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hospital className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Nearby Hospitals</h2>
          </div>
          <Button size="sm" className="gap-2"><Plus className="h-4 w-4" />Add hospital</Button>
        </div>
        <div className="space-y-3">
          {HOSPITALS.map((h) => (
            <Card key={h.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5 min-w-0">
                    <p className="font-semibold">{h.name}</p>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0" /> {h.address}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">Distance: <span className="font-medium text-foreground">{h.distance}</span></span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Phone className="h-3 w-3" /> {h.phone}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="shrink-0">Edit</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Compression chambers */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full border-2 border-primary flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-primary" />
            </div>
            <h2 className="text-lg font-semibold">Compression Chambers</h2>
          </div>
          <Button size="sm" className="gap-2"><Plus className="h-4 w-4" />Add chamber</Button>
        </div>
        <div className="space-y-3">
          {CHAMBERS.map((c) => (
            <Card key={c.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{c.name}</p>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LEVEL_COLOR[c.level]}`}>
                        {c.level}
                      </span>
                    </div>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0" /> {c.address}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">Distance: <span className="font-medium text-foreground">{c.distance}</span></span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Phone className="h-3 w-3" /> {c.phone}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="shrink-0">Edit</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
