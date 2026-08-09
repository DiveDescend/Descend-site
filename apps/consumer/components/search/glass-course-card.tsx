import Image from "next/image";
import Link from "next/link";
import { Clock, Award } from "lucide-react";
import { GLASS_BG, GLASS_BORDER } from "@/components/home/glass";
import Price from "@/components/shared/price";

const CERT_ICONS: Record<string, string> = {
  PADI: "/padi.svg",
  SSI: "/ssi.svg",
  NAUI: "/naui.svg",
};

interface GlassCourseCardProps {
  id: string;
  name: string;
  agency: string;
  level: string;
  days: number;
  price: number;
  image: string;
}

export default function GlassCourseCard({ id, name, agency, level, days, price, image }: GlassCourseCardProps) {
  return (
    <div className={`overflow-hidden rounded-2xl ${GLASS_BORDER}`} style={GLASS_BG}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
          {level}
        </span>
        {CERT_ICONS[agency] && (
          <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90">
            <Image src={CERT_ICONS[agency]} alt={agency} width={16} height={16} />
          </span>
        )}
      </div>
      <div className="space-y-2 p-4">
        <p className="text-base font-bold text-white">{name}</p>
        <div className="flex items-center gap-3 text-sm text-white/60">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {days} day{days > 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-1">
            <Award className="h-3.5 w-3.5" /> {agency}
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
            href={`/book/course/${id}`}
            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0F2E4C] transition-colors hover:bg-white/90"
          >
            Book now
          </Link>
        </div>
      </div>
    </div>
  );
}
