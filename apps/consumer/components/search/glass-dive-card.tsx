import Image from "next/image";
import Link from "next/link";
import { Waves, Clock } from "lucide-react";
import { GLASS_BG, GLASS_BORDER } from "@/components/home/glass";
import Price from "@/components/shared/price";

interface GlassDiveCardProps {
  id: string;
  name: string;
  location: string;
  depth: string;
  duration: string;
  price: number;
  minCert: string;
  image: string;
  bookingQuery?: string;
}

export default function GlassDiveCard({
  id, name, location, depth, duration, price, minCert, image, bookingQuery,
}: GlassDiveCardProps) {
  const href = bookingQuery ? `/book/fun-dive/${id}?${bookingQuery}` : `/book/fun-dive/${id}`;

  return (
    <div className={`overflow-hidden rounded-2xl ${GLASS_BORDER}`} style={GLASS_BG}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
          {minCert}
        </span>
      </div>
      <div className="space-y-2 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-white/50">{location}</p>
        <p className="text-base font-bold text-white">{name}</p>
        <div className="flex items-center gap-3 text-sm text-white/60">
          <span className="flex items-center gap-1">
            <Waves className="h-3.5 w-3.5" /> {depth}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {duration}
          </span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-[11px] text-white/40">From</p>
            <p className="text-lg font-extrabold text-white">
              <Price amount={price} />
              <span className="text-xs font-medium text-white/40"> / diver</span>
            </p>
          </div>
          <Link
            href={href}
            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0F2E4C] transition-colors hover:bg-white/90"
          >
            Book now
          </Link>
        </div>
      </div>
    </div>
  );
}
