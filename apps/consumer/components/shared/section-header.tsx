import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  seeAllHref?: string;
}

export default function SectionHeader({ title, seeAllHref }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {seeAllHref && (
        <Link
          href={seeAllHref}
          className="group flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
        >
          See all
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
