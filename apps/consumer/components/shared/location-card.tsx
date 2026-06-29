import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface LocationCardProps {
  id: string;
  name: string;
  country: string;
  diveCount: number;
  color: string;
}

export default function LocationCard({ id, name, country, diveCount, color }: LocationCardProps) {
  return (
    <Link href={`/discover/locations`}>
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        <div className={`h-32 ${color} flex items-end p-3`}>
          <span className="rounded bg-black/40 px-1.5 py-0.5 text-xs text-white">
            {diveCount} dives
          </span>
        </div>
        <CardContent className="p-3">
          <p className="font-semibold leading-tight">{name}</p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {country}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
