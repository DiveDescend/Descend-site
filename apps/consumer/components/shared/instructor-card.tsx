import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface InstructorCardProps {
  id: string;
  name: string;
  location: string;
  certifications: string[];
  divesLed: number;
  rating: number;
  color: string;
}

export default function InstructorCard({
  id,
  name,
  location,
  certifications,
  divesLed,
  rating,
  color,
}: InstructorCardProps) {
  return (
    <Link href={`/instructors/${id}`}>
      <Card className="transition-shadow hover:shadow-md">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div
              className={`h-12 w-12 shrink-0 rounded-full ${color} flex items-center justify-center text-lg font-bold text-white`}
            >
              {name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{name}</p>
              <p className="truncate text-xs text-muted-foreground">{location}</p>
              <div className="mt-1.5 flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-xs">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">{divesLed.toLocaleString()} dives led</span>
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {certifications.slice(0, 2).map((cert) => (
              <Badge key={cert} variant="outline" className="text-[10px]">
                {cert}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
