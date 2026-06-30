import Link from "next/link";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";

const CERT_ICONS: Record<string, string> = {
  PADI: "/padi.svg",
  SSI:  "/ssi.svg",
  NAUI: "/naui.svg",
};

interface DiveCenterCardProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  certifications: string[];
  padi5star?: boolean;
  image: string;
}

export default function DiveCenterCard({
  id, name, location, rating, reviewCount, certifications, padi5star, image,
}: DiveCenterCardProps) {
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
        {padi5star && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur-md">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            PADI 5 Star Centre
          </div>
        )}
      </div>

      <div className="mt-3 space-y-1.5">
        {/* Name + rating */}
        <div className="flex items-start justify-between gap-2">
          <p className="text-base font-bold tracking-tight leading-tight">{name}</p>
          <div className="flex shrink-0 items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-foreground text-foreground" />
            <span className="font-semibold">{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Location + cert icons */}
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
