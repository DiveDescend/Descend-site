import Link from "next/link";
import Image from "next/image";

const CERT_ICONS: Record<string, string> = {
  PADI: "/padi.svg",
  SSI:  "/ssi.svg",
  NAUI: "/naui.svg",
};

interface CourseCardProps {
  id: string;
  name: string;
  level: string;
  days: number;
  price: number;
  image: string;
  agency?: string;
}

export default function CourseCard({ id, name, level, days, price, image, agency }: CourseCardProps) {
  return (
    <Link href={`/book/course/${id}`} className="group block">
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
        <div className="flex items-start justify-between gap-2">
          <p className="text-base font-bold tracking-tight leading-tight">{name}</p>
          {agency && CERT_ICONS[agency] && (
            <Image src={CERT_ICONS[agency]} alt={agency} width={22} height={22} className="shrink-0" />
          )}
        </div>
        <p className="text-sm text-muted-foreground">{days} days · {level}</p>
        <p className="text-sm font-semibold">${price}</p>
      </div>
    </Link>
  );
}
