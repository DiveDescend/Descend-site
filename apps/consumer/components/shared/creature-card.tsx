import Link from "next/link";
import Image from "next/image";

interface CreatureCardProps {
  id: string;
  name: string;
  tagline: string;
  image: string;
}

export default function CreatureCard({ id, name, tagline, image }: CreatureCardProps) {
  return (
    <Link href={`/discover/creatures`} className="group block">
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-base font-bold tracking-tight">{name}</p>
        <p className="text-sm text-muted-foreground">{tagline}</p>
      </div>
    </Link>
  );
}
