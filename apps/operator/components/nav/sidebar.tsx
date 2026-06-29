"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, CalendarDays, CheckSquare, Layers, Users,
  Package, ShieldCheck, Building2, DollarSign, Bell, Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const NAV_ITEMS = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/schedule", icon: CalendarDays, label: "Schedule" },
  { href: "/bookings", icon: CheckSquare, label: "Bookings", badge: 3 },
  { href: "/listings", icon: Layers, label: "Listings" },
  { href: "/staff", icon: Users, label: "Staff" },
  { href: "/equipment", icon: Package, label: "Equipment" },
  { href: "/safety", icon: ShieldCheck, label: "Safety" },
];

const NAV_ITEMS_BOTTOM = [
  { href: "/dive-center", icon: Building2, label: "Dive Centre" },
  { href: "/income", icon: DollarSign, label: "Income" },
];

const NAV_ITEMS_SYSTEM = [
  { href: "/notifications", icon: Bell, label: "Notifications" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

function NavLink({ href, icon: Icon, label, badge }: { href: string; icon: React.ElementType; label: string; badge?: number }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        active
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:text-foreground hover:bg-accent"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1">{label}</span>
      {badge && (
        <Badge variant="warning" className="h-5 px-1.5 text-[10px]">{badge}</Badge>
      )}
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-60 border-r bg-background flex flex-col">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 border-b px-4">
        <Image src="/logo.svg" alt="Descend" width={24} height={20} />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-bold tracking-tight">Descend</span>
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Operator</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}

        <div className="my-3 border-t" />

        {NAV_ITEMS_BOTTOM.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}

        <div className="my-3 border-t" />

        {NAV_ITEMS_SYSTEM.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
            BH
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Blue Horizon Dive</p>
            <p className="truncate text-xs text-muted-foreground">Raja Ampat, Indonesia</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
