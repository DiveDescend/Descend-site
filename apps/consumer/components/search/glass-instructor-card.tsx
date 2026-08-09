import Image from "next/image";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { GLASS_BG, GLASS_BORDER } from "@/components/home/glass";

const CERT_ICONS: Record<string, string> = {
  PADI: "/padi.svg",
  SSI: "/ssi.svg",
  NAUI: "/naui.svg",
};

interface GlassInstructorCardProps {
  id: string;
  name: string;
  title: string;
  agency: string;
  location: string;
  image: string;
  skills: string[];
  rating: number;
  reviews: number;
  topRated?: boolean;
}

export default function GlassInstructorCard({
  id, name, title, agency, location, image, skills, rating, reviews, topRated,
}: GlassInstructorCardProps) {
  return (
    <Link href={`/instructors/${id}`} className={`group block overflow-hidden rounded-2xl ${GLASS_BORDER}`} style={GLASS_BG}>
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 20vw"
        />
        {topRated && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-[#0F2E4C]">
            Top rated
          </span>
        )}
      </div>
      <div className="space-y-1.5 p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-base font-bold text-white">{name}</p>
          {CERT_ICONS[agency] && <Image src={CERT_ICONS[agency]} alt={agency} width={18} height={18} className="shrink-0" />}
        </div>
        <p className="text-sm text-white/60">{title}</p>
        <p className="flex items-center gap-1 text-xs text-white/50">
          <MapPin className="h-3 w-3 shrink-0" /> {location}
        </p>
        <div className="flex items-center gap-1 text-sm text-white/80">
          <Star className="h-3.5 w-3.5 fill-current text-amber-400" /> {rating}
          <span className="text-white/40">({reviews})</span>
        </div>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {skills.slice(0, 2).map((s) => (
              <span key={s} className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/70">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
