import Link from "next/link";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import ChipRow from "@/components/shared/chip-row";
import type { Instructor } from "@/lib/mock-data";

const CERT_ICONS: Record<string, string> = {
  PADI: "/padi.svg",
  SSI:  "/ssi.svg",
  NAUI: "/naui.svg",
};

const plus = (n: number) => `${n.toLocaleString()}+`;

export default function InstructorCard({
  id, name, title, agency, location, image, skills, dives, years, rating, topRated,
}: Instructor) {
  return (
    <Link href={`/instructors/${id}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        {topRated && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur-md">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            Top rated
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

        {/* Title + agency icon */}
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium">{title}</p>
          {CERT_ICONS[agency] && (
            <Image src={CERT_ICONS[agency]} alt={agency} width={22} height={22} className="shrink-0" />
          )}
        </div>

        {/* Location */}
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          {location}
        </p>

        {/* Skills — one row, overflow collapses into a "+N" chip */}
        <ChipRow items={skills} className="pt-1" />

        {/* Stats footer */}
        <div className="mt-2 flex border-t pt-2.5">
          <div className="flex-1">
            <p className="text-[11px] text-muted-foreground">Dives</p>
            <p className="text-sm font-semibold">{plus(dives)}</p>
          </div>
          <div className="flex-1 border-l pl-4">
            <p className="text-[11px] text-muted-foreground">Experience</p>
            <p className="text-sm font-semibold">{plus(years)} years</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
