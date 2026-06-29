import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  seeAllHref?: string;
}

export default function SectionHeader({ title, seeAllHref }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {seeAllHref && (
        <Link href={seeAllHref} className="text-sm text-primary hover:underline">
          See all
        </Link>
      )}
    </div>
  );
}
