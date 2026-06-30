import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";

interface LocationCardProps {
  id: string;
  name: string;
  country: string;
  diveCount: number;
  image: string;
}

export default function LocationCard({ id, name, country, image }: LocationCardProps) {
  return (
    <Link href={`/discover/locations`} className="group block">
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-xl font-bold tracking-tight">{name}</p>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          {country}
        </p>
      </div>
    </Link>
  );
}
