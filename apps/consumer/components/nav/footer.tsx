import Link from "next/link";
import Image from "next/image";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image src="/logo.svg" alt="Descend" width={28} height={23} />
              <span className="text-xl font-bold tracking-tight">Descend</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Discover dive sites, explore operators, and book scuba diving
              experiences worldwide.
            </p>
            <a
              href="https://instagram.com/dive.descend"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Descend on Instagram"
            >
              <InstagramIcon className="h-5 w-5" />
              <span className="text-sm">@dive.descend</span>
            </a>
          </div>

          {/* Company links */}
          <div className="space-y-4">
            <p className="text-sm font-semibold">Company</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/for-operators" className="hover:text-foreground transition-colors font-medium text-foreground/80">
                  List your dive centre →
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore links */}
          <div className="space-y-4">
            <p className="text-sm font-semibold">Explore</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/discover/locations" className="hover:text-foreground transition-colors">
                  Dive Locations
                </Link>
              </li>
              <li>
                <Link href="/dive-centers" className="hover:text-foreground transition-colors">
                  Dive Centers
                </Link>
              </li>
              <li>
                <Link href="/instructors" className="hover:text-foreground transition-colors">
                  Instructors
                </Link>
              </li>
              <li>
                <Link href="/discover/creatures" className="hover:text-foreground transition-colors">
                  Marine Life
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Descend. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for divers, by divers.
          </p>
        </div>
      </div>
    </footer>
  );
}
