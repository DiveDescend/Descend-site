import CourseCard from "@/components/shared/course-card";
import { COURSES } from "@/lib/mock-data";

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
        <p className="text-muted-foreground">Get certified — from your first breath underwater to professional level.</p>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {COURSES.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
}
