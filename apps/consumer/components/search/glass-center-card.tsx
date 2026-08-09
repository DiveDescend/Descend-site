import Image from "next/image";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { GLASS_BG, GLASS_BORDER } from "@/components/home/glass";

const CERT_ICONS: Record<string, string> = {
  PADI: "/padi.svg",
  SSI: "/ssi.svg",
  NAUI: "/naui.svg",
};

interface GlassCenterCardProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  certifications: string[];
  padi5star?: boolean;
  image: string;
}

export default function GlassCenterCard({
  id, name, location, rating, reviewCount, certifications, padi5star, image,
}: GlassCenterCardProps) {
  return (
    <Link href={`/dive-centers/${id}`} className={`group block overflow-hidden rounded-2xl ${GLASS_BORDER}`} style={GLASS_BG}>
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 25vw"
        />
        {padi5star && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-[#0F2E4C]">
            PADI 5 Star
          </span>
        )}
      </div>
      <div className="space-y-1.5 p-4">
        <p className="text-base font-bold text-white">{name}</p>
        <div className="flex items-center gap-1 text-sm text-white/80">
          <Star className="h-3.5 w-3.5 fill-current text-amber-400" /> {rating}
          <span className="text-white/40">({reviewCount})</span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <p className="flex items-center gap-1 text-xs text-white/50">
            <MapPin className="h-3 w-3 shrink-0" /> {location}
          </p>
          <div className="flex gap-1">
            {certifications.map((c) => CERT_ICONS[c] && (
              <Image key={c} src={CERT_ICONS[c]} alt={c} width={16} height={16} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
