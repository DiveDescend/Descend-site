"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Anchor, BookOpen, ChevronLeft, ChevronRight, MapPin, Minus, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

const MONTHS     = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_LABELS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pad(n: number) { return String(n).padStart(2, "0"); }
function isoFromParts(y: number, m: number, d: number) { return `${y}-${pad(m + 1)}-${pad(d)}`; }
function shortDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ─── Two-month range picker ───────────────────────────────────────────────────

function MonthGrid({ year, month, dateFrom, dateTo, hovered, onSelect, onHover }: {
  year: number; month: number;
  dateFrom: string; dateTo: string; hovered: string;
  onSelect: (iso: string) => void;
  onHover: (iso: string) => void;
}) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const firstDow    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  // Effective end for hover preview (only when start is set but end isn't)
  const effectiveEnd = dateTo || (!dateTo && hovered > dateFrom ? hovered : "");

  return (
    <div className="w-60">
      <p className="mb-3 text-center text-sm font-semibold">{MONTHS[month]} {year}</p>
      <div className="mb-1 grid grid-cols-7 text-center">
        {DAY_LABELS.map(d => (
          <span key={d} className="text-[10px] font-medium text-muted-foreground">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          if (!day) return <div key={i} className="h-10" />;
          const iso      = isoFromParts(year, month, day);
          const isPast   = new Date(year, month, day) < today;
          const isStart  = iso === dateFrom;
          const isEnd    = iso === dateTo;
          const inRange  = !!(dateFrom && effectiveEnd && iso > dateFrom && iso < effectiveEnd);
          // Half-pill tint directions
          const startCap = isStart && !!(dateFrom && effectiveEnd);
          const endCap   = isEnd   && !!dateFrom;

          return (
            <div key={day} className="relative flex h-10 items-center justify-center"
              onMouseEnter={() => !isPast && onHover(iso)}
            >
              {/* Range fill — full cell */}
              {inRange  && <div className="absolute inset-0 bg-primary/10" />}
              {/* Half-fill on the right side of start */}
              {startCap && <div className="absolute inset-y-0 left-1/2 right-0 bg-primary/10" />}
              {/* Half-fill on the left side of end */}
              {endCap   && <div className="absolute inset-y-0 left-0 right-1/2 bg-primary/10" />}

              <button
                disabled={isPast}
                onClick={() => onSelect(iso)}
                className={cn(
                  "relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors",
                  (isStart || isEnd)
                    ? "bg-foreground text-background font-semibold"
                    : "hover:bg-muted",
                  isPast && "cursor-not-allowed opacity-30"
                )}
              >{day}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RangePicker({ dateFrom, dateTo, onSelect }: {
  dateFrom: string; dateTo: string;
  onSelect: (iso: string) => void;
}) {
  const today = new Date();
  const [view, setView]       = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [hovered, setHovered] = useState("");

  const leftYear  = view.getFullYear();
  const leftMonth = view.getMonth();
  const right     = new Date(leftYear, leftMonth + 1, 1);

  return (
    <div className="p-6" onMouseLeave={() => setHovered("")}>
      {/* Navigation */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => setView(new Date(leftYear, leftMonth - 1, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted transition-colors"
        ><ChevronLeft className="h-4 w-4" /></button>
        <button
          onClick={() => setView(new Date(leftYear, leftMonth + 1, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted transition-colors"
        ><ChevronRight className="h-4 w-4" /></button>
      </div>

      {/* Two months */}
      <div className="flex gap-8">
        <MonthGrid
          year={leftYear} month={leftMonth}
          dateFrom={dateFrom} dateTo={dateTo}
          hovered={!dateTo ? hovered : ""}
          onSelect={onSelect} onHover={setHovered}
        />
        <MonthGrid
          year={right.getFullYear()} month={right.getMonth()}
          dateFrom={dateFrom} dateTo={dateTo}
          hovered={!dateTo ? hovered : ""}
          onSelect={onSelect} onHover={setHovered}
        />
      </div>

      {/* Hint text */}
      <p className="mt-4 text-center text-xs text-muted-foreground">
        {!dateFrom
          ? "Select your check-in date"
          : !dateTo
          ? "Now select your check-out date"
          : `${shortDate(dateFrom)} – ${shortDate(dateTo)}`}
      </p>
    </div>
  );
}

// ─── Shared dropdown panels ───────────────────────────────────────────────────

function WherePanel({ filtered, onSelect }: {
  filtered: typeof SUGGESTED_LOCATIONS;
  onSelect: (name: string) => void;
}) {
  return (
    <div className="absolute left-0 top-full z-50 mt-3 w-96 rounded-3xl border bg-background shadow-lg">
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

function WhenPanel({ dateFrom, dateTo, onSelect }: {
  dateFrom: string; dateTo: string;
  onSelect: (iso: string) => void;
}) {
  return (
    <div className="absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 rounded-3xl border bg-background shadow-lg">
      <RangePicker dateFrom={dateFrom} dateTo={dateTo} onSelect={onSelect} />
    </div>
  );
}

function DiversPanel({ divers, setDivers }: { divers: number; setDivers: (n: number) => void }) {
  return (
    <div className="absolute right-0 top-full z-50 mt-3 rounded-3xl border bg-background shadow-lg">
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

export default function TopNav() {
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState(pathname === "/courses" ? "courses" : "dives");
  const [activeField, setActiveField]       = useState<ActiveField>(null);
  const [scrolled, setScrolled]             = useState(false);
  const [where, setWhere]                   = useState("");
  const [dateFrom, setDateFrom]             = useState("");
  const [dateTo, setDateTo]                 = useState("");
  const [divers, setDivers]                 = useState(0);

  const containerRef  = useRef<HTMLDivElement>(null);
  const whereInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
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

  // Range selection logic — first click sets start, second sets end, then closes
  function handleDateSelect(iso: string) {
    if (!dateFrom || (dateFrom && dateTo)) {
      setDateFrom(iso);
      setDateTo("");
    } else if (iso < dateFrom) {
      setDateFrom(iso);
      setDateTo("");
    } else {
      setDateTo(iso);
      setActiveField(null);
    }
  }

  const filtered = where
    ? SUGGESTED_LOCATIONS.filter(l =>
        l.name.toLowerCase().includes(where.toLowerCase()) ||
        l.country.toLowerCase().includes(where.toLowerCase()))
    : SUGGESTED_LOCATIONS;

  const diverLabel   = divers === 0 ? "Add guests" : `${divers} diver${divers !== 1 ? "s" : ""}`;
  const dateLabel    = dateFrom && dateTo
    ? `${shortDate(dateFrom)} – ${shortDate(dateTo)}`
    : dateFrom ? `${shortDate(dateFrom)} – ?`
    : "Add dates";
  const compactDate  = dateFrom && dateTo
    ? `${shortDate(dateFrom)} – ${shortDate(dateTo)}`
    : "Anytime";

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
    {/* Overlay — closes any open dropdown when clicking outside the pill */}
    {activeField !== null && createPortal(
      <div className="fixed inset-0 z-40" onMouseDown={() => setActiveField(null)} />,
      document.body
    )}

    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background transition-shadow duration-300",
      scrolled ? "shadow-sm" : "shadow-none"
    )}>

      {/* ── EXPANDED ── */}
      <div className={cn(
        "transition-opacity duration-200",
        scrolled ? "h-0 overflow-hidden opacity-0 pointer-events-none" : "opacity-100"
      )}>
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
          <div ref={containerRef} className="relative w-full max-w-2xl">
            <div className={cn(
              "flex items-stretch rounded-full border bg-background transition-shadow",
              activeField ? "shadow-md" : "shadow-sm"
            )}>
              {/* Where */}
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
              {/* When */}
              <div onClick={() => setActiveField(activeField === "when" ? null : "when")}
                className={cn("flex-1 cursor-pointer rounded-full px-6 py-3 transition-colors",
                  activeField === "when" ? "bg-muted/50" : "hover:bg-muted/40")}>
                <p className="text-[11px] font-semibold leading-none">When</p>
                <p className={cn("mt-1 text-sm", dateFrom ? "text-foreground" : "text-muted-foreground")}>
                  {dateLabel}
                </p>
              </div>
              <div className="my-3 w-px shrink-0 bg-border" />
              {/* Divers + search */}
              <div className="flex items-center gap-2 py-3 pl-6 pr-3">
                <div onClick={() => setActiveField(activeField === "divers" ? null : "divers")} className="cursor-pointer">
                  <p className="text-[11px] font-semibold leading-none">Divers</p>
                  <p className={cn("mt-1 text-sm", divers > 0 ? "text-foreground" : "text-muted-foreground")}>
                    {diverLabel}
                  </p>
                </div>
                <button onClick={() => setActiveField(null)} aria-label="Search"
                  className="ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            {activeField === "where"  && <WherePanel filtered={filtered} onSelect={(n) => { setWhere(n); setActiveField(null); }} />}
            {activeField === "when"   && <WhenPanel dateFrom={dateFrom} dateTo={dateTo} onSelect={handleDateSelect} />}
            {activeField === "divers" && <DiversPanel divers={divers} setDivers={setDivers} />}
          </div>
        </div>
      </div>

      {/* ── COLLAPSED ── */}
      <div className={cn(
        "transition-opacity duration-200",
        scrolled ? "opacity-100" : "h-0 overflow-hidden opacity-0 pointer-events-none"
      )}>
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6">
          <Logo />
          <div ref={scrolled ? containerRef : undefined} className="relative hidden md:block">
            <div className="flex items-center divide-x rounded-full border bg-background shadow-sm">
              <button onClick={() => setActiveField(activeField === "where" ? null : "where")}
                className="rounded-l-full px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-muted/50">
                {where || "Anywhere"}
              </button>
              <button onClick={() => setActiveField(activeField === "when" ? null : "when")}
                className={cn("px-4 py-2.5 text-sm transition-colors hover:bg-muted/50",
                  dateFrom ? "text-foreground" : "text-muted-foreground")}>
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

            {activeField === "where"  && <WherePanel filtered={filtered} onSelect={(n) => { setWhere(n); setActiveField(null); }} />}
            {activeField === "when"   && <WhenPanel dateFrom={dateFrom} dateTo={dateTo} onSelect={handleDateSelect} />}
            {activeField === "divers" && <DiversPanel divers={divers} setDivers={setDivers} />}
          </div>
          <Auth />
        </div>
      </div>

    </header>
    </>
  );
}
