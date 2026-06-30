import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";

const CERT_ICONS: Record<string, string> = {
  PADI: "/padi.svg",
  SSI: "/ssi.svg",
  NAUI: "/naui.svg",
};

interface DiveCenterCardProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  certifications: string[];
  image: string;
}

export default function DiveCenterCard({ id, name, location, certifications, image }: DiveCenterCardProps) {
  return (
    <Link href={`/dive-centers/${id}`} className="group block">
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="mt-3 space-y-1.5">
        <p className="text-xl font-bold tracking-tight">{name}</p>
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {location}
          </p>
          <div className="flex items-center gap-1.5">
            {certifications.map((cert) =>
              CERT_ICONS[cert] ? (
                <Image
                  key={cert}
                  src={CERT_ICONS[cert]}
                  alt={cert}
                  width={24}
                  height={24}
                  className="shrink-0"
                />
              ) : null
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
