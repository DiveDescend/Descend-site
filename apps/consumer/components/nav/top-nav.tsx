"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Anchor, BookOpen, MapPin, Minus, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import RangePicker, { shortDate } from "@/components/shared/range-picker";

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "dives",   label: "Dives",   icon: Anchor,  href: "/" },
  { id: "courses", label: "Courses", icon: BookOpen, href: "/courses" },
];

const SUGGESTED_LOCATIONS = [
  { name: "Havelock Island",     country: "Andaman & Nicobar", tagline: "India's top coral reef destination" },
  { name: "Pondicherry",         country: "Tamil Nadu",         tagline: "Natural reefs on the Coromandel Coast" },
  { name: "Netrani Island",      country: "Karnataka",          tagline: "Best mainland visibility in India" },
  { name: "Lakshadweep Islands", country: "Lakshadweep",        tagline: "Pristine atolls and manta rays" },
  { name: "Goa",                 country: "Goa",                tagline: "Beginner-friendly bay dives" },
  { name: "Neil Island",         country: "Andaman & Nicobar",  tagline: "Peaceful reefs and dugong sightings" },
];

// ─── Dropdown panels (rendered via portal, positioned with fixed coords) ─────

function WherePanel({ style, filtered, onSelect }: {
  style: React.CSSProperties;
  filtered: typeof SUGGESTED_LOCATIONS;
  onSelect: (name: string) => void;
}) {
  return (
    <div style={style} className="w-96 rounded-3xl border bg-background shadow-lg">
      <div className="p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Suggested destinations
        </p>
        <div className="space-y-0.5">
          {filtered.map(loc => (
            <button key={loc.name} onClick={() => onSelect(loc.name)}
              className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors hover:bg-muted">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">{loc.name}</p>
                <p className="text-xs text-muted-foreground">{loc.tagline}</p>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">No matching dive sites</p>
          )}
        </div>
      </div>
    </div>
  );
}

function WhenPanel({ style, dateFrom, dateTo, onSelect }: {
  style: React.CSSProperties;
  dateFrom: string; dateTo: string;
  onSelect: (iso: string) => void;
}) {
  return (
    <div style={style} className="rounded-3xl border bg-background shadow-lg">
      <RangePicker dateFrom={dateFrom} dateTo={dateTo} onSelect={onSelect} />
    </div>
  );
}

function DiversPanel({ style, divers, setDivers }: {
  style: React.CSSProperties;
  divers: number;
  setDivers: (n: number) => void;
}) {
  return (
    <div style={style} className="rounded-3xl border bg-background shadow-lg">
      <div className="p-6">
        <p className="mb-4 text-sm font-semibold">Number of divers</p>
        <div className="flex items-center gap-4">
          <button onClick={() => setDivers(Math.max(0, divers - 1))} disabled={divers === 0}
            className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:border-foreground disabled:opacity-30">
            <Minus className="h-3.5 w-3.5" />
          </button>
          <input
            type="number" min={0}
            value={divers === 0 ? "" : divers}
            onChange={(e) => { const v = parseInt(e.target.value); setDivers(isNaN(v) || v < 0 ? 0 : v); }}
            placeholder="0"
            className="w-12 bg-transparent text-center text-lg font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button onClick={() => setDivers(divers + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:border-foreground">
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── TopNav ──────────────────────────────────────────────────────────────────

type ActiveField = "where" | "when" | "divers" | null;

const EXPANDED_H  = 152;
const COLLAPSED_H = 64;

export default function TopNav() {
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState(pathname === "/courses" ? "courses" : "dives");
  const [activeField, setActiveField]       = useState<ActiveField>(null);
  const [scrolled, setScrolled]             = useState(false);
  const [where, setWhere]                   = useState("");
  const [dateFrom, setDateFrom]             = useState("");
  const [dateTo, setDateTo]                 = useState("");
  const [divers, setDivers]                 = useState(0);
  const [mounted, setMounted]               = useState(false);

  const expandedContainerRef  = useRef<HTMLDivElement>(null);
  const collapsedContainerRef = useRef<HTMLDivElement>(null);
  const whereInputRef         = useRef<HTMLInputElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Hysteresis: collapse at >100px, re-expand only below 60px
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(prev => {
        if (!prev && y > 100) return true;
        if (prev  && y < 60)  return false;
        return prev;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveField(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (activeField === "where") whereInputRef.current?.focus();
  }, [activeField]);

  function handleDateSelect(iso: string) {
    if (!dateFrom || (dateFrom && dateTo)) {
      setDateFrom(iso); setDateTo("");
    } else if (iso < dateFrom) {
      setDateFrom(iso); setDateTo("");
    } else {
      setDateTo(iso); setActiveField(null);
    }
  }

  const portalStyle = useCallback((align: "left" | "center" | "right"): React.CSSProperties => {
    const ref = scrolled ? collapsedContainerRef : expandedContainerRef;
    if (!ref.current) return { display: "none" };
    const rect = ref.current.getBoundingClientRect();
    const top  = rect.bottom + 12;
    const base: React.CSSProperties = { position: "fixed", top, zIndex: 50 };
    if (align === "left")  return { ...base, left: rect.left };
    if (align === "right") return { ...base, right: window.innerWidth - rect.right };
    return { ...base, left: rect.left + rect.width / 2, transform: "translateX(-50%)" };
  }, [scrolled]);

  const filtered    = where
    ? SUGGESTED_LOCATIONS.filter(l =>
        l.name.toLowerCase().includes(where.toLowerCase()) ||
        l.country.toLowerCase().includes(where.toLowerCase()))
    : SUGGESTED_LOCATIONS;

  const diverLabel  = divers === 0 ? "Add guests" : `${divers} diver${divers !== 1 ? "s" : ""}`;
  const dateLabel   = dateFrom && dateTo
    ? `${shortDate(dateFrom)} – ${shortDate(dateTo)}`
    : dateFrom ? `${shortDate(dateFrom)} – ?` : "Add dates";
  const compactDate = dateFrom && dateTo
    ? `${shortDate(dateFrom)} – ${shortDate(dateTo)}` : "Anytime";

  const Logo = () => (
    <Link href="/" className="flex shrink-0 items-center gap-2.5">
      <Image src="/logo.svg" alt="Descend" width={28} height={23} priority />
      <span className="text-xl font-bold tracking-tight">Descend</span>
    </Link>
  );
  const Auth = () => (
    <div className="flex shrink-0 items-center gap-2">
      <Button asChild size="sm" variant="ghost"><Link href="/login">Log in</Link></Button>
      <Button asChild size="sm"><Link href="/signup">Sign up</Link></Button>
    </div>
  );

  return (
    <>
    {mounted && activeField !== null && createPortal(
      <div className="fixed inset-0 z-40" onMouseDown={() => setActiveField(null)} />,
      document.body
    )}
    {mounted && activeField === "where" && createPortal(
      <WherePanel
        style={portalStyle("left")}
        filtered={filtered}
        onSelect={(n) => { setWhere(n); setActiveField(null); }}
      />, document.body
    )}
    {mounted && activeField === "when" && createPortal(
      <WhenPanel
        style={portalStyle("center")}
        dateFrom={dateFrom} dateTo={dateTo}
        onSelect={handleDateSelect}
      />, document.body
    )}
    {mounted && activeField === "divers" && createPortal(
      <DiversPanel
        style={portalStyle("right")}
        divers={divers} setDivers={setDivers}
      />, document.body
    )}

    <motion.header
      animate={{ height: scrolled ? COLLAPSED_H : EXPANDED_H }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background overflow-hidden",
        scrolled ? "shadow-sm" : "shadow-none"
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!scrolled ? (
          <motion.div key="expanded" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6">
              <Logo />
              <nav className="hidden md:flex items-center gap-10">
                {CATEGORIES.map(({ id, label, icon: Icon, href }) => (
                  <Link key={id} href={href} onClick={() => setActiveCategory(id)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 border-b-2 py-1 text-xs font-medium transition-colors",
                      activeCategory === id
                        ? "border-foreground text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/40"
                    )}>
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                    {label}
                  </Link>
                ))}
              </nav>
              <Auth />
            </div>
            <div className="hidden md:flex justify-center px-6 py-4">
              <div ref={expandedContainerRef} className="relative w-full max-w-2xl">
                <div className={cn(
                  "flex items-stretch rounded-full border bg-background transition-shadow",
                  activeField ? "shadow-md" : "shadow-sm"
                )}>
                  <div onClick={() => setActiveField("where")}
                    className={cn("flex-1 cursor-pointer rounded-full px-6 py-3 transition-colors",
                      activeField === "where" ? "bg-muted/50" : "hover:bg-muted/40")}>
                    <p className="text-[11px] font-semibold leading-none">Where</p>
                    <input ref={whereInputRef} type="text" value={where}
                      onChange={(e) => setWhere(e.target.value)}
                      placeholder="Search dive sites"
                      className="mt-1 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
                  </div>
                  <div className="my-3 w-px shrink-0 bg-border" />
                  <div onClick={() => setActiveField(activeField === "when" ? null : "when")}
                    className={cn("flex-1 cursor-pointer rounded-full px-6 py-3 transition-colors",
                      activeField === "when" ? "bg-muted/50" : "hover:bg-muted/40")}>
                    <p className="text-[11px] font-semibold leading-none">When</p>
                    <p className={cn("mt-1 text-sm", dateFrom ? "text-foreground" : "text-muted-foreground")}>{dateLabel}</p>
                  </div>
                  <div className="my-3 w-px shrink-0 bg-border" />
                  <div className="flex items-center gap-2 py-3 pl-6 pr-3">
                    <div onClick={() => setActiveField(activeField === "divers" ? null : "divers")} className="cursor-pointer">
                      <p className="text-[11px] font-semibold leading-none">Divers</p>
                      <p className={cn("mt-1 text-sm", divers > 0 ? "text-foreground" : "text-muted-foreground")}>{diverLabel}</p>
                    </div>
                    <button onClick={() => setActiveField(null)} aria-label="Search"
                      className="ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90">
                      <Search className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="collapsed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6">
              <Logo />
              <div ref={collapsedContainerRef} className="relative hidden md:block">
                <div className="flex items-center divide-x rounded-full border bg-background shadow-sm">
                  <button onClick={() => setActiveField(activeField === "where" ? null : "where")}
                    className="rounded-l-full px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-muted/50">
                    {where || "Anywhere"}
                  </button>
                  <button onClick={() => setActiveField(activeField === "when" ? null : "when")}
                    className={cn("px-4 py-2.5 text-sm transition-colors hover:bg-muted/50", dateFrom ? "text-foreground" : "text-muted-foreground")}>
                    {compactDate}
                  </button>
                  <div className="flex items-center gap-2 pl-4 pr-2 py-2">
                    <button onClick={() => setActiveField(activeField === "divers" ? null : "divers")}
                      className={cn("text-sm transition-colors", divers > 0 ? "text-foreground" : "text-muted-foreground")}>
                      {diverLabel}
                    </button>
                    <button onClick={() => setActiveField(null)} aria-label="Search"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90">
                      <Search className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
              <Auth />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
    </>
  );
}
