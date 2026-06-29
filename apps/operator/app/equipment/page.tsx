import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Lock } from "lucide-react";

const GEAR = [
  { id: "1", name: "BCD Medium", category: "BCD", qty: 8, condition: "Good", serviced: "Jan 2025" },
  { id: "2", name: "BCD Large", category: "BCD", qty: 6, condition: "Excellent", serviced: "Jan 2025" },
  { id: "3", name: "Regulator Set", category: "Regulator", qty: 12, condition: "Excellent", serviced: "Mar 2025" },
  { id: "4", name: "Regulator Set #4", category: "Regulator", qty: 1, condition: "Service Due", serviced: "Jun 2024" },
  { id: "5", name: "3mm Wetsuit M", category: "Wetsuit", qty: 10, condition: "Good", serviced: "N/A" },
  { id: "6", name: "5mm Wetsuit L", category: "Wetsuit", qty: 4, condition: "Good", serviced: "N/A" },
  { id: "7", name: "12L Steel Tank", category: "Tank", qty: 20, condition: "Excellent", serviced: "Dec 2024" },
  { id: "8", name: "Dive Computer", category: "Computer", qty: 8, condition: "Good", serviced: "N/A" },
];

const BOATS = [
  { id: "1", name: "Raja Star", type: "RIB", capacity: 12, engine: "2x 150HP Yamaha", reg: "ID-RAJ-001", nextService: "Feb 2025", condition: "Good" },
  { id: "2", name: "Coral Queen", type: "Day Boat", capacity: 20, engine: "2x 250HP Suzuki", reg: "ID-RAJ-002", nextService: "Mar 2025", condition: "Excellent" },
  { id: "3", name: "Blue Wing", type: "RIB", capacity: 8, engine: "1x 90HP Honda", reg: "ID-RAJ-003", nextService: "Jan 2025", condition: "Service Due" },
];

const conditionVariant = (c: string) => {
  if (c === "Excellent") return "bg-emerald-100 text-emerald-700";
  if (c === "Good") return "bg-blue-100 text-blue-700";
  return "bg-amber-100 text-amber-700";
};

export default function EquipmentPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Equipment</h1>
          <p className="text-muted-foreground">Manage your dive gear and vessel fleet.</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" /> Internal only — not visible to divers
        </div>
      </div>

      <Tabs defaultValue="gear">
        <TabsList>
          <TabsTrigger value="gear">Dive Gear</TabsTrigger>
          <TabsTrigger value="boats">Boats</TabsTrigger>
        </TabsList>

        <TabsContent value="gear">
          <div className="flex justify-end mb-3">
            <Button size="sm" className="gap-2"><Plus className="h-4 w-4" />Add equipment</Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {GEAR.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 px-6 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                    </div>
                    <Badge variant="secondary" className="text-[10px] shrink-0">{item.category}</Badge>
                    <span className="hidden sm:block text-sm text-muted-foreground w-20">Qty: {item.qty}</span>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${conditionVariant(item.condition)}`}>
                      {item.condition}
                    </span>
                    <span className="hidden md:block text-xs text-muted-foreground w-28">Last: {item.serviced}</span>
                    <Button size="sm" variant="ghost" className="h-8 shrink-0">Edit</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="boats">
          <div className="flex justify-end mb-3">
            <Button size="sm" className="gap-2"><Plus className="h-4 w-4" />Add boat</Button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BOATS.map((boat) => (
              <Card key={boat.id} className="transition-shadow hover:shadow-md">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{boat.name}</p>
                      <p className="text-xs text-muted-foreground">{boat.type}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${conditionVariant(boat.condition)}`}>
                      {boat.condition}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capacity</span>
                      <span>{boat.capacity} passengers</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Engine</span>
                      <span className="text-right">{boat.engine}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Registration</span>
                      <span>{boat.reg}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Next service</span>
                      <span>{boat.nextService}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">Edit</Button>
                </CardContent>
              </Card>
            ))}
            <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-input text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors min-h-[180px]">
              <Plus className="h-4 w-4" /> Add boat
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
