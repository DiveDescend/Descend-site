import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface LocationCardProps {
  id: string;
  name: string;
  country: string;
  diveCount: number;
  image: string;
}

export default function LocationCard({ id, name, country, diveCount, image }: LocationCardProps) {
  return (
    <Link href={`/discover/locations`}>
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        <div className="relative h-36">
          <Image src={image} alt={name} fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute bottom-2 left-2 rounded bg-black/40 px-1.5 py-0.5 text-xs text-white">
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
