"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
  const dark = true;

  const heading = cn("text-sm font-semibold", dark && "text-white");
  const muted = cn("text-sm", dark ? "text-white/55" : "text-muted-foreground");
  const link = cn("transition-colors", dark ? "text-white/55 hover:text-white" : "text-muted-foreground hover:text-foreground");

  return (
    <footer className={cn("relative", dark ? undefined : "border-t bg-background")}>
      <div className="relative mx-auto max-w-screen-2xl px-6 py-12 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image src="/logo.svg" alt="Descend" width={28} height={23} className={cn(dark && "brightness-0 invert")} />
              <span className={cn("text-xl font-bold tracking-tight", dark && "text-white")}>Descend</span>
            </Link>
            <p className={cn(muted, "max-w-xs")}>
              Discover dive sites, explore operators, and book scuba diving
              experiences worldwide.
            </p>
            <a
              href="https://instagram.com/dive.descend"
              target="_blank"
              rel="noopener noreferrer"
              className={cn("inline-flex items-center gap-2", link)}
              aria-label="Descend on Instagram"
            >
              <InstagramIcon className="h-5 w-5" />
              <span className="text-sm">@dive.descend</span>
            </a>
          </div>

          {/* Company links */}
          <div className="space-y-4">
            <p className={heading}>Company</p>
            <ul className={cn("space-y-3", muted)}>
              <li>
                <Link href="/about" className={link}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className={link}>
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={link}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={link}>
                  Terms of Use
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/for-operators" className={cn(link, "font-medium", dark ? "text-white/80" : "text-foreground/80")}>
                  List your dive centre →
                </Link>
              </li>
            </ul>
          </div>

          {/* Support links */}
          <div className="space-y-4">
            <p className={heading}>Support</p>
            <ul className={cn("space-y-3", muted)}>
              <li>
                <Link href="/contact" className={link}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/help" className={link}>
                  Help
                </Link>
              </li>
              <li>
                <Link href="/faqs" className={link}>
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore links */}
          <div className="space-y-4">
            <p className={heading}>Explore</p>
            <ul className={cn("space-y-3", muted)}>
              <li>
                <Link href="/discover/locations" className={link}>
                  Dive Locations
                </Link>
              </li>
              <li>
                <Link href="/dive-centers" className={link}>
                  Dive Centers
                </Link>
              </li>
              <li>
                <Link href="/instructors" className={link}>
                  Instructors
                </Link>
              </li>
              <li>
                <Link href="/discover/creatures" className={link}>
                  Marine Life
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={cn("mt-10 border-t pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between", dark && "border-white/10")}>
          <p className={cn("text-xs", dark ? "text-white/40" : "text-muted-foreground")}>
            © {new Date().getFullYear()} Descend. All rights reserved.
          </p>
          <p className={cn("text-xs", dark ? "text-white/40" : "text-muted-foreground")}>
            Built for divers, by divers.
          </p>
        </div>
      </div>
    </footer>
  );
}
