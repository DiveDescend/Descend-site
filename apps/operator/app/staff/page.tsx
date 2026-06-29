import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Mail } from "lucide-react";

const COLORS = ["bg-blue-400", "bg-teal-400", "bg-slate-500", "bg-emerald-400", "bg-cyan-500", "bg-sky-500"];

const INSTRUCTORS = [
  { id: "1", name: "Marco Rossi", certs: ["PADI IDC Staff Instructor", "Rescue Diver"], divesLed: 1247, email: "marco@bluehorizon.com" },
  { id: "2", name: "Sarah Kim", certs: ["SSI Instructor Trainer", "Nitrox Specialist"], divesLed: 892, email: "sarah@bluehorizon.com" },
  { id: "3", name: "David Okafor", certs: ["PADI Master Instructor", "Wreck Specialist"], divesLed: 2103, email: "david@bluehorizon.com" },
];

const EMPLOYEES = [
  { id: "1", name: "Lina Bahari", role: "Boat Captain", phone: "+62 812 3456 7890", email: "lina@bluehorizon.com", since: "Jan 2021" },
  { id: "2", name: "Putu Arta", role: "Divemaster", phone: "+62 813 2345 6789", email: "putu@bluehorizon.com", since: "Mar 2022" },
  { id: "3", name: "Rini Sari", role: "Admin", phone: "+62 821 9876 5432", email: "rini@bluehorizon.com", since: "Jun 2020" },
  { id: "4", name: "Wayan Gede", role: "Boat Captain", phone: "+62 815 6789 1234", email: "wayan@bluehorizon.com", since: "Aug 2023" },
];

const ROLE_VARIANTS: Record<string, string> = {
  "Boat Captain": "bg-blue-100 text-blue-700",
  "Divemaster": "bg-teal-100 text-teal-700",
  "Admin": "bg-slate-100 text-slate-700",
  "Staff": "bg-gray-100 text-gray-700",
};

export default function StaffPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Staff</h1>
        <p className="text-muted-foreground">Manage your instructors and employees.</p>
      </div>

      <Tabs defaultValue="instructors">
        <TabsList>
          <TabsTrigger value="instructors">Instructors</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
        </TabsList>

        <TabsContent value="instructors">
          <div className="flex justify-end mb-3">
            <Button size="sm" className="gap-2"><Plus className="h-4 w-4" />Add instructor</Button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INSTRUCTORS.map((inst, i) => (
              <Card key={inst.id} className="transition-shadow hover:shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className={`h-12 w-12 shrink-0 rounded-full ${COLORS[i % COLORS.length]} flex items-center justify-center text-lg font-bold text-white`}>
                      {inst.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold truncate">{inst.name}</p>
                      <p className="text-xs text-muted-foreground">{inst.divesLed.toLocaleString()} dives led</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {inst.certs.map((cert) => (
                      <Badge key={cert} variant="outline" className="text-[10px]">{cert}</Badge>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{inst.email}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
            {/* Add new */}
            <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-input text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors min-h-[120px]">
              <Plus className="h-4 w-4" /> Add instructor
            </button>
          </div>
        </TabsContent>

        <TabsContent value="employees">
          <div className="flex justify-end mb-3">
            <Button size="sm" className="gap-2"><Plus className="h-4 w-4" />Add employee</Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {EMPLOYEES.map((emp, i) => (
                  <div key={emp.id} className="flex items-center gap-4 px-6 py-4">
                    <div className={`h-9 w-9 shrink-0 rounded-full ${COLORS[(i + 3) % COLORS.length]} flex items-center justify-center text-sm font-bold text-white`}>
                      {emp.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm">{emp.name}</p>
                      <p className="text-xs text-muted-foreground">Since {emp.since}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${ROLE_VARIANTS[emp.role] ?? "bg-gray-100 text-gray-700"}`}>
                      {emp.role}
                    </span>
                    <span className="hidden sm:block text-xs text-muted-foreground">{emp.phone}</span>
                    <span className="hidden md:block text-xs text-muted-foreground">{emp.email}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
