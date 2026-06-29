import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface CreatureCardProps {
  id: string;
  name: string;
  tagline: string;
  color: string;
}

export default function CreatureCard({ id, name, tagline, color }: CreatureCardProps) {
  return (
    <Link href={`/discover/creatures`}>
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        <div className={`h-32 ${color} flex items-center justify-center`}>
          <span className="text-4xl">🐠</span>
        </div>
        <CardContent className="p-3">
          <p className="font-semibold">{name}</p>
          <p className="text-xs text-muted-foreground">{tagline}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
