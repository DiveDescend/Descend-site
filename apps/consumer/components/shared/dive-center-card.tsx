import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";

interface DiveCenterCardProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  certifications: string[];
  image: string;
}

export default function DiveCenterCard({
  id,
  name,
  location,
  rating,
  reviewCount,
  certifications,
  image,
}: DiveCenterCardProps) {
  return (
    <Link href={`/dive-centers/${id}`}>
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        <div className="relative h-40">
          <Image src={image} alt={name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        <CardContent className="p-4">
          <p className="font-semibold">{name}</p>
          <p className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {location}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
              <span className="text-muted-foreground">({reviewCount})</span>
            </div>
            <div className="flex gap-1">
              {certifications.map((cert) => (
                <Badge key={cert} variant="secondary" className="text-[10px]">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
