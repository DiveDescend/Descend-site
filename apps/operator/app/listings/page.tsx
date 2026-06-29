"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

const FUN_DIVES = [
  { id: "1", name: "Blue Corner Wall", site: "Blue Corner", depth: "15–40m", duration: "2 dives", maxDivers: 8, price: "$120", active: true },
  { id: "2", name: "Manta Ray Point", site: "Manta Point", depth: "8–25m", duration: "2 dives", maxDivers: 6, price: "$110", active: true },
  { id: "3", name: "WWII Wreck Dive", site: "Helmet Wreck", depth: "18–35m", duration: "1 dive", maxDivers: 4, price: "$95", active: true },
  { id: "4", name: "Night Reef Dive", site: "House Reef", depth: "5–18m", duration: "1 dive", maxDivers: 8, price: "$85", active: true },
  { id: "5", name: "Shark Drift Dive", site: "Blue Corner", depth: "20–40m", duration: "2 dives", maxDivers: 6, price: "$130", active: false },
];

const COURSES = [
  { id: "1", name: "Open Water Diver", agency: "PADI", instructor: "Marco R.", startDate: "Jan 6, 2025", days: 4, maxStudents: 4, price: "$450", active: true },
  { id: "2", name: "Advanced Open Water", agency: "PADI", instructor: "Sarah K.", startDate: "Jan 8, 2025", days: 3, maxStudents: 4, price: "$380", active: true },
  { id: "3", name: "Rescue Diver", agency: "PADI", instructor: "Marco R.", startDate: "Jan 13, 2025", days: 4, maxStudents: 3, price: "$520", active: true },
  { id: "4", name: "Divemaster", agency: "PADI", instructor: "David O.", startDate: "Feb 1, 2025", days: 30, maxStudents: 2, price: "$1,200", active: false },
  { id: "5", name: "Nitrox Specialty", agency: "PADI", instructor: "Sarah K.", startDate: "Jan 15, 2025", days: 2, maxStudents: 4, price: "$220", active: true },
];

function ActiveToggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "rounded-full px-3 py-1 text-xs font-medium transition-colors",
        active ? "bg-primary/10 text-primary" : "border text-muted-foreground hover:border-primary hover:text-primary"
      )}
    >
      {active ? "Active" : "Inactive"}
    </button>
  );
}

export default function ListingsPage() {
  const [dives, setDives] = useState(FUN_DIVES);
  const [courses, setCourses] = useState(COURSES);

  const toggleDive = (id: string) =>
    setDives((prev) => prev.map((d) => d.id === id ? { ...d, active: !d.active } : d));
  const toggleCourse = (id: string) =>
    setCourses((prev) => prev.map((c) => c.id === id ? { ...c, active: !c.active } : c));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Listings</h1>
        <p className="text-muted-foreground">Manage the dives and courses you offer.</p>
      </div>

      <Tabs defaultValue="fun-dives">
        <TabsList>
          <TabsTrigger value="fun-dives">Fun Dives</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="fun-dives">
          <div className="flex justify-end mb-3">
            <Button size="sm" className="gap-2"><Plus className="h-4 w-4" />Add dive slot</Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {dives.map((dive) => (
                  <div key={dive.id} className="flex items-center gap-4 px-6 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm">{dive.name}</p>
                      <p className="text-xs text-muted-foreground">{dive.site}</p>
                    </div>
                    <div className="hidden md:flex gap-4 text-sm text-muted-foreground">
                      <span>{dive.depth}</span>
                      <span>{dive.duration}</span>
                      <span>Max {dive.maxDivers} divers</span>
                    </div>
                    <span className="font-semibold text-sm">{dive.price}<span className="text-muted-foreground font-normal">/person</span></span>
                    <ActiveToggle active={dive.active} onToggle={() => toggleDive(dive.id)} />
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0"><Pencil className="h-3.5 w-3.5" /></Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses">
          <div className="flex justify-end mb-3">
            <Button size="sm" className="gap-2"><Plus className="h-4 w-4" />Schedule course</Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center gap-4 px-6 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm">{course.name}</p>
                      <p className="text-xs text-muted-foreground">{course.instructor} · Starts {course.startDate}</p>
                    </div>
                    <div className="hidden md:flex gap-3 items-center">
                      <Badge variant="outline" className="text-[10px]">{course.agency}</Badge>
                      <span className="text-sm text-muted-foreground">{course.days} days</span>
                      <span className="text-sm text-muted-foreground">Max {course.maxStudents} students</span>
                    </div>
                    <span className="font-semibold text-sm">{course.price}</span>
                    <ActiveToggle active={course.active} onToggle={() => toggleCourse(course.id)} />
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0"><Pencil className="h-3.5 w-3.5" /></Button>
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
