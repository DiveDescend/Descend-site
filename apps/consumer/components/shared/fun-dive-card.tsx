import Link from "next/link";
import Image from "next/image";
import { ArrowDown, MapPin } from "lucide-react";

interface FunDiveCardProps {
  id: string;
  name: string;
  location?: string;
  depth: string;
  duration: string;
  price: number;
  image: string;
  /** Extra query string appended to the booking link (e.g. "from=…&to=…"). */
  bookingQuery?: string;
}

export default function FunDiveCard({ id, name, location, depth, duration, price, image, bookingQuery }: FunDiveCardProps) {
  const href = bookingQuery ? `/book/fun-dive/${id}?${bookingQuery}` : `/book/fun-dive/${id}`;
  return (
    <Link href={href} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-base font-bold tracking-tight leading-tight">{name}</p>
        {location && (
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {location}
          </p>
        )}
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <ArrowDown className="h-3.5 w-3.5 shrink-0" />
          {depth} · {duration}
        </p>
        <p className="text-sm font-semibold">${price}</p>
      </div>
    </Link>
  );
}
