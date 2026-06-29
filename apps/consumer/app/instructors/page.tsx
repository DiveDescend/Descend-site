import InstructorCard from "@/components/shared/instructor-card";
import { INSTRUCTORS } from "@/lib/mock-data";

export default function InstructorsPage() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Instructors</h1>
        <p className="text-muted-foreground">Find experienced dive instructors around the world.</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {INSTRUCTORS.map((instructor) => (
          <InstructorCard key={instructor.id} {...instructor} />
        ))}
      </div>
    </div>
  );
}
