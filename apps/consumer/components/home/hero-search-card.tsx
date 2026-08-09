"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MapPin, CalendarDays, Users, Compass, Search, Award, Anchor, Waves } from "lucide-react";
import RangePicker, { shortDate } from "@/components/shared/range-picker";
import { cn } from "@/lib/utils";
import { LOCATIONS, DIVE_SITE_INDEX } from "@/lib/mock-data";

const TRIP_TYPES = ["Any type", "Fun dive", "Certification course", "Liveaboard"];

const QUICK_FILTERS = [
  { label: "First dive", icon: Compass, q: "type=Fun+dive&level=beginner" },
  { label: "Certification course", icon: Award, q: "type=Certification+course" },
  { label: "Solo diver", icon: Users, q: "divers=1" },
  { label: "Liveaboard", icon: Anchor, q: "type=Liveaboard" },
  { label: "Wreck & advanced", icon: Waves, q: "level=advanced" },
];

// The card is fully faded out by the time you've scrolled this fraction of the
// hero's height — well before "Dive sites across the world" scrolls into view,
// instead of lingering all the way until the hero itself is completely gone.
const FADE_COMPLETE_FRACTION = 0.45;

export default function HeroSearchCard() {
  const router = useRouter();
  const [where, setWhere] = useState("");
  const [openWhere, setOpenWhere] = useState(false);
  const [whereError, setWhereError] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [openWhen, setOpenWhen] = useState(false);
  const [tripType, setTripType] = useState(TRIP_TYPES[0]);
  const [fadeProgress, setFadeProgress] = useState(1);
  const whenRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // The whole bar floats to the center of the viewport for the entire time
  // someone is filling it out — not just while a dropdown happens to be open —
  // so picking a location doesn't snap it back before they've picked dates too.
  // It docks again once they click outside the card, or scroll the page.
  const [isFocused, setIsFocused] = useState(false);
  const [dockedY, setDockedY] = useState(0);
  const [centerY, setCenterY] = useState(0);

  useLayoutEffect(() => {
    function updatePositions() {
      const h = cardRef.current?.offsetHeight ?? 200;
      const anchor = document.getElementById("hero-search-anchor");
      const dockedTop = anchor ? anchor.getBoundingClientRect().top + window.scrollY : window.innerHeight - h - 40;
      setDockedY(dockedTop);
      setCenterY((window.innerHeight - h) / 2);
    }
    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, []);

  const whereQuery = where.trim().toLowerCase();
  const locationSuggestions = whereQuery
    ? LOCATIONS.filter(
        (l) => l.name.toLowerCase().includes(whereQuery) || l.country.toLowerCase().includes(whereQuery)
      )
    : LOCATIONS;
  const siteSuggestions = whereQuery
    ? DIVE_SITE_INDEX.filter((s) => s.name.toLowerCase().includes(whereQuery)).slice(0, 8)
    : [];

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = document.getElementById("home-hero")?.offsetHeight ?? window.innerHeight;
      const fadeDistance = heroHeight * FADE_COMPLETE_FRACTION;
      const progress = 1 - Math.min(Math.max(window.scrollY / fadeDistance, 0), 1);
      setFadeProgress(progress);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openWhen) return;
    function handleClickOutside(e: MouseEvent) {
      if (whenRef.current && !whenRef.current.contains(e.target as Node)) setOpenWhen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openWhen]);

  useEffect(() => {
    // Scrolling the page while the card is centered means someone is browsing,
    // not filling out the form — treat it the same as clicking the backdrop.
    if (!isFocused) return;
    function handleScroll() {
      setOpenWhere(false);
      setOpenWhen(false);
      setIsFocused(false);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFocused]);

  function handleDateSelect(iso: string) {
    if (!dateFrom || (dateFrom && dateTo)) {
      setDateFrom(iso);
      setDateTo("");
    } else if (iso < dateFrom) {
      setDateFrom(iso);
      setDateTo("");
    } else {
      setDateTo(iso);
      setOpenWhen(false);
    }
  }

  function submit() {
    if (!where.trim()) {
      setWhereError(true);
      setOpenWhere(true);
      setIsFocused(true);
      return;
    }
    const qs = new URLSearchParams();
    qs.set("where", where.trim());
    if (dateFrom) qs.set("from", dateFrom);
    if (dateTo) qs.set("to", dateTo);
    if (tripType !== TRIP_TYPES[0]) qs.set("type", tripType);
    router.push(`/search?${qs}`);
  }

  function selectLocation(name: string) {
    setWhere(name);
    setWhereError(false);
    setOpenWhere(false);
  }

  const visible = isFocused || fadeProgress > 0.02;

  return (
    <>
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => { setOpenWhere(false); setOpenWhen(false); setIsFocused(false); }}
            className="fixed inset-0 z-30 bg-black/50"
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={{ y: isFocused ? centerY : dockedY }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        style={{ x: "-50%" }}
        className="fixed left-1/2 top-0 z-40 w-full max-w-5xl px-4"
      >
        <motion.div
          ref={cardRef}
          initial={false}
          animate={{ opacity: isFocused ? 1 : fadeProgress, scale: isFocused || reduceMotion ? 1 : 0.97 + fadeProgress * 0.03 }}
          transition={{ type: "spring", bounce: 0, duration: 0.35 }}
          style={{
            pointerEvents: visible ? "auto" : "none",
            background: "rgba(255,255,255,0.14)",
            backdropFilter: "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
          }}
          className="mx-auto rounded-3xl border border-white/25 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.25)] sm:p-6"
        >
          <div className="grid grid-cols-1 divide-y divide-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="relative px-1 py-3 sm:px-5 sm:py-1">
              <label className={cn("mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide", whereError ? "text-red-300" : "text-white/60")}>
                <MapPin className="h-3.5 w-3.5" /> Where <span className={whereError ? "text-red-300" : "text-white/40"}>*</span>
              </label>
              <input
                value={where}
                onChange={(e) => { setWhere(e.target.value); setWhereError(false); }}
                onFocus={() => { setOpenWhere(true); setIsFocused(true); }}
                onBlur={() => setTimeout(() => setOpenWhere(false), 150)}
                placeholder="Country, region or dive site"
                required
                aria-invalid={whereError}
                className={cn(
                  "w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/50",
                  whereError && "placeholder:text-red-300"
                )}
              />
              {whereError && <p className="mt-0.5 text-[11px] font-medium text-red-300">Please choose a destination</p>}
              <AnimatePresence>
              {openWhere && (
                <motion.div
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, y: reduceMotion ? 0 : -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, y: reduceMotion ? 0 : -4 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.25 }}
                  style={{
                    transformOrigin: "top left",
                    background: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(24px) saturate(160%)",
                    WebkitBackdropFilter: "blur(24px) saturate(160%)",
                  }}
                  className="absolute left-0 top-full z-30 mt-2 w-full min-w-[260px] max-h-[280px] overflow-y-auto rounded-2xl border border-white/40 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
                >
                  {locationSuggestions.length === 0 && siteSuggestions.length === 0 ? (
                    <p className="px-2 py-3 text-center text-sm text-slate-400">No matching dive sites</p>
                  ) : (
                    <>
                      {locationSuggestions.length > 0 && (
                        <>
                          {siteSuggestions.length > 0 && (
                            <p className="px-2 pb-1 pt-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">Locations</p>
                          )}
                          {locationSuggestions.map((l) => (
                            <button
                              key={l.id}
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => selectLocation(l.name)}
                              className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-slate-100"
                            >
                              <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
                              <div>
                                <p className="text-sm font-medium text-[#0F2E4C]">{l.name}</p>
                                <p className="text-xs text-slate-400">{l.country}</p>
                              </div>
                            </button>
                          ))}
                        </>
                      )}
                      {siteSuggestions.length > 0 && (
                        <>
                          <p className="px-2 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">Dive sites</p>
                          {siteSuggestions.map((s, i) => (
                            <button
                              key={`${s.name}-${i}`}
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => selectLocation(s.name)}
                              className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-slate-100"
                            >
                              <Waves className="h-4 w-4 shrink-0 text-slate-400" />
                              <div>
                                <p className="text-sm font-medium text-[#0F2E4C]">{s.name}</p>
                                <p className="text-xs text-slate-400">{s.location}</p>
                              </div>
                            </button>
                          ))}
                        </>
                      )}
                    </>
                  )}
                </motion.div>
              )}
              </AnimatePresence>
            </div>

            <div ref={whenRef} className="relative px-1 py-3 sm:px-5 sm:py-1">
              <button type="button" onClick={() => { setOpenWhen(!openWhen); setOpenWhere(false); setIsFocused(true); }} className="w-full text-left">
                <span className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-white/60">
                  <CalendarDays className="h-3.5 w-3.5" /> When
                </span>
                <span className={cn("block text-sm font-medium", dateFrom ? "text-white" : "text-white/50")}>
                  {dateFrom && dateTo ? `${shortDate(dateFrom)} – ${shortDate(dateTo)}` : "Select dates"}
                </span>
              </button>
              <AnimatePresence>
              {openWhen && (
                <motion.div
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, y: reduceMotion ? 0 : -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, y: reduceMotion ? 0 : -4 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.25 }}
                  style={{
                    transformOrigin: "top left",
                    background: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(24px) saturate(160%)",
                    WebkitBackdropFilter: "blur(24px) saturate(160%)",
                  }}
                  className="absolute left-0 top-full z-30 mt-2 rounded-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
                >
                  <RangePicker dateFrom={dateFrom} dateTo={dateTo} onSelect={handleDateSelect} />
                </motion.div>
              )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3 px-1 py-3 sm:px-5 sm:py-1">
              <div className="min-w-0 flex-1">
                <label className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-white/60">
                  <Compass className="h-3.5 w-3.5" /> Type of Dive
                </label>
                <select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  className="w-full bg-transparent text-sm font-medium text-white outline-none [&>option]:text-[#0F2E4C]"
                >
                  {TRIP_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={submit}
                aria-label="Search"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0F2E4C] shadow-md transition-all duration-150 hover:bg-white/90 active:scale-90"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2 border-t border-white/15 pt-4">
            {QUICK_FILTERS.map((f) => (
              <Link
                key={f.label}
                href={`/search?${f.q}`}
                className="flex items-center gap-1.5 rounded-full border border-white/25 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                <f.icon className="h-3.5 w-3.5" /> {f.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
