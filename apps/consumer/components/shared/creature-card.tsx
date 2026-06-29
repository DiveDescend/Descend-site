import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface CreatureCardProps {
  id: string;
  name: string;
  tagline: string;
  image: string;
}

export default function CreatureCard({ id, name, tagline, image }: CreatureCardProps) {
  return (
    <Link href={`/discover/creatures`}>
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        <div className="relative h-36">
          <Image src={image} alt={name} fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <CardContent className="p-3">
          <p className="font-semibold">{name}</p>
          <p className="text-xs text-muted-foreground">{tagline}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
