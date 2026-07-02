"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Anchor, BookOpen, LayoutGrid, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all",         label: "All",         icon: LayoutGrid, href: "/" },
  { id: "dives",       label: "Dives",       icon: Anchor,     href: "/dives" },
  { id: "courses",     label: "Courses",     icon: BookOpen,   href: "/courses" },
  { id: "instructors", label: "Instructors", icon: Users,      href: "/instructors" },
];

const VISIBLE_ROUTES = ["/", "/dives", "/courses", "/instructors"];

export default function CategoryTabs() {
  const pathname = usePathname();
  if (!VISIBLE_ROUTES.includes(pathname)) return null;

  return (
    <div className="flex justify-center px-4 pt-6">
      <div className="flex items-center gap-1 rounded-full border bg-background p-1 shadow-sm">
        {CATEGORIES.map(({ id, label, icon: Icon, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={id}
              href={href}
              className={cn(
                "relative flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4",
                active
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {active && (
                <motion.span
                  layoutId="category-tab-pill"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <Icon className="relative z-10 h-4 w-4" strokeWidth={1.75} />
              <span className={cn("relative z-10", !active && "hidden sm:inline")}>{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
