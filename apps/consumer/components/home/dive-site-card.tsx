import Image from "next/image";
import { Waves } from "lucide-react";
import { GLASS_BG, GLASS_BORDER } from "./glass";

interface DiveSiteCardProps {
  name: string;
  region: string;
  depth: string;
  type: string;
  marine: string;
  image: string;
}

export default function DiveSiteCard({ name, region, depth, type, marine, image }: DiveSiteCardProps) {
  return (
    <div className={`overflow-hidden rounded-2xl ${GLASS_BORDER}`} style={GLASS_BG}>
      <div className="relative h-36 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071627]/70 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
          {type}
        </span>
      </div>
      <div className="space-y-2 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-white/50">{region}</p>
        <p className="text-base font-bold text-white">{name}</p>
        <div className="flex items-center gap-1.5 text-sm text-white/70">
          <Waves className="h-3.5 w-3.5 shrink-0" />
          Depth {depth}
        </div>
        <p className="text-sm text-white/60">{marine}</p>
      </div>
    </div>
  );
}
