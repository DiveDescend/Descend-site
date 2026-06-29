import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.svg" alt="Descend" width={28} height={23} priority />
          <span className="text-xl font-bold tracking-tight">Descend</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/" className="text-foreground/70 transition-colors hover:text-foreground">
            Dive
          </Link>
          <Link href="/itinerary" className="text-foreground/70 transition-colors hover:text-foreground">
            Itinerary
          </Link>
          <Link href="/community" className="text-foreground/70 transition-colors hover:text-foreground">
            Community
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="ghost">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
