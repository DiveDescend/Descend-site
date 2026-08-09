"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MapPin, CalendarDays, Compass, Search, Waves } from "lucide-react";
import RangePicker, { shortDate } from "@/components/shared/range-picker";
import { GLASS_BG } from "@/components/home/glass";
import { cn } from "@/lib/utils";
import { LOCATIONS, DIVE_SITE_INDEX } from "@/lib/mock-data";

const TRIP_TYPES = ["Any type", "Fun dive", "Certification course", "Liveaboard"];

export default function NavSearchBar() {
  const router = useRouter();
  const [where, setWhere] = useState("");
  const [openWhere, setOpenWhere] = useState(false);
  const [whereError, setWhereError] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [openWhen, setOpenWhen] = useState(false);
  const [tripType, setTripType] = useState(TRIP_TYPES[0]);
  const whereRef = useRef<HTMLDivElement>(null);
  const whenRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

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
    if (!openWhere) return;
    function handleClickOutside(e: MouseEvent) {
      if (whereRef.current && !whereRef.current.contains(e.target as Node)) setOpenWhere(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openWhere]);

  useEffect(() => {
    if (!openWhen) return;
    function handleClickOutside(e: MouseEvent) {
      if (whenRef.current && !whenRef.current.contains(e.target as Node)) setOpenWhen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openWhen]);

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

  function selectLocation(name: string) {
    setWhere(name);
    setWhereError(false);
    setOpenWhere(false);
  }

  function submit() {
    if (!where.trim()) {
      setWhereError(true);
      setOpenWhere(true);
      return;
    }
    const qs = new URLSearchParams();
    qs.set("where", where.trim());
    if (dateFrom) qs.set("from", dateFrom);
    if (dateTo) qs.set("to", dateTo);
    if (tripType !== TRIP_TYPES[0]) qs.set("type", tripType);
    router.push(`/search?${qs}`);
  }

  const dropdownInitial = { opacity: 0, scale: reduceMotion ? 1 : 0.96, y: reduceMotion ? 0 : -4 };
  const dropdownAnimate = { opacity: 1, scale: 1, y: 0 };
  const dropdownTransition = { type: "spring" as const, bounce: 0, duration: 0.25 };

  return (
    <div
      className="flex h-11 items-center divide-x divide-white/15 rounded-full border border-white/25 pl-4 pr-1"
      style={GLASS_BG}
    >
      <div ref={whereRef} className="relative flex items-center gap-1.5 pr-3">
        <MapPin className={cn("h-3.5 w-3.5 shrink-0", whereError ? "text-red-300" : "text-white/60")} />
        <input
          value={where}
          onChange={(e) => { setWhere(e.target.value); setWhereError(false); }}
          onFocus={() => { setOpenWhere(true); setOpenWhen(false); }}
          placeholder="Where to dive?"
          aria-invalid={whereError}
          className={cn(
            "w-24 truncate bg-transparent text-sm outline-none lg:w-32",
            where ? "text-white" : "text-white/50",
            "placeholder:text-white/50"
          )}
        />
        <AnimatePresence>
          {openWhere && (
            <motion.div
              initial={dropdownInitial}
              animate={dropdownAnimate}
              exit={dropdownInitial}
              transition={dropdownTransition}
              style={{
                transformOrigin: "top left",
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(24px) saturate(160%)",
                WebkitBackdropFilter: "blur(24px) saturate(160%)",
              }}
              className="absolute left-0 top-full z-30 mt-2 w-72 max-h-[280px] overflow-y-auto rounded-2xl border border-white/40 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
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

      <div ref={whenRef} className="relative">
        <button
          type="button"
          onClick={() => { setOpenWhen(!openWhen); setOpenWhere(false); }}
          className="flex items-center gap-1.5 whitespace-nowrap px-3 text-sm text-white/80"
        >
          <CalendarDays className="h-3.5 w-3.5 shrink-0" />
          {dateFrom && dateTo ? `${shortDate(dateFrom)} – ${shortDate(dateTo)}` : "Dates"}
        </button>
        <AnimatePresence>
          {openWhen && (
            <motion.div
              initial={dropdownInitial}
              animate={dropdownAnimate}
              exit={dropdownInitial}
              transition={dropdownTransition}
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

      <div className="flex items-center gap-1.5 px-3">
        <Compass className="h-3.5 w-3.5 shrink-0 text-white/60" />
        <select
          value={tripType}
          onChange={(e) => setTripType(e.target.value)}
          className="w-24 bg-transparent text-sm text-white outline-none [&>option]:text-[#0F2E4C] lg:w-32"
        >
          {TRIP_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="pl-2">
        <button
          type="button"
          onClick={submit}
          aria-label="Search"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0F2E4C] transition-all duration-150 hover:bg-white/90 active:scale-90"
        >
          <Search className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
